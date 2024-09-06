package com.poloit.grupo12.inscripciones.service.implementacion;

import com.poloit.grupo12.inscripciones.dto.UsuarioDTO;
import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.repository.IRolRepository;
import com.poloit.grupo12.inscripciones.repository.IUsuarioRepository;
import com.poloit.grupo12.inscripciones.service.interfaces.IUsuarioSevice;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class UsuarioService implements IUsuarioSevice {
    @Autowired
    private IUsuarioRepository usuarioRepository;
    @Autowired
    private IRolRepository rolRepository;

    @Override
    public Page<UsuarioDTO> findAll(Pageable pageable) {
        Page<Usuario> usuarios = usuarioRepository.findAll(pageable);
        return usuarios.map(this::convertToDto);
    }

    @Override
    public UsuarioDTO findById(Long id) {
        ModelMapper mapper = new ModelMapper();
        Optional<Usuario> optUsuario = usuarioRepository.findById(id);
        return optUsuario.map(this::convertToDto).orElse(null);
    }

    @Override
    public UsuarioDTO save(UsuarioDTO usuarioDTO) {
        ModelMapper mapper = new ModelMapper();
        Usuario usuario = mapper.map(usuarioDTO, Usuario.class);
        Rol rol = rolRepository.findById(usuarioDTO.getRolId()).orElse(null);
        if (rol != null) {
            usuario.setRol(rol);
            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            return convertToDto(nuevoUsuario);
        }
        return null;
    }

    @Override
    public UsuarioDTO update(Long id, UsuarioDTO usuarioDTO) {
        ModelMapper mapper = new ModelMapper();
        Usuario usuario = mapper.map(usuarioDTO, Usuario.class);
        usuario.setId(id);
        Rol rol = rolRepository.findById(usuarioDTO.getRolId()).orElse(null);
        if (rol != null) {
            usuario.setRol(rol);
            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            return convertToDto(nuevoUsuario);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    private UsuarioDTO convertToDto(Usuario usuario) {
        ModelMapper mapper = new ModelMapper();
        UsuarioDTO usuarioDTO = mapper.map(usuario, UsuarioDTO.class);
        usuarioDTO.setRolId(usuario.getRol().getId());
        usuarioDTO.setRolDescripcion(usuario.getRol().getDescripcion());
        return usuarioDTO;
    }
}