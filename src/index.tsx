import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import amplifyConfig from './amplifyconfiguration.json';
import './index.css';

// Configure Amplify
Amplify.configure(amplifyConfig);

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Create Material-UI theme with Sarawak colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#cc0001', // Sarawak red
      dark: '#b00001',
      light: '#ff8080',
    },
    secondary: {
      main: '#ffd100', // Sarawak yellow
      dark: '#e6bc00',
      light: '#ffdc33',
    },
    background: {
      default: '#faf8f5', // Light cream base
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Poppins, "Open Sans", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(204, 0, 1, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #cc0001 0%, #cc0001 25%, #000000 25%, #000000 75%, #ffd100 75%, #ffd100 100%)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 3000,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          margin: '15px 20px 15px 20px',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-3px',
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Authenticator.Provider>
            <App />
          </Authenticator.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);