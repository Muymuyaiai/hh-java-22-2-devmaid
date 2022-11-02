package com.example.backend.controller;

import com.example.backend.model.AppUserDto;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService appUserService;

    @Autowired
    public UserController(UserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/login")
    public String login(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/logout")
    public void logout(HttpSession session){
        session.invalidate();
    }


    @PostMapping("/register")
    public String register(@RequestBody AppUserDto appUserDto){
        return appUserService.register(appUserDto);
    }

}