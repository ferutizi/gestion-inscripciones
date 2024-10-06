import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import Footer from './components/footer';
import { Box } from '@mui/material';
import DrawerAppBar from './components/NavBar';

const App: React.FC = () => {
  const location = useLocation();

  const hideNavbarAndFooter = location.pathname === '/login' || location.pathname === '/admin' || location.pathname === '/register' || location.pathname === '/forgot-password';
  

  return (
    <>
      {!hideNavbarAndFooter && <DrawerAppBar />}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
        }}
      >
        <Box sx={{ flex: 1 }}>
          <main>
            <AppRoutes />
          </main>
        </Box>
        {!hideNavbarAndFooter && <Footer />}
      </Box>
    </>
  );
};

export default App;
