package com.likes.dto;

public class LikeDto {
    int id;

    int postId;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LikeDto(int postId, String username) {
        this.postId = postId;
        this.username = username;
    }

    public LikeDto() {
    }
}

