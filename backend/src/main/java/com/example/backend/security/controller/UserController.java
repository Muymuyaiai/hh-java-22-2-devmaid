package com.example.backend.security.controller;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDto;
import com.example.backend.security.model.UserInfoDto;
import com.example.backend.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public UserInfoDto login(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getUserInfoDtoByUsername(username);
    }

    @GetMapping("/logout")
    public void logout(HttpSession session){
        session.invalidate();
    }

    @GetMapping("/all")
    public List<AppUser> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public AppUser getUserById(@PathVariable String id){
        return userService.getUserById(id);
    }

    @PostMapping("/create")
    public String createUser(@RequestBody AppUserDto appUserDto){
        return userService.createUser(appUserDto);
    }

    @PostMapping("/update")
    public String updatePassword(@RequestBody AppUserDto appUserDto) {
        return userService.updateUser(appUserDto);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUserById(@PathVariable String id) {
        return userService.deleteUserById(id);
    }
}