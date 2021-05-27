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

//SERVER RUN CHECK----------------------------------------------------------------------------------------
app.listen(3000, () => {
    console.log("server is running at port 3000")
});

//***************************************** VIEW HERE *********************************************/

// VIEW PATH DIRECTORY------------------------------------------------------------------------------------
app.set('views' ,path.join(__dirname,'client'));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

//#001
app.get('/',(req, res) => {
    
    res.render('front', {       //render=======sendFile//
        
        });
});

//******************************************DB QUERY HERE********************************************/

//#001 DISPLAY ALL ROWS OF GUEST JOINED WITH ROOM NUMBER
app.get('/guest',(req, res) => {
    
    let sql = 
    "SELECT guest.G_ID, guest.G_NAME, guest.C_IN, guest.C_OUT, guest.PAY_STATUS, room.R_ID FROM guest LEFT JOIN room ON room.R_B_ID = guest.B_ID"; "INSERT INTO room (R_NO, R_B_ID) SET ?";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    
    res.render('guest_view', {       //render=======sendFile//
        guest : rows
        });
    });
});
//#001.01 ADD DATA INTO GUEST TABLE
app.post('/save',(req, res) => { 
    const B_ID = req.params.B_ID;
    let data = {G_ID: req.body.G_ID, G_NAME: req.body.G_NAME, C_IN: req.body.C_IN, C_OUT: req.body.C_OUT, B_ID: req.body.B_ID};
    let sql = "INSERT INTO guest SET ?";    
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/guest');
    });
   
});
//#001.2 UPDATE DATA IN ROOM DATABASE
app.post('/save',(req, res) => { 
    const R_ID = req.params.B_ID;
    let data = {R_B_ID: req.body.B_ID};
    let sql = "INSERT INTO room SET ?"
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/guest');
    });
   
});


//#001.02>>>>>>>>>>>>>>>>>>>>>>>UPDATE
app.get('/edit/:customer_ID',(req, res) => {
    const G_ID = req.params.G_ID;
    let sql = `Select * from guest where G_ID = ${customer_ID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('guest_view', {
            customer : result[0]
        });
    });
});
////#001.02 UPDATE DATA INTO GUEST TABLE
app.post('/update',(req, res) => {
    const G_ID = req.body.G_ID;
    let sql = "update guest SET G_NAME='"+req.body.G_NAME+"',  C_OUT='"+req.body.C_OUT+"' where G_ID ="+G_ID;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/guest');
    });
});


//#002 SDISPLAY ALL ROWES FROM ROOM TABLE JOINED WITH GUEST ID AND GUEST NAME
app.get('/room',(req, res) => {
    let sql = "SELECT guest.G_ID, room.R_ID, guest.G_NAME FROM room LEFT JOIN guest ON guest.B_ID = room.r_B_ID";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    
    res.render('room_view', {       //render=======sendFile//
        room : rows
        });
    });
});

//#003 DISPLAY ALL ROWS FROM STAFF DATABASE
app.get('/staff',(req, res) => {
    let sql = "SELECT * FROM staff";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    
    res.render('staff_view', {       //render=======sendFile//
        staff : rows
        });
    });
});

//#003.01 ADD DATA TO STAFF TABLE IN DATABASE
app.post('/saveSTAFF',(req, res) => { 
    const S_ID = req.params.S_ID;
    let data = {S_ID: req.body.S_ID, S_NAME: req.body.S_NAME, S_CONTACT: req.body.S_CONTACT, S_JOB: req.body.S_JOB, S_SAL: req.body.S_SAL};
    let sql = "INSERT INTO staff SET ?";    
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/staff');
    });
   
});

//#001.02 UPDATE DATA FROM STAFF TABLE WITH STAFF ID
app.get('/edit/:S_ID',(req, res) => {
    const S_ID = req.params.S_ID;
    let sql = `Select * from staff where S_ID = ${S_ID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('staff_view', {
            customer : result[0]
        });
    });
});

//#001.02 UPDATE DATA FROM STAFF TABLE WITH STAFF ID
app.post('/updatestaff',(req, res) => {
    const S_ID = req.body.S_ID;
    let sql = "update staff SET S_NAME='"+req.body.S_NAME+"',  S_CONTACT='"+req.body.S_CONTACT+"', S_JOB='"+req.body.S_JOB+"', S_SAL='"+req.body.S_SAL+"' where S_ID ="+S_ID;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/staff');
    });
});

//#003.03 DELETE A RECOND FROM THE STAFF TABLE
app.get('/deletes/:S_ID',(req, res) => {
    const S_ID = req.params.S_ID;
    let sql = `Select * from staff where S_ID = ${S_ID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('staff_view', {
            customer : result[0]
        });
    });
});


//#003.03 DELETE A RECOND FROM THE STAFF TABLE
app.post('/delete',(req, res) => {
    const S_ID = req.body.S_ID;
    let sql = `DELETE FROM staff WHERE S_ID = ${S_ID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/staff');
    });
});


//THANKYOU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!