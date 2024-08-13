package com.poloit.grupo12.inscripciones;

import com.poloit.grupo12.inscripciones.model.Credencial;
import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.repository.CredencialRepository;
import com.poloit.grupo12.inscripciones.repository.RolRepository;
import com.poloit.grupo12.inscripciones.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.Date;


public class DataLoader implements CommandLineRunner {

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CredencialRepository credencialRepository;

    @Override
    public void run(String... args) throws Exception {
        // Comprobar si los roles ya existen antes de guardarlos
        if (!rolRepository.existsById(1L)) {
            Rol adminRole = new Rol("admin");
            rolRepository.save(adminRole);
        }
        if (!rolRepository.existsById(2L)) {
            Rol visitorRole = new Rol("visitante");
            rolRepository.save(visitorRole);
        }

        // Crear usuario admin
        Usuario adminUser = new Usuario("Admin", "User", "lalala@gmail.com", new Date(), rolRepository.findById(1L).orElse(null));
        usuarioRepository.save(adminUser);

        // Crear credenciales para el usuario admin
        Credencial adminCred = new Credencial("admin_user", "admin_pass", adminUser);
        credencialRepository.save(adminCred);
    }
}
