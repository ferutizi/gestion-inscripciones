import React from 'react';
import { Box } from '@mui/material';
import Projects from '../components/projects';

const Proyectos: React.FC = () => {
  return (
    <div>
      <Box sx={{ mt: "5rem" }}></Box>
      <Projects showButton={false} limitProjects={false} /> 
    </div>
  );
};

export default Proyectos;
