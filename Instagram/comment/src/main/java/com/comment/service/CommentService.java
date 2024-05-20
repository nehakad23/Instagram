package com.comment.service;

import com.comment.dto.CommentDto;

import java.util.List;

public interface CommentService {

    String createComment(CommentDto commentDto,int postId, String username);

    String deleteComment(int commentId);

    List<CommentDto> viewComments(int postId);
}
