package com.poloit.grupo12.inscripciones.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OngDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    // private *imagen* logo;
    private String email;
}
