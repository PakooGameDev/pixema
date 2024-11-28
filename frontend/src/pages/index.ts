import {lazy} from 'react';

import {LoginPage,RegisterPage, NewPasswordPage, ResetPage} from './Auth/index'
import HomePage from './Home/HomePage'
// import TrendsPage from './Trends/TrendsPage';
// import FavoritesPage from './Favorites/FavoritesPage';
// import SettingsPage from './Settings/SettingsPage';
// import MoviePage from './MoviePage/MoviePage';

const TrendsPage = lazy(() => import('./Trends/TrendsPage'));
const FavoritesPage = lazy(() => import('./Favorites/FavoritesPage'));
const SettingsPage = lazy(() => import('./Settings/SettingsPage'));
const MoviePage = lazy(() => import('./MoviePage/MoviePage'));


export {LoginPage, RegisterPage, NewPasswordPage, ResetPage, FavoritesPage, MoviePage, SettingsPage, TrendsPage, HomePage} 