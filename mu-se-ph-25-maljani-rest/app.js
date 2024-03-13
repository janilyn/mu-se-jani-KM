var express = require('express');
var path = require('path');

var logger = require('morgan');

// contains yung data na binigay nila coach 
// I didn't use mongoose here bc they already specified the id
// You can try to implement it if u want hehe
// PS: sorry casey ganito talaga yung dapat gagawin natin sa pet proj if naisip ko agad na dito na lang iimport yung data T^T
const employeesData = require('./data/employees.js').employees

// indexRouter is just here para dun sa website ng API
// NOTE: yung base for this API is the doctor clinic API from the REST labs 
// kaya may indexRouter here and public+bin folders sa repo na to. they're unnecessary so kindly disregard if API lang ang goal
var indexRouter = require('./routes/index');
var employeesRouter = require('./routes/employees')(employeesData);         // <==== go to this file next hehehe

var cors = require('cors')
var app = express();

// From Doctor Clinic API
app.use(logger('dev'));
app.use(express.json());
app.use(cors());                            // IMPORTANT:   put this before routes or else error
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Before this line, di pa nakaconnect yung indexRouter and employeesRouter
// This is important para alam natin ung address for each resource
app.use('/', indexRouter);
app.use('/employees', employeesRouter);

module.exports = app;
