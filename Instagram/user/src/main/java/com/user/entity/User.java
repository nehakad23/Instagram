package com.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Length;

@Entity
public class User {

    @Id
    String username;

    String name;

    @Column(unique = true)
    String email;
    @Column(unique = true)
    Long number;

    String bio;

    String gender;

    byte[] profilePic;

    String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getGender()
    {
        return gender;
    }

    public void setGender(String gender){
        this.gender=gender;
    }

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User(String username, String name, String email, Long number, String bio, String gender, byte[] profilePic,String password ){
        this.username = username;
        this.name = name;
        this.email = email;
        this.number = number;
        this.bio = bio;
        this.gender = gender;
        this.profilePic = profilePic;
        this.password=password;
    }

    public User() {
    }
}
