import express from "express"
import { dbError } from "../middleware/dbError.js"
import {db} from "../connect.js"
const router = express.Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { verifyJWT } from "../middleware/verifyJWT.js"
router.post("/", (req, res) => {
    const userId = req.body.userId
    const password = req.body.password
    if (userId && password) {
    const q = "SELECT * FROM users WHERE userId = ?";
        db.query(q, userId, async (error, data) => {

            if (error || data[0] == null) {
                res.status(401).json({ message: "Invalid username or password" });
            }else{
            bcrypt.compare(password, data[0].password, (err, result) => {
                if (result && Number(data[0].isActive) === 0) {
                    return res.status(403).json({ message: "User deactivated" })
                }
                if (err) {

                  res.status(500).json({ message: "An error occurred during login" });
                } else if (result) {


                    const accessToken = jwt.sign(
                        {
                            "user": {
                                "id": data[0].id,
                                "name": data[0].name,
                                "surname" : data[0].surname,
                                "userId": data[0].userId,
                                "isAdmin":data[0].isAdmin,
                                "email":data[0].email,
                                "phone":data[0].phone,
                                "companyName":data[0].companyName,
                                "street":data[0].street,
                                "postNo":data[0].postNo,
                                "city":data[0].city,
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        // The mobile app has no refresh flow, so customers get a longer-lived token
                        { expiresIn: req.body.client === 'mobile' && Number(data[0].isAdmin) !== 1 ? '7d' : '15m' }
                    )

                    const refreshToken = jwt.sign(
                        { "userId": data[0].userId },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '7d' }
                    )

                    // Create secure cookie with refresh token
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true, //accessible only by web server
                        secure: true, //https
                        sameSite: 'None', //cross-site cookie
                        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
                    })

                    // Send accessToken containing username and roles
                    res.json({ 
                        accessToken,
                        user: {
                            id: data[0].id,
                            name: data[0].name,
                            surname: data[0].surname,
                            userId: data[0].userId,
                            isAdmin: data[0].isAdmin,
                            email: data[0].email,
                            phone: data[0].phone,
                            companyName: data[0].companyName,
                            street: data[0].street,
                            postNo: data[0].postNo,
                            city: data[0].city,
                        }
                    })
                //   res.status(200).json({ message: "success" , data: data[0] });
                } else {
                  res.status(401).json({ message: "Invalid username or password" });
                }
              });
        }
    })}
})
router.get("/refresh", (req, res) => {

    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const q = "SELECT * FROM users WHERE userId = ?";
                db.query(q, decoded.userId, async (error, data) => {

                    if (error || data[0] == null) {
                        res.status(401).json({ message: "Invalid username or password" });
                    }else{

            const accessToken = jwt.sign(
                {
                    "user": {
                        "id": data[0].id,
                        "name": data[0].name,
                        "surname" : data[0].surname,
                        "userId": data[0].userId,
                        "isAdmin":data[0].isAdmin,
                        "email":data[0].email,
                        "phone":data[0].phone,
                        "companyName":data[0].companyName,
                        "street":data[0].street,
                        "postNo":data[0].postNo,
                        "city":data[0].city,

                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ 
                accessToken,
                user: {
                    id: data[0].id,
                    name: data[0].name,
                    surname: data[0].surname,
                    userId: data[0].userId,
                    isAdmin: data[0].isAdmin,
                    email: data[0].email,
                    phone: data[0].phone,
                    companyName: data[0].companyName,
                    street: data[0].street,
                    postNo: data[0].postNo,
                    city: data[0].city,
                }
            })
        }
    })}
)})

router.post("/logout", (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
})

const saltRounds = 10
router.put("/changePassword",verifyJWT,async(req,res)=>{
    // Users can only change their own password (admins can change any)
    const userId = Number(req.user.isAdmin) === 1 && req.body.userId ? req.body.userId : req.user.userId
    const password = req.body.password

    if (!password || String(password).length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" })
    }
     if (password && userId) {
         const hashedPassword = await bcrypt.hash(password, saltRounds)

        const q = "UPDATE users SET password = ? WHERE userId =  ?"
        db.query(q,[hashedPassword,userId],(error,data)=>{
            if (error) {
                return dbError(res, error)
            } else {
                return res.json({ message: "Password changed" })
            }
        })
    }
})
export default router