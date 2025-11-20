package com.example.jwt_rest.configurations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager; //this library is important
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder; //this library is important
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; //this library is important
import org.springframework.security.crypto.password.PasswordEncoder; //this library is important
import org.springframework.security.web.SecurityFilterChain; //this library is important
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource; //this library is important
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.jwt_rest.filters.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable()) //disable CSRF protection for stateless APIs
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers("/api/users/**").hasRole("ADMIN") // Only ADMIN can fetch from the spring app on routes /api/users/**
                                .requestMatchers("/users/**").hasRole("ADMIN")
                                .requestMatchers("/roles/**").hasRole("ADMIN") // Only ADMIN can fetch from the spring app on routes /api/shops/**
                                .requestMatchers("/shops/**").hasAnyRole("USER", "ADMIN") // Only USER or ADMIN can fetch from the spring app on routes /users/**
                                .anyRequest().authenticated()
                )
                // Stateless session (required for JWT)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //no sessions
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) //Ensures your JwtFilter is executed before the default login filter, so it can validate the token early.
                .build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // config.setAllowedOrigins(List.of("https://jwt-auth-olive.vercel.app"));
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        // config.setExposedHeaders(List.of("Set-Cookie"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder encoder, UserDetailsService service)
            throws Exception {
                AuthenticationManagerBuilder authManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
                authManagerBuilder.userDetailsService(service).passwordEncoder(encoder); //using password encoder bcrypt hashed password
                // authManagerBuilder.userDetailsService(service); //using plain text password
                return authManagerBuilder.build();
    }

    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}