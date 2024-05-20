package com.post.dto;

import jakarta.persistence.Column;

import java.util.Date;

public class PostDto {

    int postId;

    String description;

    Date postDate;

    String  username;

    byte[] image;

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public PostDto(String description, Date postDate, String username,byte[] image) {
        this.description = description;
        this.postDate = postDate;
        this.username = username;
        this.image=image;
    }

    public PostDto() {
    }
}
