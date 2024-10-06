import { Box, CardMedia, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 
import theme from '../theme';
import CustomButton from './customButton';

export default function Banner() {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "0 0 50px 50px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: { xs: "100vh", lg: "auto" },
        alignItems: { xs: "center", lg: "flex-start" },
        overflow: "hidden",
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
          width: "100%",
          height: "100%",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", lg: "flex-start" },
            alignItems: { xs: "center", lg: "flex-start" },
            height: "80%",
            marginTop: { xs: "0", lg: "-4rem" },
            textAlign: { xs: "center", lg: "left" },
            width: { xs: "100%", lg: "auto" },
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
              margin: { xs: "0 auto 1rem", lg: "0" },
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
              fontSize: {
                xs: "2.5rem", 
                md: "3rem",
                lg: "4rem",
              },
              margin: {
                xs: "1rem",
                lg: "0"
              },
              
            }}
          >
            Desarrolla tus habilidades con cursos en línea
          </Typography>
          
          <Link to="/cursos" style={{ textDecoration: 'none' }}>
            <CustomButton
              variant="contained"
              color="secondary"
              sx={{
                color: '#fff',
                fontWeight: "normal",
                letterSpacing: "0.05em",
                boxShadow: "none",
                padding: "1rem 2rem 1rem 2rem",
                '&:hover': { boxShadow: "none" },
                marginTop: "1rem",
              }}
              colorVariant={'orange'}
            >
              VER CURSOS
            </CustomButton>
          </Link>
        </Box>
        <CardMedia
          component="img"
          image='/media/bannerImgedit.png'
          alt="Banner"
          sx={{
            width: "400px",
            display: { xs: "none", lg: "block" },
          }}
        />
      </Container>
    </Box>
  );
}
