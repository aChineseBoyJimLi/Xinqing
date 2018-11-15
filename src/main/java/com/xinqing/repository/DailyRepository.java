package com.xinqing.repository;

import com.xinqing.entities.Daily;
import com.xinqing.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 实现日志实体的持久化
 */
public interface DailyRepository extends JpaRepository<Daily,Long> {
    List<Daily> findAllDailyByUser(User u);
}
