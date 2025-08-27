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
  Chip,
  Autocomplete,
  FormHelperText,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Place as PlaceIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import { ListingFormData } from '../../../pages/AddListingPage';

interface LocationDetailsStepProps {
  data: ListingFormData;
  errors: Record<string, string>;
  onChange: (data: Partial<ListingFormData>) => void;
}

const sarawakCities = [
  { value: 'kuching', label: 'Kuching', districts: ['Kuching City', 'Padawan', 'Samarahan', 'Serian', 'Simunjan'] },
  { value: 'sibu', label: 'Sibu', districts: ['Sibu', 'Mukah', 'Dalat', 'Kanowit'] },
  { value: 'miri', label: 'Miri', districts: ['Miri', 'Marudi', 'Beluru', 'Telang Usan'] },
  { value: 'bintulu', label: 'Bintulu', districts: ['Bintulu', 'Tatau', 'Belaga'] },
  { value: 'limbang', label: 'Limbang', districts: ['Limbang', 'Lawas'] },
  { value: 'sarikei', label: 'Sarikei', districts: ['Sarikei', 'Meradong', 'Julau', 'Pakan'] },
  { value: 'sri-aman', label: 'Sri Aman', districts: ['Sri Aman', 'Lubok Antu', 'Betong'] },
  { value: 'kapit', label: 'Kapit', districts: ['Kapit', 'Song', 'Belaga'] },
];

const popularNeighborhoods: Record<string, string[]> = {
  kuching: [
    'City Centre', 'Pending', 'Tabuan Jaya', 'Kota Samarahan', 'UNIMAS',
    'Kuching South', 'Green Heights', 'BDC', 'Matang', 'Petra Jaya',
    'Stapok', 'Stutong', 'Kota Sentosa', 'Demak Laut', 'Samariang'
  ],
  sibu: [
    'Town Area', 'Igan Road', 'Brooke Drive', 'Salim', 'Nangka',
    'Sg. Merah', 'Teku', 'Durin', 'Bawang Assan', 'Sg. Antu'
  ],
  miri: [
    'City Centre', 'Senadin', 'Permyjaya', 'Tudan', 'Piasau',
    'Lutong', 'Canada Hill', 'Kuala Baram', 'Eastwood', 'Marina'
  ],
  bintulu: [
    'Town Centre', 'Kemena', 'Kidurong', 'Assyakirin', 'Tanjung Batu',
    'Medan Jaya', 'Sg. Plan', 'Kuala Tatau', 'Sebauh', 'Tubau'
  ],
};

const commonLandmarks = [
  // Educational
  'UNIMAS', 'UiTM Sarawak', 'Swinburne University', 'UCSI University',
  'Politeknik Kuching', 'SMK/SMU Schools', 'International Schools',
  
  // Shopping & Commercial
  'Vivacity Megamall', 'The Spring', 'CityONE Megamall', 'Imperial Mall',
  'Everrise Supermarket', 'Tesco', 'Giant Hypermarket', 'Boulevard Shopping Mall',
  
  // Transportation
  'Kuching Airport', 'Sibu Airport', 'Miri Airport', 'Bintulu Airport',
  'Bus Terminal', 'Taxi Stand', 'Rapid KL Station',
  
  // Healthcare
  'Sarawak General Hospital', 'Sibu Hospital', 'Miri Hospital', 'Bintulu Hospital',
  'Private Hospitals', 'Clinic',
  
  // Others
  'Waterfront', 'Cat Museum', 'Sarawak Museum', 'Fort Margherita',
  'Damai Beach', 'Santubong', 'Bako National Park'
];

const LocationDetailsStep: React.FC<LocationDetailsStepProps> = ({
  data,
  errors,
  onChange,
}) => {
  const selectedCity = sarawakCities.find(city => city.value === data.city);
  const availableNeighborhoods = data.city ? popularNeighborhoods[data.city] || [] : [];

  const handleChange = (field: keyof ListingFormData, value: any) => {
    onChange({ [field]: value });
    
    // Reset neighborhood when city changes
    if (field === 'city' && data.neighborhood) {
      onChange({ [field]: value, neighborhood: '' });
    }
  };

  const handleLandmarksChange = (newLandmarks: string[]) => {
    onChange({ landmarks: newLandmarks });
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
        <LocationIcon />
        Location Details
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        Help tenants find your property with accurate location information
      </Typography>

      <Grid container spacing={3}>
        {/* Full Address */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Address *"
            placeholder="e.g., Jalan Datuk Abdul Rahman, Petra Jaya, 93050 Kuching"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            error={!!errors.address}
            helperText={errors.address || 'Include street name, area, and postal code'}
            multiline
            rows={2}
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

        {/* City Selection */}
        <Grid item xs={12} sm={6}>
          <FormControl 
            fullWidth 
            error={!!errors.city}
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
            <InputLabel>City/Division *</InputLabel>
            <Select
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              label="City/Division *"
            >
              {sarawakCities.map((city) => (
                <MenuItem key={city.value} value={city.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PlaceIcon sx={{ color: '#cc0001', fontSize: '1.2rem' }} />
                    <Typography>{city.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.city && (
              <FormHelperText>{errors.city}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Neighborhood/Area */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={availableNeighborhoods}
            value={data.neighborhood}
            onChange={(event, newValue) => handleChange('neighborhood', newValue || '')}
            onInputChange={(event, newInputValue) => handleChange('neighborhood', newInputValue)}
            disabled={!data.city}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Neighborhood/Area"
                placeholder={data.city ? 'Select or type area name' : 'Select city first'}
                helperText="e.g., Tabuan Jaya, UNIMAS, City Centre"
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
            )}
          />
        </Grid>

        {/* Nearby Landmarks */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
            Nearby Landmarks & Facilities
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Select landmarks that are within 2-3km of your property
          </Typography>
          <Autocomplete
            multiple
            options={commonLandmarks}
            value={data.landmarks}
            onChange={(event, newValue) => handleLandmarksChange(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  sx={{
                    borderColor: '#cc0001',
                    color: '#cc0001',
                    '& .MuiChip-deleteIcon': {
                      color: '#cc0001',
                    },
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type to search landmarks..."
                helperText="Add landmarks, universities, shopping malls, hospitals nearby"
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
            )}
          />
        </Grid>

        {/* Location Preview */}
        {data.city && (
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#cc0001', mb: 2, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MapIcon />
                  Location Summary
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>City:</strong> {selectedCity?.label}
                  </Typography>
                  {data.neighborhood && (
                    <Typography variant="body2">
                      <strong>Area:</strong> {data.neighborhood}
                    </Typography>
                  )}
                  {data.landmarks.length > 0 && (
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Nearby Landmarks:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {data.landmarks.map((landmark, index) => (
                          <Chip
                            key={index}
                            label={landmark}
                            size="small"
                            sx={{ backgroundColor: '#fff', fontSize: '0.75rem' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Tips Section */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffd100' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#856404', mb: 2, fontSize: '1rem' }}>
                📍 Location Tips
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" sx={{ color: '#856404' }}>
                  • Be specific about the area - helps tenants plan their commute
                </Typography>
                <Typography variant="body2" sx={{ color: '#856404' }}>
                  • Mention nearby public transportation options
                </Typography>
                <Typography variant="body2" sx={{ color: '#856404' }}>
                  • Include walking distance to popular destinations
                </Typography>
                <Typography variant="body2" sx={{ color: '#856404' }}>
                  • Highlight accessibility features for different transport modes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LocationDetailsStep;