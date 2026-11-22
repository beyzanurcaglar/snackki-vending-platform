import "../../automats/automatnew/new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import { useGetBrandsMutation } from "../../../api/brandApiSlice";
import { useAddModelMutation } from "../../../api/modelApiSlice";
const AutomatModelNew = ({ title }) => {
  //requests
  const [automat, setAutomat] = useState({});
  const [addModel] = useAddModelMutation()
    //brands------------------------------------------------
    const [brands,setBrands] = useState([])
    const [getBrands] = useGetBrandsMutation()
    const brandsList = []
    useEffect(()=>{
      const fetchBrands = async() =>{
        try {
          const res = await getBrands()
          setBrands(res.data)
        } catch (error) {
          notify(error.message)
        }
      }
      fetchBrands()
    // Fetch data only once when the page loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [brandOption, setBrandOption] = useState();
      // Array of all category options
      brands.map(brand => brandsList.push({value : brand.id,label:brand.brandName}))
           // subcategory
           const handleBrandSelect = (data)=>  {
            setBrandOption(data);
         }
    //---------------------------------------------------------------
  const handleChange = (e) => {
    setAutomat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  const notify = (error) => toast(error);
  const navigate = useNavigate();

  const handleClick = async (e) => {
 
    e.preventDefault();
    try {
      if (!automat.automatModelName || !brandOption.value) {
        // Handle the case where categoryName is null or empty
        notify("Alle Felder sollten ausgefüllt sein.");
        return;
      }
      await addModel({automatModelName:automat.automatModelName,automatBrand:brandOption.value}).unwrap()
      navigate("/automatenmodel")
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
                     <label>Automatenmodell</label>
                    <input name="automatModelName" onChange={handleChange} type="text" placeholder="Neues Automatenmodell" />
                   </div>
                   <div className="formInput">
                  <label>Automatenmarke*</label>
                  <Select
                    options={brandsList}
                    placeholder="Automatenmarke auswählen"
                    value={brandOption}
                    onChange={handleBrandSelect}
                    isSearchable={true}
                 
                  /></div>
                   <button className="addUser">Hinzufügen</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatModelNew
