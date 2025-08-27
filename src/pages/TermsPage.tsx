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
} from '@mui/material';
import {
  GavelOutlined as LegalIcon,
  SecurityOutlined as SecurityIcon,
  PersonOutlined as UserIcon,
  HomeWorkOutlined as PropertyIcon,
  PaymentOutlined as PaymentIcon,
  ReportOutlined as DisputeIcon,
  ExpandMoreOutlined as ExpandMoreIcon,
  WarningOutlined as WarningIcon,
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

const ImportantNotice = styled(Alert)(({ theme }) => ({
  marginBottom: '30px',
  '& .MuiAlert-message': {
    lineHeight: 1.6,
  },
}));

const TermsPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Terms of Service - Biliku | Legal Terms and Conditions';
  }, []);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <LegalIcon />,
      content: [
        'By accessing and using Biliku ("the Platform", "our Service"), you accept and agree to be bound by the terms and provisions of this agreement.',
        'These Terms of Service ("Terms") apply to all users of the Platform, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.',
        'If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.',
        'The Platform is operated by Biliku ("we", "us", "our"), a property rental platform serving the state of Sarawak, Malaysia.',
      ]
    },
    {
      id: 'definitions',
      title: 'Definitions',
      icon: <UserIcon />,
      content: [
        '"Platform" refers to the Biliku website and all associated services.',
        '"User" refers to any person who uses our Platform, including tenants, landlords, and property agents.',
        '"Listing" refers to any property advertisement posted on our Platform.',
        '"Content" refers to all information, data, text, images, and other materials posted on the Platform.',
        '"Services" refers to all features and functionality provided by the Platform.',
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: <UserIcon />,
      content: [
        'Users must provide accurate, current, and complete information when creating an account and posting listings.',
        'Users are responsible for maintaining the security of their account credentials.',
        'Users must comply with all applicable Malaysian laws and regulations.',
        'Users must not post false, misleading, or fraudulent information.',
        'Users must respect the rights and privacy of other users.',
        'Users must not engage in any activity that could harm the Platform or other users.',
        'Users must promptly update their information if it changes.',
      ]
    },
    {
      id: 'property-listings',
      title: 'Property Listings and Content',
      icon: <PropertyIcon />,
      content: [
        'Property owners and agents may post rental listings for properties located in Sarawak, Malaysia.',
        'All listings must be accurate and represent real, available properties.',
        'Photos and descriptions must accurately represent the property.',
        'Users posting listings warrant that they have the legal right to rent the property.',
        'Biliku reserves the right to review, modify, or remove any listing at our discretion.',
        'Users retain ownership of content they post but grant Biliku a license to use it on the Platform.',
        'Duplicate or spam listings are prohibited.',
        'Commercial listings must be clearly identified as such.',
      ]
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      icon: <WarningIcon />,
      content: [
        'You may not use our Platform for any unlawful purpose or to solicit others to perform unlawful acts.',
        'You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.',
        'You may not infringe upon or violate our intellectual property rights or the intellectual property rights of others.',
        'You may not harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate.',
        'You may not submit false or misleading information.',
        'You may not upload or transmit viruses or any other type of malicious code.',
        'You may not spam users with unwanted communications.',
        'You may not attempt to impersonate another user or person.',
      ]
    },
    {
      id: 'platform-services',
      title: 'Platform Services',
      icon: <SecurityIcon />,
      content: [
        'Biliku provides a platform connecting property owners and potential tenants in Sarawak.',
        'Our services are provided "as is" without any warranties, express or implied.',
        'We do not guarantee the accuracy, completeness, or reliability of user-generated content.',
        'We are not responsible for the actual rental transactions between users.',
        'We reserve the right to modify or discontinue services at any time without notice.',
        'We may suspend or terminate user accounts that violate these Terms.',
        'We provide dispute resolution assistance but are not obligated to resolve all disputes.',
      ]
    },
    {
      id: 'payments-fees',
      title: 'Payments and Fees',
      icon: <PaymentIcon />,
      content: [
        'Biliku is currently a free platform for all users - tenants, landlords, and property agents.',
        'We reserve the right to introduce fees for certain premium services in the future.',
        'Any future fees will be clearly communicated to users in advance.',
        'Users will not be charged without their explicit consent.',
        'All rental payments and deposits are arranged directly between tenants and landlords.',
        'Biliku is not responsible for payment disputes between users.',
        'We do not collect, hold, or transfer rental payments.',
      ]
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      icon: <DisputeIcon />,
      content: [
        'Disputes between users should first be resolved directly between the parties involved.',
        'Biliku may provide mediation assistance for disputes related to platform use.',
        'For serious violations, users may report issues through our contact form.',
        'We reserve the right to suspend accounts during dispute investigations.',
        'Legal disputes shall be governed by Malaysian law and resolved in Sarawak courts.',
        'Users agree to attempt mediation before pursuing legal action.',
        'Class action lawsuits are prohibited; disputes must be resolved individually.',
      ]
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
          <Typography color="text.primary">Terms of Service</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <LegalIcon sx={{ fontSize: 60, color: '#ffd100', mb: 2 }} />
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
            Terms of Service
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
            Legal terms and conditions for using Biliku
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <LastUpdated>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Last Updated: January 2024
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            These terms are effective immediately for all users of the Biliku platform
          </Typography>
        </LastUpdated>

        <ImportantNotice severity="warning">
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            Important Legal Notice
          </Typography>
          <Typography variant="body2">
            Please read these Terms of Service carefully before using our platform. 
            By using Biliku, you agree to be bound by these terms. If you disagree with any 
            part of these terms, please do not use our service.
          </Typography>
        </ImportantNotice>

        {/* Terms Sections */}
        <Box sx={{ mb: 4 }}>
          {sections.map((section, index) => (
            <SectionCard key={section.id}>
              <CardContent>
                <SectionIcon>
                  {section.icon}
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
                    {index + 1}. {section.title}
                  </Typography>
                </SectionIcon>
                
                <List sx={{ pl: 2 }}>
                  {section.content.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ py: 1, alignItems: 'flex-start' }}>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                            {item}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </SectionCard>
          ))}
        </Box>

        {/* Additional Legal Information */}
        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Intellectual Property Rights
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              The Biliku platform and its original content, features, and functionality are and will remain 
              the exclusive property of Biliku and its licensors. The service is protected by copyright, 
              trademark, and other laws.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              Our trademarks and trade dress may not be used in connection with any product or service 
              without our prior written consent.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Limitation of Liability
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              In no event shall Biliku, nor its directors, employees, partners, agents, suppliers, or 
              affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other 
              intangible losses.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              This limitation applies whether the alleged liability is based on contract, tort, negligence, 
              strict liability, or any other basis.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Governing Law
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              These Terms shall be interpreted and governed by the laws of Malaysia, without regard to 
              its conflict of law provisions.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              Any disputes arising from these terms will be subject to the exclusive jurisdiction of 
              the courts of Sarawak, Malaysia.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Changes to Terms
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new 
              terms taking effect.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              What constitutes a material change will be determined at our sole discretion. By continuing 
              to access or use our service after those revisions become effective, you agree to be bound 
              by the revised terms.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 4 }} />

        {/* Contact Information */}
        <Card sx={{ backgroundColor: '#f8f9fa', p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#cc0001' }}>
            Questions About These Terms?
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
            If you have any questions about these Terms of Service, please contact us:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Email: legal@biliku.com"
                secondary="For legal inquiries and terms clarification"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Contact Form"
                secondary={
                  <Link component={RouterLink} to="/contact" color="primary">
                    Use our contact form for general questions
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Address: Kuching, Sarawak, Malaysia"
                secondary="Our legal department is based in Kuching"
              />
            </ListItem>
          </List>
        </Card>

        {/* Acknowledgment */}
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            <strong>Acknowledgment:</strong> By using Biliku, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Service. These terms constitute 
            a legally binding agreement between you and Biliku.
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
};

export default TermsPage;