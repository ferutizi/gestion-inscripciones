import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomButton from './customButton';
import theme from '../theme';
import { Link } from 'react-router-dom';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Inicio', 'Cursos', 'Proyectos'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Punto&Aprende
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Link to="/login">
        <CustomButton colorVariant="white">INICIAR SESION</CustomButton>
      </Link>
      <CustomButton colorVariant="green">REGISTRARSE</CustomButton>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', margin: "0", height: "100px" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ py: "2rem", backgroundColor: theme.palette.primary.dark, boxShadow: "none" }}>
        <Toolbar sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
            
            <Box component="img" src="./src/media/logo-navbar.png" alt="Logo" sx={{ width: 'auto', display: { xs: 'none', sm: 'block' } }} />

            
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '2rem' }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff', textTransform: 'none', transition: 'color 0.3s ease', '&:hover': { color: theme.palette.secondary.main } }}>
                  {item}
                </Button>
              ))}
            </Box>

            
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '1rem' }}>
              <Link to="/login">
                <CustomButton
                  colorVariant="white-navbar"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  INICIAR SESION
                </CustomButton>
              </Link>

              <Link to="/register">
                <CustomButton
                  colorVariant="green"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  }}                  
                >
                  REGISTRARSE
                </CustomButton>
              </Link>

            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ py: { md: "2.5rem", xs: "4rem" } }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
