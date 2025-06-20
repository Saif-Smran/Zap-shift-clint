import React from 'react';
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6';
import logo from '../assets/logo.png'; // Assuming you have a logo image in assets folder
const Footer = () => {
    return (
        <footer className=" max-w-11/12 mx-auto my-6 bg-neutral text-neutral-content px-6 py-12 rounded-3xl urbanist">
            <div className="max-w-6xl mx-auto text-center space-y-6">
                {/* Logo & Description */}
                <div className="space-y-3">
                    <div className='flex justify-center items-end'>
                        <img src={logo} alt="Profast Logo" className=" h-12" />
                        <h1 className="text-3xl font-bold text-lime-400">Profast</h1>
                    </div>
                    <p className="max-w-2xl mx-auto text-sm md:text-base">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="border-y border-dashed border-cyan-700 py-4">
                    <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
                        <li><a className="link link-hover">Services</a></li>
                        <li><a className="link link-hover">Coverage</a></li>
                        <li><a className="link link-hover">About Us</a></li>
                        <li><a className="link link-hover">Pricing</a></li>
                        <li><a className="link link-hover">Blog</a></li>
                        <li><a className="link link-hover">Contact</a></li>
                    </ul>
                </nav>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mt-4">
                    <a className="btn btn-circle bg-[#0077b5] hover:bg-[#00669d] text-white">
                        <FaLinkedinIn />
                    </a>
                    <a className="btn btn-circle bg-white text-black hover:bg-gray-300">
                        <FaXTwitter />
                    </a>
                    <a className="btn btn-circle bg-[#1877f2] hover:bg-[#1560c3] text-white">
                        <FaFacebookF />
                    </a>
                    <a className="btn btn-circle bg-[#ff0000] hover:bg-[#cc0000] text-white">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
