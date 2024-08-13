package com.poloit.grupo12.inscripciones.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "estudiante_seq")
    @SequenceGenerator(name = "estudiante_seq", sequenceName = "estudiante_seq", allocationSize = 1)
    private Long id;

    private String nombre;
    private String apellido;

    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany (mappedBy = "estudiantes")
    private Set<Inscripcion> inscripciones;

    public Estudiante(String nombre, String apellido, String email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
}
