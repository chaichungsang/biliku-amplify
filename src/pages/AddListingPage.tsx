import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Breadcrumbs,
  Link,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Save as SaveIcon,
  Publish as PublishIcon,
} from '@mui/icons-material';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Import listing service and types
import { listingService } from '../services/listingService';
import type { ListingFormData } from '../types/listing';

// Step Components
import BasicInformationStep from '../components/listing/steps/BasicInformationStep';
import LocationDetailsStep from '../components/listing/steps/LocationDetailsStep';
import PropertySpecsStep from '../components/listing/steps/PropertySpecsStep';
import AmenitiesStep from '../components/listing/steps/AmenitiesStep';
import RentalTermsStep from '../components/listing/steps/RentalTermsStep';
import PhotoUploadStep from '../components/listing/steps/PhotoUploadStep';
import ContactAvailabilityStep from '../components/listing/steps/ContactAvailabilityStep';
import ReviewPublishStep from '../components/listing/steps/ReviewPublishStep';

// Form data interface now imported from types/listing.ts

const initialFormData: ListingFormData = {
  title: '',
  description: '',
  price: 0,
  roomType: '',
  propertyType: '',
  address: '',
  city: '',
  neighborhood: '',
  landmarks: [],
  furnished: '',
  bedrooms: 1,
  bathrooms: 1,
  squareFeet: undefined,
  floorLevel: '',
  buildingYear: undefined,
  amenities: [],
  securityFeatures: [],
  parking: '',
  kitchenFacilities: [],
  additionalFacilities: [],
  availableFrom: '',
  minimumStay: 6,
  deposit: 0,
  advancePayment: 1,
  utilityDeposits: {
    electricity: 0,
    water: 0,
    internet: 0,
  },
  genderPreference: 'no-preference',
  smokingAllowed: false,
  petsAllowed: false,
  images: [],
  mainImageIndex: 0,
  contactMethods: [],
  viewingAvailability: [],
  responseTime: '24-hours',
  additionalNotes: '',
};

// Styled Components
const StepperContainer = styled(Box)(({ theme }) => ({
  marginBottom: '30px',
  [theme.breakpoints.down('md')]: {
    '& .MuiStepper-root': {
      padding: '10px 0',
    },
    '& .MuiStepLabel-label': {
      fontSize: '0.75rem',
    },
  },
}));

const FormCard = styled(Card)(({ theme }) => ({
  marginBottom: '20px',
  border: '1px solid rgba(204, 0, 1, 0.1)',
  '&:hover': {
    borderColor: 'rgba(204, 0, 1, 0.3)',
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px',
  gap: '15px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& > *': {
      width: '100%',
    },
  },
}));

const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#cc0001',
  color: '#fff',
  padding: '12px 30px',
  '&:hover': {
    backgroundColor: '#ff0000',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px 30px',
    fontSize: '1rem',
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  borderColor: '#cc0001',
  color: '#cc0001',
  padding: '12px 30px',
  '&:hover': {
    borderColor: '#ff0000',
    backgroundColor: 'rgba(204, 0, 1, 0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px 30px',
    fontSize: '1rem',
  },
}));

const SaveDraftButton = styled(Button)(({ theme }) => ({
  color: '#666',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}));

const steps = [
  'Basic Information',
  'Location Details', 
  'Property Specs',
  'Amenities',
  'Rental Terms',
  'Photos',
  'Contact Info',
  'Review & Publish',
];

