import { useState } from "react";

export const Header = () => {

    const [darkMode, setDarkMode] = useState(false);

    const onHandleClic = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div>
            <h1>Heacer</h1>
            <button className="button" onClick={onHandleClic}>{darkMode ? 'Dark Mode': 'Light Mode'}</button>
        </div>
    )
}
