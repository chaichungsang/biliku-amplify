import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Alert,
  Divider,
  Switch,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Message as MessageIcon,
  Schedule as ScheduleIcon,
  Language as LanguageIcon,
  Info as InfoIcon,
  PersonAdd as PersonAddIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { ListingFormData } from '../../../pages/AddListingPage';

interface ContactAvailabilityStepProps {
  data: ListingFormData;
  errors: Record<string, string>;
  onChange: (data: Partial<ListingFormData>) => void;
}

// Contact method options with Malaysian context
const contactMethodOptions = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: <WhatsAppIcon />,
    description: 'Most popular in Malaysia - instant responses',
    color: '#25D366',
  },
  {
    id: 'phone',
    label: 'Phone Call',
    icon: <PhoneIcon />,
    description: 'For serious inquiries and detailed discussions',
    color: '#2196f3',
  },
  {
    id: 'email',
    label: 'Email',
    icon: <EmailIcon />,
    description: 'Formal communication and documentation',
    color: '#ff9800',
  },
  {
    id: 'platform',
    label: 'Biliku Messaging',
    icon: <MessageIcon />,
    description: 'Secure in-app messaging (coming soon)',
    color: '#cc0001',
  },
];

// Viewing time slots
const viewingTimeSlots = [
  { id: 'weekday_morning', label: 'Weekday Mornings', time: '9:00 AM - 12:00 PM', days: 'Mon-Fri' },
  { id: 'weekday_afternoon', label: 'Weekday Afternoons', time: '1:00 PM - 5:00 PM', days: 'Mon-Fri' },
  { id: 'weekday_evening', label: 'Weekday Evenings', time: '6:00 PM - 8:00 PM', days: 'Mon-Fri' },
  { id: 'weekend_morning', label: 'Weekend Mornings', time: '9:00 AM - 12:00 PM', days: 'Sat-Sun' },
  { id: 'weekend_afternoon', label: 'Weekend Afternoons', time: '1:00 PM - 5:00 PM', days: 'Sat-Sun' },
  { id: 'weekend_evening', label: 'Weekend Evenings', time: '6:00 PM - 8:00 PM', days: 'Sat-Sun' },
  { id: 'flexible', label: 'Flexible Schedule', time: 'By appointment', days: 'Anytime' },
];

// Response time options
const responseTimeOptions = [
  { value: 'within-hour', label: 'Within 1 hour', description: 'Very responsive' },
  { value: '1-4-hours', label: '1-4 hours', description: 'Quick response' },
  { value: '4-12-hours', label: '4-12 hours', description: 'Same day response' },
  { value: '24-hours', label: 'Within 24 hours', description: 'Standard response' },
  { value: '2-3-days', label: '2-3 days', description: 'Casual response' },
];

// Language options for Malaysia
const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'malay', label: 'Bahasa Malaysia' },
  { value: 'mandarin', label: 'Mandarin Chinese' },
  { value: 'hokkien', label: 'Hokkien' },
  { value: 'cantonese', label: 'Cantonese' },
  { value: 'iban', label: 'Iban' },
  { value: 'bidayuh', label: 'Bidayuh' },
];

