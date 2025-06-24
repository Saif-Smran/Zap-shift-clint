import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaBars, 
  FaUser, 
  FaChartBar, 
  FaSignOutAlt 
} from 'react-icons/fa';
import logo from '../assets/logo.png'; // Adjust the path as necessary
import UseAuth from '../Hooks/UseAuth';

const Navbar = () => {
    const { user, userRole, Logout } = UseAuth();

    const handleLogout = () => {
        Logout();
    };

    const lists = <>
        <NavLink to='/' className={({ isActive }) => `btn btn-primary ${isActive ? 'btn-active' : 'btn-soft'}`} >Home</NavLink>
        <NavLink to='/about' className={({ isActive }) => `btn btn-primary ${isActive ? 'btn-active' : 'btn-soft'}`} >About us</NavLink>
        <NavLink to='/coverage' className={({ isActive }) => `btn btn-primary ${isActive ? 'btn-active' : 'btn-soft'}`} >Coverage</NavLink>
        {/* {user && (
            <NavLink to='/add-parcel' className={({ isActive }) => `btn btn-primary ${isActive ? 'btn-active' : 'btn-soft'}`} >Add Parcel</NavLink>
        )} */}
    </>

    return (
        <div className='urbanist'>
            <div className="  bg-base-100 shadow-sm">
                <div className="navbar max-w-11/12 mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <FaBars className="h-5 w-5" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                {lists}
                            </ul>
                        </div>
                        <Link to="/" className="block w-fit">
                            <div className="flex justify-start items-center bg-base-100 hover:bg-base-200 transition rounded-lg cursor-pointer">
                                <div className="flex justify-center items-end gap-2">
                                    <img src={logo} alt="Profast Logo" className="h-12" />
                                    <h1 className="text-3xl font-bold text-lime-400">Profast</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 flex items-center justify-center gap-4">
                            {lists}
                        </ul>
                    </div>
                    <div className="navbar-end flex gap-4 pr-2">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div 
                                    tabIndex={0} 
                                    role="button" 
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full bg-lime-400 flex items-center justify-center">
                                        <span className="text-black font-bold text-lg">
                                            {user.email ? user.email[0].toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="menu-title">
                                        <span className="text-sm font-semibold">{user.email}</span>
                                    </li>
                                    <li className="menu-title">
                                        <span className="text-xs text-gray-500">Role: {userRole || 'User'}</span>
                                    </li>
                                    <div className="divider my-1"></div>
                                    <li>
                                        <Link to="/profile" className="flex items-center gap-2">
                                            <FaUser className="w-4 h-4" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard" className="flex items-center gap-2">
                                            <FaChartBar className="w-4 h-4" />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <div className="divider my-1"></div>
                                    <li>
                                        <button 
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full text-left"
                                        >
                                            <FaSignOutAlt className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to='/auth/login' className="btn btn-soft btn-success font-semibold">Log In</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;