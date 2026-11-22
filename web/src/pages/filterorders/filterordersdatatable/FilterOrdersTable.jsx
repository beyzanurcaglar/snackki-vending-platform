import "../../orders/orderdatatable/orderdatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { filterOrderColumns } from "../../../datatablesource";
import { useState } from "react";
import { useEffect } from "react";
import { useCompleteFilterChangeMutation, useGetUserAutomatsMutation } from "../../../api/userautomatApiSlice";
const FilterOrdersTable = () => {
  const [orders,setFilterOrders] = useState([])
  const [getUserAutomats] = useGetUserAutomatsMutation()
  const [completeFilterChange] = useCompleteFilterChangeMutation()
  useEffect(()=>{
    const fetchFilterOrders = async() =>{
      try {
        const res = await getUserAutomats()
        setFilterOrders(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFilterOrders()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleComplete = async(id) =>{
    try {
      await completeFilterChange({id})
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }


  const actionColumn = [
    {
      field: "action",
      headerName: "Aktion",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleComplete(params.row.id)}
            >
              Erledigt
            </div>
      
          </div>
        );
      },
    },
  ];
  // TODO: add an export button
  return (
    <div className="datatable">
    
    <div className="datatableTitle">
       Bestellungen Filtern
      </div>

      <DataGrid
        className="datagrid"
        rows={orders}
        columns={filterOrderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};


export default FilterOrdersTable
