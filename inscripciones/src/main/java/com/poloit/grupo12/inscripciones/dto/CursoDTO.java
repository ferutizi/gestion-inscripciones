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
    private String categoria; // Nuevo campo

    private String url;
    private String lenguaje;
    private int duracion;
    private int semanal;  // Almacena como número

    private Date fechaInicio;
    private Date fechaFin;
    private Long ongId;
    private String ongNombre;
    private Long mentorId;
}
