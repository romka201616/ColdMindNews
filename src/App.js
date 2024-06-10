// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsList from './components/NewsList';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch current user
        fetch('http://localhost:3001/currentUser')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log('Поиск:', query);
    };

    const handleLogin = (user) => {
        setUser(user);
    };

    const handleLogout = () => {
        setUser(null);
        // Add logout logic here
    };

    const handleFavoriteToggle = (article) => {
        // Add favorite toggle logic here
    };

    const handleCommentSubmit = (articleId, comment) => {
        // Add comment submit logic here
    };

    return (
        <Router>
            <Header onSearch={handleSearch} user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<NewsList searchQuery={searchQuery} user={user} onFavoriteToggle={handleFavoriteToggle} onCommentSubmit={handleCommentSubmit} />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
            </Routes>
        </Router>
    );
};

export default App;