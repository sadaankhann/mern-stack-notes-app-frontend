import { Moon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Filenames } from './Homepage'

const Nav = () => {

    const { changeTheme, setChangeTheme, text, background } = useContext(Filenames);

    const [flag, setFlag] = useState('');

    const [showProfile, setShowProfile] = useState(false)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {

        const currentLocation = window.location.href;
        const domain = new URL(currentLocation);

        const path = domain.pathname;
        


        if (path == '/signup' || path == '/login') {
            setFlag('hidden');
        }

        const gettingDataToShowInProfile = async () => {
            const data = await fetch(`${API}/profile`, {
                method: 'GET',
                credentials: 'include'
            })
            const response = await data.json();
            setName(response.username);
            setEmail(response.email);
            console.log(response.name);
        }

        gettingDataToShowInProfile();
    }, [])

    const handleProfileClick = () => {
        setShowProfile(true)
    }

    const handleDoneClick = () => {
        setShowProfile(false)
    }

    return (
        <div className={`${text, background} special-font font-bold h-full w-[60%] w-full'`}>
            <nav className='h-full w-full'>
                <div className="flex items-center justify-between nav">
                    <div className='text-[20px]'>Notes App</div>
                    <div className='flex justify-center text-[12px] gap-4'>
                        <button type='button'>
                            <Moon fill={`${background}`} className={`${flag}`} onClick={() => {
                                (changeTheme == 'white') ? setChangeTheme('dark') : setChangeTheme('white') 
                            }} /><p className={`${flag}`}>Dark</p>
                        </button>
                        <button className='profile' onClick={handleProfileClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height={28} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z" color={`${changeTheme == 'white' ? 'black' : 'white'}`}></path> </svg>
                            Profile
                        </button>
                    </div>
                </div>
            </nav>

            {showProfile && (
                <div className={`${text, background} fixed inset-0 backdrop-blur-sm flex items-center justify-center z-60 text-sm`}>
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">User Profile</h2>
                            <p className="text-sm text-gray-600">Manage your account information</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-medium">
                                    {name}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800">
                                    {email}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                                Edit
                            </button>
                            <button
                                onClick={handleDoneClick}
                                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Nav
