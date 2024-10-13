import { useEffect, useState } from 'react';
import axios from 'axios';
//import { useParams } from 'react-router-dom';
import api from '../utils/axiosConfig';
import DeleteIcon from '@mui/icons-material/Delete';

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
  SelectChangeEvent 
} from '@mui/material';

interface Estudiante {
  idEstudiante: string;
  nombreEstudiante: string;
  tituloCurso: string;
  idCurso: string; 
}

const EstudiantesEdit = () => {
//  const { idCurso } = useParams<{ idCurso: string }>(); 
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]); 
  const [cursos, setCursos] = useState<any[]>([]); 
  const [, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const [page, ] = useState(1); 
  const [pageSize, ] = useState(10); 
  const [, setTotalPages] = useState<number>(0); 
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>(''); 
  

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
      console.log("Estudiantes del curso seleccionado", response.data.content)
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

  const handleDeleteEstudiante = async (idEstudiante: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este estudiante?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/inscripcion/curso/borrar/${cursoSeleccionado}/${idEstudiante}`);
      setEstudiantes((prevEstudiantes) => prevEstudiantes.filter((estudiante) => estudiante.idEstudiante !== idEstudiante));
      alert('Estudiante eliminado con éxito');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('Error desconocido al eliminar');
      }
    }
  };

  return (
    <div>
        <Container sx={{ marginTop: '4rem' }}>
            <Box sx={{ display: "flex", alignItems: "center"}}>
            <Typography variant="body1" sx={{ mr: 1 }}>
            Buscar:
          </Typography>
            <FormControl style={{maxWidth: 300}}
  sx={{
    width: '100%', 
    '& .MuiInputBase-root': {
      backgroundColor: 'white', 
      border: 'none !important', 
      borderRadius: '8px', 
      padding: '10px',
    },
    '& .MuiInputLabel-root': {
      backgroundColor: 'white', 
      padding: '0 4px', 
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
      padding: '10px', 
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

      <TableContainer component={Paper} style={{ overflowY: 'auto', borderRadius: "8px", border: "none", boxShadow: "none", marginTop: "1rem" }}>

        <Table>
          <TableHead>
          <TableRow sx={{
              "& th": {
                color: "rgba(96, 96, 96)",
                backgroundColor: "#d3d8de"
              }
            }}>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre Estudiante</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Curso</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estudiantes.map((estudiante) => (
              <TableRow key={estudiante.idEstudiante}>
                <TableCell>{estudiante.nombreEstudiante}</TableCell>
                <TableCell>{estudiante.tituloCurso}</TableCell>
                <TableCell>
                <IconButton onClick={() => handleDeleteEstudiante(estudiante.idEstudiante)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </div>
  );
};

export default EstudiantesEdit;
