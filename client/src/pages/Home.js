import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl flex items-center">
                <div className="w-1/2 p-4">
                    <h1 className="text-3xl font-bold mb-4">PLANNING</h1>
                    <p className="mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
                <div className="w-1/2">
                    <img src={`${process.env.PUBLIC_URL}/image.png`} alt="Planning" className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default Home;
