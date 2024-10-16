import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../utils/axiosConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

interface Estudiante {
  idEstudiante: string;
  nombreEstudiante: string;
  tituloCurso: string;
  idCurso: string; 
  estado: string;
  calificacion: number;
  fechaInscripcion: string;
}

const EstudiantesEdit = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]); 
  const [cursos, setCursos] = useState<any[]>([]); 
  const [, setLoading] = useState(true);
  const [page, ] = useState<number>(1);
  const [pageSize, ] = useState<number>(5);
  const [, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null); 
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>(''); 
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState<Estudiante | null>(null);
  const [estudianteToDelete, setEstudianteToDelete] = useState<string | null>(null);

  useEffect(() => {
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

    fetchCourses();
  }, [page, pageSize]);

  const fetchEstudiantes = async (cursoId: string) => {
    setLoading(true); 
    try {
      const response = await api.get(`/api/inscripcion/curso/listar/estudiantes/${cursoId}`);
      setEstudiantes(response.data.content);
      console.log("Estudiantes del curso seleccionado", response.data.content);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleCursoChange = (event: SelectChangeEvent<string>) => {
    const selectedCurso = event.target.value as string;
    setCursoSeleccionado(selectedCurso);
    fetchEstudiantes(selectedCurso);
  };

  const handleEditEstudiante = (estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedEstudiante(null);
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false);
    setEstudianteToDelete(null);
  };

  const handleSave = async () => {
    if (!selectedEstudiante) return;

    try {
      await api.put(`/api/inscripcion/curso/editar`, {
        idEstudiante: selectedEstudiante.idEstudiante,
        idCurso: selectedEstudiante.idCurso,
        estado: selectedEstudiante.estado,
        calificacion: selectedEstudiante.calificacion,
        fechaInscripcion: selectedEstudiante.fechaInscripcion,
      });
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.map((e) =>
          e.idEstudiante === selectedEstudiante.idEstudiante ? selectedEstudiante : e
        )
      );
      setOpenDialog(false);
    } catch (error) {
      console.error('Error al editar el estudiante', error);
    }
  };

  const handleDeleteEstudiante = (idEstudiante: string) => {
    setEstudianteToDelete(idEstudiante);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (!estudianteToDelete) return;

    try {
      await api.delete(`/api/inscripcion/curso/borrar/${cursoSeleccionado}/${estudianteToDelete}`);
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.filter((estudiante) => estudiante.idEstudiante !== estudianteToDelete)
      );
      setOpenConfirmDialog(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('Error desconocido al eliminar');
      }
    }
  };

  const handleEstadoChange = (event: SelectChangeEvent<string>) => {
    if (selectedEstudiante) {
      setSelectedEstudiante({ ...selectedEstudiante, estado: event.target.value });
    }
  };

  const handleCalificacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedEstudiante) {
      setSelectedEstudiante({ ...selectedEstudiante, calificacion: Number(event.target.value) });
    }
  };

  return (
    <div>
      <Container sx={{ marginTop: '4rem' }}>
            <Box sx={{ display: "flex", alignItems: "center", alignContent: "center"}}>
            <Typography variant="body1" sx={{ mr: 0}}>
            
          </Typography>
            <FormControl style={{maxWidth: 300}}
  sx={{
    width: '100%', 
    '& .MuiInputBase-root': {
      backgroundColor: 'white', 
      border: 'none !important', 
      borderRadius: '8px', 
      padding: '10px',
      marginBottom: "1rem"
    },
    '& .MuiInputLabel-root': {
      backgroundColor: 'white', 
      padding: '0 4px', 
    },
    '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
  }}
>
<InputLabel shrink={false}>
  {cursoSeleccionado ? cursos.find(curso => curso.id === cursoSeleccionado)?.titulo : 'Selecciona un curso'}
</InputLabel>
<Select
  labelId="curso-select-label"
  value={cursoSeleccionado}
  onChange={handleCursoChange}
  displayEmpty 
  sx={{
    border: "none",
    '& .MuiSelect-select': {
      padding: '6px', 
    },
  }}
>

  {cursos.map((curso) => (
    <MenuItem key={curso.id} value={curso.id}>
      {curso.titulo}
    </MenuItem>
  ))}
</Select>

</FormControl>


      </Box>

        {error && <Typography color="error">{error}</Typography>}

        <TableContainer component={Paper} style={{ overflowY: 'auto', borderRadius: "8px", border: "none", boxShadow: "none" }}>
        <Table>
            <TableHead>
            <TableRow sx={{
              "& th": {
                color: "rgba(96, 96, 96)",
                backgroundColor: "#d3d8de"
              }
            }}>
                <TableCell sx={{ fontWeight: "bold" }}>Nombre del Alumno</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Curso</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Calificación</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estudiantes.map((estudiante) => (
                <TableRow key={estudiante.idEstudiante}>
                  <TableCell sx={{ fontWeight: "bold" }}>{estudiante.nombreEstudiante}</TableCell>
                  <TableCell>{estudiante.tituloCurso}</TableCell>
                  <TableCell>{estudiante.estado}</TableCell>
                  <TableCell>{estudiante.calificacion}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditEstudiante(estudiante)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteEstudiante(estudiante.idEstudiante)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{fontWeight: "bold", paddingBottom: "0rem", textAlign: "center"}}>Editar Estudiante</DialogTitle>
        <DialogTitle sx={{fontWeight: "bold", paddingTop: "0rem", textAlign: "center"}}>{selectedEstudiante?.nombreEstudiante}</DialogTitle>
          <DialogContent sx={{ '.MuiDialogContent-root&.MuiDialogContent-root': { pt: 1 } }}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Estado</InputLabel>
              <Select value={selectedEstudiante?.estado || ''} onChange={handleEstadoChange} label="Estado">
                <MenuItem value="INSCRIPTO">INSCRIPTO</MenuItem>
                <MenuItem value="APROBADO">APROBADO</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Calificación" type="number" fullWidth value={selectedEstudiante?.calificacion || ''} onChange={handleCalificacionChange} inputProps={{ min: 0, max: 10 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">Cancelar</Button>
            <Button onClick={handleSave} color="primary">Guardar</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openConfirmDialog} onClose={handleConfirmDialogClose}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>¿Estás seguro de que deseas eliminar este estudiante?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDialogClose}>Cancelar</Button>
            <Button onClick={confirmDelete} color="secondary">Eliminar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default EstudiantesEdit;
