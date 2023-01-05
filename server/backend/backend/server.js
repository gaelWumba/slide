const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('../data/data');
const colors = require('colors');
const connectDB = require('../config/database');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('../middleware/errorMiddleware');

const app = express();

dotenv.config();
connectDB();
app.use(express.json());

app.use('/api/user', userRoutes)

app.get('/api/chat/:id?', (req, res) => {
    // console.log(req.params.id);

    const singleChat = chats.find(c => c._id === req.params.id);
    res.send(singleChat);
})

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 4242;

app.listen(4242, console.log(`Server running on PORT ${ PORT }`.blue.bold));