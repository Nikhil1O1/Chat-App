const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();


const rooms = ['general', 'tech', 'finance', 'crypto'];
const cors = require("cors");
app.use(express.json());  //keep this before routes else you will have issue in parsing params
app.use('/users',userRoutes)
app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect(process.env.MONGO_DB).then(
    console.log('connected to DB')
).catch(err => console.log(err));

const server = require('http').createServer(app);
const PORT = 5000;
const io = require('socket.io')(server, {
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

