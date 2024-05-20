package com.comment.dto;

import javax.xml.crypto.Data;
import java.util.Date;

public class CommentDto {

    int id;

    int postId;

    String message;

    Date date;

    String username;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CommentDto(int postId, Date date, String username,String message) {
        this.postId = postId;
        this.date = date;
        this.username = username;
        this.message=message;
    }

    public CommentDto() {
    }
}

