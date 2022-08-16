const express = require('express');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Mern-LearnIT', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();

app.get('/', (rea, res) => console.log('hello'));

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server start at port ${PORT}`);
});
