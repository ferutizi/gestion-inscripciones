package com.poloit.grupo12.inscripciones.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Credencial {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Long id;
    private String user;
    private String pass;
    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    public Credencial(String user, String pass, Usuario usuario) {
        this.user = user;
        this.pass = pass;
        this.usuario = usuario;
    }
}
