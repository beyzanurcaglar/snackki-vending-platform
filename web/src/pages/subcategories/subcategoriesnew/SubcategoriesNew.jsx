import "../../automats/automatnew/new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddSubcategoryMutation } from "../../../api/subcategoryApiSlice";
const SubcategoriesNew = ({ title }) => {
  //requests
  const [subcategory, setSubcategory] = useState({});
  const [addSubcategory] = useAddSubcategoryMutation()
  const handleChange = (e) => {
    setSubcategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  const notify = (error) => toast(error);
  const navigate = useNavigate();

  const handleClick = async (e) => {
 
    e.preventDefault();
    try {
      if (!subcategory.subcategoryName) {
        // Handle the case where categoryName is null or empty
        notify("Subcategory name cannot be empty");
        return;
      }
        await addSubcategory({subcategoryName:subcategory.subcategoryName})
        navigate("/subcategories")
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
                     <label>Unterkategoriename</label>
                    <input name="subcategoryName" onChange={handleChange} type="text" placeholder="Neue Unterkategorie" />
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

export default SubcategoriesNew
