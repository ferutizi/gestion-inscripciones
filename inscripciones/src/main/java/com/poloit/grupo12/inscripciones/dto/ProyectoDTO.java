package com.poloit.grupo12.inscripciones.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProyectoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String url;
    private Date fechaCreacion;
}
