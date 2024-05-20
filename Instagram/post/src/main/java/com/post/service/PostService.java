package com.post.service;

import com.post.dto.PostDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    String createPost(PostDto postDto, String username, MultipartFile image);

    String deletePost(int postId);

    String updatePost(PostDto postDto ,int postId);

    List<PostDto> viewAllPost(String username);

    PostDto viewPost(int postId);

    List<PostDto> homePage(String username);

    String deleteAllPost(String username);
}
