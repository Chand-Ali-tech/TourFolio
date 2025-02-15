import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
function LoadingProvider({ children }) {
  const [loading, setLoading] = useState();
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
export default LoadingProvider;

export function useLoading() {
  return useContext(LoadingContext);
}