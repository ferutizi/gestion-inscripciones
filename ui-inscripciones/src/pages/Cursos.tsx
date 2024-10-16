import React from 'react';
import Courses from '../components/courses';
import { Box } from '@mui/material';

const Cursos: React.FC = () => {
  return (
    <div>
      <Box sx={{ mt: "5rem"}}></Box>
      <Courses title="Cursos disponibles" />
    </div>
  );
};

export default Cursos;
