import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  PrivacyTipOutlined as PrivacyIcon,
  SecurityOutlined as SecurityIcon,
  DataUsageOutlined as DataIcon,
  CookieOutlined as CookieIcon,
  ShareOutlined as ShareIcon,
  PersonOutlined as PersonIcon,
  ExpandMoreOutlined as ExpandMoreIcon,
  VerifiedUserOutlined as VerifiedIcon,
  DeleteOutlineOutlined as DeleteIcon,
  CloudOutlined as CloudIcon,
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

const HighlightBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff3cd',
  border: '1px solid #ffd100',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
}));

const PrivacyPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy - Biliku | Your Privacy Matters';
  }, []);

  const dataCollectionTable = [
    {
      category: 'Account Information',
      data: 'Name, email address, phone number, profile picture',
      purpose: 'User identification, communication, account management',
      retention: 'Until account deletion',
    },
    {
      category: 'Property Listings',
      data: 'Property details, photos, descriptions, location',
      purpose: 'Displaying listings, matching with potential tenants',
      retention: '2 years after listing removal',
    },
    {
      category: 'Communication Data',
      data: 'Messages, inquiries, support communications',
      purpose: 'Facilitating user communication, customer support',
      retention: '1 year after last interaction',
    },
    {
      category: 'Usage Analytics',
      data: 'Page views, search queries, user behavior patterns',
      purpose: 'Platform improvement, user experience enhancement',
      retention: '12 months',
    },
    {
      category: 'Technical Data',
      data: 'IP address, browser information, device data',
      purpose: 'Security, fraud prevention, technical optimization',
      retention: '6 months',
    },
  ];

  const thirdPartyServices = [
    {
      service: 'AWS Amplify',
      purpose: 'Authentication, hosting, data storage',
      dataShared: 'Account information, usage data',
      privacy: 'AWS Privacy Policy',
    },
    {
      service: 'Google Services',
      purpose: 'Authentication, analytics, maps',
      dataShared: 'Profile information, usage statistics',
      privacy: 'Google Privacy Policy',
    },
    {
      service: 'Email Service Providers',
      purpose: 'Sending notifications and updates',
      dataShared: 'Email addresses, basic profile info',
      privacy: 'Provider-specific policies',
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
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <PrivacyIcon sx={{ fontSize: 60, color: '#ffd100', mb: 2 }} />
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
            Privacy Policy
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
            Your privacy and data protection rights
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <LastUpdated>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Last Updated: January 2024
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            This privacy policy is compliant with Malaysian Personal Data Protection Act 2010 (PDPA)
          </Typography>
        </LastUpdated>

        <HighlightBox>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#cc0001' }}>
            Our Privacy Commitment
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            At Biliku, we are committed to protecting your privacy and ensuring the security of your 
            personal data. This policy explains how we collect, use, and protect your information 
            in compliance with Malaysian data protection laws.
          </Typography>
        </HighlightBox>

        {/* Information We Collect */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <DataIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                1. Information We Collect
              </Typography>
            </SectionIcon>
            
            <Typography variant="h6" sx={{ mb: 2, color: '#cc0001' }}>
              Personal Data Collection
            </Typography>
            
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Data Collected</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Retention</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataCollectionTable.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Chip 
                          label={row.category} 
                          size="small" 
                          sx={{ backgroundColor: '#ffd100', color: '#000' }}
                        />
                      </TableCell>
                      <TableCell>{row.data}</TableCell>
                      <TableCell>{row.purpose}</TableCell>
                      <TableCell>{row.retention}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText
                  primary="Voluntary Information"
                  secondary="Information you provide when creating an account, posting listings, or contacting us"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Automatic Information"
                  secondary="Technical data collected automatically when you use our platform, including IP address, browser type, and usage patterns"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Communication Records"
                  secondary="Messages and communications between users, support tickets, and feedback"
                />
              </ListItem>
            </List>
          </CardContent>
        </SectionCard>

        {/* How We Use Your Information */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <PersonIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                2. How We Use Your Information
              </Typography>
            </SectionIcon>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              We use your personal data for the following purposes, all of which have lawful bases 
              under the Malaysian Personal Data Protection Act 2010:
            </Typography>

            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText
                  primary="Platform Services"
                  secondary="To provide and maintain our rental platform services, including user authentication, property listings, and communication facilitation"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Communication"
                  secondary="To send important updates, respond to inquiries, provide customer support, and notify you about relevant platform activities"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Safety and Security"
                  secondary="To verify user identities, prevent fraud, ensure platform safety, and comply with legal obligations"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Service Improvement"
                  secondary="To analyze usage patterns, improve platform functionality, and develop new features based on user needs"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Legal Compliance"
                  secondary="To comply with applicable Malaysian laws, regulations, and legal processes"
                />
              </ListItem>
            </List>
          </CardContent>
        </SectionCard>

        {/* Data Sharing and Third Parties */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <ShareIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                3. Data Sharing and Third-Party Services
              </Typography>
            </SectionIcon>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                We do not sell, rent, or trade your personal data to third parties for marketing purposes.
              </Typography>
            </Alert>

            <Typography variant="h6" sx={{ mb: 2, color: '#cc0001' }}>
              Third-Party Service Providers
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Data Shared</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Privacy Policy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {thirdPartyServices.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell>{service.service}</TableCell>
                      <TableCell>{service.purpose}</TableCell>
                      <TableCell>{service.dataShared}</TableCell>
                      <TableCell>{service.privacy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
              We may share your information in the following limited circumstances:
            </Typography>

            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText
                  primary="With Your Consent"
                  secondary="When you explicitly agree to share information for specific purposes"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Legal Requirements"
                  secondary="When required by Malaysian law, court orders, or regulatory authorities"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Business Transfers"
                  secondary="In the event of a merger, acquisition, or sale of assets (with user notification)"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Safety and Security"
                  secondary="To protect the rights, property, or safety of Biliku, our users, or others"
                />
              </ListItem>
            </List>
          </CardContent>
        </SectionCard>

        {/* Data Security */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <SecurityIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                4. Data Security and Protection
              </Typography>
            </SectionIcon>
            
            <HighlightBox>
              <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 500 }}>
                We implement industry-standard security measures to protect your personal data from 
                unauthorized access, disclosure, alteration, or destruction.
              </Typography>
            </HighlightBox>

            <Typography variant="h6" sx={{ mb: 2, color: '#cc0001' }}>
              Security Measures Include:
            </Typography>

            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemIcon>
                  <CloudIcon sx={{ color: '#cc0001' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Encrypted Data Storage"
                  secondary="All personal data is encrypted both in transit and at rest using industry-standard encryption"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VerifiedIcon sx={{ color: '#cc0001' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Secure Authentication"
                  secondary="Multi-factor authentication and secure login processes protect user accounts"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon sx={{ color: '#cc0001' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Regular Security Audits"
                  secondary="We conduct regular security assessments and vulnerability testing"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon sx={{ color: '#cc0001' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Employee Training"
                  secondary="Our team receives regular privacy and security training"
                />
              </ListItem>
            </List>

            <Alert severity="warning" sx={{ mt: 3 }}>
              <Typography variant="body2">
                While we implement robust security measures, no method of transmission over the internet 
                is 100% secure. We cannot guarantee absolute security but continuously work to protect your data.
              </Typography>
            </Alert>
          </CardContent>
        </SectionCard>

        {/* Your Rights */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <VerifiedIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                5. Your Privacy Rights (PDPA Malaysia)
              </Typography>
            </SectionIcon>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              Under the Malaysian Personal Data Protection Act 2010, you have the following rights:
            </Typography>

            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText
                  primary="Right to Access"
                  secondary="Request access to your personal data that we process and receive a copy of this data"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Right to Correction"
                  secondary="Request correction of inaccurate or incomplete personal data"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Right to Withdraw Consent"
                  secondary="Withdraw your consent for data processing where consent is the legal basis"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Right to Data Portability"
                  secondary="Request your data in a structured, commonly used, and machine-readable format"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Right to Limit Processing"
                  secondary="Request limitation of processing of your personal data in certain circumstances"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Right to Object"
                  secondary="Object to processing of your personal data for direct marketing purposes"
                />
              </ListItem>
            </List>

            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f8f0', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                How to Exercise Your Rights:
              </Typography>
              <Typography variant="body2">
                To exercise any of these rights, please contact us at privacy@biliku.com or through our 
                contact form. We will respond to your request within 21 days as required by Malaysian law.
              </Typography>
            </Box>
          </CardContent>
        </SectionCard>

        {/* Data Retention and Deletion */}
        <SectionCard>
          <CardContent>
            <SectionIcon>
              <DeleteIcon />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                6. Data Retention and Deletion
              </Typography>
            </SectionIcon>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              We retain your personal data only for as long as necessary to fulfill the purposes 
              outlined in this policy or as required by Malaysian law.
            </Typography>

            <Typography variant="h6" sx={{ mb: 2, color: '#cc0001' }}>
              Retention Periods:
            </Typography>

            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText
                  primary="Active Accounts"
                  secondary="Personal data is retained while your account remains active"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Inactive Accounts"
                  secondary="Data may be retained for up to 2 years after last login for reactivation purposes"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Legal Obligations"
                  secondary="Some data may be retained longer if required by Malaysian law or for legal proceedings"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Anonymized Data"
                  secondary="Aggregated, anonymized data may be retained indefinitely for analytics and research"
                />
              </ListItem>
            </List>

            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                You can request account deletion at any time. Upon verification, we will delete your 
                personal data within 30 days, except where retention is required by law.
              </Typography>
            </Alert>
          </CardContent>
        </SectionCard>

        {/* Cookies and Tracking */}
        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CookieIcon sx={{ mr: 2, color: '#cc0001' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Cookies and Tracking Technologies
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
              and understand user preferences. For detailed information about our cookie practices, please 
              refer to our <Link component={RouterLink} to="/cookies" color="primary">Cookie Policy</Link>.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              You can control cookie preferences through your browser settings. However, disabling cookies 
              may affect the functionality of our platform.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <PersonIcon sx={{ mr: 2, color: '#cc0001' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Children's Privacy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              Our platform is not intended for children under 18 years of age. We do not knowingly collect 
              personal data from children under 18. If you are a parent or guardian and believe your child 
              has provided us with personal data, please contact us immediately.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              If we discover that we have collected personal data from a child under 18, we will take steps 
              to delete such information from our systems promptly.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SecurityIcon sx={{ mr: 2, color: '#cc0001' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              International Data Transfers
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              Your personal data may be processed and stored in countries other than Malaysia, including 
              countries that may not have data protection laws equivalent to those in Malaysia.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              When we transfer your data internationally, we ensure appropriate safeguards are in place 
              to protect your privacy rights, including using service providers that comply with international 
              data protection standards.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 4 }} />

        {/* Contact Information */}
        <Card sx={{ backgroundColor: '#f8f9fa', p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#cc0001' }}>
            Privacy Questions and Contact Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            If you have any questions about this Privacy Policy, your privacy rights, or our data practices, 
            please contact our Privacy Officer:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Email: privacy@biliku.com"
                secondary="For privacy-related inquiries and data protection requests"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="General Contact"
                secondary={
                  <Link component={RouterLink} to="/contact" color="primary">
                    Use our contact form for general questions
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Postal Address: Kuching, Sarawak, Malaysia"
                secondary="Our privacy team is based in Kuching"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Response Time: Within 21 days"
                secondary="As required by Malaysian Personal Data Protection Act 2010"
              />
            </ListItem>
          </List>
        </Card>

        {/* Final Notice */}
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            <strong>Policy Updates:</strong> We may update this Privacy Policy from time to time. 
            We will notify you of any material changes by posting the updated policy on our platform 
            and updating the "Last Modified" date. Your continued use of our platform after any changes 
            constitutes acceptance of the updated policy.
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
};

export default PrivacyPage;