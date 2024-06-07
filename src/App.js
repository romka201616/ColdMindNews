// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsList from './components/NewsList';
import LoginPage from './components/LoginPage';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Здесь вы можете добавить логику для выполнения поиска
        console.log('Поиск:', query);
    };

    return (
        <Router>
            <Header onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<NewsList searchQuery={searchQuery} />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
