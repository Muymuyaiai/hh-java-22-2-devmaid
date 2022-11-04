package com.example.backend.service;


import com.example.backend.model.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Objects;

@Service
public class Gpt3Service {

    private final WebClient clientCompletions = WebClient.create("https://api.openai.com/v1");

    public Gpt3Return getGpt3Return(Gpt3Request gpt3Request) {
        return Objects.requireNonNull(clientCompletions.post()
                        .uri("/completions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(h -> h.setBearerAuth(System.getenv("OPENAI_API_KEY")))
                        .body(BodyInserters.fromValue(gpt3Request))
                        .retrieve()
                        .toEntity(Gpt3Return.class)
                        .block())
                .getBody();
    }

    public String getCodeTranslation(CodeTranslationRequest request) {

        Gpt3Request newGpt3Request = Gpt3Request.builder()
                .model("text-davinci-002")
                .prompt("##### Translate this function  from " + request.getSrcLang() + " into " + request.getTarLang() + "" +
                        "### " + request.getSrcLang() +
                        request.getText() +
                        "### " + request.getTarLang())
                .temperature((float) 0.7)
                .max_tokens(200)
                .top_p(1)
                .frequency_penalty(0)
                .presence_penalty(0)
                .stop(List.of("###"))
                .build();

        Gpt3Return newGpt3Return = getGpt3Return(newGpt3Request);

        assert newGpt3Return != null;
        return newGpt3Return.getChoices()[0].getText();
    }

    public String getMarvsAnswer(String request) {

        Gpt3Request newGpt3Request = Gpt3Request.builder()
                .model("text-davinci-002")
                .prompt("Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: " + request + "\nMarv:")
                .temperature((float) 0.5)
                .max_tokens(60)
                .top_p((float) 0.3)
                .frequency_penalty((float) 0.5)
                .presence_penalty(0)
                .build();

        Gpt3Return newGpt3Return = getGpt3Return(newGpt3Request);

        assert newGpt3Return != null;
        return newGpt3Return.getChoices()[0].getText();
    }

    public DalleData[] getImages(String request) {
        DalleRequest newDalleRequest = DalleRequest.builder()
                .prompt(request)
                .n(4)
                .size("1024x1024")
                .build();

        DalleReturn newDalleReturn = Objects.requireNonNull(clientCompletions.post()
                                .uri("/images/generations")
                                .contentType(MediaType.APPLICATION_JSON)
                                .headers(h -> h.setBearerAuth(System.getenv("OPENAI_API_KEY")))
                                .body(BodyInserters.fromValue(newDalleRequest))
                                .retrieve()
                                .toEntity(DalleReturn.class)
                                .block())
                        .getBody();

        assert newDalleReturn != null;
        return newDalleReturn.getData();
    }
}
