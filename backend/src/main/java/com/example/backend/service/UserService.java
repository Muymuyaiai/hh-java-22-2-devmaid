package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.UserDto;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }


    public String register(UserDto createUserDto) {

        String hashedPassword = passwordEncoder.encode(createUserDto.getPassword());

        // Create AppUser
        User appUser = new User();
        appUser.setUsername(createUserDto.getUsername());
        appUser.setPasswordHash(hashedPassword);
        appUser.setRoles(List.of("USER"));

        // Save AppUser in DB
        return userRepo.save(appUser).getUsername();

    }
}

