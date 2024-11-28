import React, { useEffect, useContext, useState, Suspense, lazy} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Reset from './pages/Auth/Reset';
import { observer } from 'mobx-react-lite';
import NewPassword from './pages/Auth/NewPassword';
import { useTheme } from './context/ThemeContext';
import { Context } from './index';
import LoadingScreen from './components/screens/loadingScreen/LoadingScreen';
import './assets/styles/global.scss';

const Trends = lazy(() => import('./pages/Trends/Trends'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage'));

const App: React.FC = () => {
  const { theme } = useTheme(); // Получаем текущую тему из контекста
  const { store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Pixema';
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        await store.checkAuth(); // Await the checkAuth promise
      }
      setIsLoading(false); // Set loading to false after checkAuth completes
    };

    checkAuth();
  }, []);

  if (isLoading) {  // Use isLoading instead of store.isLoading
    return <LoadingScreen />;
  }

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trends" element={store.isAuth && store.user?.isActivated ? <Trends /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={store.isAuth && store.user?.isActivated ? <Favorites /> : <Navigate to="/login" />} />
          <Route path="/settings" element={store.isAuth && store.user?.isActivated ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/movie/:id" element={store.isAuth && store.user?.isActivated ? <MoviePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-redirect" element={<NewPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/NewPassword" element={<NewPassword />} />
        </Routes>
      </Suspense>
    </div>
  );
};



export default observer(App);
