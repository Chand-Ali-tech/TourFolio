import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const PopUpDataContext = createContext();

function PopUpDataProvider({ children }) {
  const [popupData, setPopupData] = useState(null);

  return (
    <PopUpDataContext.Provider value={{ popupData, setPopupData }}>
      {children}
    </PopUpDataContext.Provider>
  );
}

export default PopUpDataProvider ; // Export the provider

export function usePopUpData() {
  return useContext(PopUpDataContext);
}

PopUpDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};