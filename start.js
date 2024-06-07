// start.js
const { exec } = require('child_process');

// Запуск сервера
const server = exec('node server.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Ошибка при запуске сервера: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Ошибка сервера: ${stderr}`);
        return;
    }
    console.log(`Вывод сервера: ${stdout}`);
});

// Запуск клиента
const client = exec('npm start', (error, stdout, stderr) => {
    if (error) {
        console.error(`Ошибка при запуске клиента: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Ошибка клиента: ${stderr}`);
        return;
    }
    console.log(`Вывод клиента: ${stdout}`);
});