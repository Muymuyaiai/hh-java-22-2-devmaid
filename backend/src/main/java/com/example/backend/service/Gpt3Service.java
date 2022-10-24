package com.example.backend.service;


import com.example.backend.model.CodeTranslationRequest;
import com.example.backend.model.Gpt3Request;
import com.example.backend.model.Gpt3Return;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Objects;

@Service
public class Gpt3Service {

    private final WebClient clientCompletions = WebClient.create("https://api.openai.com/v1");

    public String getCodeTranslation(CodeTranslationRequest request) {

        Gpt3Request newGpt3Request = Gpt3Request.builder()
                .model("text-curie-001")
                .prompt("##### Translate this function  from " + request.getSrcLang() + " into " + request.getTarLang() + "" +
                        "### " + request.getSrcLang() +
                        request.getText() +
                        "### " + request.getTarLang())
                .temperature((float) 0.7)
                .max_tokens(54)
                .top_p(1)
                .frequency_penalty(0)
                .presence_penalty(0)
                .stop(List.of("###"))
                .build();

        Gpt3Return newGpt3Return = Objects.requireNonNull(clientCompletions.post()
                        .uri("/completions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(h -> h.setBearerAuth("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"))
                        .body(BodyInserters.fromValue(newGpt3Request))
                        .retrieve()
                        .toEntity(Gpt3Return.class)
                        .block())
                .getBody();

        assert newGpt3Return != null;
        return newGpt3Return.getChoices()[0].getText();
    }


}
