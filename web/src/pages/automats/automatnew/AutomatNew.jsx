import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetBrandsMutation } from "../../../api/brandApiSlice";
import { useGetModelsMutation } from "../../../api/modelApiSlice";
import { useGetFiltersMutation } from "../../../api/filterApiSlice";
import { useGetPeriodsMutation } from "../../../api/periodApiSlice";
import { useGetUsersWithoutAutomatMutation } from "../../../api/userApiSlice";
import { useAddAutomatMutation } from "../../../api/automatApiSlice";
import { periodLabel } from "../../../labels";
const AutomatNew = ({ title }) => {
  //requests
  const [file, setFile] = useState("");
  const [automat, setAutomat] = useState({});
  const [addAutomat] = useAddAutomatMutation()
  const handleChange = (e) => {
    setAutomat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  const notify = (error) => toast(error);
  const navigate = useNavigate();

  const handleClick = async (e) => {
 
    e.preventDefault();
    try {
      var formDataAutomat = new FormData();
      if(usersOption){
        formDataAutomat.append("userId",usersOption.value);
      }

      formDataAutomat.append("automatBrandId",brandOption.value);
      formDataAutomat.append("automatModelId",modelOption.value);
      formDataAutomat.append("automatSeriNo",automat.automatSeriNo);
      if(filtersOption){
        formDataAutomat.append("automatFilterId",filtersOption.value);
      }
      if(periodsOption){
        formDataAutomat.append("periodId",periodsOption.value);
      }

      if(automat.filterChangedDate){
        formDataAutomat.append("filterChangedDate",automat.filterChangedDate);
      }
     
      if (file) {
        formDataAutomat.append("automatDocument", file);
      }
      formDataAutomat.append("isBuy", isBuy.label);
      if(isRent){
        formDataAutomat.append("isRented", isRent.label);
      }

        var resAutomat =  await addAutomat(formDataAutomat)
        console.log(resAutomat.data.status)
          if(resAutomat.data.status === 200){
            navigate("/automats")
          }else{
            notify(resAutomat)
          }
        
        } catch (error) {
          notify(error.message)
        }
    }

    // isBuy ----------------------------------------
const isBuyList = [{value:1,label:"Gekauft"},{value:2,label:"Gemietet"}]
const [isBuy,setIsBuy] = useState()
const handleIsBuy = (data) =>{
  setIsBuy(data)
}
//--------------------------------------

    // isRent ----------------------------------------
    const isRentList = [{value:1,label:"Verkauft"},{value:2,label:"Vermietet"},{value:3,label:"Im Lager"}]
    const [isRent,setIsRent] = useState()
    const handleIsRent = (data) =>{
      setIsRent(data)
    }
    //--------------------------------------

    //brands------------------------------------------------
    const [getBrands] = useGetBrandsMutation()
    const [brands,setBrands] = useState([])
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

        //models------------------------------------------------
        const [getModels] = useGetModelsMutation()
        const [models,setModels] = useState([])
        const modelsList = []
        useEffect(()=>{
          const fetchModels = async() =>{
            try {
              const res = await getModels()
              setModels(res.data)
            } catch (error) {
              notify(error.message)
            }
          }
          fetchModels()
        // Fetch data only once when the page loads
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
        const [modelOption, setModelOption] = useState();
        // Array of all models options
        const filteredModels = models.filter((model) => model.automatBrand === brandOption?.value);
        filteredModels.map((model) =>
          modelsList.push({ value: model.id, label: model.automatModelName })
        );
        // subcategory
        const handleModelSelect = (data) => {
          setModelOption(data);
        };
        //---------------------------------------------------------------


                
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

                       //users------------------------------------------------
                       const [getUsersWithoutAutomat] = useGetUsersWithoutAutomatMutation()
                       const [users,setUsers] = useState([])
                       const usersList = []
                       useEffect(()=>{
                         const fetchUsers = async() =>{
                           try {
                             const res = await getUsersWithoutAutomat()
                             setUsers(res.data)
                           } catch (error) {
                             notify(error.message)
                           }
                         }
                         fetchUsers()
                       // Fetch data only once when the page loads
                       // eslint-disable-next-line react-hooks/exhaustive-deps
                       },[])
                       const [usersOption, setUsersOption] = useState();
                         // Array of all category options
                         users.map(user => usersList.push({value : user.userId,label:`(${user.userId} ${user.companyName}) ${user.name} ${user.surname}`}))
                              // subcategory
                              const handleUserSelect = (data)=>  {
                                setUsersOption(data);
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
   
          <div className="right">
            <form onSubmit={handleClick}>
 
             
            
              <div className="formInput">
                <label htmlFor="file">
                  Automaten Dokument: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="automatDocument"
                  onChange={(e) => setFile(e.target.files[0])}
          
                />
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
                  <div className="formInput">
                  <label>Automatenmodell*</label>
                  <Select
                    options={modelsList}
                    placeholder="Automatenmodell auswählen"
                    value={modelOption}
                    onChange={handleModelSelect}
                    isSearchable={true}
                 
                  /></div>
                     <div className="formInput">
                         <label>Seriennummer*</label>
                    <input name="automatSeriNo" onChange={handleChange} type="number" placeholder="Seriennummer eintragen (123123)" />
                   </div>
                <div className="formInput">
                  
                <label>Verkaufsstatus*</label>
              <Select
                options={isBuyList}
                placeholder="Verkaufsstatus auswählen"
                value={isBuy}
                onChange={handleIsBuy}
                isSearchable={true}
              /></div>
              <div className="formInput">
                <label>Vermietungsstatus*</label>
              <Select
                options={isRentList}
                placeholder="Vermietungsstatus auswählen"
                value={isRent}
                onChange={handleIsRent}
                isSearchable={true}
              /></div>
                 <div className="formInput">
                         <label>Automatenfilter</label>
                  <Select
                    options={filtersList}
                    placeholder="Automatenfilter auswählen"
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
                  /></div>
                  <div className="formInput">
                         <label>Kunde</label>
                  <Select
                    options={usersList}
                    placeholder="Kunde auswählen"
                    value={usersOption}
                    onChange={handleUserSelect}
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

export default AutomatNew;
