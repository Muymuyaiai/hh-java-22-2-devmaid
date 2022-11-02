package com.example.backend.service;

import com.example.backend.model.AppUser;
import com.example.backend.model.AppUserDto;
import com.example.backend.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final AppUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(AppUserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }


    public String register(AppUserDto createAppUserDto) {

        String hashedPassword = passwordEncoder.encode(createAppUserDto.getPassword());

        AppUser appUser = new AppUser();
        appUser.setUsername(createAppUserDto.getUsername());
        appUser.setPasswordHash(hashedPassword);
        appUser.setRoles(List.of("USER"));

        return userRepo.save(appUser).getUsername();
    }
}

