const express = require('express');
const app = express();

app.use('/user', (req,res,next)=>{
    console.log('First middleware');
    res.send('<h1>Hey, user!<h1>')
})

app.use('/', (req,res,next)=>{
    res.send("I've just finished executing second middleware<br> Welcome to my page");
})


app.listen(3000);
