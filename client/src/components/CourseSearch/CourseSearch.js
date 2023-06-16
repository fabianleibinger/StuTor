import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Popover,
  Box
} from '@mui/material';

import { useState } from 'react';
import { useQuery } from 'react-query';

import { getCoursesFilteredBySearchString } from '../../api/Course';
import useDebounce from '../../hooks/useDebounce';

import ClearIcon from '@mui/icons-material/Clear';

function SearchResult({ isLoading, data, error, onSelectCourse }) {
  // error is not thrown just loading???
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div key="loadingCourses">Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <Typography>No results found.</Typography>;
  }
  if (data) {
    return (
      <div>
        {data.map((course, index) => (
          <div key={`${course.id}-${index}`}>
            {course.name}
            <Button onClick={() => onSelectCourse(course)}>Select</Button>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function CourseSearch({ onSelectCourse, onDeleteCourse }) {
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const debouncedSearchTerm = useDebounce(search, 200);

  const { data, error, isLoading } = useQuery(
    ['search', debouncedSearchTerm],
    () => getCoursesFilteredBySearchString(debouncedSearchTerm)
  );

  // next two methods are for clearing the course textfield
  const handleInputChange = e => {
    setSearch(e.target.value);
    setAnchorEl(e.currentTarget);
  };

  // handle if a course is selected
  const handleSelectCourse = course => {
    setSelectedCourse(course);
    onSelectCourse(course);
  };

  // handle if a course is cleared
  const handleClearClick = () => {
    setSearch('');
    setSelectedCourse(null);
    onDeleteCourse();
  };

  // handle popover
  const open = Boolean(anchorEl && selectedCourse == null);
  const handleClosePopover = () => {
    setAnchorEl(null); // Reset the anchorEl to close the popover
  };

  return (
    <div>
      <TextField
        value={selectedCourse != null ? selectedCourse.name : search}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {selectedCourse || search ? (
                <Button
                  size="small"
                  onClick={handleClearClick}
                  aria-label="Clear"
                >
                  <ClearIcon fontSize="small" />
                </Button>
              ) : null}
            </InputAdornment>
          )
        }}
        variant="outlined"
        autoFocus
        margin="dense"
        id="course"
        label="Course Search *"
        type="Search"
        fullWidth
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        disableAutoFocus
      >
        <Box p={2}>
          <SearchResult
            isLoading={isLoading}
            data={data}
            error={error}
            onSelectCourse={handleSelectCourse}
          />
        </Box>
      </Popover>

      {selectedCourse && <div>Selected Course: {selectedCourse.name}</div>}
    </div>
  );
}
