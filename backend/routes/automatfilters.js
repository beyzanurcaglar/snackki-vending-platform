import express from "express"
import { dbError } from "../middleware/dbError.js"
import {db} from "../connect.js"
const router = express.Router()

router.get("/",(req,res)=>{
    const q = "SELECT * FROM automatfilters"
    db.query(q,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})

router.post("/",(req,res)=>{
    const values = [
        req.body.filterName
    ]
    const q = "INSERT INTO automatfilters (`filterName`) VALUES (?)"
    db.query(q,[values],(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})

router.delete("/:id",(req,res)=>{
    const id = req.params.id
    const q = "DELETE FROM automatfilters WHERE id = ?"
    db.query(q,id,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})
export default router