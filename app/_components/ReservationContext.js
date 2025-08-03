"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialValue = { from: undefined, to: undefined };

export function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialValue);

  function resetRange() {
    setRange(initialValue);
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined) {
    throw new Error(
      "Reservation Context must be used within Reservation Provider"
    );
  } else {
    return context;
  }
}
