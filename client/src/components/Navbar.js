import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { authTokens, logout } = useAuth();

    return (
        <nav className="bg-blue-500 bg-opacity-80 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-3xl">TaskMaster</Link>
                <div>
                    {authTokens ? (
                        <>
                            <Link to="/dashboard" className="text-white mr-4 hover:text-gray-200">Dashboard</Link>
                            <button
                                onClick={logout}
                                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white mr-4 hover:text-gray-200">Login</Link>
                            <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
