import React, { useState, useEffect } from 'react';
import { Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../utils/axiosConfig';


interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  rol: string;
  rolDescripcion: string;
}

const EditarUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<Omit<Usuario, 'id'>>({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    rol: 'VISITANTE',
    rolDescripcion: ''
  });

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/api/usuario/listar');
      setUsuarios(response.data.content);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleOpenDialog = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setFormData({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      fechaNacimiento: usuario.fechaNacimiento,
      rol: usuario.rol,
      rolDescripcion: usuario.rolDescripcion
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUsuario(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = async () => {
    if (selectedUsuario) {
      try {
        await api.put(`/api/usuario/editar/${selectedUsuario.id}`, {
          ...formData,
          id: selectedUsuario.id
        });
        await fetchUsuarios();
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating usuario:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/usuario/borrar/${id}`);
      await fetchUsuarios();
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  };

  return (
    <Container sx={{ marginTop: '4rem' }}>
      <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
        Editar Usuarios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map(usuario => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{new Date(usuario.fechaNacimiento).toLocaleDateString()}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(usuario)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(usuario.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Editar Usuario</DialogTitle>
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
          <Button onClick={handleEdit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditarUsuarios;
