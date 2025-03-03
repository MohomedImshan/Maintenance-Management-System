import  express from "express"
import bodyParser from "body-parser"
import mysql from "mysql"
import cors from "cors"

const app = express()
const port = 8800

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


const db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'maintenance-management-system'
})
db.connect((err)=>{
    if(err){
        console.error("Database connection failed : "+err.message)
    }else{
        console.log("Connected to mysql database")
    }
})

app.post('/register',(req,res)=>{
    const sql = "INSERT INTO user_table (`email`,`password`,`user_name`,`position`) VALUES(?,?,?,?)  "
    const values = [
        req.body.email,
        req.body.password,
        req.body.user_name,
        req.body.position
    ]
    db.query(sql,values,(err,data)=>{
        if(err){
            return res.json("Error")
        }
        return res.json(data)
    })
})

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM user_table WHERE `email` =? AND `password`=?  "
    
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error")
        }
        if(data.length > 0){
            return res.json("Success")
        }else{
            return res.json("Failed")
        }
    })
})

app.get("/Home",(req,res)=>{
    const sql ="SELECT * FROM user_table"

    db.query(sql,(err,data)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }
        return res.json(data)
    })
})



app.listen(8800,()=>console.log(`Listen on ${port}`))