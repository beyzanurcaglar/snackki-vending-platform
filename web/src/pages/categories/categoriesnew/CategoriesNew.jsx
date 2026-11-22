import "../../automats/automatnew/new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddCategoryMutation } from "../../../api/categoryApiSlice";
const CategoriesNew = ({ title }) => {
  //requests
  const [category, setCategory] = useState({});
  const [addCategory] = useAddCategoryMutation()
  const handleChange = (e) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  const notify = (error) => toast(error);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!category.categoryName) {
        // Handle the case where categoryName is null or empty
        notify("Category name cannot be empty");
        return;
      }
      await addCategory({categoryName:category.categoryName}).unwrap()
      navigate("/categories");
    } catch (error) {
      notify(error.message);
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
                     <label>Kategoriename</label>
                    <input name="categoryName" onChange={handleChange} type="text" placeholder="Neue Kategorie" />
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


export default CategoriesNew
