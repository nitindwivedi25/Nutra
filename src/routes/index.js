import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StateProvider } from "../state";
import { INITIAL_STATE as AUTH_INITIAL_STATE } from "../state/auth/reducers";
import { INITIAL_STATE as PRODUCT_INITIAL_STATE } from "../state/product/reducers";
import reducers from "../state/reducers";
// import BaseStyles from './base-styles';
import PrivateRoute from "./private-route";
// import Content from '../components/content';
import Login from "../views/login";
import Home from "../views/home";
import HomePage from "../views/landing/HomePage";
import Footer from "../components/Footer";
import Register from "../components/form/Register";
import Dashboard from "../components/Admin/Dashboard";
import Productform from "../components/Admin/Productform";
import CategoryCreation from "../components/Admin/CategoryCreation";
import ManufacturerCreation from "../components/Admin/ManufacturerCreation";
import SingleProduct from "../components/SingleProduct";
import Cart from "../components/Cart";
import ContactUs from "../components/ContactUs";
import About from "../components/About";
import Allcategory from "../components/Allcategory";
import Ordered from "../components/Ordered";
import OrderDetails from "../components/OrderDetails";
import Checkout from "../components/Checkout";
import UserDetails from "../components/form/UserDetails";
import Header1 from "../components/Header1";
import WishList from "../components/WishList";
import AddressPage from "../components/AddressPage";
import ShippingAddress from "../components/ShippingAddress";
import Orders from "../components/Orders";
import Vieworder from "../components/Admin/NewOrder";
import NewOrder from "../components/Admin/NewOrder";
import InProgressOrder from "../components/Admin/InProgressOrder";
import DeliveredOrder from "../components/Admin/DeliveredOrder";
import Roles from "../components/Admin/Roles";
import SubCategoryCreation from "../components/Admin/SubCategoryCreation";
import AllProducts from "../components/AllProducts";
import Subcategory from "../components/Subcategory";
import Subcategories from "../components/Subcategories";
import TrendingProducts from "../components/TrendingProducts";
import ProductByManufacturer from "../components/ProductByManufacturer";
import SearchResult from "../components/SearchResult";

var Userdata = "";
const Root = (props) => {
  const initialState = {
    auth: AUTH_INITIAL_STATE,
    product: PRODUCT_INITIAL_STATE,
  };
  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props}> </Component>
        </Layout>
      )}
    ></Route>
  );
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
  }, []);
  return (
    <StateProvider initialState={initialState} reducer={reducers}>
      {/* <BaseStyles /> */}
      <Router>
        <>
          <Switch>
            <Route exact path="/AllProducts" component={AllProducts} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Register" component={Register} />
            {/* <Route exact path="/" component={HomePage} /> */}
            {/* <PrivateRoute path="/home" component={Home} /> */}
            {/* <Route exact path="/Register" component={Register} /> */}
            {/* {Userdata!=undefined? Userdata.role=="superAdmin" ||Userdata.role=="Manager"||Userdata.role=="Vender"? */}
            {/* <Switch> */}
            <Route exact path="/Dashboard" component={Dashboard} />
            {/* </Switch> */}
            {/* :null:null} */}

            {/* } */}
            <Route exact path="/Productform" component={Productform} />
            <Route exact path="/Category" component={CategoryCreation} />
            <Route
              exact
              path="/Manufacturer"
              component={ManufacturerCreation}
            />
            <Route exact path="/SingleProduct/:id" component={SingleProduct} />
            <Route exact path="/Cart" component={Cart} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Allcategory/:name" component={Allcategory} />
            <Route exact path="/Ordered" component={Ordered} />
            <Route
              exact
              path="/OrderDetails/:productid"
              component={OrderDetails}
            />
            <Route exact path="/Checkout" component={Checkout} />
            <Route exact path="/UserDetails/:_id" component={UserDetails} />
            <Route exact path="/Header1" component={Header1} />
            <Route exact path="/WishList" component={WishList} />
            <Route exact path="/AddressPage" component={AddressPage} />
            <Route exact path="/Orders" component={Orders} />
            <Route exact path="/NewOrder/:status" component={NewOrder} />

            <Route exact path="/InProgressOrder" component={InProgressOrder} />

            <Route exact path="/DeliveredOrder" component={DeliveredOrder} />
            <Route exact path="/Roles" component={Roles} />
            <Route
              exact
              path="/SubCategoryCreation"
              component={SubCategoryCreation}
            />
            <Route exact path="/Subcategory" component={Subcategory} />
            <Route exact path="/Subcategories/:_id" component={Subcategories} />
            <Route
              exact
              path="/TrendingProducts"
              component={TrendingProducts}
            />
            <Route
              exact
              path="/ProductByManufacturer/:_id"
              component={ProductByManufacturer}
            />
            <Route
              exact
              path="/SearchResult/:Search"
              component={SearchResult}
            />
          </Switch>
        </>
      </Router>
    </StateProvider>
  );
};

export default Root;
