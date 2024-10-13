import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CrearProyectos from './crearProyectos';
import api from '../utils/axiosConfig';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  url: string;
  fechaCreacion: string;
}

const EditarProyectos: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [editProject, setEditProject] = useState<Proyecto | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, ] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchProyectos();
  }, [page, pageSize]);

  const fetchProyectos = async () => {
    try {
      const response = await api.get('/api/proyecto/listar', {
        params: {
          page: page - 1,
          size: pageSize,
        },
      });
      setProyectos(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error al obtener los proyectos', error);
    }
  };

  const handleEdit = (proyecto: Proyecto) => {
    setEditProject(proyecto);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/proyecto/borrar/${id}`);
      fetchProyectos();
    } catch (error) {
      console.error('Error al eliminar el proyecto', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditProject(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editProject) {
      setEditProject({ ...editProject, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (editProject) {
      try {
        await api.put(`/api/proyecto/editar/${editProject.id}`, editProject);
        fetchProyectos();
        handleClose();
      } catch (error) {
        console.error('Error al actualizar el proyecto', error);
      }
    }
  };

  return (
    <Container sx={{ marginTop: '4rem' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "1rem" }}>
        <Box display="flex" alignItems="center" mb={0}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Buscar:
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Ingrese el nombre del proyecto"
            InputProps={{
              sx: {
                borderRadius: "8px",
                backgroundColor: "white",
                border: 'none',
                boxShadow: 'none'
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: '300px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
            }}
          />
        </Box>

        <Box>
          <CrearProyectos />
        </Box>
      </Box>

      <TableContainer component={Paper} style={{ overflowY: 'auto', borderRadius: "8px", border: "none", boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow sx={{
              "& th": {
                color: "rgba(96, 96, 96)",
                backgroundColor: "#d3d8de"
              }
            }}>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proyectos.map((proyecto) => (
              <TableRow key={proyecto.id}>
                <TableCell sx={{ fontWeight: "bold" }}>{proyecto.nombre}</TableCell>
                <TableCell>{proyecto.descripcion}</TableCell>
   
                <TableCell>
                  <IconButton onClick={() => handleEdit(proyecto)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(proyecto.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
        sx={{ marginTop: "1rem", display: 'flex', justifyContent: 'center' }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Proyecto</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            name="nombre"
            value={editProject?.nombre || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            value={editProject?.descripcion || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          />
          <TextField
            margin="dense"
            label="URL"
            name="url"
            value={editProject?.url || ''}
            onChange={handleChange}
            fullWidth
            disabled
            sx={{ mb: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditarProyectos;
