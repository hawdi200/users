const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'login',
    port:'3306'
});

connection.connect(err =>{
    if(err){
        console.log("Error in db: ",err);
    }
});
module.exports=connection;