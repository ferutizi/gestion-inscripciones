import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TableContainer,
  Paper,
  InputAdornment,
  Pagination,
  Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CrearCurso from './crearCurso';
import api from '../utils/axiosConfig';

interface CursoDTO {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  url: string;
  lenguaje: string;
  duracion: string;
  semanal: string;
  fechaInicio: string;
  fechaFin: string;
  ongId: string;
  mentorId: string;
}

const CoursesEdit: React.FC = () => {
  const [cursos, setCursos] = useState<CursoDTO[]>([]);
  const [editCourse, setEditCourse] = useState<CursoDTO | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false); // Estado para el diálogo de confirmación
  const [cursoAEliminar, setCursoAEliminar] = useState<number | null>(null); // Estado para el curso a eliminar
  const [mentores, setMentores] = useState<{ id: number; nombreCompleto: string }[]>([]);
  const [ongs, setOngs] = useState<{ id: number; nombre: string }[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, ] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [noResultsDialogOpen, setNoResultsDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false); // Estado para el diálogo de error

  useEffect(() => {
    fetchCursos();
    fetchMentores();
    fetchOngs();
  }, [page, pageSize]);

  const fetchCursos = async (nombre: string = '', page: number = 1, size: number = 5) => {
    try {
      const endpoint = nombre ? `/api/curso/buscar/${nombre}` : `/api/curso/listar`;
      const response = await api.get(endpoint, {
        params: {
          page: page - 1, 
          size,
        },
      });
      setCursos(response.data.content);
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

  const fetchMentores = async () => {
    try {
      const response = await api.get('/api/usuario/listar');
      if (response.data && response.data.content) {
        const mentoresFiltrados = response.data.content.filter(
          (usuario: { rol: string }) => usuario.rol === 'MENTOR'
        );
        setMentores(
          mentoresFiltrados.map((mentor: { id: number; nombre: string; apellido: string }) => ({
            id: mentor.id,
            nombreCompleto: `${mentor.nombre} ${mentor.apellido}`,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const fetchOngs = async () => {
    try {
      const response = await api.get('/api/ong/listar');
      setOngs(response.data.content.map((ong: any) => ({
        id: ong.id,
        nombre: ong.nombre,
      })));
    } catch (error) {
      console.error('Error al obtener ONGs', error);
    }
  };

  const handleEdit = (course: CursoDTO) => {
    setEditCourse(course);
    setOpen(true);
  };

  const handleDeleteOpen = (id: number) => {
    setCursoAEliminar(id); // Guardar el curso a eliminar
    setConfirmDeleteDialogOpen(true); // Abrir el diálogo de confirmación
  };

  const handleDeleteConfirm = async () => {
    if (cursoAEliminar) {
      try {
        await api.delete(`/api/curso/borrar/${cursoAEliminar}`);
        fetchCursos();
      } catch (error) {
        console.error('Error al eliminar el curso', error);
        setErrorDialogOpen(true); // Mostrar diálogo de error si la eliminación falla
      }
    }
    setConfirmDeleteDialogOpen(false); // Cerrar el diálogo de confirmación
  };

  const handleClose = () => {
    setOpen(false);
    setEditCourse(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editCourse) {
      setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (editCourse) {
      try {
        await api.put(`/api/curso/editar/${editCourse.id}`, editCourse);
        fetchCursos();
        handleClose();
      } catch (error) {
        console.error('Error al actualizar el curso', error);
      }
    }
  };

  const handleSearch = () => {
    setPage(1); 
    fetchCursos(searchTerm, 1, pageSize);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      fetchCursos('', 1, pageSize);
    }
  };

  const handleNoResultsDialogClose = () => {
    setNoResultsDialogOpen(false);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };

  return (
    <Container sx={{ marginTop: '4rem' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "1rem " }}>
        <Box display="flex" alignItems="center" mb={0}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Buscar:
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Ingrese el nombre del curso"
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
              }
            }}
          />
        </Box>
        <Box>
          <CrearCurso />
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
              <TableCell sx={{ fontWeight: "bold" }}>Título</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Lenguaje</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell sx={{ fontWeight: "bold" }}>{curso.titulo}</TableCell>
                <TableCell>{curso.descripcion}</TableCell>
                <TableCell>{curso.lenguaje}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(curso)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton  color="secondary" onClick={() => handleDeleteOpen(curso.id)}>
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
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} 
      />

      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center"}}>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: "center"}}>¿Estás seguro de que deseas eliminar este curso?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={noResultsDialogOpen}
        onClose={handleNoResultsDialogClose}
      >
        <DialogTitle>No se encontraron resultados</DialogTitle>
        <DialogContent>
          <Typography>No se encontraron cursos con el nombre especificado.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoResultsDialogClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={errorDialogOpen}
        onClose={handleErrorDialogClose}
      >
        <DialogTitle sx={{textAlign: "center", fontWeight: "bold"}}>Error al Eliminar Curso</DialogTitle>
        <DialogContent>
          <Typography sx={{textAlign: "center"}}>No se pudo eliminar el curso. Por favor, inténtelo más tarde.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>


      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Curso</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            value={editCourse?.titulo || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            value={editCourse?.descripcion || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          />
          <TextField
            select
            label="Categoría"
            name="categoria"
            value={editCourse?.categoria || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          >
            <MenuItem value="Ui/Ux">Ui/Ux</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="HTML/CSS">HTML/CSS</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Lenguaje"
            name="lenguaje"
            value={editCourse?.lenguaje || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          />
          <TextField
            select
            label="Días por semana"
            name="semanal"
            value={editCourse?.semanal || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          >
            <MenuItem value="1">1 día</MenuItem>
            <MenuItem value="2">2 días</MenuItem>
            <MenuItem value="3">3 días</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Fecha de Inicio"
            name="fechaInicio"
            type="date"
            value={editCourse?.fechaInicio || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Fecha de Fin"
            name="fechaFin"
            type="date"
            value={editCourse?.fechaFin || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Mentor"
            name="mentorId"
            value={editCourse?.mentorId || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          >
            {mentores.map((mentor) => (
              <MenuItem key={mentor.id} value={mentor.id}>
                {mentor.nombreCompleto}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="ONG"
            name="ongId"
            value={editCourse?.ongId || ''}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
          >
            {ongs.map((ong) => (
              <MenuItem key={ong.id} value={ong.id}>
                {ong.nombre}
              </MenuItem>
            ))}
          </TextField>
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


      <Dialog open={noResultsDialogOpen} onClose={handleNoResultsDialogClose}>
        <DialogTitle sx={{textAlign: "center", fontWeight: "bold"}}>No se encontraron resultados</DialogTitle>
        <DialogContent>
          <Typography sx={{textAlign: "center"}}>No se encontraron cursos con el nombre ingresado. Por favor, intente con otro término de búsqueda.</Typography>
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

export default CoursesEdit;
