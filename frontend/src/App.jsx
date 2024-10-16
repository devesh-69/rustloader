import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { RefreshHandler } from "./components/RefreshHandler";
import NavBar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/CustomerLogin/Login";
import Home from "./components/Home/home";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";
import Vehicles from "./components/Vehicles/vehicles";
import FAQs from "./components/FAQ/faq";
import OwnerPage from "./components/Owners/owner";
import CheckOutPage from "./components/CheckOutPage/CheckOut";
import SignUp from "./components/CustomerLogin/SignUp";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/owners" element={<OwnerPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/checkout/:id" element={<CheckOutPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
