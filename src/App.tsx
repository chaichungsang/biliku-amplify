import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { Container, Box } from '@mui/material';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Amplify UI Theme
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<RoomDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/profile" 
            element={
              <Authenticator.Provider>
                <Authenticator>
                  <ProfilePage />
                </Authenticator>
              </Authenticator.Provider>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      
      <Footer />
    </Box>
  );
}

export default App;