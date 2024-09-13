import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRef, useEffect } from 'react';
import theme from '../theme';
import CustomButton from './customButton';

export default function Banner() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const highResImage = new Image();
    highResImage.src = "../src/media/bannerImgedit.webp";

    highResImage.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = highResImage.src;
      }
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "0 0 50px 50px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        component="section"
        sx={{
          maxWidth: "1000px !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 5rem",
          paddingLeft: "0rem !important",
          paddingRight: "0rem !important",
          paddingBottom: "0rem !important",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100%",
            marginTop: "-4rem", // Mueve el contenedor 2 rem hacia arriba
          }}
        >
          <Typography
            borderRadius="10px"
            fontWeight={600}
            fontSize={18}
            height={41}
            maxWidth={273}
            color={theme.palette.primary.dark}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "10px 25px",
              marginBottom: "0 !important",
              
            }}
          >
            Nunca pares de aprender
          </Typography>
          <Typography
            fontWeight={600}
            fontSize={64}
            lineHeight="75px"
            maxWidth={640}
            sx={{
              color: theme.palette.primary.contrastText,
              paddingY: "1rem",
            }}
          >
            Desarrolla tus habilidades con cursos en línea
          </Typography>
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              color: '#fff',
              fontWeight: "normal",
              letterSpacing: "0.05em",
              boxShadow: "none",
              padding: "1rem 2rem 1rem 2rem",
              '&:hover': { boxShadow: "none"}
            }}
            colorVariant={'orange'}
          >
            VER CURSOS
          </CustomButton>
        </Box>
        <Box
          ref={imgRef}
          component="img"
          className='banner'
          src="../src/media/banner-placeholder.webp"
          alt="Banner"
          sx={{
            width: '100%',
            maxWidth: '400px',
            display: { xs: 'none', lg: 'block' },
          }}
          loading="eager"
        />
      </Container>
    </Box>
  );
}
