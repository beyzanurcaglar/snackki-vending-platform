import "../../automats/automatdatatable/automatdatatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { automatmodelColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDeleteModelMutation, useGetModelsMutation } from "../../../api/modelApiSlice";
const AutomatModelDatatable = () => {
  const [automats,setAutomats] = useState([])
  const [getModels] = useGetModelsMutation()
  const [deleteModel] = useDeleteModelMutation()
  useEffect(()=>{
    const fetchAutomats = async() =>{
      try {
        const res = await getModels()
        setAutomats(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAutomats()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleDelete = async(id) =>{
    try {
      await deleteModel({id})
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Aktion",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellAction">
               <div
                    className="deleteButton"
                    onClick={() => handleDelete(params.row.id)}
                  >
                   <span>Löschen</span> 
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
        Automatenmodell
        <Link to="/automatenmodel/new" className="link">
          Neue Hinzufügen
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={automats}
        columns={automatmodelColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default AutomatModelDatatable
