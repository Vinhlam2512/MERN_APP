const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

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
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server start at port http://localhost:${PORT}/api`);
});
