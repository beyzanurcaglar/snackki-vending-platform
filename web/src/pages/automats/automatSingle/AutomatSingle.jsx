import "./automatSingle.scss"
import { useEffect,useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Select from "react-select";
import { useDeleteAutomatMutation, useGetSingleAutomatMutation, useUpdateAutomatMutation } from "../../../api/automatApiSlice";
import { useGetFiltersMutation } from "../../../api/filterApiSlice";
import { useGetPeriodsMutation } from "../../../api/periodApiSlice";
import { periodLabel } from "../../../labels";
const AutomatSingle = () => {
  const navigate = useNavigate()
  const [automats,setAutomats] = useState([])
  const [updateState,setUpdateState] = useState(-1)
  const location = useLocation()
  const [getSingleAutomat] = useGetSingleAutomatMutation()
  const [deleteAutomat] = useDeleteAutomatMutation()
  const handleEdit = (id)=>{
    setUpdateState(id)
  }

  useEffect(()=>{

    const fetchAutomat = async() =>{
      const automatId = location.pathname.split("/automats/")[1]
      try {
        const res = await getSingleAutomat(automatId)
        setAutomats(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchAutomat()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.pathname])

  const handleDeleteAutomat = async(id) =>{
    try {
      await deleteAutomat({id})
      navigate("/automats")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {automats && automats?.map((automat) => (
              updateState === automat.id ? <Edit automat={automat} handleEdit={handleEdit}/> :
                <div className="top" key={automat.id}>
                  <div className="left">
                    <div className="editButton" onClick={()=>handleEdit(automat.id)}>Bearbeiten</div>
                    <h1 className="title">Automatinformationen</h1>
                    <div className="item">
                    
                      <div className="details">
                        <h1 className="itemTitle">Automaten Seriennummer: {automat.automatSeriNo}</h1>
                        <div className="detailItem">
                        <span className="itemKey">Kunden-ID:</span>
                          <span className="itemValue">{automat.userId !== null ? automat.userId :"-"}</span>
                        </div>
                    
                        <div className="detailItem">
                        <span className="itemKey">Vor- und Nachname:</span>
                          <span className="itemValue">{automat.name !== null ? automat.name :"-"} {automat.surname}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Automatenmarke:</span>
                          <span className="itemValue">{automat.brandName}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Automatenmodell:</span>
                          <span className="itemValue">{automat.automatModelName}</span>
                        </div>
                        <div className="detailItem">
                        <span className="itemKey">Filtername:</span>
                          <span className="itemValue">{automat.filterName !== null ? automat.filterName :"-"}</span>
                        </div>
                        <div className="detailItem">
                        <span className="itemKey">Austauschperiode:</span>
                          <span className="itemValue">{automat.periodName !== null ? periodLabel(automat.periodName) :"-"}</span>
                        </div>
                        <div className="detailItem">
                        <span className="itemKey">Austauschdatum:</span>
                          <span className="itemValue">{automat.filterChangedDate !== null ? automat.filterChangedDate :"-"}</span>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div className="deleteButton" onClick={() => handleDeleteAutomat(automat?.id)}>Löschen</div>
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

const Edit = ({automat,handleEdit})=>{
  const notify = (error) => toast(error);
  const [myAutomat,setMyAutomat] = useState(automat)
  const [updateAutomat] = useUpdateAutomatMutation()
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

  const handleChange = (e) =>{
    setMyAutomat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   }
   const handleAutomatChanges = async(id) =>{
    try {
     var res = await updateAutomat({automatId:myAutomat.id,userId:myAutomat.userId,filterChangedDate:myAutomat.filterChangedDate,automatFilterId:filtersOption.value,periodId:periodsOption.value,isRented:isRent.label,id})
     if(res.data.status === 200){
      notify("Success")
      window.location.reload()
    }else{
      notify("Error")
    }
    } catch (error) {
      notify(error.message)
    }
   }
return (
<div className="top" key={automat.id}>
<div className="left">
<div className="editButton" onClick={()=>handleEdit(-1)}>Go Back</div>
  <h1 className="title">Automatinformationen</h1>
  <div className="item">
    <div className="detailsEdit">
     
      <div className="formInput">
        <label>Kunden-ID:</label>
        <input className="itemValue" name="userId" value={myAutomat.userId} onChange={(e)=>handleChange(e)}/>
      </div>
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
                 <label>Austauschdatum</label>
                  <input name="filterChangedDate" value={myAutomat.filterChangedDate} onChange={handleChange} type="date" placeholder="Austauschdatum" />
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
                <label>Vermietungsstatus</label>
              <Select
                options={isRentList}
                placeholder="Vermietungsstatus auswählen"
                value={isRent}
                onChange={handleIsRent}
                isSearchable={true}
              /></div>
      </div>
      <div className="saveButton" onClick={() => handleAutomatChanges(myAutomat.id)}>Speichern</div>
    </div>
  </div>
  <ToastContainer />
</div>
)
}
export default AutomatSingle;
