const express=require('express');
const ConnectToDb=require('./db');
const cors=require('cors');
ConnectToDb();
const app=express();
const port=5000;
app.use(express.json());
app.use(cors());
app.use('/api/auth',require('./routes/auth/userauth'));
app.use('/api/seller',require('./routes/cart/seller'));
app.use('/api/cart',require('./routes/cart/cart'));



app.listen(port,()=>{
    console.log('connected to server successfully');
})