package com.user.serviceImpl;

import com.user.dto.UserDto;
import com.user.entity.User;
import com.user.repository.UserRepository;
import com.user.service.UserService;
import com.user.utility.UserUtility;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.client.ServiceInstance;
//import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    UserUtility userUtility;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestTemplate restTemplate;

//    DiscoveryClient discoveryClient;

    @Autowired
    Environment environment;

    @Override
    public String createUser(UserDto userDto) {
        Optional<User> optionalUser = userRepository.findById(userDto.getUsername());
        if (optionalUser.isPresent()) {
            return "Username already in use please try with a different one.";
        }
        Optional<User> optionalUser1 = userRepository.findByEmail(userDto.getEmail());
        if (optionalUser1.isPresent()) {
            return "Please provide a different email. A user with this email already exists.";
        }
        Optional<User> optionalUser2 = userRepository.findByNumber(userDto.getNumber());
        if (optionalUser2.isPresent()) {
            return "Please provide a different number. A user with this number already exists.";
        }

        User user = userUtility.dtoToEntity(userDto);
        userRepository.save(user);
        return "Profile created successfully.";
    }

    @Override
    public String updateProfile(UserDto userDto, String username) {
        Optional<User> optionalUser = userRepository.findById(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (!user.getEmail().equals(userDto.getEmail()) && userRepository.findByEmail(userDto.getEmail()).isPresent()) {
                return "This Email is already registered. Please try with another Email.";
            }

            if (!user.getNumber().equals(userDto.getNumber()) && userRepository.findByNumber(userDto.getNumber()).isPresent()) {
                return "This Phone is already registered. Please try with another Phone Number.";
            }
            user.setName(userDto.getName());
            user.setNumber(userDto.getNumber());
            user.setBio(userDto.getBio());
            user.setEmail(userDto.getEmail());
            user.setGender(userDto.getGender());
            user.setPassword(userDto.getPassword());
            userRepository.save(user);

            return "Profile updated successfully.";
        } else {
            return "User not found.";
        }
    }

    @Override
    public String updateProfilePic(String username, MultipartFile profilePic) {
        Optional<User> optionalUser = userRepository.findById(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            try {
                user.setProfilePic(profilePic.getBytes());
                userRepository.save(user);
                return "Profile Pic updated successfully.";
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            return "User not found.";
        }
    }

    @Override
    public String deleteUser(String username) {
        userRepository.deleteById(username);
//            List<ServiceInstance> lis = discoveryClient.getInstances("PostMS");
//            if(lis!=null && !lis.isEmpty())
//            {
//                String postUrl = lis.get(0).getUri().toString();
//                restTemplate.delete(postUrl+"/post/delete-posts?username="+username);
//            }
        restTemplate.delete("http://localhost:8001/post/delete-posts?username=" + username);
        restTemplate.delete("http://localhost:8002/delete-entries?username=" + username);
        return "User deleted successfully.";
    }

    @Override
    public UserDto viewProfile(String username) {
        Optional<User> optionalUser = userRepository.findById(username);
        UserDto userDto = userUtility.entityToDto(optionalUser.get());
        return userDto;
    }

    @Override
    public List<UserDto> search(String query) {
        List<User> list1 = userRepository.findByUsernameContaining(query);
        List<User> list2 = userRepository.findByNameContaining(query);
        list1.addAll(list2);
        return list1.stream().distinct().map(s -> userUtility.entityToDto(s)).collect(Collectors.toList());
    }

    @Override
    public String login(UserDto userDto) {
        String username = userDto.getUsername();
        String password = userDto.getPassword();

        Optional<User> user1 = userRepository.findByUsernameAndPassword(username, password);
        Optional<User> user2 = userRepository.findByEmailAndPassword(username, password);
        if (user1.isPresent()) return username;
        if (user2.isPresent()) return user2.get().getUsername();
        else return "Incorrect";
    }
}

