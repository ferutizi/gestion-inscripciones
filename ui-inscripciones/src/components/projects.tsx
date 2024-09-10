import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import CardProyectos from './cardProyectos';
import theme from '../theme';

const Projects: React.FC = () => {
  const handleButtonClick = () => {
    console.log('Botón de proyecto clickeado');
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
  
  
  <Box sx={{ textAlign: 'center', mt: 2, ml: '15rem', marginTop: "0 !important" }}>
    <img src="./src/media/title-line-orange.png" alt="Decorative Line" style={{ width: '100%', maxWidth: '200px' }} />
  </Box>
</Box>
<Box sx={{ maxWidth: "800px", margin: "0 auto", textAlign: "center"}}>
      <Typography variant="h6" component="h2" gutterBottom color='#696984' fontWeight={400} mb={5}>
      Convocatorias a egresados/as de nuestros cursos en IT que quieran participar activamente en proyectos en conjunto con las empresas asociadas.
      </Typography></Box>
      <Box sx={{ margin: "0 auto", maxWidth: "1200px", display: "flex", justifyContent: "center"}}>
      <CardProyectos
        image="./src/media/Vaccine.png"
        title="Acelerador IT"
        text="Generá de un proyecto junto a egresados y un mentor técnico que aportarán las empresas socias del Polo IT. "
        buttonText="Más Información"
        onButtonClick={handleButtonClick}
      />

<CardProyectos
        image="./src/media/Vaccine.png"
        title="Acelerador IT"
        text="Generá de un proyecto junto a egresados y un mentor técnico que aportarán las empresas socias del Polo IT. "
        buttonText="Más Información"
        onButtonClick={handleButtonClick}
      />

<CardProyectos
        image="./src/media/Vaccine.png"
        title="Acelerador IT"
        text="Generá de un proyecto junto a egresados y un mentor técnico que aportarán las empresas socias del Polo IT. "
        buttonText="Más Información"
        onButtonClick={handleButtonClick}
      />

<CardProyectos
        image="./src/media/Vaccine.png"
        title="Acelerador IT"
        text="Generá de un proyecto junto a egresados y un mentor técnico que aportarán las empresas socias del Polo IT. "
        buttonText="Más Información"
        onButtonClick={handleButtonClick}
      />
      
      </Box>
      

<Box sx={{display: "flex", justifyContent: "center"}}>

      <Button
      variant="contained"
      
      sx={{
        marginTop: "2.5rem",
        backgroundColor: '#ffffff', 
        color: theme.palette.primary.main, 
        boxShadow: "none",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "12px",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        '&:hover': {
          backgroundColor: theme.palette.secondary.main, 
          color: '#fff', 
          boxShadow: "none",
          border: `1px solid ${theme.palette.secondary.main}`,
          
        },
      }}
    >
      asdasd
    </Button>
    </Box>
    </Box>
  );
};

export default Projects;
