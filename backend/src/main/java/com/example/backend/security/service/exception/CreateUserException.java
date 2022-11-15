package com.example.backend.security.service.exception;

public class CreateUserException extends RuntimeException {
    public CreateUserException(final String message) {
        super(message);
    }
}