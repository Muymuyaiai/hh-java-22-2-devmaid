package com.example.backend.security.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("Users")
public class AppUser {

    @Id
    private String username;
    private String passwordHash;
    private List<String> roles;
    private List<Translation> translations;
    private List<SourceCode> sourceCodes;
}