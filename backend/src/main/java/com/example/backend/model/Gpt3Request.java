package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gpt3Request {
    private String model;
    private String prompt;
    private float temperature;
    private int max_tokens;
    private float top_p;
    private float frequency_penalty;
    private float presence_penalty;
    private List<String> stop;
}
