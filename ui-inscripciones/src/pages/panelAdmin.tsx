import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress, Tabs, Tab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups'; 
import { useNavigate } from 'react-router-dom';
import EditarProyectos from '../components/editarProyectos';
import CoursesEdit from '../components/coursesEdit';
import EditarUsuarios from '../components/editarUsuario';
import EstudiantesEdit from '../components/estudiantesEdit';
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
  const [selectedTab, setSelectedTab] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
     // console.log('Datos del usuario almacenados:', parsedUserData); 
      setUserData((prevData) => ({
        ...prevData,
        family_name: parsedUserData.family_name,
        email: parsedUserData.email
      }));
    }

    const storedUserDataLogin = localStorage.getItem('userDataLogin'); 
    if (storedUserDataLogin) {
      const parsedUserDataLogin = JSON.parse(storedUserDataLogin);
      // console.log('Datos del usuario login:', parsedUserDataLogin); 
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

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
};

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> 
      </Box>
    );
  }

  return (
    <Box sx={{  minHeight: '100vh', padding: '16px', bgcolor: "#e8eced"}}>
      <Box
        sx={{
          maxWidth: '1200px',
          
          display: 'flex',
          flexDirection: 'row',
          margin: "0 auto !important",
          pt: "1rem"

        }}
      >
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" color="primary" fontWeight={600} gutterBottom sx={{ marginLeft: '16px' }}>
          Panel de Administrador
        </Typography>
      </Box>

      <Tabs 
        value={selectedTab} 
        onChange={handleChange} 
        aria-label="Admin Panel Tabs"
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center'
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            minWidth: 170,
            fontWeight: 'bold',
            '&.Mui-selected': {
              color: '#000',
            },
            '& .MuiTab-wrapper > *:first-of-type': {
              marginBottom: '4px',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#000',
            height: 3,
          },
        }}
      >
        <Tab icon={<PeopleIcon />} iconPosition="start" label="Usuarios" />
        <Tab icon={<SchoolIcon />} iconPosition="start" label="Cursos" />
        <Tab icon={<WorkIcon />} iconPosition="start" label="Proyectos" />
        <Tab icon={<GroupsIcon />} iconPosition="start" label="Estudiantes" />
      </Tabs>

      <Box sx={{ margin: '16px 0' }}>
        {selectedTab === 0 && (
          <>
               <EditarUsuarios parsedUserData={userData} parsedUserDataLogin={userDataLogin} />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <CoursesEdit />
            
          </>
        )}
        {selectedTab === 2 && (
          <>
            <EditarProyectos />
          </>
        )}
        {selectedTab === 3 && (
          <>
            <EstudiantesEdit />
          </>
        )}
      </Box>
    </Box>
  );
};

export default PanelAdmin;
