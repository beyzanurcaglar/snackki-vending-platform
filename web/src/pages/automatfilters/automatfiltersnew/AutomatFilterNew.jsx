import "../../automats/automatnew/new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddFilterMutation } from "../../../api/filterApiSlice";
const AutomatFilterNew = ({ title }) => {
  //requests
  const [filter, setFilter] = useState({});
  const [addFilter] = useAddFilterMutation()
  const handleChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  const notify = (error) => toast(error);
  const navigate = useNavigate();
  
    const handleClick = async (e) => {
 
      e.preventDefault();
      try {
        if (!filter.filterName) {
          // Handle the case where categoryName is null or empty
          notify("Filtername darf nicht leer sein!");
          return;
        }
        await addFilter({filterName:filter.filterName}).unwrap()
          navigate("/automatenfilter")
          } catch (error) {
            notify(error.message)
          }
      }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
   
          <div className="right">
            <form onSubmit={handleClick}>
                  <div className="formInput">
                     <label>Automatenfilter</label>
                    <input name="filterName" onChange={handleChange} type="text" placeholder="Neuer Automatenfilter" />
                   </div>
                 
                   <button className="addUser">Hinzufügen</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatFilterNew
