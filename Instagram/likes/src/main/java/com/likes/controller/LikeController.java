package com.likes.controller;

import com.likes.service.LikeService;
import com.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    LikeService likeService;

    @PostMapping("like")
    public ResponseEntity<String> like(@RequestParam int postId, @RequestParam String username)
    {
        String message = likeService.like(postId, username);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("unlike")
    public ResponseEntity<String> unlike(@RequestParam int postId, @RequestParam String username)
    {
        String message = likeService.unlike(postId, username);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("view-likes")
    public ResponseEntity<List<UserDto>> viewLikes(@RequestParam int postId)
    {
        List<UserDto> userDtoList = likeService.viewLikes(postId);
        if(userDtoList.isEmpty())
        {
            return new ResponseEntity<>(userDtoList, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userDtoList, HttpStatus.OK);
    }

    //extras
    @GetMapping("is-liked")
    public ResponseEntity<Boolean> likeCount(@RequestParam int postId, @RequestParam String username)
    {
        Boolean check = likeService.isLiked(postId, username);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }
}
