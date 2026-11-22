import "./automatdatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { automatColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {CSVLink} from "react-csv"
import { useGetAutomatsMutation } from "../../../api/automatApiSlice";
const AutomatDatatable = () => {
  const [automats,setAutomats] = useState([])
  const [getAutomats] = useGetAutomatsMutation()
  const [csv,setCsv] = useState([])
  useEffect(()=>{
    const fetchAutomats = async() =>{
      try {
        const res = await getAutomats()
        setAutomats(res.data)
        setCsv(prevCsv => res.data.map(item => ({
          automatSeriNo: item.automatSeriNo,
          name: item.name,
          surname: item.surname,
          userId: item.userId,
          isRented: item.isRented
      })));
      } catch (error) {
        console.log(error)
      }
    }
    fetchAutomats()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const actionColumn = [
    {
      field: "action",
      headerName: "Aktion",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/automats/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Anzeigen</div>
            </Link>
     
          </div>
        );
      },
    },
  ];
  const headers = [
    { label: "Automat Seriennummer", key: "automatSeriNo" },
    { label: "Vorname", key: "name" },
    { label: "Nachname", key: "surname" },
    { label: "Kunden ID", key: "userId" },
    { label: "isRented", key: "isRented" }
  ];
  
  const data = []
  csv.map(item=> data.push( { automatSeriNo: item.automatSeriNo, name: item.name, surname: item.surname, userId: item.userId, isRented:item.isRented}))
 
  // Custom cell renderer for automatDocument field
  const documentCellRenderer = (params) => {
    const handleDocumentClick = () => {
      // Assuming 'automatDocument' contains URL to PDF
      window.open(process.env.REACT_APP_API_URL + "/images/automatDocuments/" + params.value, '_blank');
    };
    // const fileUrl =  REACT_APP_API_URL + `/images/automatDocuments/${automatDocument}`
    return (
      <div className="documentCell" style={{cursor:"pointer"}} onClick={handleDocumentClick}>
        {params.value}
      </div>
    );
  };
  const updatedAutomatColumns = automatColumns.map((column) => {
    if (column.field === "automatDocument") {
      return {
        ...column,
        renderCell: documentCellRenderer,
      };
    }
    return column;
  });
    // TODO: add a search field
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Automatenliste
        <div style={{display:"flex"}}>
        <Link to="/automats/new" className="link">
          Neue Hinzufügen
        </Link>
        <div className="link">
          <CSVLink className="csv"  separator=";" headers={headers} filename="automats" data={data}>Exportieren (CSV) </CSVLink> 
        </div>
       
        </div>
      
      </div>
      <DataGrid
        className="datagrid"
        rows={automats}
        columns={updatedAutomatColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default AutomatDatatable;
