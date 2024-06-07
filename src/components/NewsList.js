// src/components/NewsList.js
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import newsStore from '../stores/newsStore';
import NewsItem from './NewsItem';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsList = observer(({ searchQuery }) => {
    useEffect(() => {
        newsStore.fetchNews();
    }, []);

    const filteredNews = newsStore.news.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredNews.length === 0) {
        return (
            <Container>
                <Typography variant="h6" align="center" gutterBottom>
                    No news available
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <InfiniteScroll
            dataLength={filteredNews.length}
            next={() => newsStore.loadMore()}
            hasMore={newsStore.hasMore}
            loader={
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            }
            endMessage={
                <Typography variant="h6" align="center" gutterBottom>
                    No more news
                </Typography>
            }
            style={{ overflow: 'hidden' }} // Скрываем лишний скролл
        >
            <Container style={{ minHeight: '100vh' }}> {/* Устанавливаем минимальную высоту */}
                <Grid container spacing={2}>
                    {filteredNews.map((article, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <NewsItem article={article} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </InfiniteScroll>
    );
});

export default NewsList;