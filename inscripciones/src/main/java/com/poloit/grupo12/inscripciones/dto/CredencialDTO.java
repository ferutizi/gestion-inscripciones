package com.poloit.grupo12.inscripciones.dto;

import lombok.Data;

@Data
public class CredencialDTO {
    private Long id;
    private String user;
    private String pass;
    private Long usuarioId;
}
