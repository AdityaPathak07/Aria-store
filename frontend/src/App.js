import React from 'react'
import  Headers  from './component/layout/Header.js'
import {  Route, Routes, BrowserRouter } from 'react-router-dom'
import WebFont from 'webfontloader'
import { useEffect,useState } from 'react'
import Footer from './component/layout/Footer'
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import  Search  from './component/Product/Search.js'
import LoginSignUp from './component/User/LoginSignUp.js'
import store from "./Store"
import { loadUser } from './actions/userAction.js'
import UserOptions from "./component/layout/UserOptions.js"
import { useSelector } from 'react-redux'
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute.js'
import  UpdateProfile  from './component/User/UpdateProfile.js'
import UpdatePassword  from './component/User/UpdatePassword'
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from './component/User/ResetPassword.js'
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Payment from './component/Cart/Payment.js'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import OrderSuccess from './component/Cart/OrderSuccess.js'
import MyOrders from './component/Order/MyOrder.js'
import OrderDetails from './component/Order/OrderDetails.js'
import Dashboard from './component/admin/Dashboard.js'
import ProductList from './component/admin/ProductList.js'
import NewProduct from './component/admin/NewProduct.js'
import UpdateProduct from './component/admin/UpdateProduct.js'
import OrderList from './component/admin/OrderList.js'
import ProcessOrder from './component/admin/ProcessOrder.js'
import UsersList from './component/admin/UsersList.js'
import UpdateUser from './component/admin/UpdateUser.js'
import ProductReviews from './component/admin/ProductReviews.js'
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
const App = () => {
 
  const {isAuthenticated, user} = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() =>{
    WebFont.load({
      google:{
        families:['Roboto','Droid Sans','Chilanka']
      }
    });
     store.dispatch(loadUser());
    getStripeApiKey();
  },[]);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <BrowserRouter>
    <Headers/>
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
    <Route exact path='/' element={<Home />}/>
    <Route exact path='/product/:id' element={<ProductDetails />}/>
    <Route exact path='/products' element={<Products />}/>
    <Route exact path='/search' element={<Search />}/>
    <Route  path='/products/:keyword' element={<Products />}/>
    <Route  path='/login' element={<LoginSignUp />}/>
    <Route exact path='/password/forgot' element={<ForgotPassword />}/>
    <Route exact path="/password/reset/:token" element={<ResetPassword />} />
    <Route exact path='/cart' element={<Cart />}/>
    <Route exact path='/about' element={<About />}/>
    <Route exact path='/contact' element={<Contact />}/>
  

    </Routes>
  
    {stripeApiKey && (
    <Elements stripe={loadStripe(stripeApiKey)}>
    <Routes>
    <Route exact path='/process/payment' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Payment />
        </ProtectedRoute>  } >
      </Route>
      </Routes>
    </Elements>
    )}

    <Routes>

    <Route  exact path='/success' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <OrderSuccess />
        </ProtectedRoute>  } >
      </Route>

    <Route  exact path='/shipping' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Shipping />
        </ProtectedRoute>  } >
      </Route>

    <Route  exact path='/password/update' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <UpdatePassword />
        </ProtectedRoute>  } >
      </Route>

    <Route  exact path='/me/update' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <UpdateProfile />
        </ProtectedRoute>  } >
      </Route>

    <Route  exact path='/orders' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <MyOrders />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/account' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Profile />
        </ProtectedRoute>  } >
      </Route>

    <Route exact path='/order/confirm' element={ 
    <ProtectedRoute 
    isAuthenticated = {isAuthenticated} >
    <ConfirmOrder />
     </ProtectedRoute>  } />

      <Route  exact path='/order/:id' element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <OrderDetails />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/dashboard' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <Dashboard />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/products' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <ProductList />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/product' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <NewProduct />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/product/:id' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <UpdateProduct />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/orders' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <OrderList />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/order/:id' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <ProcessOrder />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/users' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <UsersList />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/user/:id' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <UpdateUser />
        </ProtectedRoute>  } >
      </Route>

      <Route  exact path='/admin/reviews' element={
      <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
        <ProductReviews />
        </ProtectedRoute>  } >
      </Route>

   </Routes>
  

    <Footer />
   
    </BrowserRouter>
  )
}

export default App