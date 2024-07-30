import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center justify-center flex-grow bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl flex items-center">
                    <div className="w-1/2 p-4">
                        <h1 className="text-4xl font-bold mb-4 text-blue-600">TaskMaster</h1>
                        <p className="mb-6 text-gray-700">
                            Welcome to TaskMaster, your ultimate task management app! TaskMaster helps you organize and prioritize your tasks efficiently, ensuring you stay on top of your workload. Whether you are managing a personal to-do list or handling a team project, TaskMaster provides the tools you need to succeed.
                        </p>
                        <Link to="/signup" className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md">
                            Get Started
                        </Link>
                    </div>
                    <div className="w-1/2">
                        <img src={`${process.env.PUBLIC_URL}/image1.jpeg`} alt="Task Management" className="w-full h-auto" />
                    </div>
                </div>
            </div>
            <footer className="bg-blue-600 text-white text-center py-4">
                <p className="text-sm">
                    Made with ❤️ by Aryan Singh Thakur
                </p>
            </footer>
        </div>
    );
};

export default Home;
