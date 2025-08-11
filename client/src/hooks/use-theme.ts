import { useContext } from "react";
import { useTheme as useThemeContext } from "@/components/calendar/theme-provider";

export const useTheme = () => {
  return useThemeContext();
};
