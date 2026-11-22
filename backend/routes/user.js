import express from "express"
import {db} from "../connect.js"
const router = express.Router()
import bcrypt from "bcrypt"
import { verifyJWT } from "../middleware/verifyJWT.js"
import { requireAdmin, isSelfOrAdmin } from "../middleware/requireAdmin.js"
import { dbError } from "../middleware/dbError.js"
import crypto from "crypto"

// Never send password hashes to the client
const stripPasswords = (rows) => Array.isArray(rows) ? rows.map(({ password, ...rest }) => rest) : rows
// Random temporary password
const tempPassword = () => crypto.randomBytes(6).toString("base64url")

router.get("/",verifyJWT,requireAdmin,(req,res)=>{
    const q = "SELECT * FROM users ORDER BY isAdmin DESC"
    db.query(q,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(stripPasswords(data))
        }
    })
})

router.get("/withoutAutomat",verifyJWT,requireAdmin,(req,res)=>{
  const q = "SELECT users.* FROM users LEFT JOIN userautomats ON users.userId = userautomats.userId WHERE userautomats.userId IS NULL";
  db.query(q,(error,data)=>{
      if (error) {
          return dbError(res, error);
      } else {
          return res.json(stripPasswords(data));
      }
  });
});


router.get("/admin",verifyJWT,requireAdmin,(req,res)=>{
  const q = "SELECT * FROM users WHERE isAdmin = 1"
  db.query(q,(error,data)=>{
      if (error) {
          return dbError(res, error)
      } else {
          return res.json(stripPasswords(data))
      }
  })
})

router.get("/:id",verifyJWT,(req,res)=>{
  const id = req.params.id
  if (!isSelfOrAdmin(req, id)) return res.status(403).json({ message: "Forbidden" })
  const q = "SELECT users.*,automats.automatSeriNo,categories.categoryName,products.id AS productId, products.title,products.cartoonAmount,products.image,products.desc,paymenttypes.paymentName FROM users  LEFT JOIN userpaymenttypes ON userpaymenttypes.userId = users.userId LEFT JOIN paymenttypes ON paymenttypes.id = userpaymenttypes.paymentId LEFT JOIN userproducts ON userproducts.userId = users.userId LEFT JOIN products ON products.productId = userproducts.productId LEFT JOIN categories ON categories.id = products.category LEFT JOIN userautomats ON userautomats.userId = users.userId LEFT JOIN automats ON automats.id = userautomats.automatId WHERE users.id = ?"
  db.query(q, id, (error, data)=>{
      if (error) {
          return dbError(res, error)
      } else {
          return res.json(stripPasswords(data))
      }
  })
})

const saltRounds = 10

router.post("/", verifyJWT, requireAdmin, async (req, res) => {
  try {
      const userData = await getUserData(req.body);
      const userQuery = "INSERT INTO users (`userId`, `isAdmin`, `name`, `surname`, `email`, `phone`, `street`, `postNo`, `city`, `country`, `branch`, `contactPerson`, `companyName`, `password`) VALUES ?";
      const userResult = await executeQuery(userQuery, userData);

      if (req.body.paymentType) {
        const paymentTypes = JSON.parse(req.body.paymentType);
        const userPaymentTypes = paymentTypes.map(p => [req.body.userId, p.value]);
        const userPaymentTypesQuery = "INSERT INTO userpaymenttypes (userId, paymentId) VALUES ?";
        await executeQuery(userPaymentTypesQuery, userPaymentTypes);
      }

      if(req.body.productsOpen){
        const productsOpen = JSON.parse(req.body.productsOpen);
        const userProducts = productsOpen.map(p => [req.body.userId, p.value]);
        const userProductsQuery = "INSERT INTO userproducts (userId, productId) VALUES ?";
        await executeQuery(userProductsQuery, userProducts);
      }

      if (req.body.automatId !== undefined && req.body.automatFilterId !== undefined && req.body.periodId !== undefined && req.body.filterChangedDate !== undefined) {
          const userAutomatData = [
              req.body.automatId,
              req.body.userId,
              req.body.automatFilterId,
              req.body.periodId,
              req.body.filterChangedDate
          ];
          const userAutomatQuery = "INSERT INTO userautomats (automatId,userId,automatFilterId,periodId,filterChangedDate) VALUES(?)";
          await executeQuery(userAutomatQuery, [userAutomatData]);

          const updateAutomatQuery = "UPDATE automats SET isRented = ? WHERE id = ?";
          await executeQuery(updateAutomatQuery, [req.body.isRented, req.body.automatId]);
      }

      res.json({ message: "Data inserted successfully", tempPassword: req.body._tempPassword });
  } catch (error) {
      console.error("Error:", error);
      res.status(400).json({ error: "Failed to insert data" });
  }
});

