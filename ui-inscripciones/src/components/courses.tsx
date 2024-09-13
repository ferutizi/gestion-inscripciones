import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from '../theme';
import CustomButton from './customButton';
import CardCursos from './cardCursos';

const Courses: React.FC = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#f9f9f9', py: 4,  display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, margin: "0 auto"}}>
        {/* Contenedor del título */}
        <Box sx={{ mb: 3 }}>
  <Typography
    variant="h2"
    sx={{
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textAlign: 'center',
      ml: '15rem', // Mueve el texto hacia la derecha con margen izquierdo
    }}
  >
    Próximos cursos
  </Typography>
  
  {/* Imagen debajo del título */}
  <Box sx={{ textAlign: 'center', mt: 2, ml: '35rem', marginTop: "0 !important" }}>
    <img src="./src/media/title-line.png" alt="Decorative Line" style={{ width: '100%', maxWidth: '200px' }} />
  </Box>
</Box>

        {/* Contenedor de los botones */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5, justifyContent: "center" }}>
        <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              color: '#fff',
              fontWeight: "normal",
              letterSpacing: "0.05em",
              boxShadow: "none",
              padding: "rem 2rem 1rem 2rem",
              '&:hover': { boxShadow: "none"}
            }}
            colorVariant={'green'}
          >
            Todos los cursos
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              
              fontWeight: "normal",
              letterSpacing: "0.05em",
              boxShadow: "none",
              padding: "1rem 2rem 1rem 2rem",
              '&:hover': { boxShadow: "none"}
            }}
            colorVariant={'white'}
          >
            Ui/Ux Design
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              
              fontWeight: "normal",
              letterSpacing: "0.05em",
              boxShadow: "none",
              padding: "1rem 2rem 1rem 2rem",
              '&:hover': { boxShadow: "none"}
            }}
            colorVariant={'white'}
          >
            Python
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              
              fontWeight: "normal",
              letterSpacing: "0.05em",
              boxShadow: "none",
              padding: "1rem 2rem 1rem 2rem",
              '&:hover': { boxShadow: "none"}
            }}
            colorVariant={'white'}
          >
            HTML & CSS
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              
              fontWeight: "normal",
              letterSpacing: "0.05em",
              boxShadow: "none",
              padding: "1rem 2rem 1rem 2rem",
              '&:hover': { boxShadow: "none"}
            }}
            colorVariant={'white'}
          >
            React
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              
              fontWeight: "normal",
              letterSpacing: "0.05em",
              boxShadow: "none",
              padding: ".5rem 1rem .5rem 1rem",
              '&:hover': { boxShadow: "none"}
            }}
            colorVariant={'white'}
          >
            QA
          </CustomButton>
        </Box>

        {/* Contenedor vacío */}

       

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: "row" }}>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: "row", flexWrap: "wrap", gap: "2rem" }}>
    <CardCursos
      amount='1 Clase Semanal'
      duration='Duración: 4 Meses'
      title="Programación Inicial"
      subtitle="con Python"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      imageUrl="../src/media/curso.webp"
      onButtonClick={() => alert("Curso de Python")}
      buttonText="Inscribite"
    />
    <CardCursos
      amount='1 Clase Semanal'
      duration='Duración: 4 Meses'
      title="Programación Inicial"
      subtitle="con Python"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      imageUrl="../src/media/curso.webp"
      onButtonClick={() => alert("Curso de Python")}
      buttonText="Inscribite"
    />
    <CardCursos
      amount='1 Clase Semanal'
      duration='Duración: 4 Meses'
      title="Programación Inicial"
      subtitle="con Python"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      imageUrl="../src/media/curso.webp"
      onButtonClick={() => alert("Curso de Python")}
      buttonText="Inscribite"
    />
    <CardCursos
      amount='1 Clase Semanal'
      duration='Duración: 4 Meses'
      title="Programación Inicial"
      subtitle="con Python"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      imageUrl="../src/media/curso.webp"
      onButtonClick={() => alert("Curso de Python")}
      buttonText="Inscribite"
    />
    <CardCursos
      amount='1 Clase Semanal'
      duration='Duración: 4 Meses'
      title="Programación Inicial"
      subtitle="con Python"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      imageUrl="../src/media/curso.webp"
      onButtonClick={() => alert("Curso de Python")}
      buttonText="Inscribite"
    />
  </Box>
</Box>








      </Box>
    </Box>
  );
};

export default Courses;
