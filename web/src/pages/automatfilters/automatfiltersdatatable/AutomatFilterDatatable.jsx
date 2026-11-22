import "../../automats/automatdatatable/automatdatatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { automatfilterColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDeleteFilterMutation, useGetFiltersMutation } from "../../../api/filterApiSlice";
const AutomatFilterDatatable = () => {
  const [filters,setFilters] = useState([])
  const [getFilters] = useGetFiltersMutation()
  const [deleteFilter] = useDeleteFilterMutation()
  useEffect(()=>{
    const fetchFilters = async() =>{
      try {
        const res = await getFilters()
        setFilters(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFilters()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleDelete = async(id) =>{
    try {
      await deleteFilter({id})
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
        Automatenfilter
        <Link to="/automatenfilter/new" className="link">
          Neue Hinzufügen
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={filters}
        columns={automatfilterColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default AutomatFilterDatatable
