import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Button,
  styled,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  LocalCafe as CoffeeIcon,
} from '@mui/icons-material';

// Styled components for custom footer styling
const StyledFooter = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #000000 0%, #000000 95%, #ffd100 95%, #ffd100 100%)',
  color: '#fff',
  padding: '50px 0 20px',
  marginTop: '50px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  width: '100%',
  boxSizing: 'border-box',
  clear: 'both',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/assets/images/flags/sarawak-flag.png")',
    backgroundPosition: 'center',
    backgroundSize: '300px',
    backgroundRepeat: 'no-repeat',
    opacity: 0.05,
    zIndex: 0,
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 20px',
  position: 'relative',
  zIndex: 2,
}));

const FooterGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '40px',
  gap: '30px',
  [theme.breakpoints.down('md')]: {
    gap: '20px',
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: '15px',
  color: '#ffd100',
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-5px',
    width: '40px',
    height: '3px',
    backgroundColor: '#cc0001',
    borderRadius: '3px',
  },
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  marginBottom: '15px',
  color: '#ffd100',
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-5px',
    width: '30px',
    height: '2px',
    backgroundColor: '#cc0001',
    borderRadius: '3px',
  },
}));

const FooterDescription = styled(Typography)(({ theme }) => ({
  marginBottom: '20px',
  color: '#ddd',
  lineHeight: 1.6,
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '15px',
}));

const SocialLink = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  borderRadius: '50%',
  transition: 'all 0.3s',
  cursor: 'default',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-3px)',
  },
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  gap: '10px',
}));

const FooterLink = styled(Box)(({ theme }) => ({
  color: '#ddd',
  textDecoration: 'none',
  transition: 'all 0.3s',
  position: 'relative',
  paddingLeft: '15px',
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'block',
  '&::before': {
    content: '"›"',
    position: 'absolute',
    left: 0,
    color: '#ffd100',
    fontWeight: 'bold',
  },
  '&:hover': {
    color: '#ffd100',
    transform: 'translateX(3px)',
    paddingLeft: '18px',
    textDecoration: 'none',
  },
}));

const CoffeeSupport = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '30px',
  padding: '15px 0',
}));

const CoffeeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#cc0000',
  color: '#fff',
  border: 'none',
  borderRadius: '30px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textDecoration: 'none',
  textTransform: 'none',
  animation: 'shake 2.5s infinite',
  animationDelay: '2s',
  '@keyframes shake': {
    '0%': { transform: 'translateX(0)' },
    '10%': { transform: 'translateX(-4px) rotate(-2deg)' },
    '20%': { transform: 'translateX(4px) rotate(2deg)' },
    '30%': { transform: 'translateX(-4px) rotate(-2deg)' },
    '40%': { transform: 'translateX(4px) rotate(2deg)' },
    '50%': { transform: 'translateX(-4px) rotate(-1deg)' },
    '60%': { transform: 'translateX(4px) rotate(1deg)' },
    '70%': { transform: 'translateX(-2px) rotate(-1deg)' },
    '80%': { transform: 'translateX(2px) rotate(1deg)' },
    '90%': { transform: 'translateX(-1px) rotate(0)' },
    '100%': { transform: 'translateX(0)' },
  },
  '&:hover': {
    backgroundColor: '#ff0000',
    color: '#fff',
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    animationPlayState: 'paused',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '18px',
  },
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center',
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: '#aaa',
  fontSize: '0.9rem',
}));

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter component="footer">
      <StyledContainer maxWidth={false}>
        {/* Buy Me a Coffee Button */}
        <CoffeeSupport>
          <CoffeeButton
            onClick={() => {
              window.open('https://buy.stripe.com/28og07dRQ3BxbTi288', '_blank');
            }}
          >
            <CoffeeIcon />
            Buy Me a Coffee
          </CoffeeButton>
        </CoffeeSupport>

        <FooterGrid container spacing={4}>
          {/* Company Info Section */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h3">
              Biliku
            </FooterTitle>
            <FooterDescription>
              Find your perfect room or property with Biliku. We connect people with great places to live.
            </FooterDescription>
            <SocialLinks>
              <SocialLink aria-label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink aria-label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink aria-label="Twitter">
                <TwitterIcon />
              </SocialLink>
              <SocialLink aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
            </SocialLinks>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h4">
              Quick Links
            </FooterHeading>
            <FooterLinks>
              <RouterLink to="/" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  Home
                </FooterLink>
              </RouterLink>
              <RouterLink to="/about" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  About Us
                </FooterLink>
              </RouterLink>
              <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  Contact Us
                </FooterLink>
              </RouterLink>
            </FooterLinks>
          </Grid>

          {/* For Users Section */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h4">
              For Users
            </FooterHeading>
            <FooterLinks>
              <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  Login
                </FooterLink>
              </RouterLink>
              <RouterLink to="/register" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  Sign Up
                </FooterLink>
              </RouterLink>
              <RouterLink to="/profile" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  My Profile
                </FooterLink>
              </RouterLink>
              <RouterLink to="/my-listings" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  My Listings
                </FooterLink>
              </RouterLink>
            </FooterLinks>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h4">
              Legal
            </FooterHeading>
            <FooterLinks>
              <RouterLink to="/terms" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  Terms of Service
                </FooterLink>
              </RouterLink>
              <RouterLink to="/privacy" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  Privacy Policy
                </FooterLink>
              </RouterLink>
              <RouterLink to="/cookies" style={{ textDecoration: 'none' }}>
                <FooterLink>
                  Cookie Policy
                </FooterLink>
              </RouterLink>
            </FooterLinks>
          </Grid>
        </FooterGrid>

        <FooterBottom>
          <CopyrightText>
            © {currentYear} Biliku. All rights reserved.
          </CopyrightText>
        </FooterBottom>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;