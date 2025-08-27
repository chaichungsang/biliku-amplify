import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemText,
  Alert,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  CookieOutlined as CookieIcon,
  SettingsOutlined as SettingsIcon,
  AnalyticsOutlined as AnalyticsIcon,
  SecurityOutlined as SecurityIcon,
  PersonOutlined as PersonalizedIcon,
  ExpandMoreOutlined as ExpandMoreIcon,
  InfoOutlined as InfoIcon,
  VerifiedUserOutlined as VerifiedIcon,
  DeleteOutlineOutlined as DeleteIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(204, 0, 1, 0.8))',
  color: 'white',
  padding: '60px 0',
  position: 'relative',
  textAlign: 'center',
}));

const SectionCard = styled(Card)(({ theme }) => ({
  marginBottom: '30px',
  '& .MuiCardContent-root': {
    padding: '30px',
  },
}));

const SectionIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  '& .MuiSvgIcon-root': {
    fontSize: '28px',
    marginRight: '12px',
    color: '#cc0001',
  },
}));

const LastUpdated = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  marginBottom: '30px',
  textAlign: 'center',
}));

const CookieToggleCard = styled(Card)(({ theme }) => ({
  marginBottom: '15px',
  border: '2px solid transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#ffd100',
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#cc0001',
  color: '#fff',
  padding: '12px 40px',
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#ff0000',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(204, 0, 1, 0.3)',
  },
}));

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  advertising: boolean;
}

