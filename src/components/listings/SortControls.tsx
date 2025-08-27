import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  styled,
} from '@mui/material';
import { SortControlsProps } from '../../types/listing';

const ControlsContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
});

const SortFieldContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const SortLabel = styled(Typography)({
  fontWeight: 500,
  color: '#666',
  fontSize: '0.95rem',
});

const StyledSelect = styled(Select)({
  minWidth: '180px',
  '& .MuiOutlinedInput-root': {
    padding: '8px 12px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.95rem',
    color: '#333',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#bbb',
    },
    '&.Mui-focused': {
      borderColor: '#cc0001', // Sarawak red
    },
    '&.Mui-disabled': {
      backgroundColor: '#f0f0f0',
      opacity: 0.6,
      borderColor: '#ddd',
    },
  },
  '& .MuiSelect-select': {
    padding: 0,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none',
  },
});

const SortControls: React.FC<SortControlsProps> = ({ value, onChange, disabled = false }) => {
  
  const sortOptions = [
    { value: 'created_at', label: 'Newest First' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
  ];

  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <ControlsContainer>
      <SortFieldContainer>
        <Typography component="label" sx={{ fontWeight: 500, color: '#666', fontSize: '0.95rem' }}>
          Sort By
        </Typography>
        <FormControl size="small">
          <StyledSelect
            id="sortOptions"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            displayEmpty
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </SortFieldContainer>
    </ControlsContainer>
  );
};

export default SortControls;