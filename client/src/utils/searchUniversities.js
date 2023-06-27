export const searchUniversities = (
  value,
  allUniversities,
  setSearchResults,
  setUser,
  setUserFlag,
  setSelectedUniversity
) => {
  const query = value || "";
  setSearchResults([]);

  let filteredUniversities = allUniversities;
  if (query && query !== "") {
    filteredUniversities = allUniversities.filter((university) =>
      university.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  setSearchResults(filteredUniversities.map((university) => university.name));

  const selectedUniversity = allUniversities.find(
    (university) => university.name === query
  );
  if (setSelectedUniversity) {
    setSelectedUniversity(selectedUniversity);
  }

  if (setUserFlag) {
    if (selectedUniversity) {
      setUser((prev) => ({
        ...prev,
        university: selectedUniversity._id,
      }));
      setSearchResults([]);
    } else {
      setUser((prev) => ({
        ...prev,
        university: "",
      }));
    }
  }
};
