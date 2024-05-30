package com.post.controller;

import com.post.dto.PostDto;
import com.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("create-post/{username}")
    public ResponseEntity<String> createPost(@RequestPart PostDto postDto, @PathVariable String username, @RequestPart MultipartFile image) {

        String message = postService.createPost(postDto, username, image);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @DeleteMapping("delete-post/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable int postId) {
        String message = postService.deletePost(postId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("update-post/{postId}")
    public ResponseEntity<String> updatePost(@RequestBody PostDto postDto, @PathVariable int postId) {
        String message = postService.updatePost(postDto, postId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("view-all-post/{username}")
    public ResponseEntity<List<PostDto>> viewAllPost(@PathVariable String username) {
        List<PostDto> postDto = postService.viewAllPost(username);
        if (postDto.isEmpty()) {
            return new ResponseEntity<>(postDto, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping("view-post/{postId}")
    public ResponseEntity<PostDto> viewPost(@PathVariable int postId) {
        PostDto postDto = postService.viewPost(postId);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping("home")
    public ResponseEntity<List<PostDto>> home(@RequestParam String username) {
        List<PostDto> postDtos = postService.homePage(username);
        if (postDtos.isEmpty()) {
            return new ResponseEntity<>(postDtos, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

//    ---------------------------------------------extra methods------------------------------------------------------

    @DeleteMapping("delete-posts")
    public ResponseEntity<String> deleteEntries(@RequestParam String username) {
        String message = postService.deleteAllPost(username);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}

