import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
