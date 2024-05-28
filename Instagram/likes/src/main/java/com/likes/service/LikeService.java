package com.likes.service;

import com.user.dto.UserDto;

import java.util.List;

public interface LikeService {

    String like(int postId, String username);

    String unlike(int postId, String username);

    List<UserDto> viewLikes(int postId);

    Boolean isLiked(int postId, String username);
}
