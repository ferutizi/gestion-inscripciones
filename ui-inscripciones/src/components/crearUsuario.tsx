import React, { useState } from 'react';
import { Button, Container, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'; 
import api from '../utils/axiosConfig';

interface UsuarioDTO {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  rol: string;
  password: string;
}

const CrearUsuario: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<UsuarioDTO>({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    rol: 'VISITANTE',
    password: 'Arbol2024!'
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      fechaNacimiento: '',
      rol: 'VISITANTE',
      password: 'Arbol2024!'
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreate = async () => {
    try {
      await api.post('/api/usuario/crear', formData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error creating usuario:', error);
    }
  };

  return (
    <Container sx={{ marginTop: '0' }}>
      <Button
        sx={{ borderRadius: "8px", boxShadow: "none"}}
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />} 
        onClick={handleOpenDialog}
      >
        Nuevo Usuario
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Crear Usuario</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
          >
            <MenuItem value="ADMINISTRADOR">ADMINISTRADOR</MenuItem>
            <MenuItem value="VISITANTE">VISITANTE</MenuItem>
            <MenuItem value="MENTOR">MENTOR</MenuItem>
            <MenuItem value="ESTUDIANTE">ESTUDIANTE</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreate} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CrearUsuario;
