import React, { useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import Trends from './pages/Trends/Trends';
import Favorites from './pages/Favorites/Favorites';
import MoviePage from './pages/MoviePage/MoviePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Reset from './pages/Auth/Reset';
import { observer } from 'mobx-react-lite';
import NewPassword from './pages/Auth/NewPassword';
import { useTheme } from './context/ThemeContext';
import { Context } from './index';
import './assets/styles/global.scss';

const App: React.FC = () => {
  const { theme } = useTheme(); // Получаем текущую тему из контекста
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div>Загрузка</div>;
  }

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trends" element={store.isAuth ? <Trends /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={store.isAuth ? <Favorites /> : <Navigate to="/login" />} />
        <Route path="/settings" element={store.isAuth ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/movie/:id" element={store.isAuth ? <MoviePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-redirect" element={<NewPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/NewPassword" element={<NewPassword />} />
      </Routes>
    </div>
  );
};

export default observer(App);
