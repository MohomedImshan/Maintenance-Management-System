import db from "../database/db";
import express from 'express'
const router = express.Router()


router.get('/',(req,res)=>{
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

export default router