const CookiePage: React.FC = () => {
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    essential: true, // Always true, cannot be disabled
    analytics: true,
    functional: true,
    advertising: false,
  });
  const [saved, setSaved] = useState(false);

  React.useEffect(() => {
    document.title = 'Cookie Policy - Biliku | Cookie Usage and Management';
    // Load saved preferences from localStorage
    const savedSettings = localStorage.getItem('biliku-cookie-preferences');
    if (savedSettings) {
      setCookieSettings({ ...JSON.parse(savedSettings), essential: true });
    }
  }, []);

  const handleToggle = (type: keyof CookieSettings) => {
    if (type === 'essential') return; // Cannot toggle essential cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('biliku-cookie-preferences', JSON.stringify(cookieSettings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: <SecurityIcon />,
      required: true,
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      examples: 'Authentication, security, basic functionality',
      retention: 'Session or up to 1 year',
      enabled: cookieSettings.essential,
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: <AnalyticsIcon />,
      required: false,
      description: 'These cookies help us understand how visitors use our website.',
      examples: 'Google Analytics, usage statistics, performance monitoring',
      retention: 'Up to 2 years',
      enabled: cookieSettings.analytics,
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: <SettingsIcon />,
      required: false,
      description: 'These cookies enable enhanced functionality and personalization.',
      examples: 'Language preferences, user interface settings, search filters',
      retention: 'Up to 1 year',
      enabled: cookieSettings.functional,
    },
    {
      id: 'advertising',
      name: 'Advertising Cookies',
      icon: <PersonalizedIcon />,
      required: false,
      description: 'These cookies are used to show relevant advertisements.',
      examples: 'Ad targeting, remarketing, third-party advertising',
      retention: 'Up to 2 years',
      enabled: cookieSettings.advertising,
    },
  ];

  const cookieTable = [
    {
      name: 'biliku_session',
      type: 'Essential',
      purpose: 'User authentication and session management',
      duration: 'Session',
      provider: 'Biliku',
    },
    {
      name: 'biliku_preferences',
      type: 'Functional',
      purpose: 'Store user preferences and settings',
      duration: '1 year',
      provider: 'Biliku',
    },
    {
      name: '_ga',
      type: 'Analytics',
      purpose: 'Google Analytics - track user behavior',
      duration: '2 years',
      provider: 'Google',
    },
    {
      name: '_gid',
      type: 'Analytics',
      purpose: 'Google Analytics - distinguish users',
      duration: '24 hours',
      provider: 'Google',
    },
    {
      name: 'aws-auth',
      type: 'Essential',
      purpose: 'AWS Amplify authentication',
      duration: 'Session',
      provider: 'AWS',
    },
  ];

  const thirdPartyCookies = [
    {
      provider: 'Google Analytics',
      purpose: 'Website analytics and user behavior tracking',
      cookies: '_ga, _gid, _gat',
      optOut: 'https://tools.google.com/dlpage/gaoptout',
      privacy: 'https://policies.google.com/privacy',
    },
    {
      provider: 'AWS Amplify',
      purpose: 'Authentication and hosting services',
      cookies: 'aws-auth, amplify-*',
      optOut: 'Through our cookie settings',
      privacy: 'https://aws.amazon.com/privacy/',
    },
  ];

  return (
    <Box>
      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Cookie Policy</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <CookieIcon sx={{ fontSize: 60, color: '#ffd100', mb: 2 }} />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              marginBottom: '20px',
              color: '#ffd100',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Cookie Policy
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              marginBottom: '20px',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            How we use cookies and similar technologies
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <LastUpdated>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Last Updated: January 2024
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            This cookie policy explains how Biliku uses cookies and similar tracking technologies
          </Typography>
        </LastUpdated>

        {saved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your cookie preferences have been saved successfully!
          </Alert>
        )}

        {/* Cookie Settings */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <SettingsIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                Cookie Preferences
              </Typography>
            </SectionIcon>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                You can control which cookies we use by adjusting the settings below. 
                Essential cookies cannot be disabled as they are necessary for the website to function properly.
              </Typography>
            </Alert>

            {cookieTypes.map((cookieType) => (
              <CookieToggleCard key={cookieType.id}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      {cookieType.icon}
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {cookieType.name}
                          {cookieType.required && (
                            <Chip 
                              label="Required" 
                              size="small" 
                              color="error" 
                              sx={{ ml: 1 }} 
                            />
                          )}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                          {cookieType.description}
                        </Typography>
                      </Box>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={cookieType.enabled}
                          onChange={() => handleToggle(cookieType.id as keyof CookieSettings)}
                          disabled={cookieType.required}
                          color="primary"
                        />
                      }
                      label=""
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  <Box sx={{ ml: 4 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                      Examples: {cookieType.examples}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                      Retention: {cookieType.retention}
                    </Typography>
                  </Box>
                </CardContent>
              </CookieToggleCard>
            ))}

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <SaveButton onClick={handleSave}>
                Save Preferences
              </SaveButton>
            </Box>
          </CardContent>
        </SectionCard>

        {/* What Are Cookies */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <InfoIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                What Are Cookies?
              </Typography>
            </SectionIcon>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              Cookies are small text files that are stored on your computer or mobile device when you 
              visit a website. They help websites remember information about your visit, such as your 
              preferred language and other settings.
            </Typography>

            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText
                  primary="Session Cookies"
                  secondary="Temporary cookies that are deleted when you close your browser"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Persistent Cookies"
                  secondary="Cookies that remain on your device for a set period or until you delete them"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="First-Party Cookies"
                  secondary="Cookies set by Biliku directly"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Third-Party Cookies"
                  secondary="Cookies set by external services we use (like Google Analytics)"
                />
              </ListItem>
            </List>
          </CardContent>
        </SectionCard>

        {/* Cookies We Use */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <CookieIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                Cookies We Use
              </Typography>
            </SectionIcon>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              Below is a detailed list of cookies used on the Biliku platform:
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Cookie Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Provider</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cookieTable.map((cookie, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {cookie.name}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={cookie.type}
                          size="small"
                          color={cookie.type === 'Essential' ? 'error' : 'default'}
                          sx={{ 
                            backgroundColor: cookie.type === 'Analytics' ? '#e3f2fd' : 
                                           cookie.type === 'Functional' ? '#f3e5f5' : undefined
                          }}
                        />
                      </TableCell>
                      <TableCell>{cookie.purpose}</TableCell>
                      <TableCell>{cookie.duration}</TableCell>
                      <TableCell>{cookie.provider}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </SectionCard>

        {/* Third-Party Cookies */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <VerifiedIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                Third-Party Cookies and Services
              </Typography>
            </SectionIcon>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              We use trusted third-party services that may set their own cookies on your device:
            </Typography>

            {thirdPartyCookies.map((service, index) => (
              <Card key={index} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#cc0001' }}>
                    {service.provider}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Purpose:</strong> {service.purpose}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    <strong>Cookies:</strong> {service.cookies}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Opt-out:</strong> {service.optOut}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Privacy Policy:</strong> 
                    <Link href={service.privacy} target="_blank" color="primary" sx={{ ml: 1 }}>
                      View Policy
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </SectionCard>

        {/* Cookie Management */}
        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <DeleteIcon sx={{ mr: 2, color: '#cc0001' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              How to Manage and Delete Cookies
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              You can control and manage cookies in several ways:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Browser Settings"
                  secondary="Most browsers allow you to control cookies through their settings menu. You can typically find these under 'Privacy' or 'Security' settings."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Our Cookie Preferences"
                  secondary="Use the cookie settings on this page to control which types of cookies we can use."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Delete Existing Cookies"
                  secondary="You can delete all cookies currently stored on your device through your browser settings."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Block All Cookies"
                  secondary="You can set your browser to block all cookies, but this may prevent our website from working properly."
                />
              </ListItem>
            </List>

            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Note: Disabling cookies may affect the functionality of our website. Some features 
                may not work properly without cookies enabled.
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AnalyticsIcon sx={{ mr: 2, color: '#cc0001' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Google Analytics and Opt-Out
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              We use Google Analytics to understand how visitors use our website. Google Analytics 
              uses cookies to collect information about your usage patterns.
            </Typography>
            
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              To opt out of Google Analytics tracking:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Google Analytics Opt-out Browser Add-on"
                  secondary={
                    <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank" color="primary">
                      Download the official opt-out add-on
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Cookie Settings"
                  secondary="Disable 'Analytics Cookies' in our cookie preferences above"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Do Not Track"
                  secondary="Some browsers support 'Do Not Track' signals which we respect"
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SecurityIcon sx={{ mr: 2, color: '#cc0001' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Changes to This Cookie Policy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons.
            </Typography>
            
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              We will notify you of any material changes by posting the updated policy on this page 
              and updating the "Last Updated" date. We encourage you to review this policy periodically 
              to stay informed about how we use cookies.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 4 }} />

        {/* Contact Information */}
        <Card sx={{ backgroundColor: '#f8f9fa', p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#cc0001' }}>
            Questions About Our Cookie Usage?
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Email: privacy@biliku.com"
                secondary="For cookie and privacy-related questions"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Contact Form"
                secondary={
                  <Link component={RouterLink} to="/contact" color="primary">
                    Use our contact form for general inquiries
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Privacy Policy"
                secondary={
                  <Link component={RouterLink} to="/privacy" color="primary">
                    Read our full Privacy Policy
                  </Link>
                }
              />
            </ListItem>
          </List>
        </Card>

        {/* Browser-Specific Instructions */}
        <Card sx={{ mt: 3, p: 3, backgroundColor: '#fff3cd', border: '1px solid #ffd100' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#cc0001' }}>
            Browser-Specific Cookie Management
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
            For detailed instructions on managing cookies in specific browsers:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Google Chrome"
                secondary="Settings > Privacy and security > Cookies and other site data"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Mozilla Firefox" 
                secondary="Options > Privacy & Security > Cookies and Site Data"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Safari"
                secondary="Preferences > Privacy > Manage Website Data"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Microsoft Edge"
                secondary="Settings > Privacy, search, and services > Cookies"
              />
            </ListItem>
          </List>
        </Card>
      </Container>
    </Box>
  );
};

export default CookiePage;