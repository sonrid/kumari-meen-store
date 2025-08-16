import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import OrderHistory from "./pages/OrderHistory";

import "./App.css";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const PrivateRoute = ({ authUser, authLoaded, children }) => {
  const location = useLocation();
  if (!authLoaded) {
    return <div>Loading...</div>;
  }
  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Auth state and loading flag
  const [authUser, setAuthUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthLoaded(true);
    });
    return unsubscribe;
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const found = prevCart.find((item) => item.id === product.id);
      if (found) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleOrderComplete = () => {
    alert("Thank you for your order!");
    setCart([]);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // While auth is loading, show a spinner or blank
  if (!authLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar authUser={authUser} cart={cart} logout={logout} />
      <Routes>
        <Route path="/" element={<Shop addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute authUser={authUser} authLoaded={authLoaded}>
              <Checkout cart={cart} onOrderComplete={handleOrderComplete} />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute authUser={authUser} authLoaded={authLoaded}>
              <OrderHistory authUser={authUser} />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
