const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const routes=require('./api/routes/user')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/user',routes);

module.exports=app;