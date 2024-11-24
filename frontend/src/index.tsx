import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Root from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Store from './store/store';
import { createContext } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DisplayProvider } from './context/BurgerContext';

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
