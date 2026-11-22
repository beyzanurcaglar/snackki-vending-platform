import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs} from "./formSource";
import "./style/dark.scss";
import Profile from "./pages/profile/Profile";
import UserSingle from "./pages/users/userSingle/UserSingle"
import UserNew from "./pages/users/usernew/UserNew"
import ProductSingle from "./pages/products/productSingle/ProductSingle"
import ProductNew from "./pages/products/productnew/ProductNew"
import OrderSingle from "./pages/orders/orderSingle/OrderSingle"
import AutomatSingle from "./pages/automats/automatSingle/AutomatSingle"
import AutomatNew from "./pages/automats/automatnew/AutomatNew"
import AutomatBrandNew from "./pages/automatbrands/automatbrandnew/AutomatBrandNew";
import AutomatModelNew from "./pages/automatmodels/automatmodelsnew/AutomatModelNew";
import AutomatFilterNew from "./pages/automatfilters/automatfiltersnew/AutomatFilterNew";
import CategoriesNew from "./pages/categories/categoriesnew/CategoriesNew";
import SubcategoriesNew from "./pages/subcategories/subcategoriesnew/SubcategoriesNew";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "./redux/authReducer";

function App() {
  const token = useSelector(selectCurrentToken)
  let decoded = null
  try { decoded = token ? jwtDecode(token) : null } catch (e) { decoded = null }
  // Panel pages are only available with an admin token
  var user = decoded?.user && Number(decoded.user.isAdmin) === 1 ? decoded : null
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/">
                  <Route index element={ user ? <Home /> : <Login />} />

                      <Route path="users">
                          <Route index element={user ? <List type="user"/> : <Login />} />
                          <Route path=":userId" element={user ?  <UserSingle/> : <Login />} />
                          <Route
                            path="new"
                            element={user ? <UserNew inputs={userInputs} title="Neue Benutzer Hinzufügen" /> : <Login />}
                          />
                      </Route>
                      <Route path="categories">
                        <Route index element={user ? <List type="categories" />: <Login />} />

                        <Route
                          path="new"
                          element={user ? <CategoriesNew title="Neue Kategorie Hinzufügen" />: <Login />}
                        />
                      </Route>
                      <Route path="subcategories">
                        <Route index element={user ? <List type="subcategories" />: <Login />} />

                        <Route
                          path="new"
                          element={user ? <SubcategoriesNew title="Neue Unterkategorie Hinzufügen" />: <Login />}
                        />
                      </Route>
                      <Route path="products">
                        <Route index element={user ?<List type="product" />: <Login />} />
                        <Route path=":productId" element={user ?<ProductSingle />: <Login />} />
                        <Route
                          path="new"
                          element={user ? <ProductNew inputs={productInputs} title="Neue Produkt Hinzufügen" />: <Login />}
                        />
                      </Route>
                      <Route path="orders">
                        <Route index element={user ?<List type="order" />: <Login />} />
                        <Route path=":orderId" element={user ?<OrderSingle/>: <Login />} />
                      </Route>
                      <Route path="foryou">
                        <Route index element={user ?<List type="foryou" />: <Login />} />
                      </Route>
                      <Route path="automats">
                        <Route index element={user ? <List type="automat" />: <Login />} />
                        <Route path=":automatId" element={user ?<AutomatSingle />: <Login />} />
                        <Route
                          path="new"
                          element={user ? <AutomatNew title="Neue Automat Hinzufügen" />: <Login />}
                        />
                      </Route>
                      <Route path="automatenbrand">
                        <Route index element={user ? <List type="automatenbrand" />: <Login />} />

                        <Route
                          path="new"
                          element={user ? <AutomatBrandNew title="Neue Automatenmarke Hinzufügen" />: <Login />}
                        />
                      </Route>
                      <Route path="automatenmodel">
                        <Route index element={user ? <List type="automatenmodel" />: <Login />} />

                        <Route
                          path="new"
                          element={user ? <AutomatModelNew title="Neue Automatenmodell Hinzufügen" />: <Login />}
                        />
                      </Route>
                      <Route path="automatenfilter">
                        <Route index element={user ? <List type="automatenfilter" />: <Login />} />

                        <Route
                          path="new"
                          element={user ? <AutomatFilterNew title="Neue Automatenfilter Hinzufügen" />: <Login />}
                        />
                      </Route>
                      <Route path="filterorders">
                        <Route index element={user ? <List type="filterorders" />: <Login />} />
                      </Route>
                      <Route path="profile">
                        <Route index element={user ?<Profile />: <Login />} />
                      </Route>
                  </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
