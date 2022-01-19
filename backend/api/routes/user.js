const express=require('express');
const router=express.Router();
const con=require('../connection/connection');
const jwt=require('jsonwebtoken');

router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    con.query('select * from users where email=? and password=?',[email,password],(err,rows,fields)=>{
        let token="";
        if(rows.length>0){
            let data=JSON.stringify(rows[0]);
            token=jwt.sign(data,'secret');
        }
        res.json({token});
    });
});

router.post('/register',(req,res)=>{
    const {fname,lname,email,password}=req.body;
    con.query('select * from users where email=?',[email],(err,rows,fields)=>{
        if(rows.length==0){
            con.query('insert into users(fname,lname,email,password,role) values (?,?,?,?,?)',[fname,lname,email,password,'client']);
            res.json('');
        }
        else{
            res.json('Email already exists');
        }
    });
});

router.post('/edit',(req,res)=>{
    const {id,fname,lname,email,password,role}=req.body;
    con.query('update users set fname=?,lname=?,password=? where id=?',[fname,lname,password,id],(err,rows,fields)=>{
        let data={
            fname:fname,
            lname:lname,
            email:email,
            password:password,
            role:role
        }
        let token=jwt.sign(data,'secret');
        res.json({token});
    });
});

module.exports=router;