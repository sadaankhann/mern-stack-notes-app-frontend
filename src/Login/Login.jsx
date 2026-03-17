import React, { useState } from 'react'
import Nav from '../Homepage/Nav'
import heroimage from "../assets/websiteicon.png"
import { useNavigate } from 'react-router-dom'
import { Info } from 'lucide-react'

const Login = () => {

    const API = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [flag, setFlag] = useState('hidden');
    const [text, setText] = useState();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        contact: '',
        savePassword: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        const sendingFormData = await fetch(`${API}/login`, {
            method : 'POST',
            credentials: "include",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                formData : formData
            })
        })

        const response = await sendingFormData.json();

        if(response.redirected){
            window.location.href = '/login'
        }

        if(response.success === false){
            setText(response.message);
            setFlag('flex');
            setTimeout(()=>{
                setFlag('hidden');
            }, 2000)
        } else{
            navigate('/');
        }
    }

    return (
        <div className='flex flex-col justify-center items-center pt-6 bg-gray-100'>
            <div className="flex flex-col justify-center items-center min-h-screen h-auto w-full">
                <div className='h-[10%] w-full flex justify-center'><Nav /></div>
                <div className=' flex h-[90%] w-full'>
                    {/* Left Section - Image & Content */}
                    <div className="one fixed top-0 left-0 h-screen mt-5 w-[40%] p-12 flex flex-col justify-center items-center z-50">
                        <img src={heroimage} className='h-[320px] w-[300px]' alt="" />
                        <h2 className='special-font text-xl text-center mt-4'>
                            Already a user? login to your<br />account to get back to your tasks!
                        </h2>
                    </div>

                    {/* Right Section - Sign Up Form */}
                    <div className='two ml-120 h-full h-auto w-[60%] bg-gray-50 flex flex-col justify-center items-center p-12'>
                        <div className='w-full max-w-sm'>
                            {/* Form Header */}
                            <div className='mb-10 text-center'>
                                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Login to your account</h2>
                                <p className='text-gray-500'>Login to complete your tasks</p>
                            </div>

                            {/* Sign Up Form */}
                            <form onSubmit={handleSubmit} className='space-y-5'>
                                {/* Email Field */}
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2'>Email Address</label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='you@example.com'
                                        className='w-full px-2 py-1 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 text-gray-800'
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className='block text-gray-700 font-semibold mb-2'>Password</label>
                                    <input
                                        type='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Create a strong password'
                                        className='w-full px-2 py-1 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 text-gray-800'
                                        required
                                    />
                                </div>

                                {/* Checkbox */}
                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        name='savePassword'
                                        id='savePassword'
                                        checked={formData.savePassword}
                                        onChange={handleChange}
                                        className='w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer'
                                    />
                                    <label htmlFor='savePassword' className='ml-3 text-gray-700 cursor-pointer'>
                                        Save password for future use
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    className='w-1/2 mt-6 py-2  bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                                >
                                    Login
                                </button>
                            </form>

                            {/* Footer */}
                            <p className='text-center text-gray-600 mt-6'>
                                Already have an account? <a href='#' className='text-blue-600 font-semibold hover:underline'>Sign In</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${flag} fixed top-0 right-0 right-10 top-10 reportingmessage w-[200px] h-[30px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm flex flex-col justify-center items-center overflow-hidden`}>
                <p className='flex items-center justify-center gap-1'><Info size={14}/>{text}</p>
                <p className='line absolute left-[-100%] bottom-0 w-[300px] h-[3px] bg-blue-300'></p>
            </div>

        </div>
    )
}

export default Login
