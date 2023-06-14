import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { MenuItem, Select, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const DepartmentFilter = forwardRef(({ handleDepartmentChange }, ref) => {
  const [department, setDepartment] = useState('');

  const clearSelection = () => {
    handleDepartmentChange('');
    setDepartment('');
  };

  const selectedDepartment = e => {
    const selectedValue = e.target.value;
    handleDepartmentChange(selectedValue);
    setDepartment(selectedValue);
  };

  useImperativeHandle(ref, () => ({
    clearSelection: () => clearSelection()
  }));

  return (
    <div>
      <Select
        ref={ref}
        onChange={selectedDepartment}
        displayEmpty
        value={department}
        renderValue={selected => selected || 'Department'}
      >
        <MenuItem value="" disabled>
          <em>Department</em>
        </MenuItem>
        <MenuItem value={'Informatics'}>Informatics</MenuItem>
        <MenuItem value={'Physics'}>Physics</MenuItem>
        <MenuItem value={'Other'}>Other</MenuItem>
      </Select>
    </div>
  );
});

export default DepartmentFilter;
