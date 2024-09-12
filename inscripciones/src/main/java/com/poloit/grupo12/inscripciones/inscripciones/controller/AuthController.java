package com.poloit.grupo12.inscripciones.controller;

import com.poloit.grupo12.inscripciones.dto.UsuarioDTO;
import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.service.RolService;
import com.poloit.grupo12.inscripciones.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
