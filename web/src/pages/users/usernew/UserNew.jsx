import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetProductsMutation } from "../../../api/productApiSlice";
import { useAddUserMutation, useGetAdminsMutation } from "../../../api/userApiSlice";
import { useGetFiltersMutation } from "../../../api/filterApiSlice";
import { useGetFreeAutomatsMutation } from "../../../api/automatApiSlice";
import { useGetPeriodsMutation } from "../../../api/periodApiSlice";
import { useGetPaymentsMutation } from "../../../api/paymentApiSlice";
import { periodLabel } from "../../../labels";

const UserNew = ({ inputs, title }) => {
    //requests
    const [user, setUser] = useState({});
    const [addUser] = useAddUserMutation()
    const handleChange = (e) => {
      setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const notify = (error) => toast(error);
    const navigate = useNavigate();
  


  //payments-------------------------------------------
  const [getPayments] = useGetPaymentsMutation()
  const [payments,setPayments] = useState([])
  const paymentList = []
  useEffect(()=>{
    const fetchPaymentTypes = async() =>{
      try {
        const res = await getPayments()
        setPayments(res.data)
      } catch (error) {
        notify(error.message)
      }
    }
    fetchPaymentTypes()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [paymentOption, setPaymentOption] = useState();
   // Array of all payment options
   payments.map(payment =>  paymentList.push({value : payment.id,label:payment.paymentName}))
   // payment
   const handleSelect = (data)=>  {
    setPaymentOption(data);
   }
//----------------------------------------------------------

  //automats-------------------------------------------
  const [getFreeAutomats] = useGetFreeAutomatsMutation()
  const [automats,setAutomats] = useState([])
  const automatList = []
  useEffect(()=>{
    const fetchAutomats = async() =>{
      try {
        const res = await getFreeAutomats()
        setAutomats(res.data)
      } catch (error) {
        notify(error.message)
      }
    }
    fetchAutomats()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [automatOption, setAutomatOption] = useState();
   // Array of all payment options
   automats.map(automat =>  automatList.push({value : automat.id,label:automat.brandName + ", " + automat.automatModelName + ", " + automat.automatSeriNo}))
   // payment
   const handleAutomat = (data)=>  {
    setAutomatOption(data);
   }
//----------------------------------------------------------

    // isRent ----------------------------------------
    const isRentList = [{value:1,label:"Verkauft"},{value:2,label:"Vermietet"}]
    const [isRent,setIsRent] = useState()
    const handleIsRent = (data) =>{
      setIsRent(data)
    }
    //--------------------------------------

    //filters------------------------------------------------
    const [getFilters] = useGetFiltersMutation()
    const [filters,setFilters] = useState([])
    const filtersList = []
    useEffect(()=>{
      const fetchFilters = async() =>{
        try {
          const res = await getFilters()
          setFilters(res.data)
        } catch (error) {
          notify(error.message)
        }
      }
      fetchFilters()
    // Fetch data only once when the page loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [filtersOption, setFiltersOption] = useState();
      // Array of all category options
      filters.map(filter => filtersList.push({value : filter.id,label:filter.filterName}))
           // subcategory
           const handleFilterSelect = (data)=>  {
            setFiltersOption(data);
         }
    //---------------------------------------------------------------

    
    //periods------------------------------------------------
    const [getPeriods] = useGetPeriodsMutation()
    const [periods,setPeriods] = useState([])
    const periodsList = []
    useEffect(()=>{
      const fetchPeriods = async() =>{
        try {
          const res = await getPeriods()
          setPeriods(res.data)
        } catch (error) {
          notify(error.message)
        }
      }
      fetchPeriods()
    // Fetch data only once when the page loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [periodsOption, setPeriodsOption] = useState();
      // Array of all category options
      periods.map(period => periodsList.push({value : period.id,label:periodLabel(period.periodName)}))
           // subcategory
           const handlePeriodsSelect = (data)=>  {
            setPeriodsOption(data);
         }
    //---------------------------------------------------------------

// contact person ----------------------------------------
const [getAdmins] = useGetAdminsMutation()
const [contactPerson,setContactPerson] = useState([])
const contactPersonList = []
useEffect(()=>{
  const fetchContactPerson = async() =>{
    try {
      const res = await getAdmins()
   
      setContactPerson(res.data)
    } catch (error) {
      notify(error.message)
    }
  }
  fetchContactPerson()
// Fetch data only once when the page loads
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
const [contactPersonOption, setContactPersonOption] = useState();
// Array of all payment options
contactPerson.map(person =>  contactPersonList.push({value : person.id,label:person.name + " " +person.surname}))
const handleContactPerson = (data) =>{
  setContactPersonOption(data)
}
//--------------------------------------

  //products--------------------------------------------------
  const [getProducts] = useGetProductsMutation()
  const [products,setProducts] = useState([])
  const productList = []
  useEffect(()=>{
    const fetchProducts = async() =>{
      try {
        const res = await getProducts()
        setProducts(res.data)
      } catch (error) {
        notify(error.message)
      }
    }
    fetchProducts()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [userProductsOption, setUserProductsOption] = useState();
     //Array of all products
     products.map(product =>  productList.push({value : product.productId,label:product.title}))
        //user products
   const handleSelectProducts = (data)=>  {
    setUserProductsOption(data);
   }

   const handleClick = async (e) => {
    e.preventDefault()
    try {
    const res = await addUser({
      userId: user.userId,
      isAdmin: user.isAdmin ? user.isAdmin : 0,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      street: user.street,
      postNo: user.postNo,
      city: user.city,
      country: user.country,
      branch: user.branch,
      contactPerson: contactPersonOption ? contactPersonOption.label : null,
      automatId: automatOption ? automatOption.value : null,
      automatFilterId: filtersOption ? filtersOption.value : null,
      periodId: periodsOption ? periodsOption.value : null,
      filterChangedDate: user.filterChangedDate,
      isRented: isRent ? isRent.label : null,
      productsOpen: userProductsOption ? JSON.stringify(userProductsOption) : null,
      companyName: user.companyName,
      paymentType: paymentOption ? JSON.stringify(paymentOption) : null
  }).unwrap();
      if (res?.tempPassword) {
        window.alert(`Benutzer angelegt.\nTemporäres Passwort: ${res.tempPassword}\nBitte notieren und an den Benutzer weitergeben.`)
      }
      navigate("/users");
 
    } catch (error) {
      notify(error.message)
    }
  };

   
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
       
             
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input name={input.name} required={input.required} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
         
              <div className="formInput">
                <label>Kontaktperson*</label>
              <Select
              required
                options={contactPersonList}
                placeholder="Kontaktperson auswählen"
                value={contactPersonOption}
                onChange={handleContactPerson}
                isSearchable={true}
              /></div>
              
                    
            
              <div className="formInput">
                <label>Bezahlmöglichkeiten*</label>
              <Select
                      required
                options={paymentList}
                placeholder="Bezahlmöglichkeiten auswählen"
                value={paymentOption}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              /></div>
          
         
              <div className="formInput">
                 <label>Produkte*</label>
              <Select
                      required
                options={productList}
                placeholder="Produkte auswählen"
                value={userProductsOption}
                onChange={handleSelectProducts}
                isSearchable={true}
                isMulti
              /></div>
               <div className="formInput">
                 <label>Automaten</label>
              <Select
              
                options={automatList}
                placeholder="Automaten auswählen"
                value={automatOption}
                onChange={handleAutomat}
                isSearchable={true}
              
              /></div>
                 <div className="formInput">
                  <label>Filter</label>
                  <Select
                    options={filtersList}
                    placeholder="Filter auswählen"
                    value={filtersOption}
                    onChange={handleFilterSelect}
                    isSearchable={true}
                 
                  /></div>
                <div className="formInput">
                 <label>Filter Austauschdatum</label>
                  <input name="filterChangedDate" onChange={handleChange} type="date" placeholder="Austauschdatum" />
                </div>
                <div className="formInput">
                <label>Austauschperiode</label>
                  <Select
                    options={periodsList}
                    placeholder="Austauschperiode auswählen"
                    value={periodsOption}
                    onChange={handlePeriodsSelect}
                  />
                  </div>
                <div className="formInput">
                <label>Vermietungsstatus</label>
              <Select
                options={isRentList}
                placeholder="Vermietungsstatus auswählen"
                value={isRent}
                onChange={handleIsRent}
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
}
export default UserNew
