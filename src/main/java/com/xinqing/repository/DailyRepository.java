package com.xinqing.repository;

import com.xinqing.entities.Daily;
import com.xinqing.entities.Mood;
import com.xinqing.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * 实现日志实体的持久化
 */
public interface DailyRepository extends JpaRepository<Daily,Long> {
    List<Daily> findAllDailyByUser(User u);
    @Query(value = "select count(mood) from daily where user_id=?1 and time between ?2 and ?3 and mood = ?4",nativeQuery = true)
    int findMood(long userid, String begin, String end, String s);

}
