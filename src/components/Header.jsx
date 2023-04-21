import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";

export const Header = () => {

    const [darkMode, setDarkMode] = useState(false);

    const color = useContext(ThemeContext);

    const onHandleClic = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div>
            <h1 style={{ color }}>Header</h1>
            <button className="button" onClick={onHandleClic}>{darkMode ? 'Dark Mode': 'Light Mode'}</button>
        </div>
    )
}
