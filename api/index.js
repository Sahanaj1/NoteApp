const express= require("express");
const app =express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors=require('cors');
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");



dotenv.config();
app.use(express.json());
app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
mongoose.connect(process.env.MONGO_URL).then(console.log("connected to db")).catch((err)=>console.log(err));

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);


const PORT=process.env.PORT ||5000;
app.listen(PORT,()=>{console.log(`backend is running on ${PORT}`)});