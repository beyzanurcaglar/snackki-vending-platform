import "../../automats/automatdatatable/automatdatatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { categoryColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDeleteCategoryMutation, useGetCategoriesMutation } from "../../../api/categoryApiSlice";
const CategoriesDataTable = () => {
  const [categories,setCategories] = useState([])
  const [getCategories] = useGetCategoriesMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  useEffect(()=>{
    const fetchCategories = async() =>{
      try {
        const res = await getCategories()
        setCategories(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleDelete = async(id) =>{
    try {
      await deleteCategory({id})
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
        Kategorien
        <Link to="/categories/new" className="link">
          Neue Hinzufügen
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={categories}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default CategoriesDataTable
