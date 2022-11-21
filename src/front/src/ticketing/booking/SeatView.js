import {json, useLocation, useNavigate} from "react-router-dom";

import './SelectSeat.css';
import {useState} from "react";
export default function SeatView({people, seats, rowSeats, onClickPeople,input ,setInput,changeData }) {

    const navi=useNavigate();
    const location = useLocation();
    const movieData= location.state.input;
    console.log('state',location.state);

    const reset=()=>{
        movieData('');
    }
    const obj = JSON.parse(movieData.movie);

    console.log(obj.m_photo);

    return (
        <div className={'seatchoose'}>
            <h1>좌석선택</h1>
            <section className="movie-container">

            </section>

            <ul className="showcase">
                <li>
                    <div className="seat okay"></div>
                    <small>예매가능</small>
                </li>
                <li>
                    <div className="seat selected"></div>
                    <small>선택된좌석</small>
                </li>
                <li>
                    <div className="seat occupied"></div>
                    <small>예매완료</small>
                </li>
            </ul>
            <main>
                <article id="info-container">
                    <div className={'seatposter'}></div>
                    <div className={'seattx'}>
                        <p>제목 : <b  style={{fontSize:'20px', color:'blue'}}>{obj.m_name}</b></p>
                        <section className="info-section">
                            <p id="selected-movie"></p>
                        </section>
                        <section className="info-section">
                            <br />
                            <p>상영관 : {movieData.location} 관</p>
                            <p>예매날짜 : 2022년 11월 {movieData.calender}일 </p>
                            <p>상영시간표 : {movieData.time}번째 상영타임 </p>

                            <p id="selected-seats"></p>
                        </section>
                    </div>
                    <div className={'moveall'}>
                        <article className="seat-section2">
                            <div className="seat3">성인</div>
                            {people?.ADULT?.array?.map(({ id, selected }) => (
                               <button
                                    key={`adult-${id}`}
                                    style={{ backgroundColor: selected ? 'red' : null }}
                                    className="seat2"
                                    onClick={() => onClickPeople(id, 'ADULT')}
                                >
                                    {id + 1}
                                </button>
                            ))}
                        </article>
                        <article className="seat-section3">
                            <div className="seat3">청소년</div>
                            {people?.CHILD?.array?.map(({ id, selected }) => (
                                <button
                                    key={`child-${id}`}
                                    style={{ backgroundColor: selected ? 'red' : null }}
                                    className="seat2"
                                    onClick={() => onClickPeople(id, 'CHILD')}
                                >
                                    {id + 1}
                                </button>
                            ))}
                        </article>
                    </div>
                </article>

                <article className="seat-section">
                    <div className="screen"></div>
                    <div className={'seatboxes'}>
                        {rowSeats.map((list, i) => (
                            <button className={'row'} key={i}>
                                {seats.map((list, j) => (
                                    <button
                                        style={{ backgroundColor: !list?.selected ? null : 'red' }}
                                        className={'seat'}
                                        key={j}
                                        value={i + 1 + '' + (j + 1)}
                                    />
                                ))}
                            </button>
                        ))}
                    </div>
                </article>
            </main>

            <p className="text">
                선택된 좌석 수 : <span id="count">0</span>
            </p>
            <div id={'btns'}>
                <button id="reset-btn" onClick={reset}>예매 다시하기</button>
                <button id="reset-btn2" onClick={() => navi('/ticketing/payment')}>
                    예매 완료하기
                </button>
            </div>
        </div>
    );
}