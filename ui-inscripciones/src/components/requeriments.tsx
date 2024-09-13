import React, { useRef, useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LazyLoad from 'react-lazyload'
import theme from '../theme';

const Requeriments: React.FC = () => {
  const iconSrcs = [
    './src/media/requeriments-icon-1.webp',
    './src/media/requeriments-icon-2.webp',
    './src/media/requeriments-icon-3.webp',
  ];

  const requisitos = [
    'Ser mayor de 18 años con secundario completo demostrable/acreditable.',
    'PC o notebook con conexión a internet.',
    'Contar con conocimientos previos que serán evaluados en el test de ingreso.',
  ];

  const [inView, setInView] = useState(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.5 }
    );

    if (spanRef.current) {
      observer.observe(spanRef.current);
    }

    return () => {
      if (spanRef.current) {
        observer.unobserve(spanRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ margin: "0 auto"}}>
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', sm: 'row' }} 
        maxWidth="1000px" 
        sx={{ 
          minWidth: '320px', 
          padding: 2,
          margin: "0 auto",
        }} 
      >
        <Box 
          flex={1} 
          padding={2}
          order={{ xs: 1, sm: 1 }} 
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            variant="h5"
            fontSize="14px"
            marginLeft="1rem"
            sx={{
              display: "inline-block",
            }}
          >
            <span
              ref={spanRef}
              style={{
                backgroundColor: inView ? "#d4e1ff" : "#f5f5f5",
                color: theme.palette.primary.main,
                padding: "0.5rem 1rem",
                borderRadius: "16px",
                transition: "background-color 0.3s ease",
              }}
            >
              General
            </span>
          </Typography>

          <Typography 
            variant="h4" 
            color={theme.palette.primary.main} 
            fontWeight={800} 
            fontSize="32px" 
            marginTop="1rem"
          >
            Requisitos para la inscripción
          </Typography>
          <List sx={{ maxWidth: "90%" }}>
            {requisitos.map((requisito, index) => (
              <ListItem key={index} sx={{ marginBottom: "1.5rem" }}>
                <ListItemIcon>
                  <LazyLoad>
                    <img src={iconSrcs[index]} alt={`Icono ${index + 1}`} width={32} height={32} />
                  </LazyLoad>
                </ListItemIcon>
                <ListItemText 
                  primary={requisito} 
                  primaryTypographyProps={{ fontSize: '14px', color: "#696984"}}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box 
          flex={1} 
          padding={2} 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          sx={{
           /* backgroundColor: "#d2e6e4", */
            borderRadius: "24px",
            alignSelf: "center",
            order: { xs: 2, sm: 2 }, 
            marginTop: { xs: '2rem', sm: '0' }
          }}
        >
          <LazyLoad>
            <img src="./src/media/requeriments1.webp" width={600} alt="Requisitos de inscripción imagen" style={{ maxWidth: '70%', height: 'auto' }} />
          </LazyLoad>
        </Box>
      </Box>
    </Box>
  );
};

export default Requeriments;
