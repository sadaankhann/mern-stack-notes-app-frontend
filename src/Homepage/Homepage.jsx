import React, { createContext, useState } from 'react';
import Nav from './Nav';
import InputArea from './InputArea';
import Files from './Files';
import { useEffect } from 'react';

export const Filenames = createContext({
    filesName: [],
    setFilesName: () => {},
    changeTheme: 'white',
    setChangeTheme: () => {},
    text: 'text-black',
    background: 'bg-gray-100'
});

const Homepage = () => {

    const API = import.meta.process.env.VITE_API_URL

    const [filesName, setFilesName] = useState([]);

    const [changeTheme, setChangeTheme] = useState(() => {
        const saved = localStorage.getItem("themeContext");
        return saved ? JSON.parse(saved).theme : "white";
    });

    const [text, setText] = useState(() => {
        const saved = localStorage.getItem("themeContext");
        return saved ? JSON.parse(saved).text : "text-black";
    });

    const [background, setBackground] = useState(() => {
        const saved = localStorage.getItem("themeContext");
        return saved ? JSON.parse(saved).background : "bg-gray-100";
    });

    useEffect(() => {
        const checkingIfLoggedIn = async () => {
            const check = await fetch(`${API}/user`, {
                method: 'GET',
                credentials: 'include'
            });
            const response = await check.json();
            if (!response.isLoggedIn) {
                window.location.href = "/login";
            }
        }

        checkingIfLoggedIn();

    }, [])

    useEffect(() => {

        let newText;
        let newBackground;

        if (changeTheme == 'white') {
            newText = 'text-black';
            newBackground = 'bg-gray-100';
        } else {
            newText = 'text-white';
            newBackground = 'bg-black';
        }

        setText(newText);
        setBackground(newBackground);

        localStorage.setItem('themeContext', JSON.stringify({ theme : changeTheme,text: newText, background: newBackground }));

    }, [changeTheme])

    return (
        <Filenames.Provider value={{ filesName, setFilesName, changeTheme, setChangeTheme, text, background }}>
            <div className={`${text} ${background} flex gap-10 flex-col items-center min-h-screen h-auto pt-6`}>
                <Nav />
                <InputArea />
                <Files />
            </div>
        </Filenames.Provider>
    );
}

export default Homepage;