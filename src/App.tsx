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
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

// New Content Pages
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiePage from './pages/CookiePage';
import MyListingsPage from './pages/MyListingsPage';
import AddListingPage from './pages/AddListingPage';

// Amplify UI Theme
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffffff 0%, #faf8f5 15%, rgba(255, 248, 225, 0.8) 35%, #ffffff 50%, rgba(255, 209, 0, 0.02) 65%, #faf8f5 85%, #ffffff 100%)',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(ellipse at 25% 25%, rgba(204, 0, 1, 0.015) 0%, transparent 60%),
            radial-gradient(ellipse at 75% 50%, rgba(255, 209, 0, 0.02) 0%, transparent 65%),
            radial-gradient(ellipse at 40% 85%, rgba(204, 0, 1, 0.008) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 15%, rgba(255, 209, 0, 0.015) 0%, transparent 55%)
          `,
          pointerEvents: 'none',
          zIndex: -1
        },
        '&::after': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(45deg, transparent 49%, rgba(255, 209, 0, 0.008) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(204, 0, 1, 0.005) 50%, transparent 51%)
          `,
          backgroundSize: '120px 120px',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: -1
        }
      }}
    >
      <Header />
      
      <Container 
        component="main" 
        sx={{ 
          flex: 1, 
          py: 3,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<RoomDetailsPage />} />
          
          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Protected User Pages */}
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
          <Route 
            path="/my-listings" 
            element={
              <Authenticator.Provider>
                <Authenticator>
                  <MyListingsPage />
                </Authenticator>
              </Authenticator.Provider>
            } 
          />
          <Route 
            path="/add-listing" 
            element={
              <Authenticator.Provider>
                <Authenticator>
                  <AddListingPage />
                </Authenticator>
              </Authenticator.Provider>
            } 
          />
          
          {/* Content Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Legal Pages */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      
      <Footer />
    </Box>
  );
}

export default App;