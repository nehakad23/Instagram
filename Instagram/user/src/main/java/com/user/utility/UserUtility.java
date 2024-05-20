package com.user.utility;

import com.user.dto.UserDto;
import com.user.entity.User;
import org.springframework.stereotype.Component;


@Component
public class UserUtility {

    public UserDto entityToDto(User user)
    {
        UserDto userDto = new UserDto(user.getUsername(), user.getName(),user.getEmail(),user.getNumber(),user.getBio(),user.getGender(), user.getProfilePic(), user.getPassword());
        return userDto;
    }

    public User dtoToEntity(UserDto userDto){
        User user = new User(userDto.getUsername(),userDto.getName(),userDto.getEmail(),userDto.getNumber(),userDto.getBio(),userDto.getGender(),userDto.getProfilePic(),userDto.getPassword());
        return user;
    }
}
