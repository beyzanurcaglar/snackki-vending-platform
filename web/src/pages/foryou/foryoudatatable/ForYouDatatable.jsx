import "./foryoudatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {  forYouColumns } from "../../../datatablesource";
import { useState } from "react";
import { useEffect } from "react";
import { useDeleteForyouMutation, useGetForyouMutation } from "../../../api/foryouApiSlice";
const ForYouDatatable = () => {
  const [forYou,setForYou] = useState([])
  const [getForyou] = useGetForyouMutation()
  const [deleteForyou] = useDeleteForyouMutation()
  useEffect(()=>{
    const fetchForYou = async() =>{
      try {
        const res = await getForyou()
        setForYou(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchForYou()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleDelete = async(id) =>{
    try {
      await deleteForyou({id})
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Aktion",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              (Für Alle) löschen
            </div>
          </div>
        );
      },
    },
  ];
    // TODO: add a search field
  return (
    <div className="datatable">
      <div className="datatableTitle">
       Produkte (Für Alle) 
   
      </div>
      <DataGrid
        className="datagrid"
        rows={forYou}
        columns={forYouColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ForYouDatatable;
