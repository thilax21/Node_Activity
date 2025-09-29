import express from "express";
import mongoose from "mongoose";
const app = express()

app.use(express.json());
const studentsSchema= new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    IsMarried:Boolean
})
const student=mongoose.model("student",studentsSchema);

app.post("/students",(req,res)=>{
    const reqbody=req.body
    
    const saveData=new student(reqbody)

    saveData.save();
    res.json(reqbody);
   

})


app.listen(3002, () => {
    mongoose.connect("mongodb://localhost:27017/uki-demo")
    .then(()=>console.log("db connected"))
    .catch(err=> console.log(err));
    console.log("server running at http://localhost:3002/")

});