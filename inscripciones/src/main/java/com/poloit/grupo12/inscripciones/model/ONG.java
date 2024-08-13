package com.poloit.grupo12.inscripciones.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ONG {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ong_seq")
    @SequenceGenerator(name = "ong_seq", sequenceName = "ong_seq", allocationSize = 1)
    private Long id;
    private String nombre;
    private String direccion;
    private String telefono;

    public ONG(String nombre, String direccion, String telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}
