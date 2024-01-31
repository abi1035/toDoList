import express from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;
var taskList=[];
let taskId=2;

import pg from "pg";


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "xxxxxxx",
  password: "xxxxxxx",
  port: xxxx,
});




db.connect();


db.query("SELECT * FROM xxxx", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    // let items = res.rows;
  }
  // db.end();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const date = new Date();
const day=date.getDay()
const dayList=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
var whatDay=dayList[day];

const month=date.getMonth()
const monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
var whatMonth=monthList[month];

const dateNumber=date.getDate()


// Reads Data
app.get("/",async (req,res)=>{
  try {
    const result = await db.query("SELECT * FROM xxxx");
    let items = result.rows;
    // console.log(items)
    res.render("index.ejs", {
      dayOfWeek:whatDay,
      monthOfYear:whatMonth,
      dateOfMonth:dateNumber,
      thoughts: items,
    });
  } catch (err) {
    console.log(err);
  }
  

})


// Deletes Data
app.post("/delete",async (req,res)=>{
  let selectedId=req.body.selectedItemId
  // console.log(selectedId)
await db.query("DELETE FROM xxxx WHERE id= $1",[selectedId]);
  res.redirect("/");

})




// Creates Data
app.post("/submit",async (req,res)=>{
    const item = req.body.text;
  
  try{
    await db.query("INSERT INTO xxxx (tasks) VALUES ($1)",[item])
  res.redirect("/");
  } catch{
    console.log(err)
  }
    
    
})

// Updates Data
app.post("/edit",async (req,res)=>{
  let updateId=req.body.updatedItemId;
  let updateTask=req.body.updatedItemTask
  try{
    await db.query("UPDATE xxxx SET tasks=$1 WHERE id=$2",[updateTask, updateId]);
    res.redirect("/");
} catch{
  console.log(err);
}
})

// WORK 
// READ
app.get("/work",async (req,res)=>{
  try {
    const result = await db.query("SELECT * FROM xxxx");
    let items = result.rows;
    // console.log(items)
    res.render("work.ejs", {
      dayOfWeek:whatDay,
      monthOfYear:whatMonth,
      dateOfMonth:dateNumber,
      thoughts: items,
    });
  } catch (err) {
    console.log(err);
  }

})

// CREATE
app.post("/submitWork", async(req,res)=>{
  var tasks=req.body.text;
   
  try{
    await db.query("INSERT INTO xxxx (tasks) VALUES ($1)",[tasks])
    res.redirect("/work");
  } catch(err){
    console.log(err)
  }
})

// UPDATE
app.post("/workEdit",async (req,res)=>{
  let updateId=req.body.updatedItemId;
  let updateTask=req.body.updatedItemTask
  try{
    await db.query("UPDATE xxxx SET tasks=$1 WHERE id=$2",[updateTask, updateId]);
    res.redirect("/work");
} catch{
  console.log(err);
}
})

// DELETE
app.post("/workDelete",async (req,res)=>{
  let selectedId=req.body.selectedItemId
  console.log(selectedId)
await db.query("DELETE FROM xxxx WHERE id= $1",[selectedId]);
  res.redirect("/work");

})

app.listen(port, ()=>{
  console.log(`"Server is running on port ${port}"`);
})