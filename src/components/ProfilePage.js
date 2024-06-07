// src/components/ProfilePage.js
import React from 'react';

const ProfilePage = ({ user }) => {
    if (!user) {
        return <div>Пожалуйста, войдите в свой аккаунт</div>;
    }

    return (
        <div>
            <h1>Профиль пользователя {user.username}</h1>
            <h2>Избранные новости</h2>
            <ul>
                {user.favorites.map((news) => (
                    <li key={news.id}>{news.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;