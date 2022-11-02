package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    
    private final UserRepository userRepository;

    public UserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(username)
                .orElse(null);
        if (user == null){
            return null;
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPasswordHash(), Collections.emptyList());
    }

    private List<SimpleGrantedAuthority> extractSimpleGrantedAuthorities(User user) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (String s : user.getRoles()) {
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(s);
            authorities.add(simpleGrantedAuthority);
        }
        return authorities;
    }
}