async function getUserData(body)  {
  // Previously the postal code was used as password (easy to guess).
  // Now a random temporary password is generated if none is given.
  const password = body.password || tempPassword();
  body._tempPassword = body.password ? undefined : password;
  const userData = [
      body.userId,
      body.isAdmin,
      body.name,
      body.surname,
      body.email,
      body.phone,
      body.street,
      body.postNo,
      body.city,
      body.country,
      body.branch,
      body.contactPerson,
      body.companyName,
  ];

  if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      userData.push(hashedPassword);
  }
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


// router.post("/",verifyJWT, async (req, res) => {
//   const q =
//     "INSERT INTO users (`userId`,`isAdmin`,`name`, `surname`, `email`, `phone`, `street`, `postNo`, `city`, `country`, `branch`, `contactPerson`, `companyName`, `password`) VALUES (?)";
//   const password = req.body.postNo;
//   const queryValues = [
//     req.body.userId,
//     req.body.isAdmin,
//     req.body.name,
//     req.body.surname,
//     req.body.email,
//     req.body.phone,
//     req.body.street,
//     req.body.postNo,
//     req.body.city,
//     req.body.country,
//     req.body.branch,
//     req.body.contactPerson,
//     req.body.companyName,
//   ];
//   console.log(queryValues)
//   if (password) {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     queryValues.push(hashedPassword);
//   }
//   console.log(queryValues)

//   db.query(q, [queryValues], (error, data) => {
//     if (error) {
//       console.log("Error 1" + error)
//       return dbError(res, error);
//     }
//     else{

//           const paymentTypes = JSON.parse(req.body.paymentType)
//           const userpaymenttypes = []
//           paymentTypes.forEach((p) => {
//             userpaymenttypes.push([
//               req.body.userId,
//               p.value
//             ])})
//             const orderProductsQuery = "INSERT INTO userpaymenttypes (userId, paymentId) VALUES ?";

//             db.query(orderProductsQuery, [userpaymenttypes], (error, data) => {
//                if (error) {
//                 console.log("Error 2" + error)

//                   return dbError(res, error);
//                } else {

//                 const productsOpen = JSON.parse( req.body.productsOpen)
//                 const userproducts = []
//                 productsOpen.forEach((p) => {
//                   userproducts.push([
//                     req.body.userId,
//                     p.value
//                   ])})
//                   const userProductsQuery = "INSERT INTO userproducts (userId, productId) VALUES ?";

//                   db.query(userProductsQuery, [userproducts], (error, data) => {
//                      if (error) {
//                       console.log("Error 3" + error)

//                         return dbError(res, error);
//                      } else {
//                      if(req.body.automatId !== undefined && req.body.automatFilterId !== undefined &&req.body.periodId !== undefined &&req.body.filterChangedDate !== undefined)
//                      {


//                           const values = [
//                             req.body.automatId,
//                             req.body.userId,
//                             req.body.automatFilterId,
//                             req.body.periodId,
//                             req.body.filterChangedDate,
//                         ]

