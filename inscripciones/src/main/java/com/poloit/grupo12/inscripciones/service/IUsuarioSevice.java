package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.model.Usuario;

public interface IUsuarioSevice {
    public Usuario save(Usuario usuario);
    public Usuario findByEmail(String email);
}
