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
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // Estado para el diálogo de confirmación
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null); // ID del proyecto a eliminar
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [noResultsDialogOpen, setNoResultsDialogOpen] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  useEffect(() => {
    fetchProyectos();
  }, [page, pageSize]);

  const fetchProyectos = async (nombre: string = '', page: number = 1, size: number = 5) => {
    try {
      const endpoint = nombre ? `/api/proyecto/buscar/${nombre}` : `/api/proyecto/listar`;
      const response = await api.get(endpoint, {
        params: {
          page: page - 1, 
          size,
        },
      });
      setProyectos(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (nombre) {
        console.error('Error al buscar los proyectos con el nombre especificado', error);
        setNoResultsDialogOpen(true);
      } else {
        console.error('Error al listar todos los proyectos', error);
      }
    }
  };

  const handleEdit = (proyecto: Proyecto) => {
    setEditProject(proyecto);
    setOpen(true);
  };

  const handleDeleteOpen = (id: number) => {
    setProjectToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete !== null) {
      try {
        await api.delete(`/api/proyecto/borrar/${projectToDelete}`);
        fetchProyectos();
      } catch (error) {
        console.error('Error al eliminar el proyecto', error);
      } finally {
        setConfirmDeleteOpen(false);
        setProjectToDelete(null);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditProject(null);
  };

  const handleNoResultsDialogClose = () => {
    setNoResultsDialogOpen(false);
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

  const handleSearch = () => {
    setPage(1);
    fetchProyectos(searchTerm, 1, pageSize);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      fetchProyectos('', 1, pageSize);
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
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Ingrese el nombre del proyecto"
            InputProps={{
              sx: {
                borderRadius: "8px",
                backgroundColor: "white",
                border: 'none',
                boxShadow: 'none',
                
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
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
                  <IconButton onClick={() => handleDeleteOpen(proyecto.id)} color="secondary">
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

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center"}}>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: "center"}}>¿Estás seguro de que deseas eliminar este proyecto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={noResultsDialogOpen} onClose={handleNoResultsDialogClose}>
        <DialogTitle sx={{textAlign: 'center', fontWeight: "bold"}}>No se encontraron resultados</DialogTitle>
        <DialogContent>
          <Typography sx={{textAlign: "center"}}>No se encontraron proyectos que coincidan con la búsqueda. Por favor, intente con otro término de búsqueda.</Typography>
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

export default EditarProyectos;
