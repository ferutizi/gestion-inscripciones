import React, { useState, useEffect } from 'react';
import {
  Button, Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadWidget from '../components/uploadWidget'; 
import api from '../utils/axiosConfig';

const EditarCursos: React.FC = () => {
  const [cursos, setCursos] = useState<any[]>([]);
  const [mentores, setMentores] = useState<{ id: number; nombreCompleto: string }[]>([]);
  const [ongs, setOngs] = useState<{ id: number; nombre: string }[]>([]);
  const [selectedCurso, setSelectedCurso] = useState<any | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null); 

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get('/api/curso/listar');
        setCursos(response.data);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    const fetchMentores = async () => {
        try {
          const response = await api.get('/api/mentor/listar');
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

  
  const handleEditClick = (curso: any) => {
    setSelectedCurso(curso);
    setImageUrl(curso.url); 
    setOpenDialog(true);
  };

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedCurso({
      ...selectedCurso,
      [event.target.name]: event.target.value,
    });
  };

  
  const handleImageUpload = (url: string | null) => {
    setImageUrl(url);
    setSelectedCurso({ ...selectedCurso, url: url || '' }); 
  };

 
  const handleEditSubmit = async () => {
    try {
      const response = await api.put(`/api/curso/actualizar/${selectedCurso.id}`, selectedCurso);
      console.log('Curso actualizado:', response.data);
      alert('Curso actualizado exitosamente');
      setOpenDialog(false);
      setSelectedCurso(null);
      const responseCursos = await api.get('/api/curso/listar');
      setCursos(responseCursos.data);
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
      alert('Error al actualizar el curso');
    }
  };

  
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/curso/eliminar/${id}`);
      alert('Curso eliminado exitosamente');
      const responseCursos = await api.get('/api/curso/listar');
      setCursos(responseCursos.data);
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
      alert('Error al eliminar el curso');
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Editar Cursos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell>{curso.titulo}</TableCell>
                <TableCell>{curso.descripcion}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(curso)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(curso.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCurso && (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogContent>
            <TextField
              label="Título"
              name="titulo"
              value={selectedCurso.titulo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Descripción"
              name="descripcion"
              value={selectedCurso.descripcion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              select
              label="Categoría"
              name="categoria"
              value={selectedCurso.categoria}
              onChange={handleChange}
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
              value={selectedCurso.url}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled 
            />

            <TextField
              select
              label="Lenguaje"
              name="lenguaje"
              value={selectedCurso.lenguaje}
              onChange={handleChange}
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
              value={selectedCurso.duracion}
              onChange={handleChange}
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
              value={selectedCurso.semanal}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="1">1 día</MenuItem>
              <MenuItem value="2">2 días</MenuItem>
              <MenuItem value="3">3 días</MenuItem>
              <MenuItem value="4">4 días</MenuItem>
              <MenuItem value="5">5 días</MenuItem>
            </TextField>

            <TextField
              type="date"
              label="Fecha de Inicio"
              name="fechaInicio"
              value={selectedCurso.fechaInicio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              type="date"
              label="Fecha de Fin"
              name="fechaFin"
              value={selectedCurso.fechaFin}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              select
              label="ONG"
              name="ongId"
              value={selectedCurso.ongId}
              onChange={handleChange}
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
              value={selectedCurso.mentorId}
              onChange={handleChange}
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
            <Button onClick={handleEditSubmit} color="primary" variant="contained">
              Guardar Cambios
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default EditarCursos;
