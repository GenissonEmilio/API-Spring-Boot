package com.backend.backend.service;

import com.backend.backend.dto.LoginDTO;
import com.backend.backend.dto.RegisterDTO;
import com.backend.backend.model.Usuario;
import com.backend.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registrarUsuario(RegisterDTO data) {
        String senhaCriptografada = passwordEncoder.encode(data.senha);
        Usuario usuario = new Usuario(data.nome, data.email, senhaCriptografada);
        usuarioRepository.save(usuario);
    }

    @Autowired
    private TokenService tokenService;

    public String logarUsuario(LoginDTO data) throws Exception {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(data.email);

        if (optionalUsuario.isEmpty()) {
            throw new Exception("Usuário não encontrado");
        }

        Usuario usuario = optionalUsuario.get();
        boolean senhaCorreta = passwordEncoder.matches(data.senha, usuario.getSenha());

        if (!senhaCorreta) {
            throw new Exception("Senha incorreta");
        }

        // Retorna token JWT
        return tokenService.generateToken(usuario);
    }

}
