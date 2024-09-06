package com.poloit.grupo12.inscripciones.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mentor_seq")
    @SequenceGenerator(name = "mentor_seq", sequenceName = "mentor_seq", allocationSize = 1)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
