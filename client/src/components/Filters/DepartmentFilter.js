import React, { useState } from 'react';
import { MenuItem, Select } from '@mui/material';

export default function DepartmentFilter({ handleDepartmentChange }) {
  const selectedDepartment = e => {
    const selectedValue = e.target.value;
    handleDepartmentChange(selectedValue);
    setDepartment(selectedValue);
  };

  const [department, setDepartment] = useState('');

  return (
    <Select onChange={selectedDepartment} displayEmpty value={department}>
      <MenuItem value="" disabled>
        <em>Department</em>
      </MenuItem>
      <MenuItem value={'Informatics'}>Informatics</MenuItem>
      <MenuItem value={'Physics'}>Physics</MenuItem>
      <MenuItem value={'Other'}>Other</MenuItem>
    </Select>
  );
}
