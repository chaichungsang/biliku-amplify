import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  styled,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  HomeWorkOutlined as HomeWorkIcon,
  GroupsOutlined as GroupsIcon,
  FavoriteOutlined as HeartIcon,
  SecurityOutlined as SecurityIcon,
  SupportAgentOutlined as SupportIcon,
  VerifiedUserOutlined as TrustIcon,
  PublicOutlined as CommunityIcon,
  StarOutlined as StarIcon,
  ArrowForwardOutlined as ArrowIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Styled components with Sarawak branding
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(204, 0, 1, 0.9), rgba(0, 0, 0, 0.8))',
  color: 'white',
  padding: '80px 0',
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
    backgroundSize: '400px',
    backgroundRepeat: 'no-repeat',
    opacity: 0.1,
    zIndex: 0,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '40px',
  gap: '20px',
}));

const SarawakFlagStrip = styled(Box)(({ theme }) => ({
  height: '4px',
  background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
  flex: 1,
  maxWidth: '150px',
  borderRadius: '4px',
}));

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
    borderColor: '#ffd100',
  },
}));

const TeamCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: '30px 20px',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(204, 0, 1, 0.2)',
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: '30px 20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#fff',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'About Us - Biliku | For Sarawakians, By Sarawakians';
  }, []);

  const values = [
    {
      icon: <CommunityIcon sx={{ fontSize: 40, color: '#cc0001' }} />,
      title: 'Sarawak First',
      description: 'Built by Sarawakians for Sarawakians. We understand the unique needs of our local rental market and culture.',
    },
    {
      icon: <TrustIcon sx={{ fontSize: 40, color: '#ffd100' }} />,
      title: 'Trust & Safety',
      description: 'We prioritize the safety and security of all our users with verified listings and secure communication.',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: '#cc0001' }} />,
      title: '24/7 Support',
      description: 'Our dedicated support team is always ready to help you find your perfect home or tenant.',
    },
    {
      icon: <HeartIcon sx={{ fontSize: 40, color: '#ffd100' }} />,
      title: 'Community Focused',
      description: 'We bring together landlords, tenants, and property agents to create a thriving rental community.',
    },
  ];

  const team = [
    {
      name: 'Team Biliku',
      role: 'Founders & Developers',
      description: 'Passionate Sarawakians dedicated to solving local housing challenges',
      avatar: 'B',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Happy Users' },
    { number: '500+', label: 'Properties Listed' },
    { number: '12+', label: 'Cities Covered' },
    { number: '100%', label: 'Free Service' },
  ];

  return (
    <Box>
      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">About Us</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <HeroContent>
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
              About Biliku
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                marginBottom: '30px',
                lineHeight: 1.6,
                maxWidth: '600px',
                margin: '0 auto 30px auto',
              }}
            >
              For Sarawakians, By Sarawakians
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                opacity: 0.9,
                lineHeight: 1.7,
                maxWidth: '700px',
                margin: '0 auto',
              }}
            >
              Connecting people with perfect places to live across the beautiful state of Sarawak. 
              We understand the local market, culture, and unique needs of our community.
            </Typography>
          </HeroContent>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Our Story Section */}
        <SectionHeader>
          <SarawakFlagStrip />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#cc0001',
              textAlign: 'center',
            }}
          >
            Our Story
          </Typography>
          <SarawakFlagStrip />
        </SectionHeader>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: '#cc0001', mb: 2, fontWeight: 600 }}>
                  Born from Local Needs
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  Biliku was created by Sarawakians who experienced firsthand the challenges of finding 
                  quality rental accommodations in our state. We noticed that existing platforms didn't 
                  truly understand the unique aspects of Sarawak's rental market - from the diverse 
                  cultural preferences to the specific needs of students, working professionals, and families.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Our founders, having struggled with finding suitable accommodations during their studies 
                  and early careers in cities like Kuching, Sibu, and Miri, decided to build a solution 
                  that truly serves the Sarawakian community.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: '#cc0001', mb: 2, fontWeight: 600 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  To make finding and renting properties in Sarawak as easy and transparent as possible. 
                  We believe everyone deserves access to quality housing information without hidden fees 
                  or complicated processes.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  We're committed to supporting the local economy by helping property owners maximize 
                  their rental income while helping tenants find homes that match their cultural, 
                  religious, and lifestyle preferences.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600, color: '#ffd100', backgroundColor: '#cc0001', p: 2, borderRadius: 2 }}>
                  "Empowering Sarawakians to find their perfect home, one connection at a time."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Our Values */}
        <SectionHeader>
          <SarawakFlagStrip />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#cc0001',
              textAlign: 'center',
            }}
          >
            Our Values
          </Typography>
          <SarawakFlagStrip />
        </SectionHeader>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ValueCard>
                <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#666', flexGrow: 1 }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </ValueCard>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Biliku */}
        <SectionHeader>
          <SarawakFlagStrip />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#cc0001',
              textAlign: 'center',
            }}
          >
            Why Choose Biliku?
          </Typography>
          <SarawakFlagStrip />
        </SectionHeader>

        <Card sx={{ mb: 6, overflow: 'hidden' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon sx={{ color: '#ffd100' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="100% Free Service"
                      secondary="No hidden fees, no subscription costs. Completely free for both tenants and landlords."
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <GroupsIcon sx={{ color: '#cc0001' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Local Understanding"
                      secondary="We understand Sarawakian culture, preferences, and the local rental market dynamics."
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon sx={{ color: '#ffd100' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Safe & Secure"
                      secondary="All listings are verified and we provide secure communication channels between users."
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <HomeWorkIcon sx={{ color: '#cc0001' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Comprehensive Coverage"
                      secondary="From Kuching to Miri, covering all major cities and towns across Sarawak."
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700, mb: 1 }}>
                    2024
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                    Proudly serving Sarawak since our launch
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/contact"
                    sx={{
                      backgroundColor: '#cc0001',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#ff0000' },
                      borderRadius: 2,
                    }}
                    endIcon={<ArrowIcon />}
                  >
                    Contact Us
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Statistics */}
        <SectionHeader>
          <SarawakFlagStrip />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#cc0001',
              textAlign: 'center',
            }}
          >
            Our Impact
          </Typography>
          <SarawakFlagStrip />
        </SectionHeader>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <StatsBox>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#cc0001',
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="h6" sx={{ color: '#666', fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </StatsBox>
            </Grid>
          ))}
        </Grid>

        {/* Team Section */}
        <SectionHeader>
          <SarawakFlagStrip />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#cc0001',
              textAlign: 'center',
            }}
          >
            Meet Our Team
          </Typography>
          <SarawakFlagStrip />
        </SectionHeader>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TeamCard>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    margin: '0 auto 20px auto',
                    backgroundColor: '#cc0001',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                  }}
                >
                  {member.avatar}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#cc0001', fontWeight: 600, mb: 2 }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  {member.description}
                </Typography>
              </TeamCard>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #cc0001, #ff0000)',
            color: 'white',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Ready to Find Your Perfect Home?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px auto' }}>
            Join thousands of Sarawakians who trust Biliku to help them find quality rental accommodations 
            across our beautiful state.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/listings"
              sx={{
                backgroundColor: '#ffd100',
                color: '#000',
                fontWeight: 600,
                px: 4,
                '&:hover': { backgroundColor: '#ffed4a' },
              }}
            >
              Browse Properties
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                borderColor: '#ffd100',
                color: '#ffd100',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  borderColor: '#ffed4a',
                  color: '#ffed4a',
                  backgroundColor: 'rgba(255, 209, 0, 0.1)',
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutPage;