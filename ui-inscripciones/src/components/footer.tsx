import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LazyLoad from 'react-lazyload';
import theme from '../theme';

const Footer: React.FC = () => {
  const contactItems = [
    { icon: './src/media/phone.png', text: 'Tel: +54 9 110303456' },
    { icon: './src/media/email.png', text: 'Email: info@puntoyaprende.com' },
  ];

  const categorias = ['Python', 'Diseño UX/UI', 'JS', 'HTML y CSS'];
  const cursos = ['Próximos cursos'];

  return (
    <Box sx={{backgroundColor: "#d2e6e4",
        clipPath: " polygon(100% 100%, 0% 100% , 0.00% 12.67%, 1.00% 12.66%, 2.00% 12.64%, 3.00% 12.61%, 4.00% 12.57%, 5.00% 12.52%, 6.00% 12.46%, 7.00% 12.38%, 8.00% 12.29%, 9.00% 12.20%, 10.00% 12.09%, 11.00% 11.97%, 12.00% 11.84%, 13.00% 11.71%, 14.00% 11.56%, 15.00% 11.40%, 16.00% 11.24%, 17.00% 11.06%, 18.00% 10.88%, 19.00% 10.70%, 20.00% 10.50%, 21.00% 10.30%, 22.00% 10.09%, 23.00% 9.88%, 24.00% 9.66%, 25.00% 9.44%, 26.00% 9.22%, 27.00% 8.99%, 28.00% 8.76%, 29.00% 8.53%, 30.00% 8.29%, 31.00% 8.06%, 32.00% 7.82%, 33.00% 7.59%, 34.00% 7.36%, 35.00% 7.13%, 36.00% 6.90%, 37.00% 6.67%, 38.00% 6.45%, 39.00% 6.23%, 40.00% 6.01%, 41.00% 5.80%, 42.00% 5.60%, 43.00% 5.40%, 44.00% 5.21%, 45.00% 5.03%, 46.00% 4.85%, 47.00% 4.68%, 48.00% 4.52%, 49.00% 4.37%, 50.00% 4.22%, 51.00% 4.09%, 52.00% 3.97%, 53.00% 3.86%, 54.00% 3.75%, 55.00% 3.66%, 56.00% 3.58%, 57.00% 3.51%, 58.00% 3.45%, 59.00% 3.41%, 60.00% 3.37%, 61.00% 3.35%, 62.00% 3.33%, 63.00% 3.33%, 64.00% 3.35%, 65.00% 3.37%, 66.00% 3.41%, 67.00% 3.45%, 68.00% 3.51%, 69.00% 3.58%, 70.00% 3.66%, 71.00% 3.75%, 72.00% 3.86%, 73.00% 3.97%, 74.00% 4.09%, 75.00% 4.22%, 76.00% 4.37%, 77.00% 4.52%, 78.00% 4.68%, 79.00% 4.85%, 80.00% 5.03%, 81.00% 5.21%, 82.00% 5.40%, 83.00% 5.60%, 84.00% 5.80%, 85.00% 6.01%, 86.00% 6.23%, 87.00% 6.45%, 88.00% 6.67%, 89.00% 6.90%, 90.00% 7.13%, 91.00% 7.36%, 92.00% 7.59%, 93.00% 7.82%, 94.00% 8.06%, 95.00% 8.29%, 96.00% 8.53%, 97.00% 8.76%, 98.00% 8.99%, 99.00% 9.22%, 100.00% 9.44%);"
    }}>
    <Box
      component="footer"
      sx={{
        maxWidth: "1000px",
        backgroundColor: '#d2e6e4',
        padding: '7rem 1rem 2rem 1rem',
        marginTop: 'auto', 
        margin: "0 auto",
      }}
    >
      <Box 
  sx={(theme) => ({
    display: 'flex', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    flexDirection: theme.breakpoints.down('md') && 'column',
    '@media (max-width: 1100px)': {
      flexDirection: 'column',
    },
    '@media (min-width: 1100px)': {
      flexDirection: 'row'
    }
  })}
>

       
        <Box >
          <LazyLoad>
            <img src="./src/media/logo-footer.png" alt="Punto&Aprende" style={{ width: 'auto', marginBottom: '20px' }} />
          </LazyLoad>
          <List sx={{ padding: 0 }}> 
            {contactItems.map((item, index) => (
              <ListItem key={index} sx={{ padding: 0, marginBottom: '10px' }}> 
                <ListItemIcon sx={{ minWidth: 'auto', marginRight: '10px' }}> 
                  <LazyLoad>
                    <img src={item.icon} alt={item.text} style={{ width: 'auto' }} />
                  </LazyLoad>
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: theme.palette.primary.main, margin: 0 }} />
              </ListItem>
            ))}
          </List>
        </Box>

      
        <Box>
          <Typography variant="h6" sx={{ marginBottom: '10px', color: "#0a033c", fontWeight: "800" }}>Categorías</Typography>
          <List sx={{ padding: 0, }}> 
            {categorias.map((categoria, index) => (
              <ListItem key={index} sx={{ padding: 0, marginBottom: '10px' }}>
                <ListItemText primary={categoria} sx={{ color: theme.palette.primary.main, margin: 0,  }} />
              </ListItem>
            ))}
          </List>
        </Box>

        
        <Box>
          <Typography variant="h6" sx={{ marginBottom: '10px', color: "#0a033c", fontWeight: "800" }}>Cursos</Typography>
          <List sx={{ padding: 0 }}>
            {cursos.map((curso, index) => (
              <ListItem key={index} sx={{ padding: 0, marginBottom: '10px' }}> 
                <ListItemText primary={curso} sx={{ color: theme.palette.primary.main, margin: 0 }} />
              </ListItem>
            ))}
          </List>
        </Box>

       
        <Box>
          <Typography variant="h6" sx={{ marginBottom: '1rem', fontSize: "14px", color: "#0a033c" }}>Inscríbete y no te pierdas el comienzo de ningún curso</Typography>
          <TextField
  variant="filled"
  placeholder="Email"
  sx={{
    backgroundColor: '#fff', 
    borderRadius: '16px',
    width: '100%',
    marginBottom: '10px',
    '& .MuiFilledInput-root': {
      borderRadius: '16px', 
      padding: '10px 12px', 
      '& input': {
        padding: '10px 0',
      },
      '&:before': {
        display: 'none', 
      },
      '&:hover:before': {
        display: 'none',
      },
      '&:after': {
        display: 'none', 
      },
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00695c',
            color: '#fff',
            padding: "8px 18px",
            textTransform: 'none',
            fontSize: "12px",
            boxShadow: "none",
            borderRadius: '16px', 
            '&:hover': {
              backgroundColor: '#004d40', 
            },
          }}
        >
          Enviar
        </Button>
      </InputAdornment>
    ),
  }}
/>


        </Box>
      </Box>
    </Box>
    </Box>
    
  );
};

export default Footer;
