import LoginPage from "./components/LoginPage"
import ProfilePage from "./components/ProfilePage"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"


function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        isAuthenticated ? 
                        <Navigate to="/profile" replace /> : 
                        <LoginPage onLogin={handleLogin} />
                    } 
                />
                <Route 
                    path="/profile" 
                    element={
                        isAuthenticated ? 
                        <ProfilePage user={user} onLogout={handleLogout} /> : 
                        <Navigate to="/login" replace />
                    } 
                />
                <Route 
                    path="/" 
                    element={<Navigate to={isAuthenticated ? "/profile" : "/login"} replace />} 
                />
            </Routes>
        </Router>
    );
}

export default App
