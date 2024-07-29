import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Outlet} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Toaster />
                <DndProvider backend={HTML5Backend}>
                    <Routes>
                        <Route element={<NavbarLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="dashboard" element={<Dashboard />} />
                        </Route>
                        <Route element={<NoNavbarLayout />}>
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                        </Route>
                    </Routes>
                </DndProvider>
            </AuthProvider>
        </Router>
    );
};

const NavbarLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

const NoNavbarLayout = () => <Outlet />;

export default App;
