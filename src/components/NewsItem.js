// src/components/NewsItem.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, TextField, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const NewsItem = ({ article, user, onFavoriteToggle, onCommentSubmit }) => {
    const [comment, setComment] = useState('');

    const handleFavoriteToggle = () => {
        onFavoriteToggle(article);
    };

    const handleCommentSubmit = () => {
        onCommentSubmit(article.id, comment);
        setComment('');
    };

    return (
        <Card sx={{ maxWidth: '100%', margin: '20px auto' }}>
            {article.urlToImage && (
                <CardMedia
                    component="img"
                    height="140"
                    image={article.urlToImage}
                    alt={article.title}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {article.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <IconButton onClick={handleFavoriteToggle}>
                        {article.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                    <TextField
                        label="Комментарий"
                        fullWidth
                        margin="normal"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                        Добавить комментарий
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NewsItem;