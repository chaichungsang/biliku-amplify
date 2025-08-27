import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  styled,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Menu as MenuIcon,
  PersonAdd as PersonAddIcon,
  Favorite as FavoriteIcon,
  Home as ListingsIcon,
  Add as AddIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
} from '@mui/icons-material';
import { useAuthenticator } from '@aws-amplify/ui-react';

// Styled components for custom styling
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(145deg, #cc0001 0%, #cc0001 25%, #000000 25%, #000000 75%, #ffd100 75%, #ffd100 100%)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '15px 0',
  position: 'relative',
  zIndex: 3000,
  animation: 'sarawakPulse 8s infinite alternate',
  '@keyframes sarawakPulse': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '100%': {
      backgroundPosition: '100% 50%',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '10px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'visible',
  width: '100%',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-3px',
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  color: '#cc0001',
  fontSize: '1.8rem',
  fontWeight: 700,
  transition: 'color 0.3s',
  '&:hover': {
    color: '#b00001',
  },
  '&:hover .sarawak-flag': {
    animationPlayState: 'paused',
  },
}));

const SarawakFlag = styled('img')(({ theme }) => ({
  height: '35px',
  width: 'auto',
  borderRadius: '3px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  animation: 'flagSway 4s ease-in-out infinite',
  transformOrigin: 'top center',
  '@keyframes flagSway': {
    '0%, 100%': {
      transform: 'rotate(0deg)',
    },
    '50%': {
      transform: 'rotate(5deg)',
    },
  },
}));

const NavButton = styled(Button)(({ theme, active }: { theme?: any; active?: boolean }) => ({
  color: '#333',
  textDecoration: 'none',
  padding: '8px 12px',
  position: 'relative',
  fontWeight: active ? 600 : 500,
  fontSize: '1.1rem',
  borderRadius: '6px',
  backgroundColor: active ? 'rgba(204, 0, 1, 0.08)' : 'transparent',
  '&:hover': {
    color: '#cc0001',
    backgroundColor: 'rgba(204, 0, 1, 0.05)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '80%' : 0,
    height: active ? '3px' : '2px',
    backgroundColor: '#cc0001',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '80%',
  },
}));

const AuthButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variant'
})(({ variant }: { variant?: 'outlined' | 'contained' }) => ({
  padding: '10px 20px',
  borderRadius: '6px',
  fontWeight: 600,
  fontSize: '1.05rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  minWidth: '100px',
  position: 'relative',
  overflow: 'hidden',
  ...(variant === 'outlined' ? {
    border: '2px solid #cc0001',
    color: '#cc0001',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#cc0001',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(204, 0, 1, 0.2)',
    },
  } : {
    backgroundColor: '#cc0001',
    color: 'white',
    border: '2px solid #cc0001',
    boxShadow: '0 4px 12px rgba(204, 0, 1, 0.2)',
    '&:hover': {
      backgroundColor: '#b00001',
      borderColor: '#b00001',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(204, 0, 1, 0.3)',
    },
  }),
}));

