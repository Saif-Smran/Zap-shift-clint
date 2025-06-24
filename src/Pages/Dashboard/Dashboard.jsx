import React from 'react';
import { FaUser, FaBox, FaTruck, FaChartLine } from 'react-icons/fa';
import UseAuth from '../../Hooks/UseAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, userRole } = UseAuth();

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin':
                return 'text-red-600';
            case 'Rider':
                return 'text-blue-600';
            default:
                return 'text-green-600';
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'Admin':
                return <FaChartLine className="w-6 h-6" />;
            case 'Rider':
                return <FaTruck className="w-6 h-6" />;
            default:
                return <FaUser className="w-6 h-6" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Welcome to your Profast dashboard</p>
                </div>

                {/* My Parcels Quick Link */}
                <div className="flex justify-center mb-8">
                  <Link to="/dashboard/my-parcels" className="btn btn-lg bg-lime-500 hover:bg-lime-600 text-white font-bold flex items-center gap-2">
                    <FaBox /> My Parcels
                  </Link>
                </div>

                {/* User Info Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center">
                                <span className="text-black font-bold text-2xl">
                                    {user?.email ? user.email[0].toUpperCase() : 'U'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{user?.email}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    {getRoleIcon(userRole)}
                                    <span className={`font-semibold ${getRoleColor(userRole)}`}>
                                        {userRole || 'User'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Last login</p>
                            <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Role-based Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBox className="w-5 h-5 text-lime-600" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link to='/add-parcel' className="btn btn-outline text-lime-500 hover:bg-lime-500 hover:text-white w-full font-bold">
                                Add New Parcel
                            </Link>
                            <button className="btn btn-outline text-lime-500 hover:bg-lime-500 hover:text-white w-full font-bold">
                                Track Parcel
                            </button>
                            <button className="btn btn-outline text-lime-500 hover:bg-lime-500 hover:text-white w-full font-bold">
                                View History
                            </button>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaChartLine className="w-5 h-5 text-blue-600" />
                            Statistics
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Parcels</span>
                                <span className="font-bold text-2xl text-lime-600">24</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Delivered</span>
                                <span className="font-bold text-2xl text-green-600">18</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">In Transit</span>
                                <span className="font-bold text-2xl text-blue-600">4</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Pending</span>
                                <span className="font-bold text-2xl text-orange-600">2</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTruck className="w-5 h-5 text-green-600" />
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium">Parcel delivered</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium">New parcel added</p>
                                    <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium">Pickup scheduled</p>
                                    <p className="text-xs text-gray-500">2 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role-specific Features */}
                {userRole === 'Admin' && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Admin Panel</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="btn btn-outline">Manage Users</button>
                            <button className="btn btn-outline">View Analytics</button>
                            <button className="btn btn-outline">System Settings</button>
                        </div>
                    </div>
                )}

                {userRole === 'Rider' && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Rider Panel</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="btn btn-outline">View Assignments</button>
                            <button className="btn btn-outline">Update Status</button>
                            <button className="btn btn-outline">Route Planning</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard; 