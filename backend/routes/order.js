import express from "express"
import { dbError } from "../middleware/dbError.js"
import {db} from "../connect.js"
import { verifyJWT } from "../middleware/verifyJWT.js"
import { requireAdmin } from "../middleware/requireAdmin.js"
const router = express.Router()

router.get("/",verifyJWT,requireAdmin,(req,res)=>{
    const q = "SELECT orders.*,users.name,users.surname FROM orders INNER JOIN users ON orders.userId = users.userId ORDER BY orders.id"
    db.query(q,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})
router.get("/:id",verifyJWT,requireAdmin,(req,res)=>{
    const id = req.params.id
    const q = "SELECT orders.*,users.name,users.surname,users.userId,users.companyName,users.street,users.postNo,users.city,users.phone,users.email,products.*,orders.id AS id FROM orders INNER JOIN users ON orders.userId = users.userId INNER JOIN products ON FIND_IN_SET(products.id, orders.productId) WHERE orders.id = ?"
    db.query(q,id,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})

router.delete("/:id",verifyJWT,requireAdmin,(req,res)=>{
    const productId = req.params.id
    const q = "DELETE FROM orders WHERE id = ?"
    db.query(q,productId,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})

router.post("/",verifyJWT,(req,res)=>{
    // Customers can only order for themselves; admins may order for others
    const userId = Number(req.user.isAdmin) === 1 && req.body.userId ? req.body.userId : req.user.userId
    const q = "INSERT INTO orders (`userId`,`orderId`,`productId`,`productAmount`,`orderDate`,`paymentName`) VALUES (?,?,?,?,?,?)"
    const values = [
        userId,
        req.body.orderId,
        req.body.productId,
        req.body.productAmount,
        req.body.orderDate,
        req.body.paymentName
    ]
    db.query(q,values,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})

export default router