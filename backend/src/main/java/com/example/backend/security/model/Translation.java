package com.example.backend.security.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Translation {

    private String name;
    private String date;
    private String srcLang;
    private String tarLang;
    private String srcText;
    private String resText;
}
