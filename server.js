const express = require("express")
const cors = require("cors");
const app = express();
ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const flash = require("express-flash");
const session = require('express-session');
const http=require('http');
require("dotenv").config();
const port = process.env.PORT || 3000;
// require("./db/connection");
app.use(session({
    secret: 'mysecret', // Replace with your own secret key
    resave: false,
    saveUninitialized: false
  }));
  
const mongoose = require('mongoose');
const db = 'mongodb+srv://morsy:morsy@ds.6e7bjag.mongodb.net/morsy'
mongoose.connect(db, { 
            // useCreateIndex: true, 
            // useFindAndModify: false, 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'party')));
app.use(logger('dev'));
app.use((req, res, next)=> {
    if (!req.cookies.jwt)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

const adminRouter = require("./routers/admin.routes");
const managerRouter = require("./routers/manager.routes");
const studentRouter = require("./routers/student.routes");

app.get('/',(req,res)=>{

    res.redirect('/student')

})
app.post('/s',(req,res)=>{
    console.log(req.body);
})
app.use("/admin", adminRouter);
app.use('/manager',managerRouter);
app.use('/student',studentRouter);

app.use((req,res,next)=>{
    res.render('404')
})


app.listen(port, () => {
    console.log(`listing to the port ${port}`);
});
