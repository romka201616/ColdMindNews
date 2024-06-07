// src/components/NewsFilter.js
import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import newsStore from '../stores/newsStore';

const NewsFilter = () => {
    const [query, setQuery] = React.useState('');

    const handleSearch = () => {
        newsStore.setQuery(query);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <TextField
                label="Search"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
};

export default NewsFilter;