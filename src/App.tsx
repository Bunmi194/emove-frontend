import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword";
import CheckEmail from './pages/checkEmail';
import { ResetPassword } from './pages/resetPassword';
import { SuccessPage } from './pages/successPage';


import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
import { Layout } from './Layouts/Layout';
import { SignUpPage } from './pages/signUpPage';
import { LoginPage } from './pages/loginPage';
import { DashboardPage } from './pages/dashboardPage';
import { DashboardLayout } from './Layouts/DashboardLayout';
//import { Navbar } from './components/UserNavbar';
import './styles/dashboard.styles.css'
import { Button } from './components/Button';
import { TripDetailsDashboard } from './pages/tripDetailsDashboard';
import { PaymentDashboard } from './pages/paymentDashboard';
import { ViewPaymentMethod } from './pages/viewPaymentMethod';
import { WalletPage } from './pages/walletPage';
import { MoreRoutes } from './components/MoreRoutes';
import { AdminPricingPage } from './pages/AdminPricingPage';
import { FormModal } from './components/FormModal';
import { AdminDriversPage } from './pages/AdminDriversPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminViewDriversPage } from './pages/AdminViewDriversPage';

// import tw from "tailwind-styled-components";

function App() { 

  const details = JSON.parse(`${localStorage.getItem('userDetails')}`);

  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />} ></Route>
      <Route path="/login" element={<LoginPage />} ></Route>
      <Route path="/" element={<LandingPage />} ></Route>

      <Route path="/forgotPassword" element={details? 
                <ForgotPassword /> : <LoginPage />}></Route>
      <Route path="/resetPassword/:token" element={details? 
                <ResetPassword /> : <LoginPage />} ></Route>
      <Route path="/checkemail/:email" element={details? 
                <CheckEmail /> : <LoginPage />}></Route>
      <Route path="/success" element={details? 
                <SuccessPage /> : <LoginPage />}></Route>

      {/* User Dashboard */}
      <Route path="/user/book_trip" element={details? 
                <DashboardPage /> : <LoginPage />}></Route>
      <Route path="/user/trip_details" element={details? 
                <TripDetailsDashboard /> : <LoginPage />}></Route>
      <Route path="/user/make_payment" element={details? 
                <PaymentDashboard /> : <LoginPage />}></Route>
      <Route path="/user/payment_options" element={details? 
                <ViewPaymentMethod /> : <LoginPage />}></Route>
      <Route path="/user/wallet" element={details? 
                <WalletPage /> : <LoginPage />}></Route>
      
      
      

      {/*Admin Dashboard  */}
      <Route path="/admin/pricing" element={details? 
                <AdminPricingPage /> : <LoginPage />}></Route>
      <Route path="/admin/drivers" element={details? 
                <AdminDriversPage /> : <LoginPage />}></Route>
      <Route path="/admin/driver" element={details? 
                <AdminViewDriversPage /> : <LoginPage />}></Route>
      <Route path="/admin/dashboard" element={details? 
                <AdminDashboardPage /> : <LoginPage />}></Route>


      <Route path="/moreroutes" element={details? 
                <MoreRoutes /> : <LoginPage />}></Route>
      
      
     
      {/* <Route path="/login" element={<LoginPage />} ></Route>
      <Route path="/signup" element={<SignupPage />} ></Route> */}
      <Route path="/layout" element={details? 
                <Layout /> : <LoginPage />}></Route>
      <Route path="/*" element={<div>Error! Page Not Found</div>} ></Route>
    </Routes>
  );
}

export default App;
