import React from 'react';
import logo from '../assets/logo.png'; // Adjust the path as necessary
import { Link, Outlet } from 'react-router-dom';
import img from '../assets/authImage.png'; // Adjust the path as necessary

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex justify-center bg-base-100">
            <div className="w-full max-w-11/12 bg-base-100  rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                <div>
                    <Link to="/" className="block w-fit">
                        <div className="flex justify-start items-center bg-base-100 my-6 p-4 hover:bg-base-200 transition rounded-lg cursor-pointer">
                            <div className="flex justify-center items-end gap-2">
                                <img src={logo} alt="Profast Logo" className="h-12" />
                                <h1 className="text-3xl font-bold text-lime-400">Profast</h1>
                            </div>
                        </div>
                    </Link>

                    {/* Left Side - Login Form */}
                    <div className='max-w-lg mx-auto'>
                        <Outlet></Outlet>
                    </div>
                </div>

                {/* Right Side - Illustration */}
                <div className="hidden md:flex items-center justify-center bg-lime-50 p-10">
                    <img
                        src={img} // Replace with your image path
                        alt="Auth Illustration"
                        className="w-3/4"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;