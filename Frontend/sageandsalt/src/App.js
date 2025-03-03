import React, { useState, useEffect  } from "react";
import { Route, Routes, BrowserRouter, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { AboutSection } from "./components/about";
import { Menu } from "./components/menu";
import { Specials } from "./components/specials";
import { Events } from "./components/events";
import { Reservation } from "./components/reservetable";
import { CustomerReviews } from "./components/reviews";
import { CartPage } from "./components/viewcart";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { CartProvider } from "./components/CartContext";
import { ViewOrders } from "./components/vieworders";
import { ViewReservations } from "./components/viewreservations";
import { Profile } from './components/profile';
import { Contact } from './components/contact';
import { Footer } from './components/footer';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  function ScrollToTop() {
    const { pathname, hash } = useLocation();
  
    useEffect(() => {
      if (hash) {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, [pathname, hash]);
  
    return null;
  }
  return (
    <BrowserRouter>
    <ScrollToTop />
      <CartProvider>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/login" element={<Login onSubmit={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Hero />
                  <AboutSection id="about" />
                  <Menu id="menu" />
                  <Specials id="specials" />
                  <Events id="events" />
                  <Reservation id="reservation" />
                  <CustomerReviews id="reviews" />
                  <Contact id="contact" />
                  <Footer />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/cart"
            element={
              isAuthenticated ? <CartPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/orders"
            element={isAuthenticated ? <ViewOrders /> : <Navigate to="/login" />}
          />
          <Route
            path="/reservations"
            element={isAuthenticated ? <ViewReservations /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;




