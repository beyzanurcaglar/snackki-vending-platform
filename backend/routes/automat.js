import express from "express"
import { dbError } from "../middleware/dbError.js"
import {db} from "../connect.js"
const router = express.Router()
import multer from "multer"
router.get("/",(req,res)=>{
    const q = "SELECT automats.*,userautomats.filterChangedDate,users.name,users.surname,users.userId,automatmodels.automatModelName,automatbrands.brandName,automatfilters.filterName,periods.periodName FROM automats LEFT JOIN userautomats ON userautomats.automatId = automats.id LEFT JOIN users ON users.userId = userautomats.userId LEFT JOIN periods ON periods.id = userautomats.periodId LEFT JOIN automatfilters ON automatfilters.id = userautomats.automatFilterId INNER JOIN automatbrands ON automatbrands.id = automats.automatBrandId INNER JOIN automatmodels ON automatmodels.id = automats.automatModelId"
        db.query(q,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})
//get free automats
router.get("/free",(req,res)=>{
    const q = "SELECT automatbrands.brandName,automatmodels.automatModelName,automats.id,automats.automatSeriNo FROM automats INNER JOIN automatbrands ON automatbrands.id = automats.automatBrandId INNER JOIN automatmodels ON automatmodels.id = automats.automatModelId WHERE isRented = 'Im Lager' ";
    db.query(q,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})

router.get("/:id",(req,res)=>{

    const id = req.params.id
    const q = "SELECT automats.*,userautomats.filterChangedDate,users.name,users.surname,users.userId,automatmodels.automatModelName,automatbrands.brandName,automatfilters.filterName,periods.periodName,periods.id AS periodId,automatfilters.id AS filterId FROM automats LEFT JOIN userautomats ON userautomats.automatId = automats.id LEFT JOIN users ON users.userId = userautomats.userId LEFT JOIN periods ON periods.id = userautomats.periodId LEFT JOIN automatfilters ON automatfilters.id = userautomats.automatFilterId INNER JOIN automatbrands ON automatbrands.id = automats.automatBrandId INNER JOIN automatmodels ON automatmodels.id = automats.automatModelId WHERE automats.id= ?"
    db.query(q,id,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})
// img storage confing
var documentConfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads/automatDocuments");
    },
    filename:(req,file,callback)=>{
        callback(null,`automat-${Date.now()}-${file.originalname}`)
    }
});


// img filter
const isDocument = (req,file,callback)=>{
    if(file.mimetype.startsWith("automatDocument")){
        callback(null,true)
    }else{
        callback(null,Error("only file is allowd"))
    }
}

var upload = multer({
    storage:documentConfig,
    fileFilter:isDocument
})

async function getAutomatData(body,filename)  {
    const automatData = [
            body.automatBrandId,
            body.automatModelId,
            body.automatSeriNo,
            filename,
            body.isBuy,
            body.isRented
    ];
    return [automatData];
  }
  async function getUserData(body,automatId)  {
    const userData = [
        body.userId,
        automatId,
        body.automatFilterId,
        body.periodId,
        body.filterChangedDate
    ]
    return [userData];
  }
  
  async function executeQuery(query, values) {
    return new Promise((resolve, reject) => {
        db.query(query, [values], (error, data) => {
            if (error) {
                console.log(error)
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
  }
  
router.post("/", upload.single("automatDocument"), async(req,res) => {
    try {
        const {filename} = req.file || {};
        const automatData = await getAutomatData(req.body,filename);
        const automatQuery = "INSERT INTO automats (`automatBrandId`,`automatModelId`,`automatSeriNo`,`automatDocument`,`isBuy`,`isRented`) VALUES ?"
        const automatResult = await executeQuery(automatQuery, automatData);
        
        if (req.body.userId !== undefined && req.body.automatFilterId !== undefined && req.body.periodId !== undefined && req.body.filterChangedDate !== undefined) {
            const automatId = automatResult.insertId
            const userData = await getUserData(req.body,automatId);
            const userQuery = "INSERT INTO userautomats (`userId`,`automatId`,`automatFilterId`,`periodId`,`filterChangedDate`) VALUES ?"
            await executeQuery(userQuery, userData);
        }

        return res.json({status:200});
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Failed to insert data" });
    }
});


router.put("/:id", (req, res) => {
    const id = req.params.id
    const values = [
        req.body.automatId,
        req.body.userId,
        req.body.automatFilterId,
        req.body.periodId,
        req.body.filterChangedDate,
    ]
        
        const q = "INSERT INTO userautomats (automatId,userId,automatFilterId,periodId,filterChangedDate) VALUES(?)";
        db.query(q, [values], (error, data) => {
          if (error) {
            return res
              .status(400)
              .json({ error: "Failed to update product details" });
          } else {
            const q = "UPDATE automats SET isRented = ? WHERE id = ? ";
            db.query(q, [req.body.isRented,id], (error, data) => {
              if (error) {
                return res
                  .status(400)
                  .json({ error: "Failed to update product details" });
              } else {
                return res.json({status:200})
                  }})
              }})
  });
  
  router.delete("/:id",(req,res)=>{
    const automatId = req.params.id
    const q = "DELETE FROM automats WHERE id = ?"
    db.query(q,automatId,(error,data)=>{
        if (error) {
            dbError(res, error)
        } else {
            res.json(data)            
        }
    })
  })


export default router