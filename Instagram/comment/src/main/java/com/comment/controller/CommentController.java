package com.comment.controller;

import com.comment.dto.CommentDto;
import com.comment.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("comment")
    public ResponseEntity<CommentDto> comment(@RequestBody CommentDto commentDto, @RequestParam int postId, @RequestParam String username)
    {
        CommentDto commentDto1 = commentService.createComment(commentDto,postId,username);
        return new ResponseEntity<>(commentDto1, HttpStatus.CREATED);
    }

    @DeleteMapping("delete-comment")
    public ResponseEntity<String> deleteComment(@RequestParam int commentId){
        String message = commentService.deleteComment(commentId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("view-comments")
    public ResponseEntity<List<CommentDto>> viewComment(@RequestParam int postId){
        List<CommentDto> commentDtoList = commentService.viewComments(postId);
        return new ResponseEntity<>(commentDtoList, HttpStatus.OK);
    }
}
