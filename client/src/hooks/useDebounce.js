import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  /**
   * args:
   *    value: searchString or other values that might be changed quickly
   *    delay: delay in ms to not send request for each change
   */
  
  // Initialize the debouncedValue state with the initial value (in our case a searchString)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Create a timer that will update the debouncedValue after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function that clears the timer when the value or delay changes or when the component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
}
