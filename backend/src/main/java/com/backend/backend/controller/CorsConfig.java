package com.backend.backend.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite o acesso ao seu backend a partir do frontend
        registry.addMapping("/**") // permite todas as rotas
                .allowedOrigins("http://localhost:5173", "https://genissonapi.vercel.app") // permite o frontend do Vite
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // métodos HTTP permitidos
                .allowedHeaders("*")
                .allowCredentials(true); // permite qualquer header
    }
}
