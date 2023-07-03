import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Popover,
  Box
} from '@mui/material';

import { useState, useEffect } from 'react';
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
      <Box>
        {data.map((course, index) => (
          <Box
            key={`${course.id}-${index}`}
            onClick={() => onSelectCourse(course)}
            sx={{
              '&:hover': {
                color: 'gray',
                cursor: 'pointer'
              },
              pt: 2,
              pr: 3,
              fontWeight: 'bold',
              fontSize: '20px'
            }}
          >
            {course.name}
          </Box>
        ))}
      </Box>
    );
  }

  return null;
}

export default function CourseSearch({
  onSelectCourse,
  onDeleteCourse,
  course,
  usage
}) {
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const debouncedSearchTerm = useDebounce(search, 200);

  useEffect(() => {
    if (course !== null) {
      setSelectedCourse(course);
    } else {
      handleClearClick();
    }
  }, [course]);

  const { data, error, isLoading } = useQuery(
    ['courseSearch', debouncedSearchTerm],
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
    <Box id="CoursSearchBox" sx={{ width: 0.6 }}>
      <TextField
        value={selectedCourse !== null ? selectedCourse.name : search}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {(selectedCourse || search) && usage === 'CREATE' ? (
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
        label="Course *"
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
    </Box>
  );
}
