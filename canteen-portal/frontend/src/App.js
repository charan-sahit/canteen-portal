import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import NavIn from "./components/templates/NavIn";
import NavBuyer from "./components/templates/NavBuyer";
import Profile from "./components/buyers/Profile";
import ProfileV from "./components/vendors/Profile";
import Login from "./components/common/Login";
import Store from "./components/common/Store";
import BuyerDashboard from "./components/buyers/Dashboard";
import VendorDashboard from "./components/vendors/Dashboard";
import AddFoodItem from "./components/vendors/AddFoodItem";
import EditFoodItem from "./components/vendors/EditFoodItem";
import MyVendorOrders from "./components/vendors/OrderDashboard";
import Statistics from "./components/vendors/Statistics";

import { useState } from "react";
import MyOrders from "./components/users/MyOrders";



const Layout = ({loginStatus}) => {
  return (
    <div>
      <Navbar loginStatus={false}/>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const LayoutIn = ({loginStatus}) => {
  return (
    <div>
      <NavIn loginStatus={false}/>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const LayoutBuyer = ({loginStatus}) => {
  return (
    <div>
      <NavBuyer loginStatus={false}/>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const [user, setLoginUser] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout loginStatus={loginStatus}/>}>
          
          
          <Route path="register" element={<Register />} />
          
          <Route path="login" element={<Login setLoginStatus={setLoginStatus}/>} />
        </Route>
        <Route path="/" element={<LayoutIn loginStatus={loginStatus}/>}>
          <Route path="/home" element={<Home />} />
          
          <Route path="/vendor/profile" element={<ProfileV />} />
          
          <Route path="/vendor/menu" element={<VendorDashboard />} />
          <Route path="/vendor/addFoodItem" element={<AddFoodItem />} />
          <Route path="vendor/editFoodItem/" element={<EditFoodItem />} />
          <Route path="/vendor/dashboard" element={<MyVendorOrders />} />
          <Route path="/vendor/statistics" element={<Statistics />} />
        </Route>
        <Route path="/" element={<LayoutBuyer loginStatus={loginStatus}/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/buyer/profile" element={<Profile />} />
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/orders" element={<MyOrders />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
