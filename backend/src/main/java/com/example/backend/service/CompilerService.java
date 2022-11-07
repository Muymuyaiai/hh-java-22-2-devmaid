package com.example.backend.service;

import com.example.backend.model.CompileRequest;
import com.example.backend.model.CompileResponse;
import com.example.backend.model.CompileToken;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Service
public class CompilerService {

    private final WebClient client = WebClient.create("https://judge0-ce.p.rapidapi.com");

    public String getCompiledCode(CompileRequest compileRequest) {

        CompileToken newCompileToken = Objects.requireNonNull(client.post()
                        .uri("/submissions?base64_encoded=true&fields=*")
                        .header("X-RapidAPI-Key", System.getenv("RAPID_API_KEY"))
                        .header("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromValue(compileRequest))
                        .retrieve()
                        .toEntity(CompileToken.class)
                        .block())
                .getBody();

        assert newCompileToken != null;

        CompileResponse newCompileResult = Objects.requireNonNull(client.get()
                .uri("submissions/" + newCompileToken.getToken() + "?base64_encoded=true&fields=*")
                .header("X-RapidAPI-Key", System.getenv("RAPID_API_KEY"))
                .header("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")
                .retrieve()
                .toEntity(CompileResponse.class)
                .block())
                .getBody();


        assert newCompileResult != null;

        if (newCompileResult.getStdout() != null){
            return newCompileResult.getStdout();
        }
        return newCompileResult.getCompile_output();
    }
}
