import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import { useEffect, useState } from "react";
import MyTable from "../../components/table/Table";
import { useGetProductsMutation } from "../../api/productApiSlice";
import { useGetUsersMutation } from "../../api/userApiSlice";
import { useGetOrdersMutation } from "../../api/orderApiSlice";
import { useGetAutomatsMutation } from "../../api/automatApiSlice";

const Home = () => {
  const [users,setUsers] = useState(0)
  const [products,setProducts] = useState(0)
  const [orders,setOrders] = useState([])
  const [automats,setAutomats] = useState(0)
  const [getProducts] = useGetProductsMutation()
  const [getUsers] = useGetUsersMutation()
  const [getOrders] = useGetOrdersMutation()
  const [getAutomats] = useGetAutomatsMutation()
  useEffect(()=>{
    const fetchUsers = async() =>{
      try {
        const res = await getUsers()
        setUsers(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchProducts = async() =>{
      try {
        const res = await getProducts()
        setProducts(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchOrders = async() =>{
      try {
        const res = await getOrders()
        setOrders(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchAutomats = async() =>{
      try {
        const res = await getAutomats()
        setAutomats(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
    fetchAutomats()
    fetchProducts()
    fetchUsers()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="home">
      <Sidebar className="sidebar"/>
      <div className="homeContainer">
        <Navbar className="navbar"/>
        <div className="widgets">
          <Widget type="user" amount={users}/>
          <Widget type="product" amount={products}/>
          <Widget type="automat" amount={automats}/>
          <Widget type="order" amount={orders.length}/>
        </div>
        {orders.length !== 0 ?
        (<div className="listContainer">
          <div className="listTitle">Neueste Bestellungen</div>
          <MyTable orders={orders}/>
        </div>) : <div className="noOrder">Sie haben heute keine Bestellung!</div>}
      </div>
    </div>
  );
};

export default Home;
