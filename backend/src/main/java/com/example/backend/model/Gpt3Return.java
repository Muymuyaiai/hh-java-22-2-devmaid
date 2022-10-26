package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Array;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gpt3Return {
    private String id;
    private String object;
    private String model;
    private Gpt3Choices[] choices;
    private Gpt3Usage usage;
}
