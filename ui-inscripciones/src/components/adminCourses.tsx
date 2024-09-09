import React, { useState, useEffect } from 'react';
import {
  Button, Container, TextField, MenuItem, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import axios from 'axios';
import UploadWidget from '../components/uploadWidget';  // Importar el componente UploadWidget
import CoursesEdit from './coursesEdit';

//ARCHIVO DE PRUEBA, SIN USOS PERO NO BORRAR

const AdminCourses: React.FC = () => {
  const [mentores, setMentores] = useState<{ id: number; nombreCompleto: string }[]>([]);
  const [ongs, setOngs] = useState<{ id: number; nombre: string }[]>([]);
  const [curso, setCurso] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    url: '', // Aquí se guardará la URL de la imagen
    lenguaje: '',
    duracion: '',
    semanal: '',
    fechaInicio: '',
    fechaFin: '',
    ongId: '',
    mentorId: '',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Estado para la URL de la imagen cargada
  const [isFormValid, setIsFormValid] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar la apertura del diálogo

  // Fetch Mentores
  useEffect(() => {
    const fetchMentores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mentor/listar');
        if (response.data && response.data.content) {
          setMentores(
            response.data.content.map((mentor: { id: number; nombreUsuario: string; apellidoUsuario: string }) => ({
              id: mentor.id,
              nombreCompleto: `${mentor.nombreUsuario} ${mentor.apellidoUsuario}`,
            }))
          );
        } else if (response.data) {
          setMentores(
            response.data.map((mentor: { id: number; nombreUsuario: string; apellidoUsuario: string }) => ({
              id: mentor.id,
              nombreCompleto: `${mentor.nombreUsuario} ${mentor.apellidoUsuario}`,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching mentores:', error);
      }
    };

    fetchMentores();
  }, []);

  // Fetch ONGs
  useEffect(() => {
    const fetchOngs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ong/listar');
        if (response.data && response.data.content) {
          setOngs(
            response.data.content.map((ong: { id: number; nombre: string }) => ({
              id: ong.id,
              nombre: ong.nombre,
            }))
          );
        } else if (response.data) {
          setOngs(
            response.data.map((ong: { id: number; nombre: string }) => ({
              id: ong.id,
              nombre: ong.nombre,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching ONGs:', error);
      }
    };

    fetchOngs();
  }, []);

  // Validación del formulario
  useEffect(() => {
    const isValid = Object.values(curso).every((value) => value !== '');
    setIsFormValid(isValid);
  }, [curso]);

  // Manejar cambios en el formulario
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurso({
      ...curso,
      [event.target.name]: event.target.value,
    });
  };

  // Función para manejar la URL de la imagen cargada
  const handleImageUpload = (url: string | null) => {
    setImageUrl(url);
    setCurso({ ...curso, url: url || '' }); // Actualizar la URL en el curso
  };

  // Enviar datos del formulario
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/curso/crear', curso);
      console.log('Curso creado:', response.data);
      alert('Curso creado exitosamente');
      setOpenDialog(false); // Cerrar el diálogo tras crear el curso
    } catch (error) {
      console.error('Error al crear el curso:', error);
      alert('Error al crear el curso');
    }
  };

  // Funciones para abrir y cerrar el diálogo
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Cursos
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Crear un nuevo curso
      </Button>

      {/* Dialogo para crear el curso */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Crear Nuevo Curso</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            name="titulo"
            value={curso.titulo}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Descripción"
            name="descripcion"
            value={curso.descripcion}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            select
            label="Categoría"
            name="categoria"
            value={curso.categoria}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            <MenuItem value="Ui/Ux">Ui/Ux</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="HTML/CSS">HTML/CSS</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
          </TextField>

          <UploadWidget onUploadComplete={handleImageUpload} />

          {imageUrl && (
            <Box mt={2}>
              <Typography variant="subtitle1">Imagen cargada:</Typography>
              <img src={imageUrl} alt="Uploaded" width="300" />
            </Box>
          )}

          <TextField
            label="URL"
            name="url"
            value={curso.url}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            disabled // Deshabilita el campo para que no sea editable
          />

          <TextField
            select
            label="Lenguaje"
            name="lenguaje"
            value={curso.lenguaje}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
            <MenuItem value="PHP">PHP</MenuItem>
          </TextField>

          <TextField
            select
            label="Duración (semanas)"
            name="duracion"
            value={curso.duracion}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            <MenuItem value="4">4 semanas</MenuItem>
            <MenuItem value="8">8 semanas</MenuItem>
            <MenuItem value="12">12 semanas</MenuItem>
          </TextField>

          <TextField
            select
            label="Días por semana"
            name="semanal"
            value={curso.semanal}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            <MenuItem value="1">1 día</MenuItem>
            <MenuItem value="2">2 días</MenuItem>
            <MenuItem value="3">3 días</MenuItem>
          </TextField>

          <TextField
            label="Fecha de Inicio"
            name="fechaInicio"
            value={curso.fechaInicio}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Fecha de Fin"
            name="fechaFin"
            value={curso.fechaFin}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            select
            label="ONG"
            name="ongId"
            value={curso.ongId}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            {ongs.map((ong) => (
              <MenuItem key={ong.id} value={ong.id}>
                {ong.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Mentor"
            name="mentorId"
            value={curso.mentorId}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            {mentores.map((mentor) => (
              <MenuItem key={mentor.id} value={mentor.id}>
                {mentor.nombreCompleto}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleSubmit} color="primary" disabled={!isFormValid}>Crear Curso</Button>
        </DialogActions>
      </Dialog>

      <CoursesEdit />
    </Container>
  );
};

export default AdminCourses;
