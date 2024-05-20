package com.likes.utility;

import com.likes.dto.LikeDto;
import com.likes.entity.Like;
import org.springframework.stereotype.Component;


@Component
public class LikeUtility {

    public LikeDto entityToDto(Like like)
    {
        LikeDto likeDto = new LikeDto(like.getPostId(), like.getUsername());
        likeDto.setId(like.getId());
        return likeDto;
    }

    public Like dtoToEntity(LikeDto likeDto){
        Like like = new Like(likeDto.getPostId(), likeDto.getUsername());
        like.setId(likeDto.getId());
        return like;
    }
}
