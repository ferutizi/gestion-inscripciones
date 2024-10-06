import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomButton from './customButton';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../theme';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Person2Icon from '@mui/icons-material/Person2';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Inicio', 'Cursos', 'Proyectos'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const ilgenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const isLogged = localStorage.getItem('isLogged') === 'true';
  const userData = isLogged ? JSON.parse(localStorage.getItem('userData') || '{}') : null;
  const userDataLogin = isLogged ? JSON.parse(localStorage.getItem('userDataLogin') || '{}') : null;


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isLogged');
    handleMenuClose();
    // navigate('/login');
    // window.location.reload();
  };

  const userRole = localStorage.getItem('userRole');

  // const drawer = (
  //   <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
  //     <Typography variant="h6" sx={{ my: 2 }}>
  //       Punto&Aprende
  //     </Typography>
  //     <Divider />
  //     <List>
  //       {navItems.map((item) => (
  //         <ListItem key={item} disablePadding>
  //           <ListItemButton sx={{ textAlign: 'center' }}>
  //             <ListItemText primary={item} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     {!isLogged && (
  //       <>
  //         <Link to="/login">
  //           <CustomButton colorVariant="white">INICIAR SESION</CustomButton>
  //         </Link>
  //         <CustomButton colorVariant="green">REGISTRARSE</CustomButton>
  //       </>
  //     )}
  //   </Box>
  // );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', margin: "0", height: "50px" }}>
    <CssBaseline />
    <AppBar component="nav" sx={{ py: "2rem", backgroundColor: theme.palette.primary.dark, boxShadow: "none" }}>
      <Toolbar sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
     
          <Box component="img" src="/media/logo-navbar.png" alt="Logo" sx={{ cursor: "pointer", width: 'auto', display: { xs: 'block', lg: 'block' }, margin: { xs: '0 auto', lg: '0' } }}       onClick={() => navigate('/')}  />

          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: '2rem' }}>
          {navItems.map((item) => (
  <Button
    key={item}
    sx={{ color: '#fff', textTransform: 'none', transition: 'color 0.3s ease', '&:hover': { color: theme.palette.secondary.main } }}
    onClick={() => {
      if (item === 'Inicio') {
        navigate('/');
      } else if (item === 'Cursos') {
        navigate('/cursos');
      } else if (item === 'Proyectos') {
        navigate('/proyectos');
      }
    }}
  >
    {item}
  </Button>
))}
          </Box>
  
          {/* DESKTOP */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: '1rem' }}>
            {!isLogged ? (
              <>
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
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Avatar
                  src={userData.picture}
                  alt={userData.name}
                  sx={{ cursor: 'pointer' }}
                />
                <Typography
                  onClick={handleMenuOpen}
                  variant="body1"
                  fontWeight={500}
                  sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}
                >
                  {userData.name || userDataLogin.nombre + ' ' + userDataLogin.apellido }
                  <KeyboardArrowDown sx={{ ml: 1 }} />
                </Typography>
                <Menu
  anchorEl={anchorEl}
  open={ilgenuOpen}
  onClose={handleMenuClose}
  sx={{ mt: 1 }}
>
  <MenuItem onClick={() => navigate('/profile')} sx={{ display: 'flex', alignItems: 'center', paddingY: '0.5rem' }}>
    <Person2Icon sx={{ mr: 1 }} />
    <Typography variant="body1" sx={{ flexGrow: 1 }}>
      Perfil
    </Typography>
  </MenuItem>
  
  {userRole === 'ADMINISTRADOR' && ( 
    <MenuItem onClick={() => navigate('/admin')} sx={{ display: 'flex', alignItems: 'center', paddingY: '0.5rem' }}>
      <BuildCircleIcon sx={{ mr: 1 }} />
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        Administrador
      </Typography>
    </MenuItem>
  )}

  <MenuItem onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', paddingY: '0.5rem' }}>
    <CloseIcon sx={{ mr: 1 }} />
    <Typography variant="body1" sx={{ flexGrow: 1 }}>
      Cerrar Sesión
    </Typography>
  </MenuItem>
</Menu>


              </Box>
            )}
          </Box>
  
          {/* MOBILE */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, position: 'absolute', left: '1rem' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
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
    display: { xs: 'block', lg: 'none' },
    '& .MuiDrawer-paper': { 
      boxSizing: 'border-box', 
      width: drawerWidth,
      backgroundColor: theme.palette.primary.dark, 
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
    },
  }}
>
  <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <Box component="img" src="/media/logo-navbar.png" alt="Logo" sx={{ width: 'auto' }} />
  </Box>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  {navItems.map((item) => (
  <Button
    key={item}
    sx={{ 
      color: '#fff', 
      textTransform: 'none', 
      transition: 'color 0.3s ease', 
      '&:hover': { color: theme.palette.secondary.main }, 
      marginBottom: '0.5rem',
      minWidth: 'auto', 
    }}
    onClick={() => {
      if (item === 'Inicio') {
        navigate('/');
      } else if (item === 'Cursos') {
        navigate('/cursos');
      } else if (item === 'Proyectos') {
        navigate('/proyectos');
      }
      handleDrawerToggle(); 
    }}
  >
    {item}
  </Button>
))}


    {!isLogged ? (
      <>
        <Link to="/login">
          <CustomButton
            colorVariant="white-navbar"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              },
              marginBottom: '0.5rem',
              minWidth: 'auto',
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
            marginBottom: '0.5rem',
            minWidth: 'auto', 
          }}
        >
          REGISTRARSE
        </CustomButton></Link>
      </>
    ) : (
      <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <Typography variant="h6" sx={{ color: '#fff', marginBottom: '1rem' }}>
    {userData.name || userDataLogin.nombre + ' ' + userDataLogin.apellido }
  </Typography>
  
  <Button
    sx={{ 
      color: '#fff', 
      textTransform: 'none', 
      transition: 'color 0.3s ease', 
      '&:hover': { color: theme.palette.secondary.main }, 
      display: 'flex', 
      alignItems: 'center', 
      width: 'auto', 
      textAlign: 'left', 
      minWidth: 'auto', 
    }}
    onClick={() => navigate('/profile')}
  >
    <Person2Icon sx={{ mr: 1 }} />
    Perfil
  </Button>
  
  {userRole === 'ADMINISTRADOR' && (  
    <Button
      sx={{ 
        color: '#fff', 
        textTransform: 'none', 
        transition: 'color 0.3s ease', 
        '&:hover': { color: theme.palette.secondary.main }, 
        display: 'flex', 
        alignItems: 'center', 
        width: 'auto', 
        textAlign: 'left',
        minWidth: 'auto', 
      }}
      onClick={() => navigate('/admin')}
    >
      <BuildCircleIcon sx={{ mr: 1 }} />
      Administrador
    </Button>
  )}

  <Button
    sx={{ 
      color: '#fff', 
      textTransform: 'none', 
      transition: 'color 0.3s ease', 
      '&:hover': { color: theme.palette.secondary.main }, 
      display: 'flex', 
      alignItems: 'center', 
      width: 'auto', 
      textAlign: 'left',
      minWidth: 'auto', 
    }}
    onClick={handleLogout}
  >
    <CloseIcon sx={{ mr: 1 }} />
    Cerrar Sesión
  </Button>
</Box>


    )}
  </Box>
</Drawer>
    </nav>
  
    <Box component="main" sx={{ py: { md: "2.5rem", xs: "4rem" } }}>
      <Toolbar />
    </Box>
  </Box>
  
  

  );
}
