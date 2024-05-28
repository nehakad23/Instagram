package com.comment.utility;

import com.comment.dto.CommentDto;
import com.comment.entity.Comment;
import org.springframework.stereotype.Component;


@Component
public class CommentUtility {

    public CommentDto entityToDto(Comment comment)
    {
        CommentDto commentDto = new CommentDto(comment.getPostId(),comment.getDate(),comment.getUsername(),comment.getMessage());
        commentDto.setId(comment.getId());
        return  commentDto;
    }

    public Comment dtoToEntity(CommentDto commentDto){
      Comment comment = new Comment(commentDto.getPostId(),commentDto.getDate(),commentDto.getUsername(),commentDto.getMessage());
      comment.setId(commentDto.getId());
      return comment;
    }
}