//                             const userAutomatQuery = "INSERT INTO userautomats (automatId,userId,automatFilterId,periodId,filterChangedDate) VALUES(?)";
//                             db.query(userAutomatQuery, [values], (error, data) => {
//                               if (error) {
//                                 console.log("Error 4" + error)

//                                 return res
//                                   .status(400)
//                                   .json({ error: "Failed to update product details" });
//                               } else {
//                                 const updateAutomatq = "UPDATE automats SET isRented = ? WHERE id = ? ";
//                                 db.query(updateAutomatq, [req.body.isRented,req.body.automatId], (error, data) => {
//                                   if (error) {
//                                     console.log("Error 5" + error)

//                                     return res
//                                       .status(400)
//                                       .json({ error: "Failed to update product details" });
//                                   } else {
//                                         return res.json(data);
//                                       }})
//                                   }})
//                       }else{
//                         res.json(data)
//                       }

//               }})}
//       })}})})
router.get("/resetPassword/:id",verifyJWT, requireAdmin, async (req, res) => {
    try {
      const pass = tempPassword();
      const hashed = await bcrypt.hash(pass, saltRounds);
      const q = "UPDATE users SET password = ? WHERE id = ?";
      db.query(q, [hashed, req.params.id], (error, data) => {
        if (error) return dbError(res, error);
        if (data.affectedRows === 0) return res.status(404).json({ message: "User not found" });
        // The temporary password is shown to the admin only once
        return res.json({ message: "Password reset successful", tempPassword: pass });
      });
    } catch (error) {
      return dbError(res, error);
    }
  });

router.put("/deactivate/:id",verifyJWT,requireAdmin,(req,res)=>{
    const userId = req.params.id
    const q = "UPDATE users SET isActive = 0 WHERE id = ?"
    db.query(q,userId,(error,data)=>{
        if (error) {
            return dbError(res, error)
        } else {
            return res.json(data)
        }
    })
})


router.put("/activate/:id",verifyJWT,requireAdmin,(req,res)=>{
  const userId = req.params.id
  const q = "UPDATE users SET isActive = 1 WHERE id = ?"
  db.query(q,userId,(error,data)=>{
      if (error) {
          return dbError(res, error)
      } else {
          return res.json(data)
      }
  })
})

router.delete("/:id",verifyJWT,requireAdmin,(req,res)=>{
  const userId = req.params.id
  const q = "DELETE FROM users WHERE id = ?"
  db.query(q,userId,(error,data)=>{
      if (error) {
          return dbError(res, error)
      } else {
          return res.json(data)
      }
  })
})

router.put("/:id", verifyJWT, requireAdmin, (req, res) => {
  const id = req.params.id;
  const q = "UPDATE users SET name=?, surname=?, userId=?, phone=?, email=?, street=?, postNo=?, city=?, country=?, branch=?, companyName=?, contactPerson=? WHERE id=?";
  const values = [
    req.body.myUser.name,
    req.body.myUser.surname,
    req.body.myUser.userId,
    req.body.myUser.phone,
    req.body.myUser.email,
    req.body.myUser.street,
    req.body.myUser.postNo,
    req.body.myUser.city,
    req.body.myUser.country,
    req.body.myUser.branch,
    req.body.myUser.companyName,
    req.body.myUser.contactPerson,
    id,
  ];

  db.query(q, values, (error, data) => {
    if (error) {
      console.log("Error:", error);
      return res.status(400).json({ error: "Failed to update user details" });
    } else {
      console.log("User details updated successfully");
      // Uncomment and complete the following section if needed
      /*
      const q2 = "UPDATE userautomats SET automatId = ? WHERE userId = ?";
      db.query(q2, [req.body.automatSeriNo, req.body.userId], (error2, data2) => {
        if (error2) {
          console.log(error2);
          return res.status(400).json({ error: "Failed to update userautomats" });
        } else {
          console.log("userautomats updated successfully");
          return res.json({ status: 200 });
        }
      });
      */
      return res.json({ status: 200 });
    }
  });
});



export default router