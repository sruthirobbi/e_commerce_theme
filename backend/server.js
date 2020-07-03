const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established Successfully")
});

console.log(__dirname)

const productRouter = require('./routes/product');
const userRouter = require('./routes/users');

app.use('/product', productRouter);
app.use('/users', userRouter);

app.listen(port, ()=> {
    console.log(`server is running on port : ${port}`);
});