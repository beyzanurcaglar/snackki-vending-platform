import "./productnew.scss"
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetCategoriesMutation } from "../../../api/categoryApiSlice";
import { useGetSubcategoriesMutation } from "../../../api/subcategoryApiSlice";
import { useAddProductMutation } from "../../../api/productApiSlice";

const ProductNew = ({ inputs, title }) => {
  //requests
  const [file, setFile] = useState("");
  const [product, setProduct] = useState({});
  const [addProduct] = useAddProductMutation()
  const handleChange = (e) => {
      setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const notify = (error) => toast(error);
  const navigate = useNavigate();
  const handleClick = async (e) => {
 
    e.preventDefault();

    try {
      var formDataProduct = new FormData();
      formDataProduct.append("image",file)
      formDataProduct.append("title",product.title);
      formDataProduct.append("category",categoryOption.value) ;
      formDataProduct.append("subCategory",subcategoryOption.value);
      formDataProduct.append("productId",product.productId);
      formDataProduct.append("desc",product.desc);
      formDataProduct.append("cartoonAmount",product.cartoonAmount);
        if (
          file === "" ||
          product.title === "" ||
          categoryOption.value === "" ||
          subcategoryOption.value === "" ||
          product.productId === "" ||
          product.desc === "" ||
          product.cartoonAmount === ""
        ){
        notify("Alle Felder sollten ausgefüllt sein.")
          }
        else{
            await addProduct(formDataProduct)
            navigate("/products");
          }
        } catch (error) {
          notify(error.message)
        }
      }


  //categories------------------------------------------------
  const [getCategories] = useGetCategoriesMutation()
  const [categories,setCategories] = useState([])
  const categoryOptionList = []
  useEffect(()=>{
    const fetchCategories = async() =>{
      try {
        const res = await getCategories()
        setCategories(res.data)
      } catch (error) {
        notify(error.message)
      }
    }
    fetchCategories()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [categoryOption, setCategoryOption] = useState();
   // Array of all category options
   categories.map(category => categoryOptionList.push({value : category.id,label:category.categoryName}))
      // category
      const handleCategorySelect = (data)=>  {
        setCategoryOption(data);
     }
  //-----------------------------------------------------------

  //subcategories------------------------------------------------
  const [getSubcategories] = useGetSubcategoriesMutation()
  const [subcategories,setSubcategories] = useState([])
  const subcategoryOptionList = []
  useEffect(()=>{
    const fetchSubcategories = async() =>{
      try {
        const res = await getSubcategories()
        setSubcategories(res.data)
      } catch (error) {
        notify(error.message)
      }
    }
    fetchSubcategories()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [subcategoryOption, setSubcategoryOption] = useState();
    // Array of all category options
    subcategories.map(category => subcategoryOptionList.push({value : category.id,label:category.subcategoryName}))
         // subcategory
         const handleSubcategorySelect = (data)=>  {
          setSubcategoryOption(data);
       }
  //---------------------------------------------------------------
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
       <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form className="productForm">
        <div className="formInput">
                <label htmlFor="file">
                  Produktbild* <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={(e) => setFile(e.target.files[0])}
          
                />
              </div> 
              
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input name={input.name} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
        
              <div className="formInput">
                <label>Kategorie*</label>
              <Select
                options={categoryOptionList}
                placeholder="Kategorie auswählen"
                value={categoryOption}
                onChange={handleCategorySelect}
                isSearchable={true}
             
              /></div>

              <div className="formInput">
                     <label>Unterkategorie*</label>
              <Select
                options={subcategoryOptionList}
                placeholder="Unterkategorie auswählen"
                value={subcategoryOption}
                onChange={handleSubcategorySelect}
                isSearchable={true}  
              /></div>
          
              <div className="formInput">
                <label>Beschriebung*</label>
                <textarea className="itemValue" name="desc" rows="4" cols="100" onChange={(e)=>handleChange(e)}/>
              </div>
             
            </form>
            <button onClick={handleClick} className="addUser">Hinzufügen</button>
           
       
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
