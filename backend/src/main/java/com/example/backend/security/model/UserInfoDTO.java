package com.example.backend.security.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserInfoDTO {
    private String username;
    private List<String> roles;
}