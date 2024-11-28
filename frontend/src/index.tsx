import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Root from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Store from './entities/Auth/Model/UserStore';
import { createContext } from 'react';
import { ThemeProvider } from './app/providers/ThemeContext';
import { DisplayProvider } from './app/providers/BurgerContext';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Context.Provider value={{ store }}>
    <ThemeProvider>
      <DisplayProvider>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </DisplayProvider>
    </ThemeProvider>
  </Context.Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
