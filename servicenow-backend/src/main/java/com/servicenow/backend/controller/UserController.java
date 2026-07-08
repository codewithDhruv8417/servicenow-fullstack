package com.servicenow.backend.controller;

import com.servicenow.backend.entity.User;
import com.servicenow.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // SIGNUP
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {

        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            throw new RuntimeException("Username already exists");
        }

        return userRepository.save(user);
    }

    // LOGIN
    @PostMapping("/login")
public User login(@RequestBody User loginUser) {

    User user = userRepository.findByUsername(loginUser.getUsername());

    if (user == null) {
        throw new RuntimeException("User not found");
    }

    if (!user.getPassword().equals(loginUser.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    if (!user.getRole().equalsIgnoreCase(loginUser.getRole())) {
        throw new RuntimeException("Invalid role selected");
    }

    // Remove password before sending response
    user.setPassword(null);

    return user;
}

    // GET ALL PROVIDERS
    @GetMapping("/providers")
    public List<User> getProviders() {
        return userRepository.findByRole("provider");
    }
}