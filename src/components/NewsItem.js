// src/components/NewsItem.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const NewsItem = ({ article }) => {
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
                <Button size="small" color="primary" href={article.url} target="_blank">
                    Read more
                </Button>
            </CardContent>
        </Card>
    );
};

export default NewsItem;