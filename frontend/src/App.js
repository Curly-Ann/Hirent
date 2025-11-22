import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OwnerSignup from "./pages/auth/OwnerSignup";
import OwnerSetup from "./pages/auth/OwnerSetup";
import BrowseRentals from "./pages/home/navbar/BrowseRentals";
import ProductDetails from './pages/ProductDetails';
import AboutPage from './pages/AboutPage';
import Cart from "./pages/home/navbar/Cart";
import Wishlist from "./pages/home/navbar/Wishlist";
import MyRentals from "./pages/home/sidebar/MyRentals";
import MainLayout from "./components/layouts/MainLayout";


// Owner Dashboard Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddItem from "./pages/owner/AddItem";
import OwnerProfile from "./pages/owner/OwnerProfile";

import "leaflet/dist/leaflet.css";
// index.js or App.js
import { generateFakeToken } from "./utils/fakeAuth";

if (!localStorage.getItem("fakeToken")) {
  const token = generateFakeToken();
  localStorage.setItem("fakeToken", token);
  console.log("Fake token generated for dev:", token);
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ownersignup" element={<OwnerSignup/>} />
          <Route path="/ownersetup" element={<OwnerSetup />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/add-item" element={<AddItem />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />
          

          <Route element={<MainLayout />}>
            <Route path="/browse" element={<BrowseRentals />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/how-it-works" element={<div></div>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/my-rentals" element={<MyRentals/>} />
            <Route path="/owner" element={<OwnerDashboard />} />
        
            
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;