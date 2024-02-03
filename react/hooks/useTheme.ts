import { useCallback, useContext } from "react";
import { ThemeContext, ThemeContextValue } from "../context/themeContext";
import { useLocalStorage } from "./useLocalStorage";
import { themes } from "../utils";

export const useTheme = () => {
    // Get value from local storage
    const [, setLocalTheme]=useLocalStorage<string>('THEME','blueDolphin');
    // Get theme from context
    const {theme, setTheme} = useContext(ThemeContext) as ThemeContextValue;

    // Set system theme
    const setSystemTheme=useCallback((value:string)=>{
        setTheme(themes[value]);
        setLocalTheme(value);
    },
    [setTheme, setLocalTheme]);
    
    return {theme, setSystemTheme}
}