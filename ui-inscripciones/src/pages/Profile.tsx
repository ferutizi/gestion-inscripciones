import React, { useState, useEffect } from 'react';
import { UserDataType } from '../types';
//import { useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Button, Card, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import theme from '../theme';
import api from '../utils/axiosConfig';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserDataType>({
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    name: "",
    picture: "",
    sub: "",
    birthday: "",
    rol: "",
    id: ""
  });

  const [userDataLogin, setUserDataLogin] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false); 
 // const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedUserDataLogin = localStorage.getItem('userDataLogin');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userRole = localStorage.getItem('userRole') || '';
      setUserData({ ...parsedUserData, rol: userRole });
    }

    if (storedUserDataLogin) {
      const parsedUserDataLogin = JSON.parse(storedUserDataLogin);
      setUserDataLogin(parsedUserDataLogin);
    }

    const fetchCourses = async () => {
      try {
        const response = await api.get('/api/inscripcion/curso/listar');
        const cursos = response.data.content;
        setCourses(cursos);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  // const handleHomeClick = () => {
  //   navigate('/');
  // };

  const handleCourseClick = () => {
    setDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); 
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      alignItems: 'flex-start', 
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      padding: '2rem',
      mb: {
        xs: "6rem",
        lg: "1rem"
      },
      mt: {
        xs: "10rem",
        lg: "6rem"
      },
    }}>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        mb: { xs: '2rem', lg: 0 },
        width: { xs: '100%', lg: '30%' },
        marginRight: { lg: '2rem' },
      }}>
        <Typography variant="h4" fontWeight="500" sx={{ marginBottom: '1rem', color: theme.palette.text.secondary }}>
          Mi perfil
        </Typography>
        <Avatar
          src={userData.picture}
          alt={userData.name}
          sx={{ width: '150px', height: '150px', marginBottom: '1.5rem' }}
        />
        <Typography variant="h5" sx={{ marginBottom: '1rem', color: theme.palette.text.secondary }}>
          {userData.name || (userDataLogin && `${userDataLogin.nombre} ${userDataLogin.apellido}`)}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: theme.palette.text.primary }}>
          Correo: {userData.email || (userDataLogin && userDataLogin.email)}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '1.5rem', color: theme.palette.text.primary }}>
          Fecha de nacimiento: {userData.birthday || (userDataLogin && userDataLogin.fechaNacimiento)}
        </Typography>


      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: { xs: '100%', lg: '30%' },
      }}>
        <Typography variant="h4" fontWeight="500" sx={{ color: theme.palette.text.secondary }}>
          Mis cursos
        </Typography>

        <Box sx={{ marginTop: '2rem', width: '100%' }}>
          {courses
            .filter(curso => curso.idEstudiante == userDataLogin?.id)
            .map((curso, index) => (
              <Card
                key={index}
                onClick={handleCourseClick} 
                sx={{
                  backgroundColor: theme.palette.text.secondary,
                  marginBottom: '1rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  boxShadow: 'none',
                  transition: "opacity 0.05s ease-in-out",
                  '&:hover': {
                    opacity: 0.5,
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                  {curso.tituloCurso}
                </Typography>
              </Card>
            ))}
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{textAlign: "center", fontWeight: "bold"}}>Material no disponible</DialogTitle>
        <DialogContent>
          <Typography>El material de este curso aún no está disponible.</Typography>
          <Typography>Intente más tarde.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