const ContactAvailabilityStep: React.FC<ContactAvailabilityStepProps> = ({ data, errors, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['english']);
  const [bestTimeToContact, setBestTimeToContact] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [leadTimeRequired, setLeadTimeRequired] = useState('1-hour');

  // Initialize state from form data
  useEffect(() => {
    if (data.additionalNotes) {
      const notes = data.additionalNotes;
      // Parse additional notes to extract stored values if any
      setSpecialInstructions(notes);
    }
  }, [data.additionalNotes]);

  // Format Malaysian phone number
  const formatMalaysianPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('60')) {
      return cleaned;
    }
    if (cleaned.startsWith('0')) {
      return '60' + cleaned.substring(1);
    }
    if (cleaned.length >= 8) {
      return '60' + cleaned;
    }
    return cleaned;
  };

  const handleContactMethodChange = (methodId: string, checked: boolean) => {
    const currentMethods = data.contactMethods || [];
    let newMethods;
    
    if (checked) {
      newMethods = [...currentMethods, methodId];
    } else {
      newMethods = currentMethods.filter(method => method !== methodId);
    }
    
    onChange({ contactMethods: newMethods });
  };

  const handleViewingAvailabilityChange = (slotId: string, checked: boolean) => {
    const currentSlots = data.viewingAvailability || [];
    let newSlots;
    
    if (checked) {
      newSlots = [...currentSlots, slotId];
    } else {
      newSlots = currentSlots.filter(slot => slot !== slotId);
    }
    
    onChange({ viewingAvailability: newSlots });
  };

  const handlePhoneNumberChange = (value: string) => {
    const formatted = formatMalaysianPhone(value);
    setPhoneNumber(formatted);
    if (sameAsPhone) {
      setWhatsappNumber(formatted);
    }
  };

  const handleWhatsAppNumberChange = (value: string) => {
    const formatted = formatMalaysianPhone(value);
    setWhatsappNumber(formatted);
  };

  const handleLanguageChange = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleSameAsPhoneChange = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) {
      setWhatsappNumber(phoneNumber);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 600, mb: 2 }}>
        Contact & Availability
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        How can potential tenants reach you and schedule property viewings?
      </Typography>

      {/* Contact Methods Section */}
      <Card sx={{ mb: 4, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <PersonAddIcon sx={{ color: '#cc0001', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
              Contact Method Preferences
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {contactMethodOptions.map((method) => (
              <Grid item xs={12} sm={6} key={method.id}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    border: data.contactMethods?.includes(method.id) 
                      ? `2px solid ${method.color}` 
                      : '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: method.color,
                      boxShadow: 1,
                    }
                  }}
                  onClick={() => handleContactMethodChange(method.id, !data.contactMethods?.includes(method.id))}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.contactMethods?.includes(method.id) || false}
                        onChange={(e) => handleContactMethodChange(method.id, e.target.checked)}
                        sx={{ color: method.color, '&.Mui-checked': { color: method.color } }}
                      />
                    }
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          {React.cloneElement(method.icon, { sx: { color: method.color, mr: 1 } })}
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {method.label}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {method.description}
                        </Typography>
                      </Box>
                    }
                    sx={{ margin: 0, alignItems: 'flex-start' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {errors.contactMethods && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.contactMethods}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Contact Details Section */}
      {(data.contactMethods?.includes('phone') || data.contactMethods?.includes('whatsapp')) && (
        <Card sx={{ mb: 4, border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PhoneIcon sx={{ color: '#cc0001', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
                Phone & WhatsApp Details
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {data.contactMethods?.includes('phone') && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    placeholder="+60 12-345 6789"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: '#2196f3' }} />
                        </InputAdornment>
                      ),
                    }}
                    helperText="Malaysian phone number (will be formatted automatically)"
                  />
                </Grid>
              )}

              {data.contactMethods?.includes('whatsapp') && (
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={sameAsPhone}
                          onChange={(e) => handleSameAsPhoneChange(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Same as phone number"
                      sx={{ mb: 1 }}
                    />
                    {!sameAsPhone && (
                      <TextField
                        fullWidth
                        label="WhatsApp Number"
                        value={whatsappNumber}
                        onChange={(e) => handleWhatsAppNumberChange(e.target.value)}
                        placeholder="+60 12-345 6789"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WhatsAppIcon sx={{ color: '#25D366' }} />
                            </InputAdornment>
                          ),
                        }}
                        helperText="Different WhatsApp number if needed"
                      />
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Viewing Availability Section */}
      <Card sx={{ mb: 4, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ScheduleIcon sx={{ color: '#cc0001', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
              Viewing Availability
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
            When are you available to show the property to potential tenants?
          </Typography>

          <Grid container spacing={2}>
            {viewingTimeSlots.map((slot) => (
              <Grid item xs={12} sm={6} md={4} key={slot.id}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    border: data.viewingAvailability?.includes(slot.id) 
                      ? '2px solid #cc0001' 
                      : '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#cc0001',
                      boxShadow: 1,
                    }
                  }}
                  onClick={() => handleViewingAvailabilityChange(slot.id, !data.viewingAvailability?.includes(slot.id))}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.viewingAvailability?.includes(slot.id) || false}
                        onChange={(e) => handleViewingAvailabilityChange(slot.id, e.target.checked)}
                        sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {slot.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                          {slot.days} • {slot.time}
                        </Typography>
                      </Box>
                    }
                    sx={{ margin: 0, alignItems: 'flex-start' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Lead Time Required</InputLabel>
                <Select
                  value={leadTimeRequired}
                  onChange={(e) => setLeadTimeRequired(e.target.value)}
                  label="Lead Time Required"
                >
                  <MenuItem value="immediate">Immediate (same day)</MenuItem>
                  <MenuItem value="1-hour">1 hour advance notice</MenuItem>
                  <MenuItem value="4-hours">4 hours advance notice</MenuItem>
                  <MenuItem value="24-hours">24 hours advance notice</MenuItem>
                  <MenuItem value="2-days">2 days advance notice</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Best Time to Contact"
                value={bestTimeToContact}
                onChange={(e) => setBestTimeToContact(e.target.value)}
                placeholder="e.g., After 6 PM, Weekends only"
                helperText="When is the best time for tenants to contact you?"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Response Commitment Section */}
      <Card sx={{ mb: 4, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AccessTimeIcon sx={{ color: '#cc0001', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
              Response Commitment
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Expected Response Time</InputLabel>
                <Select
                  value={data.responseTime || '24-hours'}
                  onChange={(e) => onChange({ responseTime: e.target.value })}
                  label="Expected Response Time"
                >
                  {responseTimeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box>
                        <Typography variant="body2">{option.label}</Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          {option.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LanguageIcon sx={{ color: '#cc0001', mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Language Preferences
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {languageOptions.map((language) => (
                    <Chip
                      key={language.value}
                      label={language.label}
                      clickable
                      onClick={() => handleLanguageChange(language.value)}
                      variant={selectedLanguages.includes(language.value) ? 'filled' : 'outlined'}
                      color={selectedLanguages.includes(language.value) ? 'primary' : 'default'}
                      sx={{
                        '&.MuiChip-filled': {
                          backgroundColor: '#cc0001',
                          color: 'white',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Additional Information Section */}
      <Card sx={{ mb: 4, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <InfoIcon sx={{ color: '#cc0001', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
              Additional Information
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Special Instructions for Tenants"
                value={specialInstructions}
                onChange={(e) => {
                  setSpecialInstructions(e.target.value);
                  onChange({ additionalNotes: e.target.value });
                }}
                placeholder="e.g., Please remove shoes when viewing, Ring apartment bell first, Viewing available on weekends only..."
                helperText="Any special instructions or requirements for property viewings"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact Name"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                placeholder="e.g., Property Manager, Spouse"
                helperText="Optional - backup contact person"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact Number"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="+60 12-345 6789"
                helperText="Optional - alternative contact number"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Summary */}
      {data.contactMethods && data.contactMethods.length > 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Contact Summary:</strong> Tenants can reach you via{' '}
            {data.contactMethods.map((method, index) => (
              <span key={method}>
                {method === 'whatsapp' && 'WhatsApp'}
                {method === 'phone' && 'Phone'}
                {method === 'email' && 'Email'}
                {method === 'platform' && 'Biliku Platform'}
                {index < data.contactMethods!.length - 1 && index < data.contactMethods!.length - 2 && ', '}
                {index === data.contactMethods!.length - 2 && ' and '}
              </span>
            ))}
            . Expected response time: {responseTimeOptions.find(opt => opt.value === (data.responseTime || '24-hours'))?.label}.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default ContactAvailabilityStep;