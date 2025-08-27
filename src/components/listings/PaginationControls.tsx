import React from 'react';
import {
  Box,
  Button,
  Typography,
  styled,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { PaginationControlsProps } from '../../types/listing';

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '15px',
  },
});

const PageButton = styled(Button)({
  backgroundColor: '#fff',
  border: '2px solid #eee',
  padding: '12px 20px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#555',
  cursor: 'pointer',
  transition: 'all 0.3s',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  textTransform: 'none',
  minWidth: 'auto',
  
  '&:hover:not(:disabled)': {
    backgroundColor: '#cc0001', // Sarawak red
    color: 'white',
    borderColor: '#cc0001',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px rgba(204, 0, 1, 0.2)',
  },
  
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
      backgroundColor: '#fff',
      color: '#555',
      borderColor: '#eee',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
  },
  
  '&.prev': {
    marginRight: '15px',
  },
  
  '&.next': {
    marginLeft: '15px',
  },
  
  '@media (max-width: 768px)': {
    '&.prev, &.next': {
      margin: 0,
    },
  },
});

const PageInfo = styled(Box)({
  backgroundColor: '#f6f7f9',
  padding: '10px 20px',
  borderRadius: '50px',
  fontSize: '0.9rem',
  color: '#666',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  whiteSpace: 'nowrap',
});

const PaginationControls: React.FC<PaginationControlsProps> = ({ 
  pagination, 
  onPageChange, 
  disabled = false 
}) => {
  const { currentPage, totalPages } = pagination;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <PageButton
        className="prev"
        onClick={handlePrevious}
        disabled={disabled || currentPage === 1}
        startIcon={<ChevronLeft />}
      >
        Previous
      </PageButton>

      <PageInfo>
        <Typography variant="body2" component="span">
          Page {currentPage} of {totalPages}
        </Typography>
      </PageInfo>

      <PageButton
        className="next"
        onClick={handleNext}
        disabled={disabled || currentPage === totalPages}
        endIcon={<ChevronRight />}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default PaginationControls;