const DropdownToggle = styled(Button)(({ theme }) => ({
  background: 'none',
  border: '1px solid #ddd',
  fontSize: '1rem',
  color: '#333',
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: '6px',
  textTransform: 'none',
  minWidth: 'auto',
  '&:hover': {
    borderColor: '#cc0001',
    color: '#cc0001',
    backgroundColor: 'transparent',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '6px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    minWidth: '220px',
    marginTop: '8px',
  },
  '& .MuiMenuItem-root': {
    padding: '12px 15px',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      '& .MuiListItemIcon-root': {
        color: '#cc0001',
      },
      '& .MuiListItemText-primary': {
        color: '#cc0001',
      },
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: '28px',
    color: '#555',
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authStatus, signOut, user } = useAuthenticator((context) => [
    context.authStatus,
    context.signOut,
    context.user,
  ]);

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = authStatus === 'authenticated';
  
  // Mock admin status - you can replace this with actual admin check
  const userIsAdmin = false; // Replace with actual admin logic

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleUserMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle click outside for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleUserMenuClose();
      }
    };

    if (userMenuAnchor) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [userMenuAnchor]);

  // Close dropdown when navigating
  useEffect(() => {
    handleUserMenuClose();
    handleMobileMenuClose();
  }, [location.pathname]);

  const getUserDisplayName = () => {
    if (user && 'attributes' in user) {
      const attributes = user.attributes as any;
      if (attributes?.name || attributes?.given_name) {
        return attributes.name || `${attributes.given_name} ${attributes.family_name || ''}`.trim();
      }
      if (attributes?.email) {
        return attributes.email.split('@')[0];
      }
    }
    return 'My Account';
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoContainer component="div">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
            <SarawakFlag 
              src="/assets/images/flags/sarawak-flag.png" 
              alt="Sarawak Flag" 
              className="sarawak-flag"
            />
            <Typography variant="h6" component="span">
              Biliku
            </Typography>
          </Link>
        </LogoContainer>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, margin: '0 20px', flex: 1, justifyContent: 'center' }}>
          <Button component={Link} to="/" sx={{ 
            color: '#333', textDecoration: 'none', padding: '8px 12px', position: 'relative', 
            fontWeight: location.pathname === '/' ? 600 : 500, fontSize: '1.1rem', borderRadius: '6px',
            backgroundColor: location.pathname === '/' ? 'rgba(204, 0, 1, 0.08)' : 'transparent',
            '&:hover': { color: '#cc0001', backgroundColor: 'rgba(204, 0, 1, 0.05)' }
          }}>
            Home
          </Button>
          <Button component={Link} to="/about" sx={{ 
            color: '#333', textDecoration: 'none', padding: '8px 12px', position: 'relative', 
            fontWeight: location.pathname === '/about' ? 600 : 500, fontSize: '1.1rem', borderRadius: '6px',
            backgroundColor: location.pathname === '/about' ? 'rgba(204, 0, 1, 0.08)' : 'transparent',
            '&:hover': { color: '#cc0001', backgroundColor: 'rgba(204, 0, 1, 0.05)' }
          }}>
            About
          </Button>
          <Button component={Link} to="/contact" sx={{ 
            color: '#333', textDecoration: 'none', padding: '8px 12px', position: 'relative', 
            fontWeight: location.pathname === '/contact' ? 600 : 500, fontSize: '1.1rem', borderRadius: '6px',
            backgroundColor: location.pathname === '/contact' ? 'rgba(204, 0, 1, 0.08)' : 'transparent',
            '&:hover': { color: '#cc0001', backgroundColor: 'rgba(204, 0, 1, 0.05)' }
          }}>
            Contact Us
          </Button>
        </Box>

        {/* Desktop Auth Buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5 }} ref={dropdownRef}>
          {isAuthenticated ? (
            <>
              <DropdownToggle
                onClick={handleUserMenuOpen}
                endIcon={<ArrowDownIcon />}
              >
                {getUserDisplayName()}
              </DropdownToggle>
              <StyledMenu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/my-listings" onClick={handleUserMenuClose}>
                  <ListItemIcon><ListingsIcon /></ListItemIcon>
                  <ListItemText>My Listings</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/favorites" onClick={handleUserMenuClose}>
                  <ListItemIcon><FavoriteIcon /></ListItemIcon>
                  <ListItemText>Favorites</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/add-room" onClick={handleUserMenuClose}>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText>Add Listing</ListItemText>
                </MenuItem>
                {userIsAdmin && (
                  <MenuItem component={Link} to="/admin" onClick={handleUserMenuClose}>
                    <ListItemIcon><AdminIcon /></ListItemIcon>
                    <ListItemText>Admin Dashboard</ListItemText>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </StyledMenu>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <AuthButton variant="outlined">
                  Login
                </AuthButton>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <AuthButton variant="contained">
                  Sign Up
                </AuthButton>
              </Link>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ color: '#333' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem component={Link} to="/about" onClick={handleMobileMenuClose}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText>About</ListItemText>
            </MenuItem>
            <MenuItem component={Link} to="/contact" onClick={handleMobileMenuClose}>
              <ListItemIcon><ContactIcon /></ListItemIcon>
              <ListItemText>Contact Us</ListItemText>
            </MenuItem>
            
            {isAuthenticated ? (
              <>
                <Divider />
                <MenuItem component={Link} to="/profile" onClick={handleMobileMenuClose}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/my-listings" onClick={handleMobileMenuClose}>
                  <ListItemIcon><ListingsIcon /></ListItemIcon>
                  <ListItemText>My Listings</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/favorites" onClick={handleMobileMenuClose}>
                  <ListItemIcon><FavoriteIcon /></ListItemIcon>
                  <ListItemText>Favorites</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/add-room" onClick={handleMobileMenuClose}>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText>Add Listing</ListItemText>
                </MenuItem>
                {userIsAdmin && (
                  <MenuItem component={Link} to="/admin" onClick={handleMobileMenuClose}>
                    <ListItemIcon><AdminIcon /></ListItemIcon>
                    <ListItemText>Admin Dashboard</ListItemText>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </>
            ) : (
              <>
                <Divider />
                <MenuItem component={Link} to="/login" onClick={handleMobileMenuClose}>
                  <ListItemIcon><LoginIcon /></ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleMobileMenuClose}>
                  <ListItemIcon><PersonAddIcon /></ListItemIcon>
                  <ListItemText>Sign Up</ListItemText>
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;