package com.poloit.grupo12.inscripciones;

import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.model.Credencial;
import com.poloit.grupo12.inscripciones.model.Proyecto;
import com.poloit.grupo12.inscripciones.model.Curso;
import com.poloit.grupo12.inscripciones.model.Mentor;
import com.poloit.grupo12.inscripciones.model.Ong;
import com.poloit.grupo12.inscripciones.repository.IRolRepository;
import com.poloit.grupo12.inscripciones.repository.IUsuarioRepository;
import com.poloit.grupo12.inscripciones.repository.ICredencialRepository;
import com.poloit.grupo12.inscripciones.repository.IProyectoRepository;
import com.poloit.grupo12.inscripciones.repository.ICursoRepository;
import com.poloit.grupo12.inscripciones.repository.IMentorRepository;
import com.poloit.grupo12.inscripciones.repository.IOngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private IRolRepository rolRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    private ICredencialRepository credencialRepository;

    @Autowired
    private IProyectoRepository proyectoRepository;

    @Autowired
    private ICursoRepository cursoRepository;

    @Autowired
    private IMentorRepository mentorRepository;

    @Autowired
    private IOngRepository ongRepository;

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

        // Crear usuarios si no existen
        if (!usuarioRepository.existsById(1L)) {
            Usuario adminUser = new Usuario("Flavio", "Salas", "flaviosalas050@gmail.com", new Date(),
                    rolRepository.findById(1L).orElse(null));
            usuarioRepository.save(adminUser);

            Credencial adminCred = new Credencial("admin_user", "admin_pass", adminUser);
            credencialRepository.save(adminCred);
        }

        if (!usuarioRepository.existsById(2L)) {
            Usuario user1 = new Usuario("Federico", "Buen", "fdbuen@gmail.com", new Date(),
                    rolRepository.findById(1L).orElse(null));
            usuarioRepository.save(user1);

            Credencial user1Cred = new Credencial("fede_user", "fede_pass", user1);
            credencialRepository.save(user1Cred);
        }

        if (!usuarioRepository.existsById(3L)) {
            Usuario user2 = new Usuario("Fernando", "Utizi", "fer.utizi@gmail.com", new Date(),
                    rolRepository.findById(1L).orElse(null));
            usuarioRepository.save(user2);

            Credencial user2Cred = new Credencial("fer_user", "fer_pass", user2);
            credencialRepository.save(user2Cred);
        }

        // Crear un nuevo proyecto
        if (!proyectoRepository.existsById(1L)) {
            Proyecto proyecto = new Proyecto();
            proyecto.setNombre("TechPioneers");
            proyecto.setDescripcion("Plataforma que enseña desarrollo web moderno, desde HTML/CSS hasta frameworks avanzados como React y Node.js.");
            proyecto.setUrl("https://www.gstatic.com/mobilesdk/240501_mobilesdk/firebase_28dp.png");
            proyecto.setFechaCreacion(new Date());

            proyectoRepository.save(proyecto);
        }

        // Crear un curso de React
        if (!cursoRepository.existsById(1L)) {
            Curso curso = new Curso();
            curso.setTitulo("Introducción a IA");
            curso.setDescripcion("Un curso completo de React que cubre los fundamentos hasta técnicas avanzadas.");
            curso.setUrl("https://www.codingdojo.la/wp-content/uploads/2022/07/react.jpg");
            curso.setLenguaje("Python");
            curso.setDuracion(8);
            curso.setSemanal(2); // Cambia el valor a un número en lugar de un booleano
            curso.setFechaInicio(new Date());
            curso.setFechaFin(new Date()); // Ajusta la fecha de fin según sea necesario
            curso.setCategoria("Python"); // Nuevo campo

            // Asignar la ONG al curso
            Ong ong = ongRepository.findById(1L).orElseGet(() -> {
                Ong newOng = new Ong();
                newOng.setNombre("ONG Test");
                newOng.setDescripcion("Descripción de prueba para la ONG.");
                newOng.setEmail("contacto@ongtest.org");
                ongRepository.save(newOng);
                return newOng;
            });

            curso.setOng(ong);

            // Asignar el mentor al curso
            Usuario mentorUser = usuarioRepository.findById(1L).orElseGet(() -> {
                Usuario newMentorUser = new Usuario("Juan", "Pérez", "juan.perez@example.com", new Date(), null);
                usuarioRepository.save(newMentorUser);
                return newMentorUser;
            });

            Mentor mentor = new Mentor();
            mentor.setUsuario(mentorUser);
            mentorRepository.save(mentor);

            curso.setMentor(mentor);

            cursoRepository.save(curso);
        }

        // Crear un nuevo Mentor
        Usuario usuario = usuarioRepository.findById(1L).orElseGet(() -> {
            Usuario newUser = new Usuario("Juan", "Pérez", "juan.perez@example.com", new Date(), null);
            usuarioRepository.save(newUser);
            return newUser;
        });

        if (!mentorRepository.existsById(1L)) {
            Mentor mentor = new Mentor();
            mentor.setId(1L); // Establecer el ID si es necesario; en general se genera automáticamente
            mentor.setUsuario(usuario);

            mentorRepository.save(mentor);
        }

        // Crear una nueva ONG
        if (!ongRepository.existsById(1L)) {
            Ong ong = new Ong();
            ong.setId(1L); // Establecer el ID si es necesario; en general se genera automáticamente
            ong.setNombre("ONG Test");
            ong.setDescripcion("Descripción de prueba para la ONG.");
            ong.setEmail("contacto@ongtest.org");

            ongRepository.save(ong);
        }
    }
}
