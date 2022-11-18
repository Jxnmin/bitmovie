package data.repository.user;

import data.domain.user.Coupon;
import data.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CouponRepository {
    public List<User> selectBirthUser(); //생일인 회원키 조회
    public void insertBirthCoupon (Coupon coupon); //생일 쿠폰 생성
}