import "./productdatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useGetProductsMutation } from "../../../api/productApiSlice";
import { useAddForyouMutation } from "../../../api/foryouApiSlice";
const ProductDatatable = () => {
  const [products,setProducts] = useState([])
  const [getProducts] = useGetProductsMutation()
  const [addForyou] = useAddForyouMutation()
  useEffect(()=>{
    const fetchProducts = async() =>{
      try {
        const res = await getProducts()     
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  // Fetch data only once when the page loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleForYou = async(id) =>{
    try {
      await addForyou({id})
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Aktion",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Anzeigen</div>
            </Link>
            <div
              className="addButton"
              onClick={() => handleForYou(params.row.id)}
            >
              (Für Alle) hinzufügen
            </div>
 
          </div>
        );
      },
    },
  ];
    // TODO: add a search field
  return (
    <div className="datatable">
      <div className="datatableTitle">
         Produkte
        <Link to="/products/new" className="link">
        Neue Hinzufügen
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ProductDatatable;
