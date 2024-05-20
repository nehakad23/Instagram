package com.likes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class LikesApplication {

	@Bean
	RestTemplate restTemplate()
	{
		return  new RestTemplate();
	}
	public static void main(String[] args) {
		SpringApplication.run(LikesApplication.class, args);
	}

}