const AddListingPage: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<ListingFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'List Your Property - Biliku | Post Room Rental';
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/add-listing');
      return;
    }
  }, [user, navigate]);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (formData.title || formData.description) {
        saveDraft();
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(autoSave);
  }, [formData]);

  const updateFormData = (stepData: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(stepData);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => {
        delete newErrors[field];
      });
      return newErrors;
    });
  };

  const validateCurrentStep = (): boolean => {
    const stepErrors: Record<string, string> = {};

    switch (activeStep) {
      case 0: // Basic Information
        if (!formData.title.trim()) stepErrors.title = 'Title is required';
        if (formData.title.length < 10) stepErrors.title = 'Title must be at least 10 characters';
        if (!formData.description.trim()) stepErrors.description = 'Description is required';
        if (formData.description.length < 50) stepErrors.description = 'Description must be at least 50 characters';
        if (!formData.price || formData.price < 100) stepErrors.price = 'Price must be at least RM 100';
        if (!formData.roomType) stepErrors.roomType = 'Room type is required';
        if (!formData.propertyType) stepErrors.propertyType = 'Property type is required';
        break;

      case 1: // Location Details
        if (!formData.address.trim()) stepErrors.address = 'Address is required';
        if (!formData.city) stepErrors.city = 'City is required';
        break;

      case 2: // Property Specifications
        if (!formData.furnished) stepErrors.furnished = 'Furnishing level is required';
        if (formData.bedrooms < 0) stepErrors.bedrooms = 'Number of bedrooms cannot be negative';
        if (formData.bathrooms < 1) stepErrors.bathrooms = 'At least 1 bathroom is required';
        break;

      case 3: // Amenities
        // Optional validation - amenities can be empty
        break;

      case 4: // Rental Terms
        if (!formData.availableFrom) stepErrors.availableFrom = 'Availability date is required';
        if (formData.minimumStay < 1) stepErrors.minimumStay = 'Minimum stay must be at least 1 month';
        if (formData.deposit < 0) stepErrors.deposit = 'Deposit cannot be negative';
        break;

      case 5: // Photo Upload
        if (formData.images.length === 0) stepErrors.images = 'At least one photo is required';
        break;

      case 6: // Contact & Availability
        if (formData.contactMethods.length === 0) stepErrors.contactMethods = 'At least one contact method is required';
        break;

      case 7: // Review & Publish
        // Final validation happens here
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (step: number) => {
    if (step <= activeStep) {
      setActiveStep(step);
    }
  };

  const saveDraft = async () => {
    setSaveStatus('saving');
    try {
      // Save draft with minimal validation
      if (!formData.title.trim()) {
        throw new Error('Title is required to save draft');
      }
      
      await listingService.saveDraftListing(formData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error: any) {
      console.error('Error saving draft:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    try {
      // Final validation before submission
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.description.trim() || formData.description.length < 50) {
        throw new Error('Description must be at least 50 characters');
      }
      if (!formData.price || formData.price < 100) {
        throw new Error('Price must be at least RM 100');
      }
      if (!formData.address.trim()) {
        throw new Error('Address is required');
      }
      if (!formData.city) {
        throw new Error('City is required');
      }
      if (!formData.roomType) {
        throw new Error('Room type is required');
      }
      if (!formData.propertyType) {
        throw new Error('Property type is required');
      }
      if (!formData.furnished) {
        throw new Error('Furnishing level is required');
      }
      if (formData.images.length === 0) {
        throw new Error('At least one photo is required');
      }
      if (formData.contactMethods.length === 0) {
        throw new Error('At least one contact method is required');
      }
      
      // Clear any previous errors
      setSubmitError(null);
      setErrors({});
      
      // Create the listing
      const result = await listingService.createListingFromForm(formData);
      console.log('Listing created successfully:', result);
      
      // Show success message and redirect
      navigate('/my-listings?created=true');
    } catch (error: any) {
      console.error('Error creating listing:', error);
      
      // Show error message to user
      const errorMessage = error.message || 'Failed to create listing. Please try again.';
      setSubmitError(errorMessage);
      setErrors({ general: errorMessage });
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <BasicInformationStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      case 1:
        return (
          <LocationDetailsStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      case 2:
        return (
          <PropertySpecsStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      case 3:
        return (
          <AmenitiesStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      case 4:
        return (
          <RentalTermsStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      case 5:
        return (
          <PhotoUploadStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      case 6:
        return (
          <ContactAvailabilityStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      case 7:
        return (
          <ReviewPublishStep
            data={formData}
            errors={errors}
            onChange={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6">Please sign in to list your property</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/profile" color="inherit">
            Profile
          </Link>
          <Typography color="text.primary">List Property</Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="md" sx={{ py: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: '#cc0001',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            List Your Property
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
            Create a comprehensive listing to attract quality tenants
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Step {activeStep + 1} of {steps.length}
            </Typography>
            {saveStatus === 'saved' && (
              <Typography variant="body2" sx={{ color: '#4caf50' }}>
                • Draft saved
              </Typography>
            )}
            {saveStatus === 'saving' && (
              <Typography variant="body2" sx={{ color: '#ff9800' }}>
                • Saving...
              </Typography>
            )}
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={(activeStep / (steps.length - 1)) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(204, 0, 1, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#cc0001',
                borderRadius: 3,
              },
            }}
          />
        </Box>

        {/* Stepper */}
        <StepperContainer>
          <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'}>
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepLabel
                  onClick={() => handleStepClick(index)}
                  sx={{
                    cursor: index <= activeStep ? 'pointer' : 'default',
                    '& .MuiStepLabel-label': {
                      color: index <= activeStep ? '#cc0001' : '#999',
                      fontWeight: index === activeStep ? 600 : 400,
                    },
                  }}
                >
                  {!isMobile ? label : `${index + 1}. ${label}`}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperContainer>

        {/* Form Content */}
        <FormCard elevation={1}>
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {/* Show general error if exists */}
            {(errors.general || submitError) && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.general || submitError}
              </Alert>
            )}
            {renderStepContent()}
          </CardContent>
        </FormCard>

        {/* Action Buttons */}
        <ActionButtons>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <SaveDraftButton onClick={saveDraft} startIcon={<SaveIcon />}>
              Save Draft
            </SaveDraftButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <BackButton
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
              startIcon={<BackIcon />}
            >
              Previous
            </BackButton>

            {activeStep === steps.length - 1 ? (
              <NextButton
                onClick={handleSubmit}
                disabled={loading}
                variant="contained"
                startIcon={loading ? <LinearProgress /> : <PublishIcon />}
              >
                {loading ? 'Publishing...' : 'Publish Listing'}
              </NextButton>
            ) : (
              <NextButton
                onClick={handleNext}
                variant="contained"
                endIcon={<NextIcon />}
              >
                Next
              </NextButton>
            )}
          </Box>
        </ActionButtons>

        {/* Help Text */}
        <Box sx={{ textAlign: 'center', mt: 4, p: 2, backgroundColor: '#fff3cd', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: '#856404' }}>
            💡 Your listing will be reviewed by our team before going live. 
            This usually takes less than 24 hours.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AddListingPage;