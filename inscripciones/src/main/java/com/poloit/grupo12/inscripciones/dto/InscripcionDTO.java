package com.poloit.grupo12.inscripciones.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class InscripcionDTO {
    private Long id;
    private Long estudianteId;
    private Long cursoId;
    private LocalDate fechaInscripcion;
    private String estado;
}
