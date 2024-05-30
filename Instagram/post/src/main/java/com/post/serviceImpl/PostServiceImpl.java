package com.post.serviceImpl;

import com.post.entity.Post;
import com.post.utility.PostUtility;
import com.user.dto.UserDto;
import com.post.dto.PostDto;
import com.post.repository.PostRepository;
import com.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    PostUtility postUtility;

    @Override
    public String createPost(PostDto postDto, String username, MultipartFile image) {
        String url = "http://localhost:8000/user/view-profile/" + username;
        UserDto userDto = restTemplate.getForObject(url, UserDto.class);
        Post post = new Post();
        post.setDescription(postDto.getDescription());
        post.setPostDate(new Date());
        post.setUsername(username);
        try {
            post.setImage(image.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        postRepository.save(post);

        return "Post created successfully.";
    }

    @Override
    public String deletePost(int postId) {
        postRepository.deleteById(postId);
        return "Post deleted.";
    }

    @Override
    public String updatePost(PostDto postDto, int postId) {
        Post post = postRepository.findById(postId).get();
        post.setDescription(postDto.getDescription());
        postRepository.save(post);
        return "Post Updated.";
    }

    @Override
    public List<PostDto> viewAllPost(String username) {
        String url = "http://localhost:8000/user/view-profile/" + username;
        UserDto userDto = restTemplate.getForObject(url, UserDto.class);
        List<Post> posts = postRepository.findByUsername(username);
//           List<PostDto> postDtos = new ArrayList<>();
//           for(Post p :posts){
//               postDtos.add(postUtility.entityToDto(p));
//           }

        List<PostDto> postDtos = posts.stream().map(post -> postUtility.entityToDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    @Override
    public PostDto viewPost(int postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            PostDto postDto = postUtility.entityToDto(post);
            return postDto;
        }
        return null;
    }

    @Override
    public List<PostDto> homePage(String username) {
        String url = "http://localhost:8002/follow/my-following?follower=" + username;
        List<UserDto> userDtos = List.of(restTemplate.getForObject(url, UserDto[].class)); // getting all followers
        List<PostDto> postDtos = new ArrayList<>();
        if (!userDtos.isEmpty()) {            // checking if there are no followers
            List<String> stringList = userDtos.stream().map(s -> s.getUsername()).collect(Collectors.toList()); //converting follower(UserDto) into usernames
            for (String s : stringList) {
                postDtos.addAll(viewAllPost(s)); // all followers post and adding to the final list
            }
            return postDtos.stream().sorted(Comparator.comparing(PostDto::getPostDate).reversed()).collect(Collectors.toList()); // sorting according to date
        } else {
            return postDtos;
        }
    }

    //    --------------------------------------------------extras-------------------------------------------------------
    @Override
    public String deleteAllPost(String username) {
        List<Post> posts = postRepository.findByUsername(username);
        postRepository.deleteAll(posts);
        return "deleted";
    }
}

