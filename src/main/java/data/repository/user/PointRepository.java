package data.repository.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PointRepository {
    public int selectPointByUser(int user_pk);
}