import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/theme-provider.tsx';

import '@fontsource-variable/roboto-flex';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
