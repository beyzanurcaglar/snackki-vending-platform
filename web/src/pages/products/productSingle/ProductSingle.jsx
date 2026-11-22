import "./productSingle.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect,useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDeleteProductMutation, useGetSingleProductMutation, useUpdateProductMutation } from "../../../api/productApiSlice";
import { useGetCategoriesMutation } from "../../../api/categoryApiSlice";
import { useGetSubcategoriesMutation } from "../../../api/subcategoryApiSlice";
const ProductSingle = () => {
  const navigate = useNavigate();
  const [products,setProducts] = useState([])
  const [deleteProduct] = useDeleteProductMutation()
  const [getSingleProduct] = useGetSingleProductMutation()
  const [updateState,setUpdateState] = useState(-1)
  const location = useLocation()

  const handleEdit = (id)=>{
    setUpdateState(id)
  }

  useEffect(()=>{

    const fetchProduct = async() =>{
      const productId = location.pathname.split("/products/")[1]
      try {
        const res = await getSingleProduct(productId)
         setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.pathname])

  const handleDelete = async(id) =>{
    try {
      await deleteProduct({id})
      navigate("/products")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {products && products?.map((product) => (
              updateState === product.id ? <Edit product={product} handleEdit={handleEdit}/> :
                <div className="top" key={product.id}>
                  <div className="left">
                    <div className="editButton" onClick={()=>handleEdit(product.id)}>Bearbeiten</div>
                    <h1 className="title">Produktinformationen</h1>
                    <div className="item">
                      <img
                       src={process.env.REACT_APP_API_URL+`images/${product.image}`}
                        alt=""
                        className="itemImg"
                      />
                      <div className="details">
                        <h1 className="itemTitle">{product.title}</h1>
                        <div className="detailItem">
                          <span className="itemKey">Produkt ID:</span>
                          <span className="itemValue">{product.productId}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Kategorie:</span>
                          <span className="itemValue">{product.categoryName}</span>
                        </div>
                        <div className="detailItem">
                        <span className="itemKey">Unterkategorie:</span>
                          <span className="itemValue">{product.subcategoryName}</span>
                        </div>
                    
                        <div className="detailItem">
                        <span className="itemKey">Beschreibung:</span>
                          <span className="itemValue">{product.desc}</span>
                        </div>
                        <div className="detailItem">
                        <span className="itemKey">Kartoninhalt:</span>
                          <span className="itemValue">{product.cartoonAmount}</span>
                        </div>
                        <div className="buttons">
                        <div style={{ display: "flex" }}>
                        <div
                          className="deleteButton"
                          onClick={() => handleDelete(product.id)}
                        >
                          Löschen
                        </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
        ))}
      </div>
    </div>
  );
};

const Edit = ({product,handleEdit})=>{
  const [myProduct,setProduct] = useState(product)
  const [updateProduct] = useUpdateProductMutation()
  const notify = (error) => toast(error);
  const [categories,setCategories] = useState([])
  const categoryOptionList = []
  const [subcategories,setSubcategories] = useState([])
  const subcategoryOptionList = []
  const [categoryOption, setCategoryOption] = useState({value : myProduct.category,label:myProduct.categoryName});
  const [subcategoryOption, setSubcategoryOption] = useState({value : myProduct.sub_category,label:myProduct.subcategoryName});
     // Array of all category options
     categories.map(category => categoryOptionList.push({value : category.id,label:category.categoryName}))

     // Array of all category options
     subcategories.map(category => subcategoryOptionList.push({value : category.id,label:category.subcategoryName}))
        // category
   const handleCategorySelect = (data)=>  {
    setCategoryOption(data);
 }
    // subcategory
    const handleSubcategorySelect = (data)=>  {
      setSubcategoryOption(data);
 
   }
   const [getCategories] = useGetCategoriesMutation()
  useEffect(()=>{
    const fetchCategories = async() =>{
      try {
        const res = await getCategories()
        setCategories(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [getSubcategories] = useGetSubcategoriesMutation()
  useEffect(()=>{
    const fetchSubcategories = async() =>{
      try {
        const res = await getSubcategories()
        setSubcategories(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSubcategories()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 const handleProductChanges = async(id) =>{
  try {
    const res = await updateProduct({title:myProduct.title,category:categoryOption.value,subCategory:subcategoryOption.value,productId:myProduct.productId,desc:myProduct.desc,cartoonAmount:myProduct.cartoonAmount,id})
    console.log(res)
    if(res.data.status === 200){
      notify("Success")
      window.location.reload()
    }else{
      notify("Error")
    }
   }
    catch (error) {
    notify(error)
  }
 }
 const handleChange = (e) =>{
  setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 }
return (
<div className="top" key={product.id}>
<div className="left">
<div className="editButton" onClick={()=>handleEdit(-1)}>Go Back</div>
  <h1 className="title">Information</h1>
  <div className="item">
    <img
     src={process.env.REACT_APP_API_URL+`images/${product.image}`}
      alt=""
      className="itemImg"
    />
    <div className="detailsEdit">
      <div className="formInput">
        <label>Produktname:</label>
        <input className="itemValue" name="title" value={myProduct.title} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Produkt ID:</label>
        <input className="itemValue" name="productId" value={myProduct.productId} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
      <label>Kartoninhalt:</label>
      <input className="itemValue" name="cartoonAmount" value={myProduct.cartoonAmount} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="formInput">
        <label>Kategorie:</label>
        <Select 
                options={categoryOptionList}
                placeholder="Kategorie auswählen"
                value={categoryOption}
                onChange={handleCategorySelect}
                isSearchable={true}
                
              />
      </div>
      <div className="formInput">
        <label>Unterkategorie:</label>
        <Select 
                options={subcategoryOptionList}
                placeholder="Unterkategorie auswählen"
                value={subcategoryOption}
                onChange={handleSubcategorySelect}
                isSearchable={true}
                
              />
      </div>
      <div className="formInput">
      <label>Beschreibung:</label>
      <textarea className="itemValue" name="desc" rows="4" cols="50" value={myProduct.desc} onChange={(e)=>handleChange(e)}/>
      </div>

    
    </div>
    <div className="saveButton" onClick={() => handleProductChanges(myProduct.id)}>Speichern</div>
  </div>
</div>
<ToastContainer />
</div>)
}
export default ProductSingle;
