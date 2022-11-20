package com.example.backend.security.service;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDto;
import com.example.backend.security.model.UserInfoDto;
import com.example.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final AppUserRepository repo = mock(AppUserRepository.class);
    private final PasswordEncoder passEnc = mock(PasswordEncoder.class);

    private final UserService service = new UserService(repo, passEnc);

    @DirtiesContext
    @Test
    void getUserInfoDtoByUsername_ShouldReturnUserInfoDto() {
        //GIVEN
        AppUser user = AppUser.builder().username("Test").build();
        when(repo.findById("Test")).thenReturn(Optional.ofNullable(user));
        //WHEN
        UserInfoDto actual = service.getUserInfoDtoByUsername("Test");
        //THEN
        UserInfoDto expected = UserInfoDto.builder().username("Test").build();
        assertEquals(expected, actual);
    }

    @DirtiesContext
    @Test
    void getAllUsers_ShouldReturnListOfAllAppUsers() {
        //GIVEN
        AppUser user1 = AppUser.builder().username("1").build();
        AppUser user2 = AppUser.builder().username("2").build();
        when(repo.findAll())
                .thenReturn(List.of(user1, user2));
        //WHEN
        List<AppUser> actual = service.getAllUsers();
        //THEN
        List<AppUser> expected = List.of(user1,user2);
        verify(repo).findAll();
        assertEquals(expected, actual);
    }
    @DirtiesContext
    @Test
    void getUserById_ShouldReturnByGivenId() {
        //GIVEN
        AppUser user = AppUser.builder().username("Test").build();
        when(repo.findById("Test")).thenReturn(Optional.ofNullable(user));
        //WHEN
        AppUser actual = service.getUserById("Test");
        //THEN
        AppUser expected = AppUser.builder().username("Test").build();
        verify(repo).findById(any());
        assertEquals(expected, actual);
    }

    @DirtiesContext
    @Test
    void createUser_ShouldReturnString() {
        //GIVEN
        AppUserDto userDto = AppUserDto.builder().username("Test").password("test").build();
        AppUser user = AppUser.builder().username("Test").passwordHash("123").roles(List.of("USER")).sourceCodes(new ArrayList<>()).translations(new ArrayList<>()).build();
        when(repo.save(user)).thenReturn(user);
        when(passEnc.encode(userDto.getPassword())).thenReturn("123");
        when(repo.existsById(userDto.getUsername())).thenReturn(false);
        //WHEN
        String actual = service.createUser(userDto);
        //THEN
        String expected = user.getUsername() + " successfully added to database!";
        verify(repo).save(user);
        verify(passEnc).encode("test");
        assertEquals(expected, actual);
    }

    @DirtiesContext
    @Test
    void updateUser_ShouldReturnString() {
        //GIVEN
        AppUserDto userDto = AppUserDto.builder().username("Test").password("test").build();
        AppUser user = AppUser.builder().username("Test").passwordHash("123").roles(List.of("USER")).sourceCodes(new ArrayList<>()).translations(new ArrayList<>()).build();
        when(repo.save(user)).thenReturn(user);
        when(passEnc.encode(userDto.getPassword())).thenReturn("123");
        when(repo.findById(userDto.getUsername())).thenReturn(Optional.of(user));
        //WHEN
        String actual = service.updateUser(userDto);
        //THEN
        String expected = user.getUsername() + " successfully updated!";
        verify(repo).save(user);
        verify(passEnc).encode("test");
        assertEquals(expected, actual);
    }

    @DirtiesContext
    @Test
    void deleteUserById_ShouldReturnString() {
        //WHEN
        String actual = service.deleteUserById("Test");
        //THEN
        String expected = "Test successfully deleted!";
        verify(repo).deleteById("Test");
        assertEquals(expected, actual);
    }
}