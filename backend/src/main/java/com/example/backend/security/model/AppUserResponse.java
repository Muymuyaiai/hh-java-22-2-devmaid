package com.example.backend.security.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUserResponse {

    private String username;
    private List<String> roles;
    private List<Translation> translations;
    private List<SourceCode> sourceCodes;
}