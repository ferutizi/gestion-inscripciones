import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardProyectos from './cardProyectos';
import theme from '../theme';
import api from '../utils/axiosConfig';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  url: string;
}

interface ProjectsProps {
  showButton?: boolean;
  limitProjects?: boolean; 
}

const Transition = React.forwardRef(function Transition(props: any, ref: React.Ref<any>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Projects: React.FC<ProjectsProps> = ({ showButton = true, limitProjects = true }) => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, ] = useState(limitProjects ? 6 : 0); 
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);
  const navigate = useNavigate();

  const fetchProyectos = async (limit: number) => {
    try {
      const response = await api.get(`/api/proyecto/listar`, {
        params: { limit },
      });
      console.log('Respuesta del servidor:', response.data);

      if (response.data && Array.isArray(response.data.content)) {
        setProyectos(response.data.content);
      } else {
        console.error('La respuesta no contiene proyectos en content:', response.data);
        setProyectos([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos(limit);
  }, [limit]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewAll = () => {
    navigate('/proyectos'); 
  };

  const handleOpenModal = (proyecto: Proyecto) => {
    setSelectedProject(proyecto);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  return (
    <Box sx={{ padding: 3 }}>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center',
            ml: '1rem',
          }}
        >
          Proyectos
        </Typography>

        <Box sx={{ textAlign: 'center', mt: 2, ml: '15rem', marginTop: '0 !important' }}>
          <img src="/media/title-line-orange.png" alt="Decorative Line" style={{ width: '100%', maxWidth: '200px' }} />
        </Box>
      </Box>

      <Box sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h6" component="h2" gutterBottom color="#696984" fontWeight={400} mb={5}>
          Convocatorias a egresados/as de nuestros cursos en IT que quieran participar activamente en proyectos en conjunto con las empresas asociadas.
        </Typography>
      </Box>

      {loading ? (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>Cargando proyectos...</Typography>
      ) : proyectos.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>No se encontraron proyectos.</Typography>
      ) : (
        <Box sx={{ margin: '0 auto', maxWidth: '1200px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {proyectos.map((proyecto) => (
            <CardProyectos
              key={proyecto.id}
              image={proyecto.url}
              title={proyecto.nombre}
              text={proyecto.descripcion}
              buttonText="Más Información"
              onButtonClick={() => handleOpenModal(proyecto)}
            />
          ))}
        </Box>
      )}

      {showButton && ( 
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{
              marginTop: '2.5rem',
              backgroundColor: '#ffffff',
              color: theme.palette.primary.main,
              boxShadow: 'none',
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '12px',
              paddingLeft: '3rem',
              paddingRight: '3rem',
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: '#fff',
                boxShadow: 'none',
                border: `1px solid ${theme.palette.secondary.main}`,
              },
            }}
            onClick={handleViewAll}
          >
            Ver todos
          </Button>
        </Box>
      )}

      <Dialog 
        open={openModal} 
        onClose={handleCloseModal} 
        maxWidth="md"
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {selectedProject?.nombre}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', maxWidth: "300px" }}>
          <Box sx={{ mb: 2 }}>
            <img src={selectedProject?.url} alt={selectedProject?.nombre} style={{ maxWidth: '100px', margin: '0 auto' }} />
          </Box>
          <Typography variant="body1" color="#696984" sx={{ lineHeight: '1.5', textAlign: 'center' }}>
            {selectedProject?.descripcion}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
