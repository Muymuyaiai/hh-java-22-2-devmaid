package com.example.backend.security.model;

import lombok.Data;

import java.util.List;

@Data
public class AppUserDTO {

    private String username;
    private String password;
    private List<Translation> translations;
    private List<SourceCode> sourceCodes;
}