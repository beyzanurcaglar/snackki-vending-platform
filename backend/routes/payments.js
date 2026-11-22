import express from "express"
import { dbError } from "../middleware/dbError.js"
import {db} from "../connect.js"
const router = express.Router()

router.get("/",(req,res)=>{
    const q = "SELECT * FROM paymenttypes"
    db.query(q,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})
export default router
