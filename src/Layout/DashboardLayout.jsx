import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaBox, FaPlus, FaUser, FaBars } from 'react-icons/fa';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg transform lg:translate-x-0 transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:inset-0`}> 
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-2xl font-bold text-lime-600">Dashboard</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="mt-4 flex flex-col gap-2 px-4">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-lime-100 text-lime-700' : 'hover:bg-gray-100 text-gray-700'}` } end>
            <FaHome /> Dashboard Home
          </NavLink>
          <NavLink to="/dashboard/my-parcels" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-lime-100 text-lime-700' : 'hover:bg-gray-100 text-gray-700'}` }>
            <FaBox /> My Parcels
          </NavLink>
          <NavLink to="/dashboard/add-parcel" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-lime-100 text-lime-700' : 'hover:bg-gray-100 text-gray-700'}` }>
            <FaPlus /> Add Parcel
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-lime-100 text-lime-700' : 'hover:bg-gray-100 text-gray-700'}` }>
            <FaUser /> Profile
          </NavLink>
        </nav>
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar for mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow">
          <button onClick={() => setSidebarOpen(true)} className="text-lime-600 text-2xl">
            <FaBars />
          </button>
          <span className="font-bold text-lg">Dashboard</span>
          <div></div>
        </div>
        <main className="flex-1 p-2 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 