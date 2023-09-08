const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const viewPath =  path.resolve(__dirname, './templates/views/');
const partialsPath = path.resolve(__dirname, './templates/partials');

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:"mydb.cx8q6uqd9rqp.ap-south-1.rds.amazonaws.com",
    user:"admin",
    password:"krishnan12345",
    database:"bikeService" 
})
 

//Register API(New User able to Register. after user register admin will get mail)

app.post('/register',(req,res)=>{
    const {email,mobile, password, role } = req.body

    const q = 'INSERT INTO bikeService.login_details (email, mobile,password,role) VALUES (?,?,?,?)'

    const Role = "user" || role

    db.query(q,[email, mobile, password, Role],(err)=>{
        if (err) {
            res.json(err)
        }else{
        
            const sendMail = () => {
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'emailpoctest21@gmail.com',
                    //pass: 'Happytolearn@20231'
                    pass :'pdpvpsvatuovdpco'
                  }
                });
                transporter.use('compile', hbs({
                  viewEngine: {
                    extName: '.handlebars',
                    // partialsDir: viewPath,
                    layoutsDir: viewPath,
                    defaultLayout: false,
                    partialsDir: partialsPath,
                    express
                  },
                  viewPath: viewPath,
                  extName: '.handlebars',
                }))
              
                var mailOptions = {
                  from: email,
                  to: 'emailpoctest21@gmail.com',
                  subject: 'Sending Email using Node.js',
                  template: 'index',
                  attachments: [
                    { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
                  ]
                };
              
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
              
              }
              res.status(200).send({
                status: "200",
                message: 'New User Registered'
              })
              sendMail();
              
        }
    })
})

//Login API (User and admin can be able to login with their id)

app.post('/login', (req, res) =>{
    const { email, password } = req.body;

    const q = 'SELECT * FROM bikeService.login_details WHERE email = ? AND password = ?';

    db.query(q, [email, password], (err, results) => {
        if(err) {
            res.json(err)
        }else if (results.length === 0 ) {
            res.json({message: "Invalid"})
        }else {
            const user = results[0]
            console.log(user.role)
            console.log("user.id :: ",user.id)
           
          
            res.json(results)
        }
    })
})

//For user Book service( After register or login user can book services )

app.post('/service-booking/:id', (req, res) => {
   // console.log("req :: ",req)
    console.log("id :: ",req.params.id)
    
    const {servicetype, bike, date} = req.body;
    const  userId = req.params.id;
    console.log("called")
    const q = 'INSERT INTO bikeService.service_request (service_type, bike , date, login_id) VALUES (?,?,?,?) ';
    
    db.query(q, [servicetype, bike, date ,userId],(err,result) => {
        if(err){
            res.json(err)
        } else {
            res.json("Booked")
        }
    })
    console.log("finished")
})



//user's booking detail(pending)(Perticular Id's or user's pending works)

app.get('/booking-details-pending/:id', (req,res) => {
    const id = req.params.id

    const detailsquery = 'SELECT service_type, bike, date, status FROM bikeService.service_request WHERE login_id = ? AND status = "Pending"';

    db.query(detailsquery , [id], (err, bookingdetail) => {
        if(err) {
            res.json(err)
           
        }else {
            res.json(bookingdetail)
        }
    })
})

//User' detail(completed)(Particular Id's or user's completed works)

app.get('/booking-details-complete/:id', (req,res) => {
    const id = req.params.id

    const detailsquery = 'SELECT service_type, bike, date, status FROM bikeService.service_request WHERE login_id = ? AND status = "Completed"';

    db.query(detailsquery , [id], (err, bookingdetail) => {
        if(err) {
            res.json(err)
            
        }else {
            res.json(bookingdetail)
        }
    })
})

//user's all booking detail(particular id's User can see all his booking details)

app.get('/booking-details-history/:id', (req,res) => {
    const id = req.params.id

    const detailsquery = 'SELECT service_type, bike, date, status FROM bikeService.service_request WHERE login_id = ? ';

    db.query(detailsquery , [id], (err, bookingdetail) => {
        if(err) {
            res.json(err)
            
        }else {
            res.json(bookingdetail)
        }
    })
})

//admin's detail (admin can see all user's details)

app.get('/admin-booking-details', (req,res) => {
    
    const detailsquery = 'SELECT service_type, bike, date, status FROM bikeService.service_request ';

            db.query(detailsquery ,  (err, bookingdetail) => {
                if(err) {
                    res.json(err)
                    
                }else {
                    res.json(bookingdetail)
                    } 
            })
})

