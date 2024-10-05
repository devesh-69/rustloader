import React, { useState } from "react";
import NavBar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/home";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";
import Vehicles from "./components/Vehicles/vehicles";
import FAQs from "./components/FAQ/faq";
import OwnerPage from "./components/Owners/owner";
import CheckOutPage from "./components/CheckOutPage/CheckOut";
import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/CustomerLogin/signUp";
import Login from "./components/CustomerLogin/login";
// import { RefreshHandler } from "./components/RefreshHandler";

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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />;
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/about",
      element: (
        <Layout>
          <About />
        </Layout>
      ),
    },
    {
      path: "/contact",
      element: (
        <Layout>
          <Contact />
        </Layout>
      ),
    },
    {
      path: "/vehicles",
      element: (
        <Layout>
          <Vehicles />
        </Layout>
      ),
    },
    {
      path: "/faqs",
      element: (
        <Layout>
          <FAQs />
        </Layout>
      ),
    },
    {
      path: "/owners",
      element: (
        <Layout>
          <OwnerPage />
        </Layout>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Layout>
          {/* <PrivateRoute element={<CheckOutPage />} /> */}
          <CheckOutPage />
        </Layout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: "/signUp",
      element: (
        <Layout>
          <SignUp />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
  ]);

  return (
    <RouterProvider router={router}>
      {/* <RefreshHandler setIsAuthenticated={setIsAuthenticated} /> */}
    </RouterProvider>
  );
}

export default App;
