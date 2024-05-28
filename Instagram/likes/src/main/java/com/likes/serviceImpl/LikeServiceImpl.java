package com.likes.serviceImpl;

import com.likes.entity.Like;
import com.likes.repository.LikeRepository;
import com.likes.service.LikeService;
import com.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LikeServiceImpl implements LikeService {
    @Autowired
    LikeRepository likeRepository;

    @Autowired
    RestTemplate restTemplate;

    @Override
    public String like(int postId, String username) {
        Optional<Like> optionalLike = likeRepository.findByPostIdAndUsername(postId, username);
        if(!optionalLike.isPresent()) {
            Like like = new Like(postId, username);
            likeRepository.save(like);
        }
        return "liked";
    }

    @Override
    public String unlike(int postId, String username) {
        Optional<Like> optionalLike = likeRepository.findByPostIdAndUsername(postId, username);
        if(optionalLike.isPresent())
        {
            likeRepository.delete(optionalLike.get());
        }
        return "unliked";
    }

    @Override
    public List<UserDto> viewLikes(int postId) {
        List<Like> likes = likeRepository.findByPostId(postId);
//        List<String> usernameList = likes.stream().map(like->like.getUsername()).collect(Collectors.toList());
//        List<UserDto> userDtosList = new ArrayList<>();
//        for (String username: usernameList)
//        {
//            String url ="http://localhost:8000/user/view-profile/"+username;
//            UserDto userDto = restTemplate.getForObject(url, UserDto.class);
//            userDtosList.add(userDto);
//        }
//        return userDtosList;
        String url ="http://localhost:8000/user/view-profile/";
        return likes.stream().map(like-> restTemplate.getForObject(url+like.getUsername(), UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public Boolean isLiked(int postId, String username) {
        Optional<Like> optionalLike = likeRepository.findByPostIdAndUsername(postId, username);
        if(optionalLike.isPresent())
        {
            return true;
        }
        return false;
    }
}
