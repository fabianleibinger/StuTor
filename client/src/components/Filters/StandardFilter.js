import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const StandardFilter = forwardRef(
  ({ handleValueChange, label, items }, ref) => {
    const [value, setValue] = useState('');

    const clearSelection = () => {
      handleValueChange('');
      setValue('');
    };

    const selectedValue = e => {
      const selectedValue = e.target.value;
      handleValueChange(selectedValue);
      setValue(selectedValue);
    };

    useImperativeHandle(ref, () => ({
      clearSelection: () => clearSelection()
    }));

    return (
      <div>
        <FormControl
          sx={{
            minWidth: '100px',
            maxWidth: 'sm',
            height: '35px'
          }}
          size="small"
        >
          <InputLabel
            sx={{
              color: 'black',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center' // Add this line
            }}
            size="small"
          >
            {label}
          </InputLabel>
          <Select
            ref={ref}
            onChange={selectedValue}
            displayEmpty
            value={value}
            renderValue={selected => selected}
            sx={{
              alignItems: 'center',
              height: '100%',
              width: '140px'
            }}
            size="small"
          >
            <MenuItem value="" disabled>
              <em>{label}</em>
            </MenuItem>
            {Object.entries(items).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
);

export default StandardFilter;
