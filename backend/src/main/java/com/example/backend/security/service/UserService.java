package com.example.backend.security.service;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.model.UserInfoDTO;
import com.example.backend.security.repository.AppUserRepository;
import com.example.backend.security.service.exception.UpdateUserException;
import com.example.backend.security.service.exception.UserAlreadyExistsException;
import com.example.backend.security.service.exception.UserDoesNotExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    private final AppUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(AppUserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public UserInfoDTO getUserInfoDtoByUsername(String username) {

        AppUser appUser = userRepo.findById(username)
                .orElseThrow(NoSuchElementException::new);

        return UserInfoDTO.builder()
                .username(appUser.getUsername())
                .roles(appUser.getRoles())
                .build();
    }

    public List<AppUser> getAllUsers() {
        return userRepo.findAll();
    }

    public AppUser getUserById(String id) {
        return userRepo.findById(id).orElseThrow(() -> new UserDoesNotExistsException("No user found with name: " + id));
    }

    public String createUser(AppUserDTO appUserDto) {
            if (!userRepo.existsById(appUserDto.getUsername())) {
                userRepo.save(AppUser.builder()
                        .username(appUserDto.getUsername())
                        .passwordHash(passwordEncoder.encode(appUserDto.getPassword()))
                        .roles(List.of("USER"))
                        .sourceCodes(new ArrayList<>())
                        .translations(new ArrayList<>())
                        .build());
            } else {
                throw new UserAlreadyExistsException("User already exists!");
            }

            return appUserDto.getUsername() + " successfully added to database!";

    }

    public String updateUser(AppUserDTO appUserDto) {

            AppUser appUser = getUserById(appUserDto.getUsername());

            if (appUserDto.getPassword() != null) {
                appUser.setPasswordHash(passwordEncoder.encode(appUserDto.getPassword()));
            }
            if (appUserDto.getTranslations() != null) {
                appUser.getTranslations().addAll(appUserDto.getTranslations());
            }
            if (appUserDto.getSourceCodes() != null) {
                appUser.getSourceCodes().addAll(appUserDto.getSourceCodes());
            }

            return userRepo.save(appUser).getUsername();
    }

    public String deleteUserById(String id) {
        try {
            userRepo.deleteById(id);
            return id + "successfully deleted!";
        } catch (Exception e) {
            throw new UpdateUserException(id + "could not be deleted!");
        }
    }
}

