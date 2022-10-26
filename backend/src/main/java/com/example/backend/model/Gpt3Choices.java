package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gpt3Choices {
    private String text;
    private int index;
    private String logprobs;
    private String finish_reason;
}
