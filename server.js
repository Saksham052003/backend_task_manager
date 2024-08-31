require('dotenv').config();
const express= require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const routerTaskManage= require('./routes/routeTaskManager');
const routerUser= require('./routes/routeUser');
const port= process.env.PORT||7000;

app.use(cors());

app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next() 
})

app.use('/api/taskmanager',routerTaskManage);
app.use('/api/user',routerUser)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () =>{
            console.log(`Conect to DataBase and Server is running on http://localhost:${port}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
