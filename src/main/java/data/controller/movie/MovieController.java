package data.controller.movie;

import data.domain.movie.Cast;
import data.domain.movie.JoinMovie;
import data.domain.movie.JoinRevw;
import data.domain.movie.Movie;
import data.service.movie.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    // 영화 상세 정보 출력
    @GetMapping("/selectMovieData")
    public Map<String, Object> selectMovieData(@RequestParam String movie_pk) {

        // 영화 상세 정보
        Movie movie_data = movieService.selectMovieData(movie_pk);

        // 영화 등장인물 정보
        List<Cast> cast_list = movieService.selectCastList(movie_pk);

        // 영화 평점 정보
        List<JoinRevw> review_list = movieService.selectJoinRevw(movie_pk);

        // front 로 데이터 전달
        Map<String, Object> map = new HashMap<>();
        map.put("data", movie_data);
        map.put("cast", cast_list);
        map.put("revw", review_list);
        return map;
    }

    // 영화 리스트 출력
    @GetMapping("/selectMovieList")
    public List<JoinMovie> selectMovieList(@RequestParam(defaultValue = "null") String order_stand,
                                           @RequestParam(defaultValue = "null") String BorA) {
        /*  front 에서 넘겨줄 값 - 아래의 형식으로 전달 바랍니다
            order_stand : 정렬 기준
            - 예매율순 인경우 "reserve_rate"
            - 평점순인 경우 "revw_avgstar"
            BorA : 상영중인 영화인지 개봉 예정인 영화인지 판단
            - 상영중 "after"
            - 개봉예정 "before"
        */


        List<JoinMovie> movie_data_list = movieService.selectMovieList(order_stand, BorA);
//        System.out.println("controller : "+order_stand);
//        System.out.println("controller:"+ BorA);
        return movie_data_list;
    }
}