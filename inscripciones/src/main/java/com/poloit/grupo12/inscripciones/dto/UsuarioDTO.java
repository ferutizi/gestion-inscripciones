package com.poloit.grupo12.inscripciones.dto;

import java.util.Date;


public class UsuarioDTO {

    private String nombre;
    private String apellido;
    private String email;
    private Date fechaNacimiento;
    private Long rolId;

    public UsuarioDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Long getRolId() {
        return rolId;
    }

    public void setRolId(Long rolId) {
        this.rolId = rolId;
    }

    public UsuarioDTO(String apellido, String nombre, String email, Date fechaNacimiento, Long rolId) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.rolId = rolId;
    }
}
