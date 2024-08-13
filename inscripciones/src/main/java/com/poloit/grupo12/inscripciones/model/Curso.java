package com.poloit.grupo12.inscripciones.model;

import jakarta.persistence.*;

import java.util.Set;

public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "curso_seq")
    @SequenceGenerator(name = "curso_seq", sequenceName = "curso_seq")
    private Long id;

    private String nombre;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "mentor_id", referencedColumnName = "id")
    private Mentor mentor;

    @OneToMany(mappedBy = "curso")
    private Set<Inscripcion> inscripcions;

    public Curso(String nombre, String descripcion, Mentor mentor) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.mentor = mentor;
    }
}
