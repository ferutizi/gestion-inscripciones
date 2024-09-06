package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements IUsuarioSevice {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}