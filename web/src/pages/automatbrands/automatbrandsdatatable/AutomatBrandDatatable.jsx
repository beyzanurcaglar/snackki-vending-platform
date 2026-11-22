import "../../automats/automatdatatable/automatdatatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { automatbrandColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDeleteBrandMutation, useGetBrandsMutation } from "../../../api/brandApiSlice";

const AutomatBrandDatatable = () => {
  const [automats,setAutomats] = useState([])
  const [getBrands] = useGetBrandsMutation()
  const [deleteBrand] = useDeleteBrandMutation()
  useEffect(()=>{
    const fetchAutomats = async() =>{
      try {
        const res = await getBrands()
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
      await deleteBrand({id})
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
        Automatenmarke
        <Link to="/automatenbrand/new" className="link">
          Neue Hinzufügen
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={automats}
        columns={automatbrandColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default AutomatBrandDatatable
