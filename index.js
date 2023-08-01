const express = require('express');
const FileUpload = require('express-fileupload'); 
const cors = require('cors');
const Cookie = require('cookie-parser');
require('dotenv').config();
const Connect = require('./database/db');
const Routes = require('./routes/Routes');


const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(Cookie());
app.use(FileUpload())
app.use('/',Routes)
app.use(express.static('uploads'))

app.listen(port,() => {
    Connect();
    console.log(port);
})