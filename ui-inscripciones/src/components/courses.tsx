import React, { useEffect, useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import theme from '../theme';
import CustomButton from './customButton';
import CardCursos from './cardCursos';
import api from '../utils/axiosConfig';

interface CoursesProps {
  title?: string;
}

const Courses: React.FC<CoursesProps> = ({ title = 'Próximos cursos' }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos los cursos');
  const [openDialog, setOpenDialog] = useState<boolean>(false); 
  const [dialogMessage, setDialogMessage] = useState<string>(''); 
  const isLogged = localStorage.getItem('isLogged') === 'true';
  // const userData = isLogged ? JSON.parse(localStorage.getItem('userData') || '{}') : null;
  const userDataLogin = isLogged ? JSON.parse(localStorage.getItem('userDataLogin') || '{}') : null;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/api/curso/listar');
        setCourses(response.data.content);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInscription = async (course: any) => {
    if (isLogged && userDataLogin) {
      const { id } = userDataLogin;

      const inscriptionData = {
        idCurso: course.id,
        idEstudiante: id,
        estado: 'inscripto',
        calificacion: 0.0,
        fechaInscripcion: new Date().toISOString().split('T')[0], 
      };

      try {
        const response = await api.post('/api/inscripcion/curso/crear', inscriptionData);
        console.log('Inscripción exitosa:', response.data);
        setDialogMessage(`Te has inscrito en el curso: ${course.titulo}`); 
        setOpenDialog(true);
      } catch (error) {
        console.error('Error al inscribirse:', error);
        setDialogMessage('Hubo un error al inscribirse, intente nuevamente'); 
        setOpenDialog(true); 
      }
    } else {
      setDialogMessage('Debes estar logueado para inscribirte en un curso.');
      setOpenDialog(true); 
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  const filteredCourses = selectedCategory === 'Todos los cursos'
    ? courses
    : courses.filter(course => course.categoria.includes(selectedCategory));

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f9f9f9',
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, margin: '0 auto' }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 'bold',
              textAlign: 'center',
              ml: { xs: 'none', lg: '1rem' },
            }}
          >
            {title}
          </Typography>

          <Box sx={{ textAlign: 'center', mt: 2, ml: { xs: '10rem', lg: '35rem' }, marginTop: '0 !important' }}>
            <img src="/media/title-line.png" alt="Decorative Line" style={{ width: '100%', maxWidth: '200px' }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5, justifyContent: 'center' }}>
          <CustomButton
            colorVariant={selectedCategory === 'Todos los cursos' ? 'green' : 'white'}
            onClick={() => setSelectedCategory('Todos los cursos')}
          >
            Todos los cursos
          </CustomButton>
          <CustomButton
            colorVariant={selectedCategory === 'Ui/Ux Design' ? 'green' : 'white'}
            onClick={() => setSelectedCategory('Ui/Ux Design')}
          >
            Ui/Ux Design
          </CustomButton>
          <CustomButton
            colorVariant={selectedCategory === 'Python' ? 'green' : 'white'}
            onClick={() => setSelectedCategory('Python')}
          >
            Python
          </CustomButton>
          <CustomButton
            colorVariant={selectedCategory === 'HTML & CSS' ? 'green' : 'white'}
            onClick={() => setSelectedCategory('HTML & CSS')}
          >
            HTML & CSS
          </CustomButton>
          <CustomButton
            colorVariant={selectedCategory === 'React' ? 'green' : 'white'}
            onClick={() => setSelectedCategory('React')}
          >
            React
          </CustomButton>
          <CustomButton
            colorVariant={selectedCategory === 'QA' ? 'green' : 'white'}
            onClick={() => setSelectedCategory('QA')}
          >
            QA
          </CustomButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CardCursos
                key={course.id}  
                amount={`${course.semanal} Clase Semanal`} 
                duration={`Duración: ${course.duracion} semanas`}
                title={course.titulo}
                subtitle={`con ${course.lenguaje}`} 
                description={course.descripcion}
                imageUrl={course.url}  
                onButtonClick={() => handleInscription(course)}
                buttonText="Inscribite"
              />
            ))
          ) : (
            <Typography variant="h6">
              No se encontraron cursos para la categoría seleccionada.
            </Typography>
          )}
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Información</DialogTitle>
          <DialogContent>
            <Typography>{dialogMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Courses;
