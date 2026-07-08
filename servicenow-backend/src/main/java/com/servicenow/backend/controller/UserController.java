package com.servicenow.backend.controller;

import com.servicenow.backend.entity.User;
import com.servicenow.backend.exception.ApiException;
import com.servicenow.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // SIGNUP
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {

        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            throw new ApiException("Username already exists");
        }

        // Hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        // Never send password back in response
        savedUser.setPassword(null);

        return savedUser;
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {

        User user = userRepository.findByUsername(loginUser.getUsername());

        if (user == null) {
            throw new ApiException("User not found");
        }

        // Compare plain password with hashed password
        if (!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid password");
        }

        if (!user.getRole().equalsIgnoreCase(loginUser.getRole())) {
            throw new ApiException("Invalid role selected");
        }

        // Remove password before sending response
        user.setPassword(null);

        return user;
    }

    // GET ALL PROVIDERS
    @GetMapping("/providers")
    public List<User> getProviders() {
        List<User> providers = userRepository.findByRole("provider");

        // Remove password from every provider response
        for (User provider : providers) {
            provider.setPassword(null);
        }

        return providers;
    }
}