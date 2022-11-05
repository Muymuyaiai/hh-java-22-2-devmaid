package com.example.backend.controller;

import com.example.backend.model.MarvRequest;
import com.example.backend.model.TranslationRequest;
import com.example.backend.model.DalleData;
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
    public String getCodeTranslation(@RequestBody TranslationRequest request) {
        return gpt3Service.getCodeTranslation(request);
    }

    @PostMapping("/marv")
    public String getMarvsAnswer(@RequestBody MarvRequest request) {
        return gpt3Service.getMarvsAnswer(request);
    }

    @PostMapping("/dalle")
    public DalleData[] getImages(@RequestBody String request) {
        return gpt3Service.getImages(request);
    }
}
