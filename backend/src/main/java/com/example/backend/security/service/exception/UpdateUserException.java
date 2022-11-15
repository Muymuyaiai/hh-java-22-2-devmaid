package com.example.backend.security.service.exception;

public class UpdateUserException extends RuntimeException {
    public UpdateUserException(final String message) {
        super(message);
    }
}