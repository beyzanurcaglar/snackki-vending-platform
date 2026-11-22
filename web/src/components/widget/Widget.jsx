import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";


const Widget = ({ type , amount}) => {
  let data;
  switch (type) {
    case "user":
      data = {
        title: "KUNDEN",
        isMoney: false,
        link: "Alle Kunden anzeigen",
        goTo: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "BESTELLUNGEN",
        isMoney: false,
        link: "Alle Bestellungen anzeigen",
        goTo: "/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUKTE",
        isMoney: false,
        link: "Alle Produkte anzeigen",
        goTo: "/products",
        icon: (
          <StoreIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
      case "automat":
      data = {
        title: "AUTOMATEN",
        isMoney: true,
        link: "Alle Automaten anzeigen",
        goTo: "/automats",
        icon: (
          <StoreIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
       {amount}
        </span>
        <Link to={data.goTo} style={{ textDecoration: "none",color:"grey"}}>
        <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
