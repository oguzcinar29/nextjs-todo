"use client";
import React, { createContext, useEffect, useState } from "react";

export type ticketContextType = {
  pri: number;
  progress: number;
  projectType: string;
  status: string;
  category: string;
  date: string;
};
export const ticketContextDefaultValue: ticketContextType = {
  pri: 0,
  progress: 0,
  projectType: "",
  status: "",
  category: "",
  date: "",
};

export type priType = {
  pri: number;
};

export const TicketContext = createContext<ticketContextType>(
  ticketContextDefaultValue
);

const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pri, setPri] = useState<number | null>(3);
  const [progress, setProgress] = useState<number | null>(null);
  const [category, setCategory] = React.useState("");
  const [projectType, setProjectType] = React.useState("");
  const [date, setDate] = useState<string | null>(new Date().toLocaleString());

  const values: any = {
    pri,
    setPri,
    progress,
    setProgress,
    category,
    setCategory,
    projectType,
    setProjectType,
    date,
  };

  return (
    <TicketContext.Provider value={values}>{children}</TicketContext.Provider>
  );
};
export default TicketProvider;
