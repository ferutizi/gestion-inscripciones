import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import EditarProyectos from '../components/editarProyectos';
import CrearProyectos from '../components/crearProyectos';
import CrearCurso from '../components/crearCurso';
import CoursesEdit from '../components/coursesEdit';
import EditarUsuarios from '../components/editarUsuario';
import CrearUsuario from '../components/crearUsuario';
import api from '../utils/axiosConfig';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  rolId: number;
  rolDescripcion: string;
}

const PanelAdmin: React.FC = () => {
  const [userData, setUserData] = useState<{ family_name: string; email: string; rol: string | null }>({
    family_name: '',
    email: '',
    rol: null
  });

  const [userDataLogin, setUserDataLogin] = useState<any>(null); 
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData((prevData) => ({
        ...prevData,
        family_name: parsedUserData.family_name,
        email: parsedUserData.email
      }));
    }

    const storedUserDataLogin = localStorage.getItem('userDataLogin'); 
    if (storedUserDataLogin) {
      const parsedUserDataLogin = JSON.parse(storedUserDataLogin);
      setUserDataLogin(parsedUserDataLogin); 
    }

    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/api/usuario/listar');
        setUsuarios(response.data.content);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (userData.email && usuarios.length > 0) {
      const usuarioLogueado = usuarios.find((usuario) => usuario.email === userData.email);

      if (usuarioLogueado) {
        setUserData((prevData) => ({
          ...prevData,
          rol: usuarioLogueado.rolDescripcion 
        }));
      }
    }
  }, [userData.email, usuarios]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole !== "ADMINISTRADOR") {
      navigate('/'); 
    } else {
      setLoading(false); 
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> 
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '16px' }}>
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" color="primary" fontWeight={600} gutterBottom sx={{ marginLeft: '16px' }}>
          Panel de Administrador
        </Typography>
      </Box>

      <Typography variant="h6" color="textPrimary" sx={{ margin: '16px 0' }}>
        Bienvenido, {userData.family_name || userDataLogin.nombre + " " + userDataLogin.apellido}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '16px' }}>
        Correo: {userData.email || userDataLogin.email}
      </Typography>
      {userData.rol && (
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '16px' }}>
          Rol: {userData.rol || userDataLogin.rol}
        </Typography>
      )}

      <Box sx={{ margin: '0 auto', maxWidth: '1200px' }}>
        <EditarProyectos />
        <CrearProyectos />
        <CoursesEdit />
        <CrearCurso />
        <EditarUsuarios />
        <CrearUsuario />
      </Box>
    </Box>
  );
};

export default PanelAdmin;
