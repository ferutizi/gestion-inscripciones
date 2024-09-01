import { Box, CardMedia, Container, Typography } from '@mui/material';
import theme from '../theme';
import CustomButton from './customButton';

export default function Banner() {
  return(
    <Container
      component="section"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        width:"100vw",
        maxWidth: "none !important",
        borderRadius: "0 0 50px 50px",
        position: "relative"
      }}>
      <CardMedia
        component="img"
        image='../src/media/bannerImg.png'
        alt="Banner"
        sx={{
          position: "absolute",
          width: "900px",
          bottom: 0,
          right: 0,
          display: {xs: "none", lg: "block"}
        }}
      />
      <Box sx={{padding: "8rem 6.5rem"}}>
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
          }}
        >
          Nunca pares de aprender
        </Typography>
        <Typography
          fontWeight={600}
          fontSize={64}
          lineHeight="75px"
          maxWidth={640}
          sx={{color: theme.palette.primary.contrastText, paddingY: "1rem"}}
        >
          Desarrolla tus habilidades con cursos en línea
        </Typography>
        <CustomButton
          variant='contained'
          color='secondary'
          sx={{ color: '#fff', fontWeight: "normal", width: "167px", height: "59px" }}
          colorVariant={'orange'}
        >
          VER CURSOS
        </CustomButton>
      </Box>
    </Container>
  )
}