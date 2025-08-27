import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Link,
  Divider,
  styled,
} from '@mui/material';
import {
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  LocationOnOutlined as LocationIcon,
  AccessTimeOutlined as TimeIcon,
  SendOutlined as SendIcon,
  BusinessOutlined as BusinessIcon,
  SupportAgentOutlined as SupportIcon,
  ExpandMoreOutlined as ExpandMoreIcon,
  QuestionAnswerOutlined as FAQIcon,
  ChatOutlined as ChatIcon,
  HomeWorkOutlined as PropertyIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Styled components with Sarawak branding
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(204, 0, 1, 0.9))',
  color: 'white',
  padding: '60px 0',
  position: 'relative',
  overflow: 'hidden',
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
    opacity: 0.1,
    zIndex: 0,
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
    borderColor: '#ffd100',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
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
  '&:disabled': {
    backgroundColor: '#ccc',
    color: '#888',
  },
}));

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = 'Contact Us - Biliku | Get in Touch with Our Team';
  }, []);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear any previous errors
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      setError('Subject is required');
      return false;
    }
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      return false;
    }
    if (formData.message.length < 20) {
      setError('Please provide a more detailed message (at least 20 characters)');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log('Contact form submitted:', formData);
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 30, color: '#cc0001' }} />,
      title: 'Email',
      details: ['support@biliku.com', 'info@biliku.com'],
      description: 'Get in touch via email for general inquiries',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 30, color: '#ffd100' }} />,
      title: 'Phone',
      details: ['+60 82-XXX-XXXX'],
      description: 'Call us during business hours',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 30, color: '#cc0001' }} />,
      title: 'Address',
      details: ['Kuching, Sarawak', 'Malaysia'],
      description: 'Visit our office in the heart of Kuching',
    },
    {
      icon: <TimeIcon sx={{ fontSize: 30, color: '#ffd100' }} />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 1:00 PM', 'Sun: Closed'],
      description: 'We\'re here to help during these hours',
    },
  ];

  const categories = [
    'General Inquiry',
    'Property Listing Support',
    'Account Issues',
    'Technical Support',
    'Partnership & Business',
    'Feedback & Suggestions',
    'Report a Problem',
    'Media & Press',
  ];

  const faqs = [
    {
      question: 'How do I list my property on Biliku?',
      answer: 'Creating a property listing on Biliku is completely free and easy! Simply register for an account, click on "Post a New Room" from your profile, and fill in the details about your property. Our team will review and approve your listing within 24 hours.',
    },
    {
      question: 'Is Biliku really free to use?',
      answer: 'Yes, absolutely! Biliku is 100% free for both tenants and landlords. We don\'t charge any fees for browsing properties, contacting landlords, or listing your property. Our mission is to serve the Sarawakian community without financial barriers.',
    },
    {
      question: 'How do you verify property listings?',
      answer: 'We have a dedicated team that reviews each property listing to ensure authenticity. We verify contact information, cross-check property details, and may request additional documentation from property owners. This helps maintain the quality and trustworthiness of our platform.',
    },
    {
      question: 'What areas in Sarawak do you cover?',
      answer: 'We cover all major cities and towns in Sarawak, including Kuching, Sibu, Miri, Bintulu, Sri Aman, Sarikei, Kapit, and many smaller towns. Our goal is to serve the entire state of Sarawak with quality rental listings.',
    },
    {
      question: 'How can I contact a property owner?',
      answer: 'Once you find a property you\'re interested in, you can contact the owner directly through our secure messaging system. We provide the owner\'s contact information after you create a free account to help prevent spam and ensure serious inquiries.',
    },
    {
      question: 'Can property agents use Biliku?',
      answer: 'Absolutely! We welcome property agents and real estate professionals. Agent listings are also completely free. We believe in supporting all members of the property ecosystem to better serve Sarawakians looking for homes.',
    },
    {
      question: 'What if I encounter a problem with a listing or user?',
      answer: 'Please report any issues immediately through our contact form or email us at support@biliku.com. We take user safety and platform integrity seriously and will investigate all reports promptly.',
    },
    {
      question: 'Do you offer any mobile app?',
      answer: 'Currently, we\'re focused on providing the best web experience. However, our website is fully mobile-responsive and works perfectly on all smartphones and tablets. A dedicated mobile app may be considered in the future based on user demand.',
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
          <Typography color="text.primary">Contact Us</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
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
              Contact Us
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
              Get in touch with our team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                opacity: 0.8,
                maxWidth: '700px',
                margin: '0 auto',
              }}
            >
              We're here to help with any questions about finding your perfect home in Sarawak
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Contact Information */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ContactCard>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {info.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    {info.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {info.details.map((detail, idx) => (
                      <Typography key={idx} variant="body1" sx={{ color: '#cc0001', fontWeight: 500, mb: 0.5 }}>
                        {detail}
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5 }}>
                    {info.description}
                  </Typography>
                </CardContent>
              </ContactCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ChatIcon sx={{ color: '#cc0001', mr: 2, fontSize: 30 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#cc0001' }}>
                    Send us a Message
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Thank you for your message! We'll get back to you within 24 hours.
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          label="Category"
                          disabled={loading}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please provide detailed information about your inquiry..."
                        required
                        disabled={loading}
                        inputProps={{ maxLength: 2000 }}
                        helperText={`${formData.message.length}/2000 characters`}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SubmitButton
                        type="submit"
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Additional Contact Options */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Quick Support */}
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SupportIcon sx={{ color: '#ffd100', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Quick Support
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <PropertyIcon sx={{ color: '#cc0001' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Property Issues"
                        secondary="Report problems with listings"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <BusinessIcon sx={{ color: '#cc0001' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Business Inquiries"
                        secondary="Partnership opportunities"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffd100' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#cc0001', mb: 2 }}>
                    Emergency Support
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                    For urgent safety concerns or platform security issues, contact us immediately.
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: '#cc0001',
                      '&:hover': { backgroundColor: '#ff0000' },
                    }}
                    startIcon={<PhoneIcon />}
                  >
                    Emergency Line
                  </Button>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Response Times
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="General Inquiries"
                        secondary="Within 24 hours"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Technical Support"
                        secondary="Within 12 hours"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Emergency Issues"
                        secondary="Within 2 hours"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Divider sx={{ my: 6 }} />
        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <FAQIcon sx={{ fontSize: 40, color: '#cc0001', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#cc0001', mb: 2 }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Find quick answers to common questions about using Biliku
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1, '&:before': { display: 'none' } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: '#f8f9fa',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#fff', pt: 2 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: '#555' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Call to Action */}
        <Card
          sx={{
            mt: 6,
            background: 'linear-gradient(135deg, #ffd100, #ffed4a)',
            color: '#000',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Still have questions?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Our friendly team is always here to help you find the perfect home in Sarawak.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#cc0001',
              color: '#fff',
              fontWeight: 600,
              px: 4,
              '&:hover': { backgroundColor: '#ff0000' },
            }}
            startIcon={<EmailIcon />}
          >
            Email Us Directly
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default ContactPage;