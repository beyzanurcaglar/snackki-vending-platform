import "./userSingle.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import { useEffect,useState} from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDeleteUserMutation, useGetSingleUserMutation, useResetPasswordMutation, useUpdateUserMutation } from "../../../api/userApiSlice";
const UserSingle = () => {
  const navigate = useNavigate()
  const [updateState, setUpdateState] = useState(-1);
  const [user,setUser] = useState({})
  const [deleteUser] = useDeleteUserMutation()
  const [getSingleUser] = useGetSingleUserMutation()
  const [resetPassword] = useResetPasswordMutation()
  const handleEdit = (id) => {
    setUpdateState(id);
  };
 
  function groupData(data) {
    let groupedData = {};
    groupedData.id = data[0].id;
    groupedData.userId = data[0].userId;
    groupedData.name = data[0].name;
    groupedData.surname = data[0].surname;
    groupedData.phone = data[0].phone;
    groupedData.email = data[0].email;
    groupedData.street = data[0].street;
    groupedData.postNo = data[0].postNo;
    groupedData.city = data[0].city;
    groupedData.country = data[0].country;
    groupedData.branch = data[0].branch;
    groupedData.companyName = data[0].companyName;
    groupedData.contactPerson = data[0].contactPerson;
    groupedData.automatSeriNo = data[0].automatSeriNo;
    groupedData.paymentTypes = [];
    groupedData.productsOpen = [];
  
    for (let i = 0; i < data.length; i++) {
      let paymentName = data[i].paymentName;
      let productId = data[i].productId;
      let title = data[i].title;
  
      if (!groupedData.paymentTypes.includes(paymentName)) {
        groupedData.paymentTypes.push(paymentName);
      }
  
      let found = groupedData.productsOpen.find((product) => product.productId === productId);
      if (!found) {
        groupedData.productsOpen.push({ productId, title });
      }
    }
    return groupedData;
  }
  
  const location = useLocation();
  useEffect(() => {
    const fetchUser = async () => {
      const userId = location.pathname.split("/users/")[1];
      try {
        const res = await getSingleUser(userId)
        setUser(groupData(res.data));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUser();
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  
  const handleResetUserPass = async(id) =>{
    try {
      const res = await resetPassword({id}).unwrap()
      // The temporary password is shown only once
      window.alert(`Neues temporäres Passwort: ${res.tempPassword}\nBitte notieren und an den Benutzer weitergeben.`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async(id) =>{
    try {
      console.log(id)
      await deleteUser(id)
      navigate("/users")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      
      {user && updateState !== user?.id ? (
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => handleEdit(user?.id)}>Bearbeiten</div>
            <h1 className="title">Benutzerinformationen</h1>
            <div className="item">
              <h1 className="itemTitle">{user?.name} {user?.surname}</h1>
              <Table  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Bestellung ID</TableCell>
            <TableCell className="tableCell">Benutzername</TableCell>
            <TableCell className="tableCell">Zahlungsart</TableCell>
            <TableCell className="tableCell">Datum</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
        </Table>
              <table className="userDetails">
                <div className="detailItem">
                  <span className="itemKey">Kunden ID:</span>
                  <span className="itemValue">{user?.userId}</span>
                </div>

                <div className="detailItem">
                      <span className="itemKey">Telefonnummer:</span>
                       <span className="itemValue">{user?.phone}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">E-Mail:</span>
                       <span className="itemValue">{user?.email}</span>
                     </div>
                     <div className="detailItem">
                      <span className="itemKey">Adresse:</span>
                       <span className="itemValue">{user?.street}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Postleitzahl:</span>
                       <span className="itemValue">{user?.postNo}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Stadt:</span>
                       <span className="itemValue">{user?.city}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Land:</span>
                       <span className="itemValue">{user?.country}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Firmentyp:</span>
                       <span className="itemValue">{user?.branch}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Firmenname:</span>
                       <span className="itemValue">{user?.companyName}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Kontaktperson:</span>
                       <span className="itemValue">{user?.contactPerson !== "" ? user?.contactPerson  : "-"}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Bezahlmöglichkeiten:</span>
                       <span className="itemValue">{user?.paymentTypes?.map((data) => (data)).join(", ")}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Zugewiesene Produkt-IDs:</span>
                       <span className="itemValue">{user?.productsOpen?.map(product => product.productId).join(", ")}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Zugewiesene Produktname:</span>
                       <span className="itemValue">{user?.productsOpen?.map(product => product.title).join(", ")}</span>
                     </div>
                     <div className="detailItem">
                     <span className="itemKey">Automaten Seriennummer:</span>
                       <span className="itemValue">{user?.automatSeriNo ?? "-"}</span>
                     </div>
                    <div className="buttons">
                        <div style={{ display: "flex" }}>
                          <div className="resetButton" onClick={() => handleResetUserPass(user.id)}>Passwort zurücksetzen</div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div className="deleteButton" onClick={() => handleDeleteUser(user.id)}>Löschen</div>
                        </div>
                    </div>
               
              </table>
            </div>
          </div>
        </div>
      ): <Edit user={user} handleEdit={handleEdit}/> }
    </div>
  </div>
  )}
        

const Edit = ({user,handleEdit})=>{
  const [myUser,setUser]= useState(user)
  const [updateUser] = useUpdateUserMutation()
  const notify = (error) => toast(error);
 const handleChange = (e) =>{
  setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 }
 const handleSaveChanges = async(id) =>{
  try {

   var res = await updateUser({id,myUser})
   if (res.data.status === 200) {
    notify("Success")
    window.location.reload()
   }
  } catch (error) {
    notify(error.message)
  }
}
return (
<div className="top" key={user.id}>
<div className="left">
<div className="editButton" onClick={() => handleEdit(-1)}>Go Back</div>
  <h1 className="title">Information</h1>
  <div className="item">

    <div className="detailsEdit">
      <div className="formInput">
        <label>Vorname:</label>
        <input className="itemValue" name="name" value={myUser.name} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Nachname:</label>
        <input className="itemValue" name="surname" value={myUser.surname} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Kunden ID:</label>
        <input className="itemValue" name="userId" value={myUser.userId} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Telefonnummer:</label>
        <input className="itemValue"  name="phone" value={myUser.phone}  onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>E-Mail:</label>
        <input className="itemValue" name="email" value={myUser.email} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Adresse:</label>
        <input className="itemValue" name="street" value={myUser.street} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Postleitzahl:</label>
        <input className="itemValue" name="postNo" value={myUser.postNo} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Stadt:</label>
        <input className="itemValue" name="city" value={myUser.city} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Land:</label>
        <input className="itemValue" name="country" value={myUser.country} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Firmentyp:</label>
        <input className="itemValue" name="branch" value={myUser.branch} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Firmenname:</label>
        <input className="itemValue" name="companyName" value={myUser.companyName} onChange={(e)=>handleChange(e)}/>
      </div>
      {/* <div className="formInput">
        <label>Contact Person:</label>
        <input className="itemValue" name="contactPerson" value={myUser?.contactPerson !== "" ? myUser?.contactPerson  : "-"} onChange={(e)=>handleChange(e)}/>
      </div> */}
{/*    
      <div className="formInput">
        <label>Zahlungsart:</label>
        <input className="itemValue" name="paymentType" value={myUser.paymentType} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Products Open:</label>
        <input className="itemValue" name="productsOpen" value={myUser.productsOpen} onChange={(e)=>handleChange(e)}/>
      </div> */}
{/*       
      <div className="formInput">
        <label>Automats Seri NO:</label>
        <input className="itemValue" name="automatSeriNo" value={myUser.automatSeriNo ?? "-"} onChange={(e)=>handleChange(e)}/>
      </div>
       */}

    </div>
    <div className="saveButton" onClick={() => handleSaveChanges(myUser.id)}>Speichern</div>
  </div>
</div>
<ToastContainer />
</div>
)}
export default UserSingle
