package com.follower.controller;

import com.follower.service.FollowerService;
import com.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowerController {
    @Autowired
    FollowerService followerService;
    @PostMapping("follow/{username}")
    public ResponseEntity<String> follow(@RequestParam String follower,@PathVariable String username)
    {
        String message = followerService.follow(follower,username);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @DeleteMapping("unfollow/{username}")
    public ResponseEntity<String> unfollow(@RequestParam String follower, @PathVariable String username){
        String message = followerService.unfollow(follower,username);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @DeleteMapping("remove/{follower}")
    public ResponseEntity<String> remove(@RequestParam String username, @PathVariable String follower) {
        String message = followerService.unfollow(follower, username);
        return new ResponseEntity<>("Removed", HttpStatus.OK);

    }

    @GetMapping("my-followers")
    public ResponseEntity<List<UserDto>> myFollowers(@RequestParam String username){
        List<UserDto> userDtos = followerService.myFollower(username);
       if(userDtos.isEmpty()){
           return new ResponseEntity<>(userDtos,HttpStatus.NO_CONTENT);
       }
        return new ResponseEntity<>(userDtos, HttpStatus.OK);

    }

    @GetMapping("my-following")
    public ResponseEntity<List<UserDto>> myFollowing(@RequestParam String follower){
        List<UserDto> userDtos = followerService.myFollowing(follower);
        if(userDtos.isEmpty()){
            return new ResponseEntity<>(userDtos,HttpStatus.OK);
        }
        return new ResponseEntity<>(userDtos, HttpStatus.OK);

    }

//    --------------------------------------------------extras-------------------------------------------------------

    @DeleteMapping("delete-entries")
    public ResponseEntity<String> deleteEntries(@RequestParam String username){
        String message = followerService.deleteAll(username);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }
}

