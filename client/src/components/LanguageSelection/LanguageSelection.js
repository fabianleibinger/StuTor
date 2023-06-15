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

export default function LanguageSelection({ onSelectedLanguage }) {
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
    onSelectedLanguage(selectedItems);
    console.log(selectedItems);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FormControl sx={{ width: '200px' }}>
        <InputLabel> Languages *</InputLabel>
        <Select
          open={menuOpen}
          onClose={handleMenuClose}
          onOpen={handleMenuOpen}
          value={selectedItems}
          multiple
          renderValue={selected => (
            <Stack direction="row" spacing={1}>
              {selected.map(item => (
                <Button key={item} onClick={() => handleMenuItemClick(item)}>
                  {item}
                </Button>
              ))}
            </Stack>
          )}
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
            <MenuItem>
              <IconButton
                onClick={handleMenuClose}
                size="small"
                aria-label="confirm"
                color="primary"
              >
                <CheckIcon /> Confirm
              </IconButton>
            </MenuItem>
          </FormGroup>
        </Select>
      </FormControl>
    </Box>
  );
}
