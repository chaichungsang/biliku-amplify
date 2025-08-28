import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Switch,
  Slider,
  Grid,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  FormHelperText,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  EventAvailable as EventIcon,
  AccountBalance as DepositIcon,
  People as PeopleIcon,
  Rule as RuleIcon,
  Gavel as PolicyIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { ListingFormData } from '../../../types/listing';

interface RentalTermsStepProps {
  data: ListingFormData;
  errors: Record<string, string>;
  onChange: (data: Partial<ListingFormData>) => void;
}

// Helper function to format currency
const formatCurrency = (amount: number) => `RM ${amount.toLocaleString()}`;

const RentalTermsStep: React.FC<RentalTermsStepProps> = ({ data, errors, onChange }) => {

  const handleChange = (field: keyof ListingFormData, value: any) => {
    onChange({ [field]: value });
  };

  const handleUtilityDepositChange = (utility: 'electricity' | 'water' | 'internet', value: number) => {
    onChange({
      utilityDeposits: {
        ...data.utilityDeposits,
        [utility]: value,
      },
    });
  };

  const calculateDepositAmount = () => {
    const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price;
    return price * data.deposit;
  };

  const calculateAdvanceAmount = () => {
    const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price;
    return price * data.advancePayment;
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
          <PolicyIcon />
          Rental Terms & Preferences
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
          Set your rental terms, deposits, and tenant preferences to attract the right renters
        </Typography>

        {/* Availability & Duration Section */}
        <Accordion defaultExpanded sx={{ mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EventIcon sx={{ color: '#cc0001' }} />
              <Typography variant="h6">Availability & Duration</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Available From *"
                  value={data.availableFrom ? data.availableFrom.split('T')[0] : ''}
                  onChange={(e) => handleChange('availableFrom', e.target.value)}
                  error={!!errors.availableFrom}
                  helperText={errors.availableFrom || 'When will the room be available?'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0],
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#cc0001' },
                      '&.Mui-focused fieldset': { borderColor: '#cc0001' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#cc0001' },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Minimum Stay Duration: {data.minimumStay} months</Typography>
                <Slider
                  value={data.minimumStay}
                  onChange={(_, value) => handleChange('minimumStay', value)}
                  min={1}
                  max={24}
                  marks={[
                    { value: 1, label: '1m' },
                    { value: 6, label: '6m' },
                    { value: 12, label: '1y' },
                    { value: 24, label: '2y' },
                  ]}
                  sx={{
                    color: '#cc0001',
                    '& .MuiSlider-thumb': { backgroundColor: '#cc0001' },
                    '& .MuiSlider-track': { backgroundColor: '#cc0001' },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Minimum commitment period for tenants
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Financial Terms Section */}
        <Accordion defaultExpanded sx={{ mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DepositIcon sx={{ color: '#cc0001' }} />
              <Typography variant="h6">Financial Terms</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Security Deposit: {data.deposit} months ({formatCurrency(calculateDepositAmount())})
                </Typography>
                <Slider
                  value={data.deposit}
                  onChange={(_, value) => handleChange('deposit', value)}
                  min={0}
                  max={6}
                  step={0.5}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 1, label: '1m' },
                    { value: 2, label: '2m' },
                    { value: 3, label: '3m' },
                    { value: 6, label: '6m' },
                  ]}
                  sx={{
                    color: '#cc0001',
                    '& .MuiSlider-thumb': { backgroundColor: '#cc0001' },
                    '& .MuiSlider-track': { backgroundColor: '#cc0001' },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Typical: 1-3 months for room rental
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Advance Rental Payment: {data.advancePayment} months ({formatCurrency(calculateAdvanceAmount())})
                </Typography>
                <Slider
                  value={data.advancePayment}
                  onChange={(_, value) => handleChange('advancePayment', value)}
                  min={0}
                  max={6}
                  step={1}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 1, label: '1m' },
                    { value: 2, label: '2m' },
                    { value: 3, label: '3m' },
                    { value: 6, label: '6m' },
                  ]}
                  sx={{
                    color: '#cc0001',
                    '& .MuiSlider-thumb': { backgroundColor: '#cc0001' },
                    '& .MuiSlider-track': { backgroundColor: '#cc0001' },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Usually 1-2 months advance payment
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>Utility Deposits</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Electricity Deposit"
                      value={data.utilityDeposits.electricity}
                      onChange={(e) => handleUtilityDepositChange('electricity', parseInt(e.target.value) || 0)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                      }}
                      inputProps={{ min: 0, step: 50 }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: '#cc0001' },
                          '&.Mui-focused fieldset': { borderColor: '#cc0001' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#cc0001' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Water Deposit"
                      value={data.utilityDeposits.water}
                      onChange={(e) => handleUtilityDepositChange('water', parseInt(e.target.value) || 0)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                      }}
                      inputProps={{ min: 0, step: 50 }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: '#cc0001' },
                          '&.Mui-focused fieldset': { borderColor: '#cc0001' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#cc0001' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Internet Deposit"
                      value={data.utilityDeposits.internet}
                      onChange={(e) => handleUtilityDepositChange('internet', parseInt(e.target.value) || 0)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                      }}
                      inputProps={{ min: 0, step: 50 }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: '#cc0001' },
                          '&.Mui-focused fieldset': { borderColor: '#cc0001' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#cc0001' },
                      }}
                    />
                  </Grid>
                </Grid>
                <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
                  Typical utility deposits: RM200-500 each
                </Typography>
              </Grid>

            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Tenant Preferences Section */}
        <Accordion defaultExpanded sx={{ mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon sx={{ color: '#cc0001' }} />
              <Typography variant="h6">Tenant Preferences</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender Preference</InputLabel>
                  <Select
                    value={data.genderPreference}
                    onChange={(e) => handleChange('genderPreference', e.target.value)}
                    label="Gender Preference"
                    sx={{
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cc0001' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#cc0001' },
                    }}
                  >
                    <MenuItem value="any">No preference</MenuItem>
                    <MenuItem value="male">Male only</MenuItem>
                    <MenuItem value="female">Female only</MenuItem>
                  </Select>
                  <FormHelperText>Specify if you prefer tenants of a particular gender</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* House Rules Section */}
        <Accordion defaultExpanded sx={{ mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RuleIcon sx={{ color: '#cc0001' }} />
              <Typography variant="h6">House Rules & Policies</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={data.smokingAllowed}
                      onChange={(e) => handleChange('smokingAllowed', e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#cc0001' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#cc0001',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">Smoking Allowed</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {data.smokingAllowed ? 'Tenants can smoke in the property' : 'No smoking allowed'}
                      </Typography>
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={data.petsAllowed}
                      onChange={(e) => handleChange('petsAllowed', e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#cc0001' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#cc0001',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">Pets Allowed</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {data.petsAllowed ? 'Tenants can keep pets' : 'No pets allowed'}
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Additional Notes Section */}
        <Accordion sx={{ mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon sx={{ color: '#cc0001' }} />
              <Typography variant="h6">Additional Notes</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Additional Notes"
                  placeholder="Any additional terms, conditions, or special requirements..."
                  value={data.additionalNotes}
                  onChange={(e) => handleChange('additionalNotes', e.target.value)}
                  helperText={`${data.additionalNotes?.length || 0}/500 characters`}
                  inputProps={{ maxLength: 500 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#cc0001' },
                      '&.Mui-focused fieldset': { borderColor: '#cc0001' },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#cc0001' },
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Summary Card */}
        <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#cc0001', mb: 2 }}>
              📋 Rental Terms Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Total Move-in Cost:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(
                      calculateDepositAmount() + 
                      calculateAdvanceAmount() + 
                      data.utilityDeposits.electricity + 
                      data.utilityDeposits.water + 
                      data.utilityDeposits.internet
                    )}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
                    Security deposit + Advance rent + Utility deposits
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label={`Min. ${data.minimumStay} months`} size="small" />
                  <Chip label={data.genderPreference === 'any' ? 'Any gender' : `${data.genderPreference} only`} size="small" />
                  <Chip label={data.smokingAllowed ? 'Smoking OK' : 'No smoking'} size="small" />
                  <Chip label={data.petsAllowed ? 'Pets OK' : 'No pets'} size="small" />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Malaysia Rental Context Alert */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>Malaysia Rental Context:</strong> These terms follow common Malaysian rental practices. 
            Security deposits of 1-3 months and advance payments are standard. Gender preferences and 
            utility deposits are commonly specified in room rentals across Sarawak.
          </Typography>
        </Alert>
      </Box>
  );
};

export default RentalTermsStep;