package com.servicenow.backend.repository;

import com.servicenow.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Long> {

    User findByUsername(String username);

}