require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const router = require('./router/auth-router');
const connectDB = require('./model/db');
const errorMiddleware = require('./middlewares/error-middleware');
const contactRoute = require('./router/contact-router');
const service = require('./router/service-router');
const users = require("./router/admin-router");

// handeling cors error
const corsOptions = {
    origin: "http://localhost:5173",
    method: "POST, GET, PUT, PATCH, DELETE, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json());



app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/data", service);
//Handeling admin parts
app.use("/api/admin", users);

app.use(errorMiddleware);
// app.get("/",(req,res)=>{
//     res.status(200).send("Welcome to Arpan Mandal");
// });

connectDB().then(()=>{
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running at Port: ${PORT}`);
});

})