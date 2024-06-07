// api key: a08e9fbc282e4450ad425b6a2055ac24
// src/stores/newsStore.js
import { makeAutoObservable } from "mobx";

class NewsStore {
    news = [];
    page = 1;
    query = '';
    hasMore = true;

    constructor() {
        makeAutoObservable(this);
    }

    setNews(news) {
        // Фильтруем новости
        const filteredNews = news.filter(article => 
            article.title !== '[Removed]' && 
            article.description !== '[Removed]' && 
            article.url !== 'https://removed.com'
        );

        if (this.page === 1) {
            this.news = filteredNews;
        } else {
            this.news = [...this.news, ...filteredNews];
        }
        this.hasMore = filteredNews.length > 0; // Обновляем hasMore в зависимости от количества новостей
    }

    setQuery(query) {
        this.query = query;
        this.page = 1;
        this.fetchNews();
    }

    fetchNews() {
        const url = this.query
            ? `https://newsapi.org/v2/everything?q=${this.query}&page=${this.page}&apiKey=a08e9fbc282e4450ad425b6a2055ac24`
            : `https://newsapi.org/v2/top-headlines?country=us&page=${this.page}&apiKey=a08e9fbc282e4450ad425b6a2055ac24`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setNews(data.articles || []);
            })
            .catch(error => {
                console.error("Error fetching news:", error);
                this.setNews([]);
            });
    }

    loadMore() {
        if (this.hasMore) {
            this.page += 1;
            this.fetchNews();
        }
    }
}

const newsStore = new NewsStore();
export default newsStore;