require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// db connection
const Connection = require("./database/connection");
Connection();
const urlRoute = require("./routes/urlRoutes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//set url route
app.use("/api", urlRoute);


// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('That endpoint does not exist!'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send({status:false,message:err.message}); 
});

app.listen(process.env.Port, ()=>{
    console.log(`Server listening on the: ${process.env.Host}:${process.env.Port}`);
});