package com.follower.service;

import com.follower.dto.FollowerDto;
import com.user.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FollowerService {
     String follow(String follower, String username) ;

    String unfollow(String follower, String username);

    List<UserDto> myFollower(String username);

    List<UserDto> myFollowing(String username);

    String deleteAll(String username);
}
