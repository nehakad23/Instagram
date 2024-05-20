package com.post.repository;

import com.post.dto.PostDto;
import com.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    public List<Post> findByUsername(String username);

    void deleteByUsername(String username);
}