//admin details(admin can fillter all user's pending works only)

app.get('/admin-booking-details-pending', (req,res) => {
    
    const detailsquery = 'SELECT service_type, bike, date, status FROM bikeService.service_request WHERE status = "Pending"';

            db.query(detailsquery ,  (err, bookingdetail) => {
                if(err) {
                    res.json(err)
                    
                }else {
                    res.json(bookingdetail)
                    } 
            })
})

//setting status to "ready"(admin can set user's status "ready" then user will get mail )

app.put('/status-ready/:id',(req, res) => {
    const id = req.params.id;

    const updatequery = 'UPDATE service_request SET status = "Ready" WHERE login_id = ?';

    db.query(updatequery, [id], (err) => {
        if(err) {
            res.json(err)
        }else{
            const sendMail = () => {
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'emailpoctest21@gmail.com',
                    //pass: 'Happytolearn@20231'
                    pass :'pdpvpsvatuovdpco'
                  }
                });
                transporter.use('compile', hbs({
                  viewEngine: {
                    extName: '.handlebars',
                    // partialsDir: viewPath,
                    layoutsDir: viewPath,
                    defaultLayout: false,
                    partialsDir: partialsPath,
                    express
                  },
                  viewPath: viewPath,
                  extName: '.handlebars',
                }))
              
                var mailOptions = {
                  from: 'emailpoctest21@gmail.com',
                  to: 'krishnan.udhayatesting2022@gmail.com',
                  subject: 'Sending Email using Node.js',
                  template: 'index',
                  attachments: [
                    { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
                  ]
                };
              
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
              
              }
              res.status(200).send({
                status: "200",
                message: 'Ready To Take'
              })
              sendMail();
           
            
        }
    })
})

//setting status to "completed"(admin can set user's status "completed" then user will get mail that bike was delivered)

app.put('/status-complete/:id',(req, res) => {
    const id = req.params.id;

    const updatequery = 'UPDATE service_request SET status = "Completed" WHERE id = ?';

    db.query(updatequery, [id], (err,data) => {
        if(err) {
            res.json(err)
        }else{
          
            const sendMail = () => {
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'emailpoctest21@gmail.com',
                    //pass: 'Happytolearn@20231'
                    pass :'pdpvpsvatuovdpco'
                  }
                });
                transporter.use('compile', hbs({
                  viewEngine: {
                    extName: '.handlebars',
                    // partialsDir: viewPath,
                    layoutsDir: viewPath,
                    defaultLayout: false,
                    partialsDir: partialsPath,
                    express
                  },
                  viewPath: viewPath,
                  extName: '.handlebars',
                }))
              
                var mailOptions = {
                  from: 'emailpoctest21@gmail.com',
                  to: 'krishnan.udhayatesting2022@gmail.com',
                  subject: 'Sending Email using Node.js',
                  template: 'index',
                  attachments: [
                    { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
                  ]
                };
              
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
              
              }
              
              res.status(200).send({
                status: "200",
                message: 'Delivered'
                
              })
              sendMail();
           
        }
    })
})

//admin add service (admin can add new service )

app.post('/add-service/:id',(req,res) => {
    const {service} = req.body;
    const id = req.params.id
    const addquery = 'INSERT INTO service_request (service,login_id) VALUES (?,?)'

    db.query(addquery, [service, id], (err,data) => {
        if(err){
            res.json(err)
        }else {
            res.json(data)
        }
    })

})

//get service list( add can see all his services )

app.get('/get-service-list/:id', (req, res) => {
    const id = req.params.id
    const servicequery = 'SELECT service FROM service_request WHERE login_id = ?'

    db.query(servicequery, [id], (err,data) => {
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})

//edit service(admin can edit or update his existing service)

app.put('/edit-service/:id',(req,res) => {
    const {service} = req.body;
    const id = req.params.id
    const editquery = 'UPDATE service_request SET service = ?, status ="" WHERE id = ?'

    db.query(editquery, [service, id], (err,data) => {
        if(err){
            res.json(err)
        }else {
            res.json("Edited")
        }
    })

})

//delete service

app.delete('/delete-service/:id',(req, res) => {
    const id = req.params.id
    const deletequery = 'DELETE FROM service_request WHERE id = ?';

    db.query(deletequery, [id], (err, data) => {
        if(err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
})

//


  
  
 


app.listen(8080,()=>{
    console.log("Listening");
})