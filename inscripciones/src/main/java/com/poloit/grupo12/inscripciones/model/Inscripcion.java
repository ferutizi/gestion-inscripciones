package com.poloit.grupo12.inscripciones.model;


import jakarta.persistence.*;

public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inscripcion_seq")
    @SequenceGenerator(name = "inscripcion_seq", sequenceName = "inscripcion_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "curso_id", referencedColumnName = "id")
    private Curso curso;

    @ManyToOne
    @JoinColumn(name = "estudiante_id", referencedColumnName = "id")
    private Estudiante estudiante;

    public Inscripcion(Curso curso, Estudiante estudiante) {
        this.curso = curso;
        this.estudiante = estudiante;
    }
}
