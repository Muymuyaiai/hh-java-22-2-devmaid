package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gpt3Usage {
    private int prompt_tokens;
    private int completion_tokens;
    private int total_tokens;
}
