// src/components/LoginPage.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = isLogin ? '/login' : '/register';
        try {
            const response = await fetch(`http://localhost:3001${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Ошибка сети. Пожалуйста, попробуйте позже.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" align="center">
                    {isLogin ? 'Вход' : 'Регистрация'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя пользователя"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </form>
                <Button onClick={toggleMode} fullWidth sx={{ mt: 2 }}>
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;