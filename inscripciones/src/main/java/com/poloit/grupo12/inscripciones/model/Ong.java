package com.poloit.grupo12.inscripciones.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ong {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ong_seq")
    @SequenceGenerator(name = "ong_seq", sequenceName = "ong_seq", allocationSize = 1)
    private Long id;
    private String nombre;
    private String descripcion;
    // private *imagen* logo;
    private String email;

    public Ong(String nombre, String descripcion, String email) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.email = email;
    }
}
