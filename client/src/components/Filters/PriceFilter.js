import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { MenuItem, Select, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Pricefilter = forwardRef(({ handleMaxPriceChange }, ref) => {
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
      <Select
        ref={ref}
        onChange={selectedPrice}
        displayEmpty
        value={maxPrice}
        renderValue={selected => selected || 'Max Price'}
      >
        <MenuItem value="" disabled>
          <em>Max Price</em>
        </MenuItem>
        <MenuItem value={10}>$10</MenuItem>
        <MenuItem value={20}>$20</MenuItem>
        <MenuItem value={30}>$30</MenuItem>
      </Select>
    </div>
  );
});

export default Pricefilter;
