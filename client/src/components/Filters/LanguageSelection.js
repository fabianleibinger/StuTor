import React, { useState } from 'react';

import LanguageEnum from '../../enums/LanguageEnum';

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
    <Box sx={{ width: 0.6 }}>
      <FormControl sx={{ width: 1 }}>
      <InputLabel
          sx={{
            background: '#FFF',
          }}
        >
          {' '}
          Languages *
        </InputLabel>
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
            {Object.keys(LanguageEnum).map(key => (
              <MenuItem key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedItems.includes(key)}
                      color="primary"
                    />
                  }
                  label={LanguageEnum[key]}
                  onChange={() => handleMenuItemClick(key)}
                />
              </MenuItem>
            ))}
          </FormGroup>
        </Select>
      </FormControl>
    </Box>
  );
}
