import "../../automats/automatdatatable/automatdatatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { subcategoryColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDeleteSubcategoryMutation, useGetSubcategoriesMutation } from "../../../api/subcategoryApiSlice";
const SubcategoriesDataTable = () => {
  const [subcategories,setSubcategories] = useState([])
  const [getSubcategories] = useGetSubcategoriesMutation()
  const [deleteSubcategory] = useDeleteSubcategoryMutation()
  useEffect(()=>{
    const fetchSubcategories = async() =>{
      try {
        const res = await getSubcategories()
        setSubcategories(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSubcategories()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleDelete = async(id) =>{
    try {
      await deleteSubcategory({id})
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
        Unterkategorien
        <Link to="/subcategories/new" className="link">
          Neue Hinzufügen
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={subcategories}
        columns={subcategoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default SubcategoriesDataTable
