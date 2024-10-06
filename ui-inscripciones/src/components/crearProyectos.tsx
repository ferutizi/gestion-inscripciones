import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UploadWidget from '../components/uploadWidget';
import api from '../utils/axiosConfig';

const useFormValidation = (nombre: string, descripcion: string, touched: { nombre: boolean; descripcion: boolean }) => {
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

      if (touched.nombre && (nombre.trim().length < 5 || nombre.trim().length > 30)) {
        newErrors.nombre = 'El nombre debe tener entre 5 y 30 caracteres.';
      }
      if (touched.descripcion && (descripcion.trim().length < 110 || descripcion.trim().length > 300)) {
        newErrors.descripcion = 'La descripción debe tener entre 110 y 300 caracteres.';
      }

      setErrors(newErrors);
    };

    validate();
  }, [nombre, descripcion, touched]);

  const isFormValid = !errors.nombre && !errors.descripcion;

  return { errors, isFormValid };
};

const CrearProyectos: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [touched, setTouched] = useState({ nombre: false, descripcion: false });
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { errors, isFormValid } = useFormValidation(nombre, descripcion, touched);

  const handleImageUpload = (url: string | null) => {
    setUrl(url);
  };

  const handleSubmit = async () => {
    if (!isFormValid || !url) return;

    setLoading(true);
    const proyectoData = {
      nombre,
      descripcion,
      url,
      fechaCreacion: new Date().toISOString(),
    };

    try {
      const response = await api.post('/api/proyecto/crear', proyectoData);
      console.log('Proyecto creado:', response.data);
      setNombre('');
      setDescripcion('');
      setUrl(null);
      setOpen(false);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlur = (field: 'nombre' | 'descripcion') => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return (
    <Box sx={{ padding: '1.5rem' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Crear Proyecto
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Crear Proyecto</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
            borderRadius={2}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              label="Nombre del Proyecto"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() => handleBlur('nombre')}
              error={!!errors.nombre && touched.nombre}
              helperText={touched.nombre && errors.nombre}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              onBlur={() => handleBlur('descripcion')}
              error={!!errors.descripcion && touched.descripcion}
              helperText={touched.descripcion && errors.descripcion}
            />
            <UploadWidget onUploadComplete={handleImageUpload} />
            {url && (
              <Box mt={2}>
                <Typography variant="subtitle1">Imagen cargada:</Typography>
                <img src={url} alt="Uploaded" width="300" />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading || !isFormValid || !url}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CrearProyectos;
