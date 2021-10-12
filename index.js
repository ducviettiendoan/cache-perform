const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoute = require("./routes/posts");

const app = express();

app.use(express.json({limit: "30mb", extended: true}));   //set up Json data that could be pass in the req body
app.use(express.urlencoded({limit: "30mb", extended: true}));   //set up the URL that we can pass in the req body

//Deal with CORs policy later!
app.use(cors());

app.use("/posts", postRoute);

const CONNECT_URI = "mongodb+srv://tienduc02:tienduc2002@cluster0.bccsv.mongodb.net/blogs?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("Server is connected to MongoDB"))
    .catch((err) => console.log(err.message))

// mongoose.set('useFindAndModify', false);
app.listen(PORT, ()=> {
    console.log(`Server is running in PORT ${PORT}`)
})