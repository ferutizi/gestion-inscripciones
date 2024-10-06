import React, { useState, useEffect } from 'react';
import {
  Button, Container, TextField, MenuItem, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import UploadWidget from '../components/uploadWidget';
import api from '../utils/axiosConfig';

const CrearCurso: React.FC = () => {
  const [mentores, setMentores] = useState<{ id: number; nombreCompleto: string }[]>([]);
  const [ongs, setOngs] = useState<{ id: number; nombre: string }[]>([]);
  const [curso, setCurso] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    url: '', 
    lenguaje: '',
    duracion: '',
    semanal: '',
    fechaInicio: '',
    fechaFin: '',
    ongId: '',
    mentorId: '',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const [isFormValid, setIsFormValid] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); 

  useEffect(() => {
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

    fetchMentores();
  }, []);

  useEffect(() => {
    const fetchOngs = async () => {
      try {
        const response = await api.get('/api/ong/listar');
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

  useEffect(() => {
    const isValid = Object.values(curso).every((value) => value !== '');
    setIsFormValid(isValid);
  }, [curso]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurso({
      ...curso,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = (url: string | null) => {
    setImageUrl(url);
    setCurso({ ...curso, url: url || '' });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/api/curso/crear', curso);
      console.log('Curso creado:', response.data);
      alert('Curso creado exitosamente');
      setCurso({
        titulo: '',
        descripcion: '',
        categoria: '',
        url: '',
        lenguaje: '',
        duracion: '',
        semanal: '',
        fechaInicio: '',
        fechaFin: '',
        ongId: '',
        mentorId: '',
      });
      setImageUrl(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error al crear el curso:', error);
      alert('Error al crear el curso');
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Crear un nuevo curso
      </Button>

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
            disabled 
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!isFormValid}
          >
            Crear Curso
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CrearCurso;
