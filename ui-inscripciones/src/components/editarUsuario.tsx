import React, { useState, useEffect } from 'react';
import {
  Button, Box, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, InputAdornment, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CrearUsuario from './crearUsuario';
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
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [page, setPage] = useState<number>(1);
  const [pageSize, ] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [noResultsDialogOpen, setNoResultsDialogOpen] = useState(false);


  const fetchUsuarios = async (nombre: string = '', page: number = 1, size: number = 5) => {
    try {
      const endpoint = nombre ? `/api/usuario/buscar/${nombre}` : `/api/usuario/listar`;
      const response = await api.get(endpoint, {
        params: {
          page: page - 1, 
          size,
        },
      });
      setUsuarios(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (nombre) {
        console.error('Error al buscar los proyectos con el nombre especificado', error);
        setNoResultsDialogOpen(true); // Abrir el diálogo si no hay resultados
      } else {
        console.error('Error al listar todos los proyectos', error);
      }
    }
  };

  useEffect(() => {
    fetchUsuarios('', page, pageSize);
  }, [page, pageSize]);

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

  const handleNoResultsDialogClose = () => {
    setNoResultsDialogOpen(false);
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
        await fetchUsuarios(searchTerm, page, pageSize);
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating usuario:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/usuario/borrar/${id}`);
      await fetchUsuarios(searchTerm, page, pageSize);
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  };

  const handleSearch = () => {
    setPage(1); 
    fetchUsuarios(searchTerm, 1, pageSize);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      fetchUsuarios('', 1, pageSize);
    }
  };

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
};

  return (
    <Container sx={{ marginTop: '4rem' }}>

<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: "1rem "}}>
      

      <Box display="flex" alignItems="center" mb={0}>
      <Typography variant="body1" sx={{ mr: 1 }}>
        Buscar:
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Ingrese el nombre del usuario"
        value={searchTerm}
        onChange={handleSearchInputChange}
        InputProps={{
          sx: { 
            borderRadius: "8px", 
            backgroundColor: "white", 
            border: 'none', 
            boxShadow: 'none'
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          sx: {
            marginLeft: "1rem",
            color: "#b3bdbb",
            transition: "0.3s ease"
          },
          shrink: searchTerm.length > 0,
        }}
        sx={{
          width: '300px', 
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '&:focus-within .MuiInputLabel-root': {
            display: 'none'
          },
          '&:hover .MuiInputLabel-root': {
            display: searchTerm.length > 0 ? 'none' : 'block'
          }
        }}
      />
    </Box>

    <Box>
      <CrearUsuario />
    </Box>

    </Box>



    <TableContainer component={Paper} style={{ overflowY: 'auto', borderRadius: "8px", border: "none", boxShadow: "none" }}>
      <Table stickyHeader sx={{ padding: "0rem" }}>
        <TableHead>
          <TableRow sx={{
            "& th": {
              color: "rgba(96, 96, 96)",
              backgroundColor: "#d3d8de"
            }
          }}>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Correo Electrónico</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Rol</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map(usuario => (
              <TableRow key={usuario.id} sx={{
                transition: "background-color 0.3s ease", 
                '&:hover': {
                  backgroundColor: '#f0f0f0', 
                },
                cursor: 'pointer', 
              }}>
                <TableCell sx={{fontWeight: "bold"}}>{`${usuario.nombre} ${usuario.apellido}`}</TableCell>
                <TableCell>{usuario.email}</TableCell>
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

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary"
        />
      </Box>

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

      <Dialog open={noResultsDialogOpen} onClose={handleNoResultsDialogClose}>
        <DialogTitle sx={{textAlign: "center", fontWeight: "bold"}}>No se encontraron resultados</DialogTitle>
        <DialogContent>
          <Typography sx={{textAlign: "center"}}>No se encontraron usuarios con el nombre ingresado. Por favor, intente con otro término de búsqueda.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoResultsDialogClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>


    </Container>
  );
};

export default EditarUsuarios;
