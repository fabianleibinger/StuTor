import React, { useState } from 'react';

import {
  Box,
  FormGroup,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
  Select,
  Stack,
  IconButton
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function LanguageSelection({
  handleLanguageChange,
  initialSelection
}) {
  const [selectedItems, setSelectedItems] = useState(initialSelection);
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
      <FormControl sx={{ width: '200px' }}>
        <InputLabel> Languages *</InputLabel>
        <Select
          open={menuOpen}
          onClose={handleMenuClose}
          onOpen={handleMenuOpen}
          value={selectedItems}
          multiple
          renderValue={() => {
            if (selectedItems.length > 0) {
              return (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CheckIcon sx={{ color: 'green' }} />
                  {selectedItems.length} selected
                </Stack>
              );
            } else {
              return 'Languages';
            }
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250
              }
            }
          }}
        >
          <FormGroup>
            <MenuItem disabled>Languages</MenuItem>
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
}
