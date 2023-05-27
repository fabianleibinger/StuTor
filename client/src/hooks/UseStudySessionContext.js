import { MyStudySessionsContext } from "../context/MyStudySessionsContext";
import { useContext } from "react";

export const useStudySessionsContext = () => {
  const context = useContext(MyStudySessionsContext);

  if (!context) {
    throw Error(
      "useStudySessionsContext must be used insid an StudySessionsContextProvider"
    );
  }

  return context;
};
