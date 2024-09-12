package com.poloit.grupo12.inscripciones.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UsuarioDTO {

    private Long Id;
    private String nombre;
    private String apellido;
    private String email;
    private Date fechaNacimiento;
    private Long rolId;
    private String rolDescripcion;

}
