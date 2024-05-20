package com.user.service;

import com.user.dto.UserDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    String createUser(UserDto userDto);

    String updateProfile(UserDto userDto , String username);

    String deleteUser(String username);

    UserDto viewProfile(String username);

    String updateProfilePic(String username, MultipartFile profilePic);

    List<UserDto> search(String query);

    String login(UserDto userDto);
}
