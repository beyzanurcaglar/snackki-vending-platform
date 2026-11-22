import "./userdatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {  userColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useActivateUserMutation, useDeactivateUserMutation, useGetUsersMutation } from "../../../api/userApiSlice";
const UserDatatable = () => {
  const [users,setUsers] = useState([])
  const [getUsers] = useGetUsersMutation()
  const [deactivateUser] = useDeactivateUserMutation()
  const [activateUser] =useActivateUserMutation()
  const notify = (error) => toast(error);
  useEffect(()=>{
    const fetchUsers = async() =>{
      try {
        const res = await getUsers()
     
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleDeactivate = async(id) =>{
    try {
      await deactivateUser({id})
      window.location.reload()
    } catch (error) {
      notify(error)
    }
  }
  
  const handleActivate = async(id) =>{
    try {
      await activateUser({id})
      window.location.reload()
    } catch (error) {
      notify(error)
    }

  }

  

  // TODO: add a search field
  const actionColumn = [
    {
      field: "action",
      headerName: "Aktion",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`}  style={{ textDecoration: "none" }}>
              <div className="viewButton">Anzeigen</div>
            </Link>
            
            <div
              className="deleteButton"
               onClick={() => handleDeactivate(params.row.id)}
            >
              Deaktivieren
            </div>
            <div
              className="activeButton"
               onClick={() => handleActivate(params.row.id)}
            >
            Aktivieren
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Kunden
        <Link to="/users/new" className="link">
          Neue Hinzufügen
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
         <ToastContainer />
    </div>
  );
};

export default UserDatatable;
