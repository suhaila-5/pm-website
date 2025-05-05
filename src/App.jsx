import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { useAuth } from './context/AuthContext.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import './App.css';

const AppContent = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route 
                path="/login" 
                element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
                path="/register" 
                element={!user ? <Register /> : <Navigate to="/dashboard" />} 
            />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/" 
                element={!user ? <Navigate to="/register" /> : <Navigate to="/dashboard" />} 
            />
        </Routes>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;