package com.xinqing.repository;

import com.xinqing.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 实现用户实体的持久化
 */
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
