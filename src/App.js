import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AboutUs from './Components/Pages/AboutUs';
import AllCollections from './Components/Pages/AllCollections';
import Cart from './Components/Pages/Cart';
import ContactUs from './Components/Pages/ContactUs';
import Home from './Components/Pages/Home';
import MakeYourOwn from './Components/Pages/MakeYourOwn';
import OurStory from './Components/Pages/OurStory';
import Products from './Components/Pages/Products';
import SingleProduct from './Components/SingleProduct';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy';
import Terms from './Components/Pages/Terms';
import Refund from './Components/Pages/Refund';
import Designs from './Components/Pages/Designs';
import './Firebase/index';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { currentUser } from './Functions/user';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ProductCreate from './Components/Forms/ProductCreate';
import AdminProducts from './Components/Admin/AdminProducts';
import EditProducts from './Components/Admin/EditProducts';
import VirtualProductCreate from './Components/Forms/VirtualProductCreate';
import Checkout from './Components/Pages/Checkout';
import Wishlist from './Components/Pages/Wishlist';
import AdminFabric from './Components/Admin/AdminFabric';
import AdminFabrics from './Components/Admin/AdminFabrics';
import EditFabric from './Components/Admin/EditFabric';
import EditVirtual from './Components/Admin/EditVirtual';
import AdminRoute from './Components/Routes/AdminRoute';
import UserRoute from './Components/Routes/UserRoute';
import AdminColors from './Components/Admin/AdminColors';
import ColorCreate from './Components/Forms/ColorCreate';
import EditColor from './Components/Admin/EditColor';
import VirtualOrder from "./Components/Pages/VirtualOrder";
import UserDashboard from './Components/Pages/UserDashboard';
import ForgotPassword from './Components/Pages/ForgotPassword';
import Order from './Components/Pages/Order';
import OrderSingleProduct from './Components/Pages/OrderSingleProduct';
import SearchProducts from './Components/Pages/SearchProducts';
const App = ({ history }) => {
  
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.data.name,
                email: res.data.data.email,
                token: idTokenResult.token,
                role: res.data.data.role
              },
            });
            if (res.data.data.role === "admin") {
              history.push("/orders");
            }
          })
          .catch((err) => console.log(err));
      }
    });
    return unsubscribe;
  }, [history, dispatch]);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:filter" component={Products} />
        <Route exact path="/design-your-own" component={Designs} />
        <Route exact path="/single-product/:Id" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/all-collections" component={AllCollections} />
        {/* <Route exact path="/story-page" component={OurStory} /> */}
        <Route exact path="/story-page" component={AboutUs} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/policy" component={PrivacyPolicy} />
        <Route exact path="/terms-and-conditions" component={Terms} />
        <Route exact path="/refunds" component={Refund} />
        <Route exact path="/order-your-design/:id" component={MakeYourOwn} />
        <AdminRoute exact path="/orders" component={AdminDashboard} />
        <AdminRoute exact path="/admin/create-product" component={ProductCreate} />
        <AdminRoute exact path="/admin/create-virtual-product" component={VirtualProductCreate} />
        <AdminRoute exact path="/admin/all-products" component={AdminProducts} />
        <AdminRoute exact path="/admin/all-fabric" component={AdminFabrics} />
        <AdminRoute exact path="/admin/edit-products/:_id" component={EditProducts} />
        <AdminRoute exact path="/admin/create-fabric" component={AdminFabric} />
        <AdminRoute exact path="/admin/edit-fabric/:id" component={EditFabric} />
        <AdminRoute exact path="/admin/edit-virtual-product/:id" component={EditVirtual} />
        <AdminRoute exact path="/admin/colors" component={AdminColors} />
        <AdminRoute exact path="/admin/create-color" component={ColorCreate} />
        <AdminRoute exact path = "/admin/edit-color/:id" component={EditColor} />
        <Route exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/wishlist" component={Wishlist} />
        <UserRoute exact path="/my-orders" component={UserDashboard} />
        <Route exact path="/virtual-order/:id" component={VirtualOrder} />
        <Route exact path="/search-products/:query" component={SearchProducts} />
        <Route exact path="/user/order" component={Order} />
        <Route exact path="/user/order-product/:id" component={OrderSingleProduct} />
        <Route exact path="/user/forgot-password" component={ForgotPassword} />
      </Switch>
    </>
  );
}

export default App;
