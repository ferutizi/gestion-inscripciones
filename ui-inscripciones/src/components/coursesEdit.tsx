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
  const [mentores, setMentores] = useState<{ id: number; nombreCompleto: string }[]>([]);
  const [ongs, setOngs] = useState<{ id: number; nombre: string }[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, ] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchCourses();
    fetchMentores();
    fetchOngs();
  }, [page, pageSize]);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/api/curso/listar', {
        params: {
          page: page - 1, 
          size: pageSize,
        },
      });
      setCursos(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error al obtener los cursos', error);
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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/curso/borrar/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error al eliminar el curso', error);
    }
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
        fetchCourses();
        handleClose();
      } catch (error) {
        console.error('Error al actualizar el curso', error);
      }
    }
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
        placeholder="Ingrese el nombre del curso"
       // value={searchTerm}
        // onChange={handleSearchInputChange}
        InputProps={{
          sx: { 
            borderRadius: "8px", 
            backgroundColor: "white", 
            border: 'none', 
            boxShadow: 'none'
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton >
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
          //shrink: searchTerm.length > 0,
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
           // display: searchTerm.length > 0 ? 'none' : 'block'
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
                  <IconButton onClick={() => handleEdit(curso)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(curso.id)} color="secondary">
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
    </Container>
  );
};

export default CoursesEdit;
