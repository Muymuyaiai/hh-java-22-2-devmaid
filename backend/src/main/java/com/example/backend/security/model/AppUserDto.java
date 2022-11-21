package com.example.backend.security.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AppUserDto {

    private String username;
    private String password;
    private List<Translation> translations;
    private List<SourceCode> sourceCodes;
}