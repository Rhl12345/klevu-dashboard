import { TTheme } from "@/types/common/common.type";

export const THEME_KEY = "9@1_op80ll";

export const setThemeInLocalStorage = (theme: TTheme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemeFromLocalStorage = (): TTheme => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem(THEME_KEY) as TTheme) || "light";
  }
  return "light";
};
