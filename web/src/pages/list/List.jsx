import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import UserDatatable from "../users/userdatatable/UserDatatable"
import OrderDatatable from "../orders/orderdatatable/OrderDatatable"
import AutomatDatatable from "../automats/automatdatatable/AutomatDatatable"
import ForYouDatatable from "../foryou/foryoudatatable/ForYouDatatable"
import ProductDatatable from "../products/productdatatable/ProductDatatable"
import AutomatBrandDatatable from "../automatbrands/automatbrandsdatatable/AutomatBrandDatatable"
import AutomatModelDatatable from "../automatmodels/automatmodelsdatatable/AutomatModelDatatable"
import AutomatFilterDatatable from "../automatfilters/automatfiltersdatatable/AutomatFilterDatatable"
import FilterOrdersTable from "../filterorders/filterordersdatatable/FilterOrdersTable"
import CategoriesDataTable from "../categories/categoriesdatatable/CategoriesDataTable"
import SubcategoriesDataTable from "../subcategories/subcategoriesdatatable/SubcategoriesDataTable"
const List = ({type}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {type === "user" ? <div> <UserDatatable /></div> :type === "categories" ? <CategoriesDataTable/>  : type === "subcategories" ? <SubcategoriesDataTable/>  :type === "order" ? <OrderDatatable/>  : type === "automat" ? <AutomatDatatable /> :type === "automatenbrand" ?<AutomatBrandDatatable /> : type === "automatenmodel" ? <AutomatModelDatatable /> : type === "automatenfilter" ? <AutomatFilterDatatable /> : type === "filterorders" ? <FilterOrdersTable /> : type === "foryou" ? <ForYouDatatable />  : <ProductDatatable /> }
        
      </div>
    </div>
  )
}

export default List