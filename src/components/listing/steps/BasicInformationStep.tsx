import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { ListingFormData } from '../../../types/listing';

interface BasicInformationStepProps {
  data: ListingFormData;
  errors: Record<string, string>;
  onChange: (data: Partial<ListingFormData>) => void;
}

const roomTypeOptions = [
  { value: 'single-room', label: 'Single Room', description: 'Private room with shared facilities' },
  { value: 'master-room', label: 'Master Room', description: 'Room with attached bathroom' },
  { value: 'studio', label: 'Studio', description: 'Self-contained unit with kitchenette' },
  { value: 'apartment', label: 'Apartment', description: 'Multi-room unit with kitchen' },
  { value: 'whole-unit', label: 'Whole Unit', description: 'Entire property rental' },
];

const propertyTypeOptions = [
  { value: 'landed-house', label: 'Landed House', icon: '🏠' },
  { value: 'condominium', label: 'Condominium', icon: '🏢' },
  { value: 'apartment', label: 'Apartment', icon: '🏬' },
  { value: 'shophouse', label: 'Shophouse', icon: '🏪' },
  { value: 'townhouse', label: 'Townhouse', icon: '🏘️' },
];

const BasicInformationStep: React.FC<BasicInformationStepProps> = ({
  data,
  errors,
  onChange,
}) => {
  const handleChange = (field: keyof ListingFormData, value: any) => {
    onChange({ [field]: value });
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
        <HomeIcon />
        Basic Information
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        Tell us about your property to attract the right tenants
      </Typography>

      <Grid container spacing={3}>
        {/* Property Title */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Property Title *"
            placeholder="e.g., Spacious Master Room near UNIMAS"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title || `${data.title.length}/100 characters`}
            inputProps={{ maxLength: 100 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#cc0001',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#cc0001',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#cc0001',
              },
            }}
          />
          <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
            💡 Include key features like location, room type, or nearby landmarks
          </Typography>
        </Grid>

        {/* Property Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Property Description *"
            placeholder="Describe your property in detail. Include features, amenities, nearby facilities, and what makes it special..."
            value={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description || `${data.description.length}/2000 characters`}
            inputProps={{ maxLength: 2000 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon sx={{ color: '#cc0001' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#cc0001',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#cc0001',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#cc0001',
              },
            }}
          />
        </Grid>

        {/* Monthly Rent */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Monthly Rent *"
            type="number"
            placeholder="800"
            value={data.price || ''}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            error={!!errors.price}
            helperText={errors.price || 'Enter amount in Malaysian Ringgit (RM)'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MoneyIcon sx={{ color: '#cc0001' }} />
                    <Typography sx={{ color: '#666' }}>RM</Typography>
                  </Box>
                </InputAdornment>
              ),
            }}
            inputProps={{
              min: 100,
              max: 10000,
              step: 50,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#cc0001',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#cc0001',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#cc0001',
              },
            }}
          />
        </Grid>

        {/* Room Type */}
        <Grid item xs={12} sm={6}>
          <FormControl 
            fullWidth 
            error={!!errors.roomType}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#cc0001',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#cc0001',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#cc0001',
              },
            }}
          >
            <InputLabel>Room Type *</InputLabel>
            <Select
              value={data.roomType}
              onChange={(e) => handleChange('roomType', e.target.value)}
              label="Room Type *"
            >
              {roomTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box>
                    <Typography variant="body1">{option.label}</Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {option.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.roomType && (
              <FormHelperText>{errors.roomType}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Property Type */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
            Property Type *
          </Typography>
          <Grid container spacing={2}>
            {propertyTypeOptions.map((option) => (
              <Grid item xs={6} sm={4} md={2.4} key={option.value}>
                <Card
                  onClick={() => handleChange('propertyType', option.value)}
                  sx={{
                    cursor: 'pointer',
                    border: data.propertyType === option.value ? '2px solid #cc0001' : '1px solid #e0e0e0',
                    backgroundColor: data.propertyType === option.value ? 'rgba(204, 0, 1, 0.05)' : '#fff',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#cc0001',
                      backgroundColor: 'rgba(204, 0, 1, 0.02)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                      {option.icon}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {option.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {errors.propertyType && (
            <Typography variant="caption" sx={{ color: '#d32f2f', mt: 1, display: 'block' }}>
              {errors.propertyType}
            </Typography>
          )}
        </Grid>

        {/* Tips Section */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#cc0001', mb: 2, fontSize: '1rem' }}>
                💡 Tips for a Great Listing
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label="Include nearby landmarks"
                  size="small"
                  sx={{ backgroundColor: '#fff3cd', color: '#856404' }}
                />
                <Chip
                  label="Mention transportation"
                  size="small"
                  sx={{ backgroundColor: '#d1ecf1', color: '#0c5460' }}
                />
                <Chip
                  label="Highlight unique features"
                  size="small"
                  sx={{ backgroundColor: '#d4edda', color: '#155724' }}
                />
                <Chip
                  label="Be honest about condition"
                  size="small"
                  sx={{ backgroundColor: '#f8d7da', color: '#721c24' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicInformationStep;