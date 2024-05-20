package com.post.utility;

import com.post.dto.PostDto;
import com.post.entity.Post;
import org.springframework.stereotype.Component;

@Component
public class PostUtility {

    public PostDto entityToDto(Post post){
        PostDto postDto = new PostDto(post.getDescription(),post.getPostDate(),post.getUsername(), post.getImage());
        postDto.setPostId(post.getPostId());
        return postDto;
    }

    public Post dtoToEntity(PostDto postDto){
        Post post = new Post(postDto.getDescription(),postDto.getPostDate(),postDto.getUsername(),postDto.getImage());
        post.setPostId(postDto.getPostId());
        return post;
    }
}
