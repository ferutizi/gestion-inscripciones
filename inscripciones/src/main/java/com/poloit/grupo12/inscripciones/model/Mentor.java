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
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mentor_seq")
    @SequenceGenerator(name = "mentor_seq", sequenceName = "mentor_seq", allocationSize = 1)
    private Long id;

    private String nombre;
    private String especialidad;

    @OneToMany (mappedBy = "mentor")
    private Set<Curso> cursos;

    public Mentor(String nombre, String especialidad) {
        this.nombre = nombre;
        this.especialidad = especialidad;
    }
}
