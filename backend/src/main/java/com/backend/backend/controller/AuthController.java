package com.backend.backend.controller;

import com.backend.backend.dto.LoginDTO;
import com.backend.backend.dto.RegisterDTO;
import com.backend.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // permite requisições do frontend
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody RegisterDTO data) {
        try {
            usuarioService.registrarUsuario(data);
            return ResponseEntity.ok().body("Usuário registrado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao registrar: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO data) {
        try {
            String token = usuarioService.logarUsuario(data);
            return ResponseEntity.ok().body(new TokenResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Erro ao fazer login: " + e.getMessage());
        }
    }
}
