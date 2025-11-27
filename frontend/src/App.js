import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layouts/MainLayout";

//fake user
import { generateFakeToken } from "./utils/fakeAuth";

//auth
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OwnerSignup from "./pages/auth/OwnerSignup";
import OwnerSetup from "./pages/auth/OwnerSetup";

//main layout
import Navbar from "./components/layouts/MainNav";
import Footer from "./components/layouts/Footer";

//homepage
import HeroSection from "./components/home/HeroSection";
import FeaturedCategories from "./components/home/FeaturedCategories";
import HowItWorks from "./components/home/HowItWorks";
import BrowseItems from './components/items/BrowseItems';
import WhyChoose from "./components/home/WhyChoose";
import Testimonials from "./components/home/Testimonials";

//main pages from navbar
import BrowseRentals from "./pages/home/navbar/BrowseRentals";
import Cart from "./pages/home/navbar/Cart";
import Wishlist from "./pages/home/navbar/Wishlist";
import AboutPage from "./pages/home/navbar/AboutPage";

import ProductDetails from './pages/ProductDetails';

//pages from sidebar
import MyRentals from "./pages/home/sidebar/MyRentals";
import Booking from './pages/home/sidebar/Booking';

// owner dashboard
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddItem from "./pages/owner/AddItem";
import OwnerProfile from "./pages/owner/OwnerProfile";

//map css
import "leaflet/dist/leaflet.css";

if (!localStorage.getItem("fakeToken")) {
  const token = generateFakeToken();
  localStorage.setItem("fakeToken", token);
  console.log("Fake token generated for dev:", token);
}

function LandingPage() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <FeaturedCategories />
      <BrowseItems />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </div>
  );
}

function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ownersignup" element={<OwnerSignup />} />
          <Route path="/ownersetup" element={<OwnerSetup />} />

          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/add-item" element={<AddItem />} />
          <Route path="/owner/profile" element={<OwnerProfile />} />

          <Route element={<MainLayout />}>
            <Route path="/browse" element={<BrowseRentals />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<div></div>} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/my-rentals" element={<MyRentals />} />
            <Route path="/booking" element={<Booking />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
