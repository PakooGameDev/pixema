import React, { useEffect, useContext, useState, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {LoginPage, RegisterPage, NewPasswordPage, ResetPage, FavoritesPage, MoviePage, SettingsPage, TrendsPage, HomePage} from '../pages/index';
import { observer } from 'mobx-react-lite';
import { useTheme } from './providers/ThemeContext';
import { Context } from '../index';
import LoadingScreen from '../shared/ui/LoadingScreen/LoadingScreen';
import '../shared/assets/styles/global.scss'

const App: React.FC = () => {
  const { theme } = useTheme();
  const { store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Pixema';
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        await store.checkAuth(); 
      }
      setIsLoading(false); 
    };

    checkAuth();
  }, []);

  if (isLoading) { 
    return <LoadingScreen />;
  }

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/trends" element={store.isAuth && store.user?.isActivated ? <TrendsPage /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={store.isAuth && store.user?.isActivated ? <FavoritesPage /> : <Navigate to="/login" />} />
          <Route path="/settings" element={store.isAuth && store.user?.isActivated ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/movie/:id" element={store.isAuth && store.user?.isActivated ? <MoviePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-redirect" element={<NewPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/NewPassword" element={<NewPasswordPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};



export default observer(App);
