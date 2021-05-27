const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyPraser = require('body-parser');
const mysql = require('mysql');
const app = express();


//connection code-------------------------------------------------
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'mini_test',
    port: '3306'
})
//connection check------------------------------------------------
connection.connect((err) => {
    if (err){
        throw err
    }
    else{
        console.log('connected')
    }
})


// MAIN DATABASE QUERY------------------------------------------------------------------------------
connection.query('SELECT * FROM room', (err, rows) => {
    if(err){
           throw err
        }
        else{
           console.log("datbase updated and sent")
            console.log(rows)
        }
})


// VIEW PATH DIRECTORY------------------------------------------------------------------------------------
app.set('views' ,path.join(__dirname,'client'));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());


//*********************************_C_U_R_D_*****************************************************************************************
//ACTION OF CODE WITH DB HERE---------------------------------------------------------------------------------------


app.get('/',(req, res) => {
    let sql = "SELECT customer_ID, full_name, phone_no, address FROM customer";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    
    res.render('front', {       //render=======sendFile//
        customer : rows
        });
    });
});
app.get('/guest',(req, res) => {
    let sql = "SELECT * FROM guest";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    
    res.render('guest_view', {       //render=======sendFile//
        customer : rows
        });
    });
});
app.get('/room',(req, res) => {
    let sql = "SELECT room FROM room";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    
    res.render('room_view', {       //render=======sendFile//
        customer : rows
        });
    });
});
app.get('/staff',(req, res) => {
    let sql = "SELECT * FROM staff";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    
    res.render('staff_view', {       //render=======sendFile//
        //customer : rows
        });
    });
});


//-------------------------------POST METHOD HERE-----------------------------------------------------------------------
app.post('/save',(req, res) => { 
    const customer_ID = req.params.customer_ID;
    let data = {customer_ID: req.body.customer_ID, full_name: req.body.full_name, phone_no: req.body.phone_no, address: req.body.address};
    let sql = "INSERT INTO guest SET ?";
    let query = connection.query(sql, sql_room, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
   
});

//--------------------------------UPDATE METHOD------------------------------------------------------------------------------
app.get('/edit/:customer_ID',(req, res) => {
    const customer_ID = req.params.customer_ID;
    let sql = `Select * from guest where G_ID = ${customer_ID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('front', {
            customer : result[0]
        });
    });
});

app.post('/update',(req, res) => {
    const customer_ID = req.body.customer_ID;
    let sql = "update customer SET full_name='"+req.body.full_name+"',  phone_no='"+req.body.phone_no+"',  address='"+req.body.address+"' where customer_ID ="+customer_ID;
    let sql = `DELETE from customer where customer_ID = ${customer_ID}`;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
 
//-------------------DELETE METHOD HERE--------------------------------
app.get('/deletes/:customer_ID',(req, res) => {
    const customer_ID = req.params.customer_ID;
    let sql = `Select * from guest where G_ID = ${customer_ID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('front', {
            customer : result[0]
        });
    });
});

app.post('/delete',(req, res) => {
    const customer_ID = req.body.customer_ID;
    let sql = `SELECT * FROM guest WHERE G_ID = ${customer_ID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


//*****************************************************************************************************************************************************







//SERVER RUN CHECK----------------------------------------------------------------------------------------
app.listen(3000, () => {
    console.log("server is running at port 3000")
});

