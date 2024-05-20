package com.follower.repository;

import com.follower.entity.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, Integer> {

    Optional<Follower> findByFollowerAndUsername(String follower, String username);

    List<Follower> findByUsername(String username);

    List<Follower> findByFollower(String follower);

}
