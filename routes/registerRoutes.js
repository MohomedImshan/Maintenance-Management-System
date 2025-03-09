import express from 'express'
import bcrypt from 'bcrypt'
import db from "../database/db.js";
const router = express.Router()

router.post('/',async (req,res)=>{
    const {user_name,email,password,position} = req.body

    try{
        const existingUser = await db.query("SELECT * FROM user_table WHERE email = ?",[email])
        // console.log(existingUser);

        if(existingUser.length > 0){
            return res.json({message:'Email is already registered'})
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        console.log(hashedPassword);

        const sql = "INSERT INTO user_table (email,password,user_name,position) VALUES (?,?,?,?)"
        await db.query(sql,[email,hashedPassword,user_name,position])

        res.json({message:"User registered successfully!"})
    }catch(err){
        console.log("Error registering user : ",err)
        res.json({message:'Server error'})
    }
})

export default router