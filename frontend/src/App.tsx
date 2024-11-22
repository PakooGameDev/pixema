// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import Trends from './pages/Trends/Trends';
import Favorites from './pages/Favorites/Favorites';
import MoviePage from './pages/MoviePage/MoviePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Reset from './pages/Auth/Reset';
import ResetRedirect from './pages/Auth/ResetRedirect';
import NewPassword from './pages/Auth/NewPassword';
import NotFound from './pages/NotFound/NotFound';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './assets/styles/global.scss';
import { DisplayProvider } from './context/BurgerContext';
import ProtectedRoute from './pages/ProtectedRoute';

const App: React.FC = () => {
  const { theme } = useTheme(); // Получаем текущую тему из контекста

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/home" element={<Home />}/> 
        <Route path="/trends" element={
          <ProtectedRoute>
            <Trends />
          </ProtectedRoute>
        }/>
        <Route path="/favorites" element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }/>
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings/>
          </ProtectedRoute>
        } />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-redirect" element={<ResetRedirect />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Оберните ваш App компонент в ThemeProvider
const Root: React.FC = () => (
  <ThemeProvider>
    <DisplayProvider>
      <App />
    </DisplayProvider>
  </ThemeProvider>
);

export default Root;
