import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
  IconButton,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Edit as EditIcon,
  CheckCircle as CheckIcon,
  ErrorOutline as ErrorIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  LocalParking as ParkingIcon,
  Kitchen as KitchenIcon,
  Wifi as WifiIcon,
  ExpandMore as ExpandMoreIcon,
  Publish as PublishIcon,
  Visibility as PreviewIcon,
  SaveAlt as DraftIcon,
} from '@mui/icons-material';
import { ListingFormData } from '../../../types/listing';

interface ReviewPublishStepProps {
  data: ListingFormData;
  errors: Record<string, string>;
  onChange: (data: Partial<ListingFormData>) => void;
}

const ReviewPublishStep: React.FC<ReviewPublishStepProps> = ({ data, errors, onChange }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [confirmedAccuracy, setConfirmedAccuracy] = useState(false);
  const [confirmedContact, setConfirmedContact] = useState(false);
  const [confirmedPhotos, setConfirmedPhotos] = useState(false);
  const [publishOption, setPublishOption] = useState<'immediate' | 'draft'>('immediate');
  const [expirationDays, setExpirationDays] = useState<30 | 60 | 90>(60);
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Validation checks
  const validationChecks = [
    {
      key: 'basicInfo',
      label: 'Basic Information Complete',
      valid: data.title && data.description && data.price > 0 && data.roomType && data.propertyType,
      message: 'Title, description, price, and property types are required'
    },
    {
      key: 'location',
      label: 'Location Details Complete',
      valid: data.address && data.city,
      message: 'Address and city are required'
    },
    {
      key: 'specs',
      label: 'Property Specifications Complete',
      valid: data.furnished && data.bedrooms >= 0 && data.bathrooms >= 1,
      message: 'Furnishing level and room counts are required'
    },
    {
      key: 'terms',
      label: 'Rental Terms Complete',
      valid: data.availableFrom && data.minimumStay >= 1,
      message: 'Availability date and minimum stay are required'
    },
    {
      key: 'photos',
      label: 'Photos Uploaded',
      valid: data.images.length > 0,
      message: 'At least one photo is required'
    },
    {
      key: 'contact',
      label: 'Contact Methods Provided',
      valid: data.contactMethods.length > 0,
      message: 'At least one contact method is required'
    }
  ];

  const allChecksValid = validationChecks.every(check => check.valid);
  const allAgreementsChecked = acceptedTerms && acceptedPrivacy && confirmedAccuracy && confirmedContact && confirmedPhotos;
  const canPublish = allChecksValid && allAgreementsChecked;

  // Helper functions
  const formatPrice = (price: number) => `RM ${price.toLocaleString()}`;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-MY');
  };

  const formatContactMethods = (methods: string[]) => {
    const methodLabels: Record<string, { label: string; icon: React.ReactNode }> = {
      phone: { label: 'Phone Call', icon: <PhoneIcon /> },
      whatsapp: { label: 'WhatsApp', icon: <WhatsAppIcon /> },
      email: { label: 'Email', icon: <EmailIcon /> },
    };
    
    return methods.map(method => methodLabels[method] || { label: method, icon: <PhoneIcon /> });
  };

  const handleEditSection = (stepIndex: number) => {
    // This would trigger navigation back to the specific step
    console.log(`Navigate to step ${stepIndex}`);
  };

  const handlePublish = () => {
    if (!canPublish) return;
    
    const listingData = {
      ...data,
      publishOption,
      expirationDays,
      autoRenewal,
      emailNotifications,
      publishedAt: new Date().toISOString(),
    };
    
    console.log('Publishing listing:', listingData);
    // This would trigger the actual submission logic from the parent component
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft:', data);
    // This would trigger the draft save logic
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          color: '#cc0001',
          fontWeight: 600,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <PreviewIcon />
        Review & Publish
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        Review your listing details and publish to start receiving inquiries
      </Typography>

      <Grid container spacing={3}>
        {/* Validation Status */}
        <Grid item xs={12}>
          <Card sx={{ border: allChecksValid ? '1px solid #4caf50' : '1px solid #ff9800' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                {allChecksValid ? <CheckIcon sx={{ color: '#4caf50' }} /> : <ErrorIcon sx={{ color: '#ff9800' }} />}
                Listing Validation
              </Typography>
              <Grid container spacing={1}>
                {validationChecks.map((check) => (
                  <Grid item xs={12} sm={6} key={check.key}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {check.valid ? 
                        <CheckIcon sx={{ color: '#4caf50', fontSize: 20 }} /> : 
                        <ErrorIcon sx={{ color: '#f44336', fontSize: 20 }} />
                      }
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: check.valid ? '#4caf50' : '#f44336',
                          textDecoration: check.valid ? 'none' : 'none'
                        }}
                      >
                        {check.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {!allChecksValid && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Please complete all required sections before publishing your listing.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Listing Preview */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
            Listing Preview
          </Typography>
          
          {/* Basic Information Preview */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Typography variant="h6">Basic Information</Typography>
                <IconButton size="small" onClick={() => handleEditSection(0)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#cc0001', mb: 1 }}>
                    {data.title || 'No title provided'}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                    {data.description || 'No description provided'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <MoneyIcon sx={{ color: '#cc0001' }} />
                    <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
                      {formatPrice(data.price || 0)}/month
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label={data.roomType} color="primary" size="small" />
                    <Chip label={data.propertyType} variant="outlined" size="small" />
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Location Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Typography variant="h6">Location</Typography>
                <IconButton size="small" onClick={() => handleEditSection(1)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                <LocationIcon sx={{ color: '#cc0001', mt: 0.5 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {data.address || 'No address provided'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {data.neighborhood && `${data.neighborhood}, `}{data.city || 'City not specified'}
                  </Typography>
                  {data.landmarks.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                        Nearby Landmarks:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {data.landmarks.map((landmark: string, index: number) => (
                          <Chip key={index} label={landmark} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Property Specs Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Typography variant="h6">Property Details</Typography>
                <IconButton size="small" onClick={() => handleEditSection(2)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Bedrooms</Typography>
                  <Typography variant="h6">{data.bedrooms}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Bathrooms</Typography>
                  <Typography variant="h6">{data.bathrooms}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Furnished</Typography>
                  <Typography variant="body1">{data.furnished || 'Not specified'}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Floor Level</Typography>
                  <Typography variant="body1">{data.floorLevel || 'Not specified'}</Typography>
                </Grid>
                {data.squareFeet && (
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" sx={{ color: '#666' }}>Size</Typography>
                    <Typography variant="body1">{data.squareFeet} sq ft</Typography>
                  </Grid>
                )}
                {data.buildingYear && (
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" sx={{ color: '#666' }}>Built Year</Typography>
                    <Typography variant="body1">{data.buildingYear}</Typography>
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Amenities & Features Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Typography variant="h6">Amenities & Features</Typography>
                <IconButton size="small" onClick={() => handleEditSection(3)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {data.amenities.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>General Amenities</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {data.amenities.map((amenity: string, index: number) => (
                        <Chip key={index} label={amenity} size="small" />
                      ))}
                    </Box>
                  </Grid>
                )}
                {data.securityFeatures.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>Security Features</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {data.securityFeatures.map((feature: string, index: number) => (
                        <Chip key={index} label={feature} size="small" icon={<SecurityIcon />} />
                      ))}
                    </Box>
                  </Grid>
                )}
                {data.kitchenFacilities.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>Kitchen Facilities</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {data.kitchenFacilities.map((facility: string, index: number) => (
                        <Chip key={index} label={facility} size="small" icon={<KitchenIcon />} />
                      ))}
                    </Box>
                  </Grid>
                )}
                {data.parking && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>Parking</Typography>
                    <Chip label={data.parking} size="small" icon={<ParkingIcon />} />
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Rental Terms Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Typography variant="h6">Rental Terms</Typography>
                <IconButton size="small" onClick={() => handleEditSection(4)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Available From</Typography>
                  <Typography variant="body1">{formatDate(data.availableFrom)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Minimum Stay</Typography>
                  <Typography variant="body1">{data.minimumStay} months</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Security Deposit</Typography>
                  <Typography variant="body1">{formatPrice(data.deposit)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Advance Payment</Typography>
                  <Typography variant="body1">{data.advancePayment} months</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>Preferences</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip label={`Gender: ${data.genderPreference}`} size="small" />
                    <Chip label={data.smokingAllowed ? 'Smoking Allowed' : 'No Smoking'} size="small" />
                    <Chip label={data.petsAllowed ? 'Pets Allowed' : 'No Pets'} size="small" />
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Photos Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Typography variant="h6">Photos ({data.images.length})</Typography>
                <IconButton size="small" onClick={() => handleEditSection(5)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {data.images.length > 0 ? (
                <ImageList cols={4} rowHeight={120} sx={{ width: '100%' }}>
                  {data.images.slice(0, 8).map((image: File, index: number) => (
                    <ImageListItem key={index}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property ${index + 1}`}
                        loading="lazy"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                      {index === data.mainImageIndex && (
                        <Chip
                          label="Main"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            left: 4,
                            backgroundColor: '#cc0001',
                            color: 'white',
                          }}
                        />
                      )}
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Typography variant="body2" sx={{ color: '#666' }}>
                  No photos uploaded
                </Typography>
              )}
              {data.images.length > 8 && (
                <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
                  +{data.images.length - 8} more photos
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Contact Information Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Typography variant="h6">Contact Information</Typography>
                <IconButton size="small" onClick={() => handleEditSection(6)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>Contact Methods</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {formatContactMethods(data.contactMethods).map((method, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {method.icon}
                        <Typography variant="body2">{method.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>Response Time</Typography>
                  <Typography variant="body1">{data.responseTime}</Typography>
                  
                  {data.viewingAvailability.length > 0 && (
                    <>
                      <Typography variant="body2" sx={{ color: '#666', mb: 1, mt: 2 }}>Viewing Available</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {data.viewingAvailability.map((time: string, index: number) => (
                          <Chip key={index} label={time} size="small" icon={<ScheduleIcon />} />
                        ))}
                      </Box>
                    </>
                  )}
                </Grid>
                {data.additionalNotes && (
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>Additional Notes</Typography>
                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                      "{data.additionalNotes}"
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Publishing Options */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Publishing Options</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Publish Option</InputLabel>
                    <Select
                      value={publishOption}
                      onChange={(e) => setPublishOption(e.target.value as 'immediate' | 'draft')}
                      label="Publish Option"
                    >
                      <MenuItem value="immediate">Publish Immediately</MenuItem>
                      <MenuItem value="draft">Save as Draft</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Listing Duration</InputLabel>
                    <Select
                      value={expirationDays}
                      onChange={(e) => setExpirationDays(e.target.value as 30 | 60 | 90)}
                      label="Listing Duration"
                    >
                      <MenuItem value={30}>30 Days</MenuItem>
                      <MenuItem value={60}>60 Days</MenuItem>
                      <MenuItem value={90}>90 Days</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={autoRenewal}
                        onChange={(e) => setAutoRenewal(e.target.checked)}
                        sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                      />
                    }
                    label="Auto-renew listing when it expires"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                      />
                    }
                    label="Receive email notifications for new inquiries"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Pre-Publish Checklist */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Pre-Publish Checklist</Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="I accept the Terms and Conditions"
                    secondary="You agree to Biliku's terms of service for property listings"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      checked={acceptedPrivacy}
                      onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                      sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="I accept the Privacy Policy"
                    secondary="Your data will be handled according to our privacy policy"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      checked={confirmedAccuracy}
                      onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                      sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="All information provided is accurate"
                    secondary="False or misleading information may result in listing removal"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      checked={confirmedContact}
                      onChange={(e) => setConfirmedContact(e.target.checked)}
                      sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Contact information is current and working"
                    secondary="Ensure you can receive inquiries through your selected methods"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      checked={confirmedPhotos}
                      onChange={(e) => setConfirmedPhotos(e.target.checked)}
                      sx={{ color: '#cc0001', '&.Mui-checked': { color: '#cc0001' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Photos are recent and represent the current condition"
                    secondary="Quality photos help attract serious inquiries"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* What Happens Next */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ backgroundColor: '#e3f2fd' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>What happens next?</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Your listing will be reviewed by our team within 24-48 hours
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Once approved, it will be visible to potential tenants on Biliku
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • You'll receive email notifications for any inquiries
            </Typography>
            <Typography variant="body2">
              • You can manage your listing anytime from your profile dashboard
            </Typography>
          </Alert>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<DraftIcon />}
              onClick={handleSaveDraft}
              sx={{
                borderColor: '#cc0001',
                color: '#cc0001',
                '&:hover': {
                  borderColor: '#ff0000',
                  backgroundColor: 'rgba(204, 0, 1, 0.1)',
                },
              }}
            >
              Save as Draft
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<PreviewIcon />}
                onClick={() => setPreviewOpen(true)}
              >
                Preview Listing
              </Button>
              
              <Button
                variant="contained"
                startIcon={<PublishIcon />}
                onClick={handlePublish}
                disabled={!canPublish}
                sx={{
                  backgroundColor: '#cc0001',
                  '&:hover': { backgroundColor: '#ff0000' },
                  '&:disabled': { backgroundColor: '#ccc' },
                }}
              >
                {publishOption === 'immediate' ? 'Publish Listing' : 'Save Draft'}
              </Button>
            </Box>
          </Box>
          
          {!canPublish && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {!allChecksValid && 'Please complete all required sections. '}
              {!allAgreementsChecked && 'Please check all required agreements above.'}
            </Alert>
          )}
        </Grid>
      </Grid>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Listing Preview - How it will appear to potential tenants
        </DialogTitle>
        <DialogContent>
          <Paper elevation={2} sx={{ p: 3, mt: 1 }}>
            <Typography variant="h4" sx={{ color: '#cc0001', mb: 1 }}>
              {data.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h5" sx={{ color: '#cc0001', fontWeight: 600 }}>
                {formatPrice(data.price || 0)}/month
              </Typography>
              <Chip label={data.roomType} color="primary" size="small" />
              <Chip label={data.propertyType} variant="outlined" size="small" />
            </Box>
            <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
              {data.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationIcon sx={{ color: '#cc0001' }} />
              <Typography variant="body2">
                {data.address}, {data.city}
              </Typography>
            </Box>
            {/* Simplified preview - just showing key information */}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close Preview</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewPublishStep;