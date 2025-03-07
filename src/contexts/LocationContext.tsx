"use client";

import React, { createContext, useContext, useState } from 'react';

interface LocationContextType {
  isNearby: boolean;
  setIsNearby: (value: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNearby, setIsNearby] = useState(false);

  return (
    <LocationContext.Provider value={{ isNearby, setIsNearby }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}; 