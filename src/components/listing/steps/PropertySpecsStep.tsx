import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  FormHelperText,
  Slider,
  Chip,
} from '@mui/material';
import {
  Bed as BedIcon,
  Bathtub as BathtubIcon,
  Straighten as SizeIcon,
  Apartment as ApartmentIcon,
} from '@mui/icons-material';
import { ListingFormData } from '../../../pages/AddListingPage';

interface PropertySpecsStepProps {
  data: ListingFormData;
  errors: Record<string, string>;
  onChange: (data: Partial<ListingFormData>) => void;
}

const furnishingOptions = [
  {
    value: 'fully-furnished',
    label: 'Fully Furnished',
    description: 'Bed, wardrobe, desk, chair, and all basic furniture included',
    items: ['Bed', 'Wardrobe', 'Desk', 'Chair', 'Air conditioning', 'Basic appliances']
  },
  {
    value: 'partially-furnished',
    label: 'Partially Furnished',
    description: 'Some basic furniture provided, tenant may need to add items',
    items: ['Basic furniture', 'Some appliances', 'Built-in fixtures']
  },
  {
    value: 'unfurnished',
    label: 'Unfurnished',
    description: 'Empty room, tenant provides all furniture and appliances',
    items: ['Empty space', 'Basic fixtures only']
  },
];

const floorLevelOptions = [
  'Ground Floor',
  '1st Floor',
  '2nd Floor',
  '3rd Floor',
  '4th Floor',
  '5th Floor',
  '6th Floor',
  '7th Floor',
  '8th Floor',
  '9th Floor',
  '10th Floor',
  '11th Floor and above',
];

const PropertySpecsStep: React.FC<PropertySpecsStepProps> = ({
  data,
  errors,
  onChange,
}) => {
  const handleChange = (field: keyof ListingFormData, value: any) => {
    onChange({ [field]: value });
  };

  const selectedFurnishing = furnishingOptions.find(option => option.value === data.furnished);
  const currentYear = new Date().getFullYear();

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
        <ApartmentIcon />
        Property Specifications
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        Provide detailed specifications to help tenants understand your property
      </Typography>

      <Grid container spacing={3}>
        {/* Furnishing Level */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
            Furnishing Level *
          </Typography>
          <Grid container spacing={2}>
            {furnishingOptions.map((option) => (
              <Grid item xs={12} md={4} key={option.value}>
                <Card
                  onClick={() => handleChange('furnished', option.value)}
                  sx={{
                    cursor: 'pointer',
                    border: data.furnished === option.value ? '2px solid #cc0001' : '1px solid #e0e0e0',
                    backgroundColor: data.furnished === option.value ? 'rgba(204, 0, 1, 0.05)' : '#fff',
                    transition: 'all 0.2s',
                    height: '100%',
                    '&:hover': {
                      borderColor: '#cc0001',
                      backgroundColor: 'rgba(204, 0, 1, 0.02)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, color: '#cc0001' }}>
                      {option.label}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                      {option.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {option.items.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          size="small"
                          sx={{ 
                            fontSize: '0.7rem',
                            backgroundColor: data.furnished === option.value ? '#fff' : '#f5f5f5'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {errors.furnished && (
            <Typography variant="caption" sx={{ color: '#d32f2f', mt: 1, display: 'block' }}>
              {errors.furnished}
            </Typography>
          )}
        </Grid>

        {/* Bedrooms and Bathrooms */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number of Bedrooms"
            type="number"
            value={data.bedrooms}
            onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
            error={!!errors.bedrooms}
            helperText={errors.bedrooms || 'Include all bedrooms in the unit'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BedIcon sx={{ color: '#cc0001' }} />
                </InputAdornment>
              ),
            }}
            inputProps={{
              min: 0,
              max: 10,
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

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number of Bathrooms *"
            type="number"
            value={data.bathrooms}
            onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
            error={!!errors.bathrooms}
            helperText={errors.bathrooms || 'Include shared and private bathrooms'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BathtubIcon sx={{ color: '#cc0001' }} />
                </InputAdornment>
              ),
            }}
            inputProps={{
              min: 1,
              max: 10,
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

        {/* Floor Size */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Floor Size (sq ft)"
            type="number"
            placeholder="600"
            value={data.squareFeet || ''}
            onChange={(e) => handleChange('squareFeet', e.target.value ? Number(e.target.value) : undefined)}
            helperText="Approximate floor area (optional)"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SizeIcon sx={{ color: '#cc0001' }} />
                </InputAdornment>
              ),
            }}
            inputProps={{
              min: 50,
              max: 5000,
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

        {/* Floor Level */}
        <Grid item xs={12} sm={6}>
          <FormControl 
            fullWidth
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
            <InputLabel>Floor Level</InputLabel>
            <Select
              value={data.floorLevel}
              onChange={(e) => handleChange('floorLevel', e.target.value)}
              label="Floor Level"
            >
              {floorLevelOptions.map((floor) => (
                <MenuItem key={floor} value={floor}>
                  {floor}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Which floor is the property located on?</FormHelperText>
          </FormControl>
        </Grid>

        {/* Building Year */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
            Building Year (Optional)
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={data.buildingYear || currentYear}
              onChange={(e, value) => handleChange('buildingYear', value as number)}
              min={1950}
              max={currentYear}
              step={1}
              marks={[
                { value: 1950, label: '1950' },
                { value: 1980, label: '1980' },
                { value: 2000, label: '2000' },
                { value: 2010, label: '2010' },
                { value: currentYear, label: currentYear.toString() },
              ]}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value}`}
              sx={{
                color: '#cc0001',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#cc0001',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#cc0001',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#e0e0e0',
                },
                '& .MuiSlider-mark': {
                  backgroundColor: '#cc0001',
                },
                '& .MuiSlider-markLabel': {
                  color: '#666',
                },
              }}
            />
            <Typography variant="caption" sx={{ color: '#666', mt: 2, display: 'block' }}>
              Approximate year the building was constructed
            </Typography>
          </Box>
        </Grid>

        {/* Specifications Summary */}
        {(data.furnished || data.bedrooms > 0 || data.bathrooms > 0) && (
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#cc0001', mb: 2, fontSize: '1rem' }}>
                  📋 Property Summary
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {data.furnished && selectedFurnishing && (
                    <Typography variant="body2">
                      <strong>Furnishing:</strong> {selectedFurnishing.label}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    <strong>Layout:</strong> {data.bedrooms} bedroom{data.bedrooms !== 1 ? 's' : ''}, {data.bathrooms} bathroom{data.bathrooms !== 1 ? 's' : ''}
                  </Typography>
                  {data.squareFeet && (
                    <Typography variant="body2">
                      <strong>Size:</strong> {data.squareFeet} sq ft
                    </Typography>
                  )}
                  {data.floorLevel && (
                    <Typography variant="body2">
                      <strong>Location:</strong> {data.floorLevel}
                    </Typography>
                  )}
                  {data.buildingYear && (
                    <Typography variant="body2">
                      <strong>Building Age:</strong> {currentYear - data.buildingYear} years old (built in {data.buildingYear})
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PropertySpecsStep;