import "./orderdatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {CSVLink} from "react-csv"
import { useGetOrdersMutation } from "../../../api/orderApiSlice";
const OrderDatatable = () => {
  const [orders,setOrders] = useState([])
  const [getOrders] = useGetOrdersMutation()
  const [csv,setCsv] = useState([])
  useEffect(()=>{
    const fetchOrders = async() =>{
      try {
        const res = await getOrders()
        setOrders(res.data)
        setCsv(prevCsv =>res.data.map(item=>({userId:item.userId,name:item.name,surname:item.surname,productId:item.productId,amount:item.productAmount})))
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  const actionColumn = [
    {
      field: "action",
      headerName: "Aktion",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/orders/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Anzeigen</div>
            </Link>
      
          </div>
        );
      },
    },
  ];
  const headers = [
    { label: "Benutzer ID", key: "userId" },
    { label: "Vorname", key: "name" },
    { label: "Nachname", key: "surname" },
    { label: "Produkt ID", key: "productId" },
    { label: "Kartoninhalt", key: "amount" }
  ];
  
  const data = []
 

  csv.map(item=> data.push ({userId:item.userId,name:item.name,surname:item.surname,productId:item.productId,amount:item.productAmount}))
  return (
    <div className="datatable">
    
    <div className="datatableTitle">
        Bestellungen
        <div className="link">
        <CSVLink className="csv"  separator=";" headers={headers} filename="orders" data={data}>Exportieren (CSV) </CSVLink> 
        </div>
        
      </div>

      <DataGrid
        className="datagrid"
        rows={orders}
        columns={orderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default OrderDatatable;
