const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const mongoose = require('mongoose');
const router = require('./src/router/index')

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Для взаимодействия с сервером из браузера
app.use('/auth', router);

mongoose.set('strictQuery', false);

const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27021/admin?replicaSet=dbrs&directConnection=true')
            .then(() => console.log('DB connected'))
            .catch((e) => console.log(e));
        app.listen(PORT, () => console.log(`Listening ${PORT} PORT`))
    } catch (error) {
        console.log(error);
    }
}

start();