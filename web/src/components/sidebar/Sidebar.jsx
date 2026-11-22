import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLogoutMutation } from "../../api/authApiSlice";
import { useState } from "react";
const Sidebar = () => {
  const [selectedPage, setSelectedPage] = useState(""); // State to keep track of the selected page

  const handlePageSelect = (page) => {
    setSelectedPage(page)
  }
  const [logout] = useLogoutMutation()
  const handleLogout = (e) => {
    logout()
  }
  // const mobileMenuOpenFunc = ()=>{
  //   console.log("hi")
  // }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
        <img src="/icon.png" width={"50px"} height={"50px"} alt="icon" />
          {/* <span className="logo">Snackki Admin</span> */}
        </Link>
        {/* <button onClick={mobileMenuOpenFunc} className="menuIcon"> */}
        <button className="menuIcon">
        <ion-icon style={{zoom:"1.5"}} name="menu-outline"></ion-icon>
        </button>
      </div>
   

      <div className="center">
        <ul>
        
          <p className="title">HAUPTSÄCHLICH</p>
          <Link to="/"  style={{ textDecoration: "none" }} onClick={() => handlePageSelect("home")}>
          <li className={selectedPage === "home" ? "selected" : ""}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTEN</p>
          <Link to="/users" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("users")}>
            <li className={selectedPage === "users" ? "selected" : ""}>
              <PersonOutlineIcon className="icon" />
              <span>Kunden</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("categories")}>
            <li className={selectedPage === "categories" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Kategorien</span>
            </li>
          </Link>
          <Link to="/subcategories" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("subcategories")}>
            <li className={selectedPage === "subcategories" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Unterkategorien</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("products")} >
            <li className={selectedPage === "products" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Produkte</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("orders")}>
          <li className={selectedPage === "orders" ? "selected" : ""}>
            <ShoppingCartOutlinedIcon className="icon" />
            <span>Bestellungen</span>
          </li>
          </Link>
          <Link to="/foryou" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("foryou")}>
          <li className={selectedPage === "foryou" ? "selected" : ""}>
            <ShoppingCartOutlinedIcon className="icon" />
            <span>Produkte (Für Alle)</span>
          </li>
          </Link>
          <p className="title">AUTOMATEN</p>
          <Link to="/automats" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("automats")}>
            <li className={selectedPage === "automats" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Automatenliste</span>
            </li>
          </Link>
          <Link to="/automatenbrand" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("automatenbrand")}>
            <li className={selectedPage === "automatenbrand" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Automatenmarke</span>
            </li>
          </Link> 
            <Link to="/automatenmodel" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("automatenmodel")}>
            <li className={selectedPage === "automatenmodel" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Automatenmodell</span>
            </li>
          </Link>
          <Link to="/automatenfilter" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("automatenfilter")}>
            <li className={selectedPage === "automatenfilter" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Automatenfilter</span>
            </li>
          </Link>
          <Link to="/filterorders" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("filterorders")}>
            <li className={selectedPage === "filterorders" ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Bestellungen Filtern</span>
            </li>
          </Link>
        
          <p className="title">BENUTZER</p>
          <Link to="/profile" style={{ textDecoration: "none" }} onClick={() => handlePageSelect("profile")}>
          <li className={selectedPage === "profile" ? "selected" : ""}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          </Link>
          <Link style={{ textDecoration: "none" }}>
          <li onClick={handleLogout} >
            <ExitToAppIcon className="icon" />
            <span  >Ausloggen</span>
          </li>
          </Link>
        </ul>
     
      </div>
    
    </div>
  );
};

export default Sidebar;
