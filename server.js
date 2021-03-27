const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const user_routes = require('./api/routes/user_routes');
const story_routes = require('./api/routes/story_routes')


const app = express(); // instanciating express() in app variable
dotenv.config();       // to use .env variables

const PORT = process.env.PORT;      // retrieving port from .env variable PORT

app.use(morgan('combined'));                    // server requests logger logger

const corsOptions ={
    origin:['http://localhost:3000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());                        // json body parser from expesss
app.use(express.urlencoded({extended: true}));  // urlencoded parser for rich text
app.use(cors(corsOptions));
// setting the port up for listening
app.listen(PORT, (err, data)=>{
    if(err) return console.log(err);
    console.log(`Server up and running at Port : ${PORT}`);
})

// connecting to mongoDB atlas cluster to store and retrieve data
mongoose.connect(process.env.MDB_CONNECT_STRING,{ useNewUrlParser: true , useUnifiedTopology: true}, (err, data)=>{
    if(err) return console.log(err);
    console.log("-------------Connected to Atlas CLuster-------------")
});

// setting up routes for the server here //
// domain route
app.get('/', (req, res)=>{
    res.status(200).json({message: "Every thing is working FINE !"});
});

// story storage routes
app.use('/uploads', express.static('uploads')); //adding a publically accessible static folder

// user routes
app.use('/user', user_routes);
app.use('/story', story_routes);

