package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gpt3Response {

    private String id;
    private String object;
    private String model;
    private Gpt3Choices[] choices;
    private Gpt3Usage usage;
}
