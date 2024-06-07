// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    News App
                </Typography>
                <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
                    <TextField
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Поиск..."
                        size="small"
                        variant="outlined"
                        sx={{ marginRight: '10px', backgroundColor: 'white' }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Искать
                    </Button>
                </Box>
                <Button color="inherit" onClick={handleLoginClick} sx={{ marginLeft: 'auto' }}>
                    Войти
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;