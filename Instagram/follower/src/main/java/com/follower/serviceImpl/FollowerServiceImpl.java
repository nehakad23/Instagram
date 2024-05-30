package com.follower.serviceImpl;

import com.follower.dto.FollowerDto;
import com.follower.entity.Follower;
import com.follower.repository.FollowerRepository;
import com.follower.service.FollowerService;
import com.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class FollowerServiceImpl implements FollowerService {

    @Autowired
    FollowerRepository followerRepository;

    @Autowired
    RestTemplate restTemplate;
    @Override
    public String follow(String follower, String username) {

        Optional<Follower> optionalFollower = followerRepository.findByFollowerAndUsername(follower,username);
        if(!optionalFollower.isPresent()) {
            Follower follower1 = new Follower(username, follower);
            followerRepository.save(follower1);
        }
            return "You started following "+ username;
    }

    @Override
    public String unfollow(String follower, String username) {
       Optional<Follower> optionalFollower = followerRepository.findByFollowerAndUsername(follower,username);
       if(optionalFollower.isPresent()){

           followerRepository.delete(optionalFollower.get());
       }
           return "Unfollowed.";
    }

    @Override
    public List<UserDto> myFollower(String username) {
        List<Follower> followerList = followerRepository.findByUsername(username);
        List<String> stringList=  followerList.stream().map(s->s.getFollower()).collect(Collectors.toList());
        List<UserDto> userDtos = new ArrayList<>();
        String url ="http://localhost:8000/user/view-profile/";
        for(String s: stringList){
            UserDto userDto = restTemplate.getForObject(url+s, UserDto.class);
            userDtos.add(userDto);
        }
        return userDtos;
    }

    @Override
    public List<UserDto> myFollowing(String follower) {
      List<Follower> followerList=  followerRepository.findByFollower(follower);
      List<String> stringList = followerList.stream().map(s->s.getUsername()).collect(Collectors.toList());
      List<UserDto> userDtos = new ArrayList<>();
        String url ="http://localhost:8000/user/view-profile/";
      for(String s : stringList){
          UserDto userDto= restTemplate.getForObject(url+s,UserDto.class);
          userDtos.add(userDto);
      }
      return  userDtos;
    }
    //    --------------------------------------------------extras-------------------------------------------------------
    @Override
    public String deleteAll(String username) {
        List<Follower> followers = followerRepository.findByUsername(username);
        List<Follower> followings = followerRepository.findByFollower(username);
        followerRepository.deleteAll(followers);
        followerRepository.deleteAll(followings);
        return "deleted";
    }
}
