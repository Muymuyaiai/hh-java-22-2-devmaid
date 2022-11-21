package com.example.backend.security.controller;


import ch.qos.logback.core.html.IThrowableRenderer;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.repository.AppUserRepository;
import com.example.backend.security.service.exception.UserDoesNotExistsException;
import de.flapdoodle.embed.mongo.distribution.Version;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Objects;

import static com.mongodb.internal.connection.tlschannel.util.Util.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private AppUserRepository userRepo;

    @Test
    @WithMockUser(username = "Test", password = "test", authorities = {"USER"})
    void login_ShouldReturnNameAndRoles() throws Exception {
        //GIVEN
        userRepo.save(AppUser.builder().username("Test").passwordHash("test").roles(List.of("USER")).build());

        String requestBody = """
                {"username": "Test", "password": "test"}
                """;

        String expectedJSON = """
                {"username": "Test", "roles": ["USER"]}
                """;

        //WHEN + THEN
        mockMvc.perform(get("/api/user/login")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJSON));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"USER"})
    void logout() throws Exception {
        mockMvc.perform(get("/api/user/logout"))
                .andExpect(status().isOk());
    }


    @Test
    @DirtiesContext
    void getAllUsers_ShouldReturn_Unauthorized_When_RequestWithoutLogin() throws Exception {
        mockMvc.perform(get("/api/user/all"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"USER"})
    void getAllUsers_ShouldReturn_Unauthorized_When_RequestWithoutAuthorities() throws Exception {
        mockMvc.perform(get("/api/user/all"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"ADMIN"})
    void getAllUsers_ShouldReturn_ListOfAllUsers_RequestWithLogin() throws Exception {
        //GIVEN
        userRepo.save(AppUser.builder().username("1").build());
        userRepo.save(AppUser.builder().username("2").build());

        String expectedJSON = """
                [{"username": "1"}, {"username": "2"}]
                """;

        //WHEN + THEN
        mockMvc.perform(get("/api/user/all"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJSON));
    }

    @Test
    @DirtiesContext
    void getUserById_ShouldReturn_Unauthorized_When_RequestWithoutLogin() throws Exception {
        mockMvc.perform(get("/api/user/Test"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"USER"})
    void getUserById_ShouldReturn_RequestedAppUser_When_RequestWithLogin() throws Exception {
        //GIVEN
        userRepo.save(AppUser.builder().username("Test").build());

        String expectedJSON = """
                {"username": "Test"}
                """;

        //WHEN + THEN
        mockMvc.perform(get("/api/user/Test"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJSON));
    }

    @Test
    @DirtiesContext
    void createUser_ShouldReturn_Unauthorized_When_RequestWithoutLogin() throws Exception {
        mockMvc.perform(get("/api/user/create"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"USER"})
    void createUser_ShouldReturn_Unauthorized_When_RequestWithoutAuthorities() throws Exception {
        mockMvc.perform(get("/api/user/create"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"ADMIN"})
    void createUser_ShouldReturn_String_When_RequestWithLogin() throws Exception {
        //GIVEN
        String requestBody = """
                {
                "username": "NewUser",
                "password": "newPassword"
                }
                """;

        //WHEN + THEN
        mockMvc.perform(post("/api/user/create")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().string("NewUser successfully added to database!"));
    }

    @Test
    @DirtiesContext
    void updateUser_ShouldReturn_Unauthorized_When_RequestWithoutLogin() throws Exception {
        mockMvc.perform(get("/api/user/update"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"USER"})
    void updateUser_ShouldReturn_String_When_RequestWithLogin() throws Exception {
        //GIVEN
        userRepo.save(AppUser.builder().username("Test").build());
        String requestBody = """
                {
                "username": "Test",
                "password": "newPassword"
                }
                """;

        //WHEN + THEN
        mockMvc.perform(post("/api/user/update")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().string("Test successfully updated!"));
    }

    @Test
    @DirtiesContext
    void deleteUserById_ShouldReturn_Unauthorized_When_RequestWithoutLogin() throws Exception {
        mockMvc.perform(delete("/api/user/delete/Test"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"USER"})
    void deleteUserById_ShouldReturn_Unauthorized_When_RequestWithoutAuthorities() throws Exception {
        mockMvc.perform(get("/api/user/delete/Test"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Test", password = "test", authorities = {"ADMIN"})
    void deleteUserById_ShouldReturn_String_When_RequestWithLogin() throws Exception {
        mockMvc.perform(delete("/api/user/delete/Test"))
                .andExpect(status().isOk())
                .andExpect(content().string("Test successfully deleted!"));
    }
}