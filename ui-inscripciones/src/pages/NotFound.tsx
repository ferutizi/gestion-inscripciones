import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CustomButton from '../components/customButton';
import theme from '../theme';
import { Link } from 'react-router-dom'; 

const NotFound: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: '10rem', mb: '7rem', textAlign: 'center' }}
    >
      <SearchOffIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
      <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
        Página no encontrada
      </Typography>
      <Typography variant="h6" fontSize="16px" sx={{ marginBottom: '2rem' }}>
        La página que estás buscando no existe.
      </Typography>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <CustomButton
          colorVariant="green"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            marginBottom: '0.5rem',
            minWidth: 'auto', 
          }}
        >
          Volver al inicio
        </CustomButton>
      </Link>
    </Box>
  );
};

export default NotFound;
