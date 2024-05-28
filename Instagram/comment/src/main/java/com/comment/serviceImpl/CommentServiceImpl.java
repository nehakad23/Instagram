package com.comment.serviceImpl;

import com.comment.dto.CommentDto;
import com.comment.entity.Comment;
import com.comment.utility.CommentUtility;
import com.comment.service.CommentService;
import com.comment.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommentUtility commentUtility;


    @Override
    public CommentDto createComment(CommentDto commentDto, int postId, String username) {
        Comment comment = new Comment(postId,new Date(),username, commentDto.getMessage());
        commentRepository.save(comment);
        return commentUtility.entityToDto(comment);

    }

    @Override
    public String deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
        return "Deleted!";
    }

    @Override
    public List<CommentDto> viewComments(int postId) {
        List<Comment> commentList = commentRepository.findByPostId(postId);
        return commentList.stream().map(comment -> commentUtility.entityToDto(comment)).sorted(Comparator.comparing(CommentDto::getDate).reversed()).collect(Collectors.toList());
    }
}
