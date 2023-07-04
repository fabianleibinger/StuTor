import React, { useState, forwardRef, useImperativeHandle } from 'react';

import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  MenuItem,
  InputLabel,
  Select,
  IconButton,
  Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const LanguageFilter = forwardRef(({ handleLanguageChange }, ref) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const LanguagesEnum = {
    English: 'English',
    Spanish: 'Spanish',
    French: 'French',
    German: 'German',
    Italian: 'Italian',
    Portuguese: 'Portuguese',
    Russian: 'Russian',
    Chinese: 'Chinese',
    Japanese: 'Japanese',
    Arabic: 'Arabic',
    Hindi: 'Hindi',
    Bengali: 'Bengali',
    Punjabi: 'Punjabi',
    Turkish: 'Turkish',
    Urdu: 'Urdu',
    Other: 'Other'
  };

  const clearSelection = () => {
    handleLanguageChange([]);
    setSelectedItems([]);
  };

  useImperativeHandle(ref, () => ({
    clearSelection: () => clearSelection()
  }));

  const handleMenuItemClick = item => {
    const index = selectedItems.indexOf(item);
    const newSelectedItems = [...selectedItems];

    if (item === undefined) {
      return; // Do nothing if the item is undefined
    }

    if (index === -1) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems.splice(index, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    handleLanguageChange(selectedItems);
    console.log(selectedItems);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  return (
    <div>
      <FormControl
        sx={{
          minWidth: '10vw',
          maxWidth: 'md',
          height: '45px',
          alignItems: 'center'
        }}
        size="small"
      >
        <InputLabel
          sx={{
            color: 'gray',
            background: '#FFF',
            fontSize: '16px',
            mt: -0.1,
            pl: 1
          }}
        >
          {' '}
          Languages
        </InputLabel>
        <Select
          open={menuOpen}
          onClose={handleMenuClose}
          onOpen={handleMenuOpen}
          value={selectedItems}
          multiple
          displayEmpty
          renderValue={() => {
            if (selectedItems.length > 0) {
              return (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CheckIcon sx={{ color: 'green' }} />
                  {selectedItems.length} selected
                </Stack>
              );
            }
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 1
              }
            }
          }}
          sx={{
            alignItems: 'center',
            height: '100%',
            width: 1
          }}
          size="small"
        >
          <FormGroup>
            {Object.keys(LanguagesEnum).map(key => (
              <MenuItem key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedItems.includes(key)}
                      color="primary"
                    />
                  }
                  label={LanguagesEnum[key]}
                  onChange={() => handleMenuItemClick(key)}
                />
              </MenuItem>
            ))}
          </FormGroup>
        </Select>
      </FormControl>
    </div>
  );
});

export default LanguageFilter;
