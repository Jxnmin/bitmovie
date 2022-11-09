import React, {useState} from 'react';
import {Button} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from "@mui/lab";

function JoinInfo(props) {
    const changeSelected=props.changeSelected;
    const email=props.email;
    const [passwordtwo,setPasswordtwo]=useState("");

    //입력할 데이터폼
    const [input,setInput] = useState({
        email: email,
        name: "",
        nick:"",
        password:"",
        gender:"",
        birth:"",
        hp:""
    })

    //onSubmit전에 null값 체크
    const onSubmitBtn=(e)=>{
        e.preventDefault();

        if(input.nick===""){
            alert("닉네임을 입력하세요")
            return;
        }

        if(input.name===""){
            alert("이름을 입력하세요")
            return;
        }

        if(input.password===""){
            alert("비밀번호를 입력하세요")
            return;
        }

        if(input.gender===""){
            alert("성별을 입력하세요")
            return;
        }

        if(input.birth===""){
            alert("생일을 입력하세요")
            return;
        }

        if(input.hp===""){
            alert("전화번호를 입력하세요")
            return;
        }

        if(!chkPW()){
            return;
        };

        if(input.password!==passwordtwo)
        {
            alert("비밀번호가 서로 다릅니다");
            return;
        }

        alert(input.name + " " + input.nick + " " + input.password +  " " + input.gender + " " + input.birth + " " + input.hp);
        changeSelected("done");
    }


    const chkPW=()=>{
        const pw = input.password;
        const id = input.email;

        const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        const hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if(input.password === ""){
            return "no";
        }else if(input.password !== passwordtwo){
            return "diff"
        }else if(false === reg.test(pw)) {
            // alert("비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.");
            return "reg"
        }else if(/(\w)\1\1\1/.test(pw)){
            // alert("같은 문자를 4번 이상 사용하실 수 없습니다.");
            return "4c";
        }else if(pw.search(id) > -1){
            // alert("비밀번호에 아이디가 포함되었습니다.");
            return "id";
        }else if(pw.search(/\s/) !== -1){
            // alert("비밀번호는 공백 없이 입력해주세요.");
            return "space";
        }else if(hangulcheck.test(pw)){
            // alert("비밀번호에 한글을 사용 할 수 없습니다.");
            return "hangul"
        }else {
            return "ok";
        }

    }

    const changeData=(e)=>{
        let {name,value}=e.target;
        setInput({
                ...input, //기존의 inputs 객체 복사해서 넣음(펼침 연산자)
                [name]:value //name키에 입력값넣기
            }
        )
    }

    return (
        <div className={"join-info"}>
            {
                chkPW()==="ok"?
                    <Alert className={"pass-error-msg"} severity={"success"}>
                        통과
                    </Alert>
                    :
                    <Alert className={"pass-error-msg"} severity={"error"}>
                        {
                            chkPW()==="reg"?
                                "비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다."
                                :
                                chkPW()==="4c"?
                                    "같은 문자를 4번 이상 사용하실 수 없습니다."
                                    :
                                    chkPW()==="id"?
                                        "비밀번호에 아이디가 포함되었습니다."
                                        :chkPW()==="space"?
                                            "비밀번호는 공백 없이 입력해주세요."
                                            :
                                            chkPW()==="hangul"?
                                                "비밀번호에 한글을 사용 할 수 없습니다."
                                                :
                                                chkPW()==="no"?
                                                    "비밀번호를 입력하세요"
                                                    :
                                                    chkPW()==="diff"?
                                                        "비밀번호 확인란이랑 다릅니다"
                                                        :
                                                        ""
                        }
                    </Alert>
            }
            <form onSubmit={onSubmitBtn}>
                <table className='table table-bordered join-table' style={{width:'500px'}}>
                    <tbody>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>아이디(이메일)</th>
                        <td>
                            <input type={'text'} className='form-control' disabled value={email}
                                   style={{marginLeft:"20px",width:'300px'}}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>닉네임</th>
                        <td>
                            <input type={'text'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"nick"} value={input.nick} onChange={changeData}/>
                        </td>
                    </tr>
                    <tr style={{width:"400px"}}>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>이름</th>
                        <td>
                            <input type={'text'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"name"} value={input.name} onChange={changeData}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>비밀번호</th>
                        <td>
                            <div className={"input-group"} style={{marginLeft:"20px",width:'330px'}} >
                                <input type={'password'} className={'form-control'}
                                       name={"password"} value={input.password} onChange={changeData}/>
                                {
                                    chkPW()!=="ok"?
                                        <CloseIcon style={{color:"red", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                        :
                                        <CheckIcon style={{color:"green", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>비밀번호 확인</th>
                        <td>
                            <div className={"input-group"} style={{marginLeft:"20px",width:'330px'}} >
                                <input type={'password'} className={'form-control'}
                                       name={"passwordtwo"} value={passwordtwo} onChange={(e)=>setPasswordtwo(e.target.value)}/>
                                {
                                    chkPW()!=="ok"?
                                        <CloseIcon style={{color:"red", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                        :
                                        <CheckIcon style={{color:"green", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>성별</th>
                        <td>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="gender"
                                value={input.gender}
                                onChange={changeData}
                                style={{display:"block"}}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="남자" />
                                <FormControlLabel value="female" control={<Radio />} label="여자" />
                            </RadioGroup>

                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>생일</th>
                        <td>
                            <input type={'date'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"birth"} value={input.birth} onChange={changeData}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>전화번호</th>
                        <td>
                            <input type={'text'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"hp"} value={input.hp} onChange={changeData}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <Button type={"button"} variant={"outlined"} color={"error"}
                        onClick={()=>{
                            changeSelected("email")
                        }}>이전</Button>
                <Button type={"submit"} variant={"outlined"} color={"success"}
                        style={{marginLeft:"50px"}}>회원가입</Button>
            </form>
        </div>
    );
}

export default JoinInfo;