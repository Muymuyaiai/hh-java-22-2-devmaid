package com.example.backend.controller;

import com.example.backend.model.CodeTranslationRequest;
import com.example.backend.service.Gpt3Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gpt3")
public class Gpt3Controller {

    private final Gpt3Service gpt3Service;

    public Gpt3Controller(Gpt3Service gpt3Service) {
        this.gpt3Service = gpt3Service;
    }

    @PostMapping
    public String getCodeTranslation(@RequestBody CodeTranslationRequest request) {
        return gpt3Service.getCodeTranslation(request);
    }
}