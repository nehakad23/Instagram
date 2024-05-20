package com.likes.entity;

import jakarta.persistence.*;

@Entity
@Table(name="like_table")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="like_id")
    int id;

    @Column(name="post_id")
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

    public Like(int postId, String username) {
        this.postId = postId;
        this.username = username;
    }

    public Like() {
    }
}
