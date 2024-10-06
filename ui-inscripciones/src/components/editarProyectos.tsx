import React, { useState, useEffect } from 'react';
import { Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../utils/axiosConfig';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  url: string;
  fechaCreacion: string;
}

const useFormValidation = (formData: Omit<Proyecto, 'id'>, touched: { nombre: boolean; descripcion: boolean }) => {
  const [errors, setErrors] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    const validate = () => {
      const newErrors = {
        nombre: '',
        descripcion: '',
      };

      if (touched.nombre && (formData.nombre.trim().length < 5 || formData.nombre.trim().length > 30)) {
        newErrors.nombre = 'El nombre debe tener entre 5 y 30 caracteres.';
      }

      if (touched.descripcion && (formData.descripcion.trim().length < 110 || formData.descripcion.trim().length > 300)) {
        newErrors.descripcion = 'La descripción debe tener entre 110 y 300 caracteres.';
      }

      setErrors(newErrors);
    };

    validate();
  }, [formData, touched]);

  const isFormValid = !errors.nombre && !errors.descripcion;

  return { errors, isFormValid };
};

const EditarProyectos: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null);
  const [formData, setFormData] = useState<Omit<Proyecto, 'id'>>({
    nombre: '',
    descripcion: '',
    url: '',
    fechaCreacion: ''
  });

  const [touched, setTouched] = useState({ nombre: false, descripcion: false });

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await api.get('/api/proyecto/listar');
        setProyectos(response.data.content);
      } catch (error) {
        console.error('Error fetching proyectos:', error);
      }
    };

    fetchProyectos();
  }, []);

  const { errors, isFormValid } = useFormValidation(formData, touched);

  const handleOpenDialog = (proyecto: Proyecto) => {
    setSelectedProyecto(proyecto);
    setFormData({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      url: proyecto.url,
      fechaCreacion: proyecto.fechaCreacion
    });
    setTouched({ nombre: false, descripcion: false });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProyecto(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (field: 'nombre' | 'descripcion') => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  const handleEdit = async () => {
    if (selectedProyecto && isFormValid) {
      try {
        await api.put(`/api/proyecto/editar/${selectedProyecto.id}`, formData);
        setProyectos(proyectos.map(proyecto => proyecto.id === selectedProyecto.id ? { ...proyecto, ...formData } : proyecto));
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating proyecto:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/proyecto/borrar/${id}`);
      setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
    } catch (error) {
      console.error('Error deleting proyecto:', error);
    }
  };

  return (
    <Container sx={{marginTop: "4rem"}}>
      <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
        Editar Proyectos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proyectos.map(proyecto => (
              <TableRow key={proyecto.id}>
                <TableCell>{proyecto.nombre}</TableCell>
                <TableCell>{proyecto.descripcion}</TableCell>
                <TableCell>{new Date(proyecto.fechaCreacion).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(proyecto)} color="primary">
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Editar Proyecto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={() => handleBlur('nombre')}
            fullWidth
            margin="normal"
            error={!!errors.nombre && touched.nombre}
            helperText={touched.nombre && errors.nombre}
          />
          <TextField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            onBlur={() => handleBlur('descripcion')}
            fullWidth
            margin="normal"
            error={!!errors.descripcion && touched.descripcion}
            helperText={touched.descripcion && errors.descripcion}
          />
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Fecha de Creación"
            name="fechaCreacion"
            value={formData.fechaCreacion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEdit} color="primary" disabled={!isFormValid}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditarProyectos;
