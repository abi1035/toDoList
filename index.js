import express from "express";
const app=express();
const port=3000;
var taskList=[];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

const date = new Date();
const day=date.getDay()
const dayList=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
var whatDay=dayList[day];

const month=date.getMonth()
const monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
var whatMonth=monthList[month];

const dateNumber=date.getDate()


app.get("/",(req,res)=>{
    res.render("index.ejs",{dayOfWeek:whatDay,monthOfYear:whatMonth,dateOfMonth:dateNumber});
})

app.post("/submit",(req,res)=>{
    // LETS TRY PUTTING THIS IN AN ARRAY NO
    
    var tasks=req.body.text;
    taskList.push(tasks);
    // console.log(nameList);
    // console.log(titleList);
    // console.log(blogList);
    res.render("index.ejs", {thoughts:taskList, dayOfWeek:whatDay,monthOfYear:whatMonth,dateOfMonth:dateNumber});
})


app.get("/work",(req,res)=>{
  res.render("work.ejs",{dayOfWeek:whatDay,monthOfYear:whatMonth,dateOfMonth:dateNumber})

})

app.post("/submitWork",(req,res)=>{
  var tasks=req.body.text;
    taskList.push(tasks);
    // console.log(nameList);
    // console.log(titleList);
    // console.log(blogList);
    res.render("work.ejs", {thoughts:taskList, dayOfWeek:whatDay,monthOfYear:whatMonth,dateOfMonth:dateNumber});
})





app.listen(port, ()=>{
  console.log(`"Server is running on port ${port}"`);
})