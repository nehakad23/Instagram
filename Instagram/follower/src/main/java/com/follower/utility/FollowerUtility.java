package com.follower.utility;

import com.follower.dto.FollowerDto;
import com.follower.entity.Follower;
import org.springframework.stereotype.Component;

@Component
public class FollowerUtility {

    public Follower dtoToEntity(FollowerDto followerDto)
    {
        Follower follower = new Follower(followerDto.getUsername(), followerDto.getFollower());
        follower.setId(followerDto.getId());
        return follower;
    }

    public FollowerDto entityToDto(Follower follower)
    {
        FollowerDto followerDto = new FollowerDto(follower.getUsername(), follower.getFollower());
        followerDto.setId(followerDto.getId());
        return followerDto;
    }
}
