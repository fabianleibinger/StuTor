import { Button, TextField, InputAdornment } from "@mui/material";

import { useState } from "react";
import { useQuery } from "react-query";

import { getCoursesFilteredBySearchString } from "../../api/Course";
import useDebounce from "../../hooks/useDebounce";

import ClearIcon from "@mui/icons-material/Clear";

function SearchResult({ isLoading, data, error, onSelectCourse }) {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div key="loadingCourses">Loading...</div>;
  }

  if (data) {
    return (
      <div>
        {data.map(course => (
          <div key={course.id}>
            {course.name}
            <Button onClick={() => onSelectCourse(course)}>Select</Button>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function CourseSearch({ onSelectCourse }) {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isClearClicked, setIsClearClicked] = useState(false);

  const debouncedSearchTerm = useDebounce(search, 200);

  const { data, isLoading, error } = useQuery(
    ["search", debouncedSearchTerm],
    () => getCoursesFilteredBySearchString(debouncedSearchTerm)
  );

  const handleSelectCourse = course => {
    setSelectedCourse(course);
    onSelectCourse(course);
  };

  // next two methods are for clearing the course textfield
  const handleInputChange = e => {
    setSearch(e.target.value);
    setIsClearClicked(false);
  };

  const handleClearClick = () => {
    setSearch("");
    setSelectedCourse(null);
    setIsClearClicked(true);
  };

  return (
    <div>
      <TextField
        value={
          isClearClicked
            ? ""
            : selectedCourse && selectedCourse.name
            ? selectedCourse.name
            : search
        }
        onChange={e => setSearch(e.target.value)}
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
        label="Course Search"
        type="Search"
        fullWidth
      />
      {data && (
        <SearchResult
          isLoading={isLoading}
          data={data}
          error={error}
          onSelectCourse={handleSelectCourse}
        />
      )}
      {selectedCourse && <div>Selected Course: {selectedCourse.name}</div>}
    </div>
  );
}
