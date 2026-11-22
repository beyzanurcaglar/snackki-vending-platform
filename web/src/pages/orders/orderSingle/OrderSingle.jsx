import "./orderSingle.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect,useState } from "react";
import { useLocation , useNavigate} from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCompleteOrderMutation, useGetSingleOrderMutation } from "../../../api/orderApiSlice";
const OrderSingle = () => {

  const [orders,setOrders] = useState([])
  const [completeOrder] = useCompleteOrderMutation()
  const [getSingleOrder] = useGetSingleOrderMutation()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{

    const fetchOrder = async() =>{
      const id = location.pathname.split("/orders/")[1]
      try {
        const res = await getSingleOrder({id})
        setOrders(res.data)


      } catch (error) {
        console.log(error)
      }
    }
    fetchOrder()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.pathname])

  const handleComplete = async(id) =>{
    try {
      await completeOrder({id})
      navigate("/orders")
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {orders && 
           
              <div className="top" key={orders[0]?.id}>
              <div className="left">
            
                <div className="item">
              
                  <div className="details">
               
                    <h1 className="itemTitle">{orders[0]?.userId}</h1>
            
                    <div className="detailItem">
                      <span className="itemKey">Vor- und Nachname:</span>
                      <span className="itemValue">{orders[0]?.name} {orders[0]?.surname }</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Datum:</span>
                      <span className="itemValue">{orders[0]?.orderDate}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Zahlungsart:</span>
                      <span className="itemValue" style={{color:"red"}}><b>{orders[0]?.paymentName} </b> </span>
                    </div>
                    <TableContainer component={Paper} className="table">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        
                      <TableCell className="tableCell">Produkt ID</TableCell>
                        <TableCell className="tableCell">Produktanzahl</TableCell>
                        <TableCell className="tableCell">Produktname</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                       {orders.map((row,index) => (
                        <TableRow key={row.id}>
                          <TableCell className="tableCell">{row.productId}</TableCell>
                          <TableCell className="tableCell">{row.productAmount.split(",")[index]}</TableCell>
                          <TableCell className="tableCell">{row.title}</TableCell>
                        </TableRow>
                      ))} 
                    </TableBody>
                  </Table>
                </TableContainer>
                  <div
                    className="completeButton"
                    onClick={() => handleComplete(orders[0]?.id)}
                  >
                   <span>Abschließen</span> 
                  </div>
                   
                  </div>
                </div>
              </div>
            
            </div>
        }
      </div>
    </div>
  );
};

export default OrderSingle;
