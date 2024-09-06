package com.poloit.grupo12.inscripciones;

import com.poloit.grupo12.inscripciones.dto.UsuarioDTO;
import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.model.Credencial;
import com.poloit.grupo12.inscripciones.repository.IRolRepository;
import com.poloit.grupo12.inscripciones.repository.IUsuarioRepository;
import com.poloit.grupo12.inscripciones.repository.ICredencialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private IRolRepository rolRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    private ICredencialRepository credencialRepository;

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
        if (!usuarioRepository.existsById(1L)) {
            // Crear usuario admin
            Usuario adminUser = new Usuario("Admin", "User", "lalala@gmail.com", new Date(),
                    rolRepository.findById(1L).orElse(null));
            usuarioRepository.save(adminUser);

            // Crear credenciales para el usuario admin
            Credencial adminCred = new Credencial("admin_user", "admin_pass", adminUser);
            credencialRepository.save(adminCred);
        }
        //Crear 100 usuarios para pruebas
/*
        for (int i = 0; i < 100; i++) {
            Usuario u = new Usuario();
            u.setNombre("usuario nro " + i);
            u.setApellido("perez" + i);
            u.setEmail(i + "@mail.com");
            u.setRol(rolRepository.findById(1L).orElse(null));
            u.setFechaNacimiento(new Date());

            usuarioRepository.save(u);
        }
        */

    }
}
