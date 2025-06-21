import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const Navbar = () => {

    const lists = <>
        <NavLink to='/' className={({ isActive }) => `btn btn-primary ${isActive ? 'btn-active' : 'btn-soft'}`} >Home</NavLink>
        <NavLink to='/about' className={({ isActive }) => `btn btn-primary ${isActive ? 'btn-active' : 'btn-soft'}`} >About us</NavLink>
        <NavLink to='/coverage' className={({ isActive }) => `btn btn-primary ${isActive ? 'btn-active' : 'btn-soft'}`} >Coverage</NavLink>
        {/* <NavLink to='/contact' className='btn btn-primary' >Contact</NavLink> */}
    </>

    return (
        <div className='urbanist'>
            <div className="  bg-base-100 shadow-sm">
                <div className="navbar max-w-11/12 mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                                {lists}
                            </ul>
                        </div>
                        <div className='flex justify-center items-end'>
                            <img src={logo} alt="Profast Logo" className=" h-12" />
                            <h1 className="text-3xl font-bold text-lime-400">Profast</h1>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 flex items-center justify-center gap-4">
                            {lists}
                        </ul>
                    </div>
                    <div className="navbar-end flex gap-4 pr-2">
                        <Link to='/auth/login' className="btn btn-soft btn-success font-semibold">Log In</Link>
                        <a className="btn">Button</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;