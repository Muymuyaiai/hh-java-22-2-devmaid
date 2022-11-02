package com.example.backend.controller;

import com.example.backend.model.UserDto;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
    public String register(@RequestBody UserDto userDto){
        return userService.register(userDto);
    }

}