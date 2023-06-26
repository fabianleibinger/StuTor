import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  MenuItem,
  Select,
  IconButton,
  FormControl,
  InputLabel
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const PriceFilter = forwardRef(({ handleMaxPriceChange }, ref) => {
  const [maxPrice, setMaxPrice] = useState('');

  const clearSelection = () => {
    handleMaxPriceChange('');
    setMaxPrice('');
  };

  const selectedPrice = e => {
    const selectedValue = e.target.value;
    handleMaxPriceChange(selectedValue);
    setMaxPrice(selectedValue);
  };

  useImperativeHandle(ref, () => ({
    clearSelection: () => clearSelection()
  }));

  return (
    <div>
      <FormControl
        sx={{
          minWidth: '120px',
          maxWidth: 'sm',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <InputLabel sx={{ color: 'black', textAlign: 'center' }}>
          Max Price
        </InputLabel>

        <Select
          ref={ref}
          onChange={selectedPrice}
          displayEmpty
          value={maxPrice}
          renderValue={selected => selected}
          sx={{
            alignItems: 'center',
            height: '35px',
            width: '120px',
            p: '3px'
          }}
        >
          <MenuItem value="" disabled>
            Max Price
          </MenuItem>
          <MenuItem value={10}>$10</MenuItem>
          <MenuItem value={20}>$20</MenuItem>
          <MenuItem value={30}>$30</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});

export default PriceFilter;
