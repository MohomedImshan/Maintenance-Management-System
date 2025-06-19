import  express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import registerRoutes from './routes/registerRoutes.js' 
import db from './database/db.js'
import loginRoutes from './routes/loginRoutes.js'
// import engineerroute from './Engineer/engineerroute.js'


const app = express()
const port = 8800

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())



app.use('/api/login',loginRoutes)
app.use('/api/register',registerRoutes)
// app.use('/Engineer',engineerroute)

app.get('/Engineer',(req,res)=>{
    try{

        const sql = "SELECT * FROM requests WHERE status='pending'"
       
         db.query(sql,(err,data)=>{
            if(err){
                console.error("Error fetching notification :",err.message)
                return res.json({error:"Error "})
            }
            return res.json({works : data})
        })

    }catch(err){
        console.error("Unexpected server error :",err.message)
        return res.json({error:"Unexpected server error"})
    }
})
app.get('/Engineer',(req,res)=>{
    try{

        const sql = "SELECT * FROM user_table WHERE status='Available'"
       
         db.query(sql,(err,data)=>{
            if(err){
                console.error("Error fetching notification :",err.message)
                return res.json({error:"Error "})
            }
            return res.json({users : data})
        })

    }catch(err){
        console.error("Unexpected server error :",err.message)
        return res.json({error:"Unexpected server error"})
    }
})

app.put('/Engineer/:id',(req,res)=>{
    const {id} =req.params
    const {requested_parts} = req.body
    const query = 'UPDATE works SET requested_parts = ? WHERE id =?'

    db.query(query,[requested_parts,id],(err,result)=>{
        if(err) return res.json(err)

        res.json({message:"Work Updated successfully"})
    })
})

// Route to fetch user data
app.get("/User", async (req, res) => {
    try {
        
        const sqlUser = "SELECT * FROM user_table";
        const userData = await new Promise((resolve, reject) => {
            db.query(sqlUser, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
        

        return res.json({ users: userData });

    } catch (err) {
        console.error("Error occurred while fetching user data:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// Route to fetch spare parts data
app.get("/Spareparts", async (req,res)=>{
    try{
        const sql = "SELECT * FROM spare_parts"

        const partsdata = await new Promise((resolve, reject) => {
            db.query(sql, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
        return res.json({ spareParts: partsdata });
        
        // db.query(sql,(err,partsdata)=>{
        //     if(err){
        //         console.error("Error occurred while fetching spare parts data:",err.message)
        //         return res.json({error:"Error fetching spare parts data"})
        //     }
        //     return res.json({items:partsdata})
            
        // })
    }catch(err){
        return res.json({error:"Unexpected server error"})
    }
})

app.post("/Spareparts",async(req,res)=>{
    try{
        const {department,type,item,quantity} = req.body
        const sql = "INSERT INTO spare_parts (department,type,item,quantity) VALUES (?,?,?,?)"
        await db.query(sql,[department,type,item,quantity])
        res.json({message:"Spare part added successfully"})
    }catch(err){
        res.json({message:"Server error"})
    }
})

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

app.get("/Notifications",(req,res)=>{
    try{
        const sql = "SELECT * FROM requests"

        db.query(sql,(err,results)=>{
            if(err){
                console.error("Error fetching notification : ",err.message)
                return res.json({error:"Error fetching notifications"})
            }
            return res.json({Items:results})
        })
    }catch(err)
    {
        console.error("Unexpected server error :",err.message)
        return res.json({error:"Unexpected server error"})
    }
})
app.post('/request',async (req,res)=>{
    try{
        const {machine_code,department,Type,description,name_of_technician,date_and_time,requested_parts}=req.body
        const sql1 = "INSERT INTO requests (machine_code,department,Type,description,name_of_technician,date_and_time) VALUES (?,?,?,?,?,?)" 
    }catch(err){

    }
})
app.post("/Spareparts",async(req,res)=>{
    try{
        const {department,type,item,quantity} = req.body
        const sql = "INSERT INTO spare_parts (department,type,item,quantity) VALUES (?,?,?,?)"
        await db.query(sql,[department,type,item,quantity])
        res.json({message:"Spare part added successfully"})
    }catch(err){
        res.json({message:"Server error"})
    }
})
app.put("/Spareparts/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const {quantity} = req.body
        const sql = "UPDATE spare_parts SET quantity = ? WHERE id=?"
        db.query(sql,[quantity, id],(err,result)=>{
            if(err) return res.status(500).send(err)
            if(result.affectedRows === 0) return res.status(404).send("Item not found")
            res.send('Data updated successfully')
        })
    }catch(err){
        res.status(500).send("server error")
    }
})
app.listen(8800,()=>console.log(`Listen on ${port}`))