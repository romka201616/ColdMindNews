// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Avatar, Button, Box, Grid, TextField } from '@mui/material';
import NewsItem from './NewsItem';

const ProfilePage = ({ user, onLogout }) => {
    const [avatar, setAvatar] = useState(user.avatar || '');
    const [favorites, setFavorites] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        // Fetch user favorites
        fetch(`http://localhost:3001/favorites/${user.id}`)
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.error('Error fetching favorites:', error));
    }, [user.id]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        fetch(`http://localhost:3001/avatar/${user.id}`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => setAvatar(data.avatar))
            .catch(error => console.error('Error uploading avatar:', error));
    };

    const handleCommentSubmit = (articleId) => {
        // Submit comment logic
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" align="center">
                    Профиль
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" component="label">
                        Изменить аватарку
                        <input type="file" hidden onChange={handleAvatarChange} />
                    </Button>
                </Box>
                <Button onClick={onLogout} fullWidth sx={{ mt: 2 }}>
                    Выйти
                </Button>
                <Typography variant="h5" align="center" sx={{ mt: 4 }}>
                    Избранные новости
                </Typography>
                <Grid container spacing={2}>
                    {favorites.map((article, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <NewsItem article={article} />
                            <TextField
                                label="Комментарий"
                                fullWidth
                                margin="normal"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={() => handleCommentSubmit(article.id)}>
                                Добавить комментарий
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default ProfilePage;