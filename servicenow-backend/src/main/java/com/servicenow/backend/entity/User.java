package com.servicenow.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String username;

    private String password;

    private String role;

    private String service;

    private int experience;

    private int price;

    private String location;

    private String about;

    private String image;


    public User() {
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getPhone() {
        return phone;
    }


    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public String getService() {
        return service;
    }


    public void setService(String service) {
        this.service = service;
    }


    public int getExperience() {
        return experience;
    }


    public void setExperience(int experience) {
        this.experience = experience;
    }


    public int getPrice() {
        return price;
    }


    public void setPrice(int price) {
        this.price = price;
    }


    public String getLocation() {
        return location;
    }


    public void setLocation(String location) {
        this.location = location;
    }


    public String getAbout() {
        return about;
    }


    public void setAbout(String about) {
        this.about = about;
    }


    public String getImage() {
        return image;
    }


    public void setImage(String image) {
        this.image = image;
    }

}