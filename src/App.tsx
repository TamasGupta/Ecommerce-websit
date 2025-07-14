import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import UserProfile from "./pages/user/userProfile";
import EditProfile from "./pages/user/editUserProfile";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
