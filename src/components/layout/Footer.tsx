import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Button,
  styled,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  LocalCafe as CoffeeIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  Support as SupportIcon,
  LocationCity as LocationIcon,
} from '@mui/icons-material';

// Styled components for redesigned footer
const StyledFooter = styled(Box)(({ theme }) => ({
  background: '#000000',
  color: '#fff',
  padding: '40px 0 20px',
  marginTop: '50px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  width: '100%',
  boxSizing: 'border-box',
  clear: 'both',
  [theme.breakpoints.down('md')]: {
    padding: '30px 0 20px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '6px',
    background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, rgba(0, 0, 0, 0.8) 33%, rgba(0, 0, 0, 0.8) 66%, #ffd100 66%, #ffd100 100%)',
    zIndex: 1,
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 20px',
  position: 'relative',
  zIndex: 2,
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '20px',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(255, 209, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    padding: '0 16px',
    borderRadius: '16px',
  },
}));

// Quick actions section for mobile
const QuickActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  marginBottom: '30px',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const QuickActionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  minHeight: '44px', // Accessibility: minimum touch target
  borderRadius: '22px',
  fontWeight: 600,
  fontSize: '0.875rem',
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  '&.primary': {
    backgroundColor: '#cc0001',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#b30001',
    },
  },
  '&.secondary': {
    backgroundColor: '#e6bc00', // Darker yellow for better contrast
    color: '#000',
    '&:hover': {
      backgroundColor: '#d1a800',
    },
  },
}));

const FooterGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '30px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '20px',
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  marginBottom: '16px',
  color: '#e6bc00', // Improved contrast
  position: 'relative',
  display: 'inline-block',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  fontWeight: 700,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-6px',
    width: '50px',
    height: '3px',
    backgroundColor: '#cc0001',
    borderRadius: '3px',
  },
}));

// Collapsible section for mobile
const CollapsibleSection = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginBottom: '20px',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  minHeight: '44px', // Accessibility: minimum touch target
  [theme.breakpoints.up('md')]: {
    cursor: 'default',
    '& .expand-icon': {
      display: 'none',
    },
  },
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  marginBottom: '16px',
  color: '#e6bc00', // Improved contrast
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
    marginBottom: '0',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-6px',
    width: '35px',
    height: '2px',
    backgroundColor: '#cc0001',
    borderRadius: '3px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const ExpandIcon = styled(ExpandMoreIcon)<{ expanded: boolean }>(({ theme, expanded }) => ({
  transition: 'transform 0.3s ease',
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  color: '#e6bc00',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const FooterDescription = styled(Typography)(({ theme }) => ({
  marginBottom: '20px',
  color: '#f5f5f5',
  lineHeight: 1.6,
  fontSize: '1rem',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
}));

// Sarawak locations section
const LocationsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '8px',
  marginBottom: '20px',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const LocationChip = styled(Box)(({ theme }) => ({
  padding: '6px 12px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  fontSize: '0.875rem',
  color: '#e6bc00',
  textAlign: 'center',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'rgba(230, 188, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const SocialLink = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px', // Accessibility: minimum touch target
  height: '44px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  borderRadius: '50%',
  transition: 'all 0.3s',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-3px)',
    color: '#e6bc00',
  },
  '&:focus': {
    outline: '2px solid #e6bc00',
    outlineOffset: '2px',
  },
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  gap: '8px',
}));

const FooterLink = styled(Box)(({ theme }) => ({
  color: '#f5f5f5',
  textDecoration: 'none',
  transition: 'all 0.3s',
  position: 'relative',
  paddingLeft: '20px',
  fontSize: '0.95rem',
  cursor: 'pointer',
  minHeight: '32px', // Better touch target
  display: 'flex',
  alignItems: 'center',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '4px',
  padding: '8px 8px 8px 20px',
  '&::before': {
    content: '"›"',
    position: 'absolute',
    left: '8px',
    color: '#e6bc00',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  },
  '&:hover': {
    color: '#e6bc00',
    backgroundColor: 'rgba(230, 188, 0, 0.1)',
    transform: 'translateX(3px)',
    textDecoration: 'none',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  '&:focus': {
    outline: '2px solid #e6bc00',
    outlineOffset: '2px',
  },
  '&.primary': {
    fontWeight: 600,
    color: '#e6bc00',
    '&::before': {
      content: '"★"',
      color: '#cc0001',
    },
  },
}));

// Relocated coffee support - now smaller and less prominent
const CoffeeSupport = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '20px',
  padding: '10px 0',
  [theme.breakpoints.down('md')]: {
    marginTop: '15px',
  },
}));

const CoffeeButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#e6bc00',
  border: '1px solid rgba(230, 188, 0, 0.3)',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  minHeight: '36px',
  textDecoration: 'none',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(230, 188, 0, 0.1)',
    borderColor: '#e6bc00',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  '&:focus': {
    outline: '2px solid #e6bc00',
    outlineOffset: '2px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: '#aaa',
  fontSize: '0.875rem',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

// Component for collapsible sections on mobile
const CollapsibleFooterSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}> = ({ title, icon, children, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <CollapsibleSection>
      <SectionHeader
        onClick={() => isMobile && setExpanded(!expanded)}
        role={isMobile ? "button" : undefined}
        aria-expanded={isMobile ? expanded : undefined}
        tabIndex={isMobile ? 0 : undefined}
        onKeyDown={(e) => {
          if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
      >
        <FooterHeading variant="h4">
          {icon}
          {title}
        </FooterHeading>
        {isMobile && (
          <ExpandIcon 
            className="expand-icon" 
            expanded={expanded}
            aria-label={expanded ? "Collapse section" : "Expand section"}
          />
        )}
      </SectionHeader>
      
      <Collapse in={!isMobile || expanded} timeout={300}>
        <Box sx={{ paddingTop: isMobile ? '12px' : '0' }}>
          {children}
        </Box>
      </Collapse>
    </CollapsibleSection>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sarawakCities = [
    'Kuching', 'Miri', 'Sibu', 'Bintulu', 'Limbang', 'Sarikei'
  ];

  return (
    <StyledFooter component="footer" role="contentinfo">
      <StyledContainer maxWidth={false}>
        {/* Mobile Quick Actions */}
        <QuickActions>
          <QuickActionButton 
            className="primary"
            onClick={() => window.location.href = '/login'}
            aria-label="List your property on Biliku"
          >
            <BusinessIcon sx={{ fontSize: '18px' }} />
            List Property
          </QuickActionButton>
          <QuickActionButton 
            className="secondary"
            onClick={() => window.location.href = '/'}
            aria-label="Browse available rooms"
          >
            <HomeIcon sx={{ fontSize: '18px' }} />
            Browse Rooms
          </QuickActionButton>
        </QuickActions>

        <FooterGrid container spacing={4}>
          {/* Brand & Regional Focus Section */}
          <Grid item xs={12} lg={3}>
            <FooterTitle variant="h2">
              Biliku
            </FooterTitle>
            <FooterDescription>
              Sarawak's premier room rental platform. Connecting communities across East Malaysia with trusted, verified accommodations.
            </FooterDescription>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#e6bc00', 
                fontWeight: 600, 
                marginBottom: '12px',
                fontSize: '0.9rem' 
              }}
            >
              Available in Sarawak:
            </Typography>
            <LocationsGrid>
              {sarawakCities.map((city) => (
                <LocationChip
                  key={city}
                  role="button"
                  tabIndex={0}
                  aria-label={`Search rooms in ${city}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      // Handle city search - could integrate with search functionality
                      console.log(`Search rooms in ${city}`);
                    }
                  }}
                >
                  {city}
                </LocationChip>
              ))}
            </LocationsGrid>

            <SocialLinks>
              <SocialLink 
                aria-label="Follow Biliku on Facebook"
                role="link"
                tabIndex={0}
                onClick={() => window.open('#', '_blank')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open('#', '_blank');
                  }
                }}
              >
                <FacebookIcon />
              </SocialLink>
              <SocialLink 
                aria-label="Follow Biliku on Instagram"
                role="link"
                tabIndex={0}
                onClick={() => window.open('#', '_blank')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open('#', '_blank');
                  }
                }}
              >
                <InstagramIcon />
              </SocialLink>
              <SocialLink 
                aria-label="Follow Biliku on Twitter"
                role="link"
                tabIndex={0}
                onClick={() => window.open('#', '_blank')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open('#', '_blank');
                  }
                }}
              >
                <TwitterIcon />
              </SocialLink>
              <SocialLink 
                aria-label="Follow Biliku on LinkedIn"
                role="link"
                tabIndex={0}
                onClick={() => window.open('#', '_blank')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open('#', '_blank');
                  }
                }}
              >
                <LinkedInIcon />
              </SocialLink>
            </SocialLinks>
          </Grid>

          {/* For Tenants Section */}
          <Grid item xs={12} sm={6} lg={3}>
            <CollapsibleFooterSection 
              title="For Tenants"
              icon={<HomeIcon />}
              defaultExpanded={!isMobile}
            >
              <FooterLinks role="list">
                <RouterLink to="/" style={{ textDecoration: 'none' }}>
                  <FooterLink className="primary" role="listitem">
                    Browse Rooms
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/listings" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    All Listings
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/about" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    How It Works
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    Find Help
                  </FooterLink>
                </RouterLink>
              </FooterLinks>
            </CollapsibleFooterSection>
          </Grid>

          {/* For Landlords Section */}
          <Grid item xs={12} sm={6} lg={3}>
            <CollapsibleFooterSection 
              title="For Landlords"
              icon={<BusinessIcon />}
              defaultExpanded={!isMobile}
            >
              <FooterLinks role="list">
                <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                  <FooterLink className="primary" role="listitem">
                    List Your Property
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/my-listings" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    My Listings
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/about" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    Learn More
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    Get Support
                  </FooterLink>
                </RouterLink>
              </FooterLinks>
            </CollapsibleFooterSection>
          </Grid>

          {/* Support & Legal Section */}
          <Grid item xs={12} sm={6} lg={3}>
            <CollapsibleFooterSection 
              title="Support & Legal"
              icon={<SupportIcon />}
              defaultExpanded={!isMobile}
            >
              <FooterLinks role="list">
                <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
                  <FooterLink className="primary" role="listitem">
                    Contact Support
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/about" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    About Us
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/terms" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    Terms of Service
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/privacy" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    Privacy Policy
                  </FooterLink>
                </RouterLink>
                <RouterLink to="/cookies" style={{ textDecoration: 'none' }}>
                  <FooterLink role="listitem">
                    Cookie Policy
                  </FooterLink>
                </RouterLink>
              </FooterLinks>
            </CollapsibleFooterSection>
          </Grid>
        </FooterGrid>

        <FooterBottom>
          <CopyrightText>
            © {currentYear} Biliku. All rights reserved. Made with ❤️ in Sarawak.
          </CopyrightText>
          
          {/* Relocated and de-emphasized coffee support */}
          <CoffeeSupport>
            <CoffeeButton
              onClick={() => {
                window.open('https://buy.stripe.com/28og07dRQ3BxbTi288', '_blank');
              }}
              aria-label="Support Biliku development with a coffee donation"
            >
              <CoffeeIcon />
              Buy Me a Coffee
            </CoffeeButton>
          </CoffeeSupport>
        </FooterBottom>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;