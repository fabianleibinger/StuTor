import { createContext, useReducer } from "react";

export const MyStudySessionsContext = createContext();

export const studySessionsReducer = (state, action) => {
  /**
   * This reducer handles the different types of dispatches
   */
  switch (action.type) {
    case "SET_STUDY_SESSIONS":
      return {
        studySessions: action.payload
      };
    case "CREATE_STUDY_SESSION":
      return {
        studySessions: [action.payload, ...state.studySessions]
      };
    case "DELETE_STUDY_SESSION":
      return {
        studySessions: state.studySessions.filter(
          s => s._id !== action.payload._id
        )
      };
    default:
      return state;
  }
};

export const StudySessionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studySessionsReducer, {
    studySessions: null
  });

  return (
    <MyStudySessionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MyStudySessionsContext.Provider>
  );
};
