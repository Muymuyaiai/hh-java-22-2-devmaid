package com.example.backend.controller;


import com.example.backend.model.CompileRequest;
import com.example.backend.service.CompilerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compiler")
public class CompilerController {

    private final CompilerService compilerService;

    public CompilerController(CompilerService compilerService) {
        this.compilerService = compilerService;
    }

    @PostMapping
    public String getCompiledCode(@RequestBody CompileRequest request) {
        return compilerService.getCompiledCode(request);
    }
}
