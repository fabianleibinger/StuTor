import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// the StandardFilter can be used for further filters in the future as well
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
            minWidth: '11vw',
            height: '45px',
            alignItems: 'center'
          }}
          size="large"
        >
          <InputLabel
            sx={{
              color: 'gray',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              background: '#FFF',
              mt: -0.1,
              pl: 1
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
              width: 1
            }}
            size="large"
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
