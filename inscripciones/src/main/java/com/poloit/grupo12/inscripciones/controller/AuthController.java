package com.poloit.grupo12.inscripciones.controller;

import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.service.implementacion.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.poloit.grupo12.inscripciones.dto.UsuarioDTO;
import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.service.implementacion.RolService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private RolService rolService;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody UsuarioDTO usuarioDTO) {
        Rol rol = rolService.findById(usuarioDTO.getRolId());
        if (rol == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Usuario existingUsuario = usuarioService.findByEmail(usuarioDTO.getEmail());
        if (existingUsuario != null) {
            return new ResponseEntity<>(existingUsuario, HttpStatus.OK);
        }

        Usuario usuario = new Usuario(usuarioDTO.getNombre(), usuarioDTO.getApellido(), usuarioDTO.getEmail(),
                usuarioDTO.getFechaNacimiento(), rol);
        Usuario savedUsuario = usuarioService.save(usuario);
        return new ResponseEntity<>(savedUsuario, HttpStatus.CREATED);
    }
}
