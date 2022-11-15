package com.example.backend.security.service.exception;

public class UserDoesNotExistsException extends RuntimeException{
    public UserDoesNotExistsException(final String message) {
        super(message);
    }
}
