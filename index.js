const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const postRoute = require('./routes/posts');

dotenv.config()


//import routes
const authRoute = require('./routes/auth');

//connect to mongodb
mongoose.connect(process.env.DB_CONNECT,
    {useUnifiedTopology: true,
    useNewUrlParser:true},
    () => console.log('connected to db!')
);

//middleware
app.use(express.json());


//route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);

app.listen(5000, () => console.log('Server is up and running! '))
