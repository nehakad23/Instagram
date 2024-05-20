package com.user.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public class UserDto {
    String username;

    @NotBlank(message = "Invalid name!")
    String name;

    @NotBlank(message = "Invalid email!")
    @Pattern(regexp = "[a-zA-Z]+[0-9]*@[a-z]+\\.[a-z]+", message = "Pattern cannot match!")
    String email;


    @NotNull(message = "Invalid phone number!")
    @Digits(integer = 10, fraction = 0, message = "Invalid phone number!")
    Long number;

    String bio;

    @Pattern(regexp = "(Male|Female|Other)")
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
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }
    public UserDto(String username, String name, String email, Long number, String bio, String gender,byte[] profilePic,String password) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.number = number;
        this.bio = bio;
        this.gender = gender;
        this.profilePic=profilePic;
        this.password=password;
    }

    public UserDto() {
    }
}

