package com.example.backend.security;

import com.example.backend.security.service.AppUserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AppUserDetailService appUserDetailService;

    public SecurityConfig(AppUserDetailService appUserDetailService) {
        this.appUserDetailService = appUserDetailService;
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    List<String> userRoles = List.of("USER", "ADMIN");

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/user/login").permitAll()
                .antMatchers("/api/user/logout").authenticated()
                .antMatchers("/api/user/update").authenticated()
                .antMatchers("/api/user/create").hasAuthority(userRoles.get(1))
                .antMatchers("/api/user/all").hasAuthority(userRoles.get(1))
                .antMatchers("/api/user/delete/*").hasAuthority(userRoles.get(1))
                .antMatchers("/api/user/*").authenticated()
                .antMatchers("/api/compiler").authenticated()
                .antMatchers("/api/gpt3").authenticated()
                .and().httpBasic().and().csrf().disable();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserDetailService).passwordEncoder(passwordEncoder());
    }
}
