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

// app.get("/Home",(req,res)=>{
//     const sqlUser ="SELECT * FROM user_table"
    

//     db.query(sqlUser,(err,userData)=>{
//         if(err){
//             return res.status(500).json({error:err.message})
//         }
//         return res.json({userData})
 
//     })
// })
// app.get("/Home",(req,res)=>{
    
//     const sqlParts ="SELECT * FROM spare_parts"

//     db.query(sqlParts,(err,partsData)=>{
//         if(err){
//             return res.status(500).json({error:err.message})
//         }
//         return res.json({partsData})
//     })
// })

// Route to fetch user data
app.get("/Home", async (req, res) => {
    try {
        console.log("Fetching user data...");
        const sqlUser = "SELECT * FROM user_table";
        const userData = await new Promise((resolve, reject) => {
            db.query(sqlUser, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
        console.log("User data fetched:", userData);

        return res.json({ users: userData });

    } catch (err) {
        console.error("Error occurred while fetching user data:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// Route to fetch spare parts data
app.get("/Spareparts", async (req, res) => {
    try {
        console.log("Fetching spare parts data...");
        const sqlParts = "SELECT * FROM spare_parts";
        const partsData = await new Promise((resolve, reject) => {
            db.query(sqlParts, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
        console.log("Spare parts data fetched:", partsData);

        return res.json({ spareParts: partsData });

    } catch (err) {
        console.error("Error occurred while fetching spare parts data:", err.message);
        return res.status(500).json({ error: err.message });
    }
});







app.get('/Update/:id',(req,res)=>{
    const {id} = req.params.id
    const sql = "SELECT * FROM user_table WHERE id = ? "

    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.status(500).send(err)
        res.send(result[0])
    })
    
})

app.put('/Update/:id',(req,res)=>{
    const {id} = req.params.id

    const {email,password,user_name,position,status} = req.body
    const sql = 'UPDATE user_table SET email = ? , password = ? ,user_name = ? ,position = ? ,status =? WHERE id = ? '
    db.query(sql,[email,password,user_name,position,status,id],(err,result)=>{
        if(err) return res.status(500).send(err)
        res.send('Data updated successfully')
    })
})


app.listen(8800,()=>console.log(`Listen on ${port}`))