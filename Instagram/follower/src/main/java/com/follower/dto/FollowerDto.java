package com.follower.dto;

public class FollowerDto {
    int id;

    String username;

    String follower;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFollower() {
        return follower;
    }

    public void setFollower(String follower) {
        this.follower = follower;
    }

    public FollowerDto(String username, String follower) {
        this.username = username;
        this.follower = follower;
    }

    public FollowerDto() {
    }
}
