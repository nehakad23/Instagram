package com.user.controller;

import com.user.dto.UserDto;
import com.user.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    Environment environment;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("create-user")
    public ResponseEntity<String> createUser(@RequestPart @Valid UserDto userDto, @RequestPart MultipartFile profilePic) {

        try {
            userDto.setProfilePic(profilePic.getBytes());
        } catch (IOException e) {
            throw new RuntimeException();
        }
        String message = userService.createUser(userDto);
        if (message.equals("Profile created successfully.")) {
            return new ResponseEntity<>(message, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update-profile/{username}")
    public ResponseEntity<String> updateProfile(@RequestBody @Valid UserDto userDto, @PathVariable String username){
        String message = userService.updateProfile(userDto,username);
        if(message.equals("Profile updated successfully.")){
            return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("update-profile-pic/{username}")
    public ResponseEntity<String> updateProfile(@PathVariable String username, @RequestPart MultipartFile profilePic){
        String message = userService.updateProfilePic(username, profilePic);
        if(message.equals("Profile Pic updated successfully.")){
            return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("delete-user/{username}")
    public ResponseEntity<String> deleteProfile(@PathVariable String username){
        String message = userService.deleteUser(username);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @GetMapping("view-profile/{username}")
    public ResponseEntity<UserDto> viewProfile(@PathVariable String username){

        UserDto userDto = userService.viewProfile(username);
        return new ResponseEntity<>(userDto,HttpStatus.OK);

    }

    @GetMapping("search")
    public ResponseEntity<List<UserDto>> search(@RequestParam String query)
    {
        List<UserDto> userDtoList = userService.search(query);
        return new ResponseEntity<>(userDtoList, HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto)
    {
        String message = userService.login(userDto);
        if(message.equals("Incorrect")) {
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
