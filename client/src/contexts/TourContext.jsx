import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useReducer } from "react";

const initialState = {
  tours: [],
  bookings: [],
  topTours:[]
};
function reducer(state, action) {
  switch (action.type) {
    case "Fetch_Tour_Data":
      return {
        ...state,
        tours: action.payload,
      };
    case "Delete_Tour":
      return {
        ...state,
        tours: state.tours.filter((tour) => tour._id !== action.payload),
      };
    case "Fetch_Bookings":
      // console.log("payload", action.payload);

      return {
        ...state,
        bookings: action.payload,
      };
    case "Fetch_Top_Tours":
      return {
       ...state,
        topTours: action.payload
      };
    default:
      return state;
  }
  
}
const ToursContext = createContext();

function ToursProvider({ children }) {
  // const [tours, setTours] = useState([]);
  const [{ tours, bookings }, dispatch] = useReducer(reducer, initialState);

  console.log("Tours from tourContext :- ", tours);
  return (
    <ToursContext.Provider value={{ tours, dispatch, bookings }}>
      {children}
    </ToursContext.Provider>
  );
}

ToursProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToursProvider;
export const useTours = () => useContext(ToursContext);
