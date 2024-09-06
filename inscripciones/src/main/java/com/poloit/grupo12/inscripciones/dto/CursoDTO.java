package com.poloit.grupo12.inscripciones.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CursoDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Date fechaInicio;
    private Date fechaFin;
    private Long ongId;
    private String ongNombre;
    private Long mentorId;
    //ver la relacion entre tablas
    //private String usuarioNombre;
    //private String usuarioApellido;
}
