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
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import MainNav from "./components/layouts/MainNav";
import Navbar from "./components/layouts/Navbar";
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
import Collection from "./pages/home/navbar/Collection";
import Wishlist from "./pages/home/navbar/Wishlist";
import AboutPage from "./pages/home/navbar/AboutPage";
import { HowItWorksSection } from "./pages/home/navbar/HowItWorks";
import NotificationsPage from "./pages/notifications/NotificationsPage";

import ProductDetails from './pages/ProductDetails';

//pages from sidebar
import MyRentals from "./pages/home/sidebar/MyRentals";
import Booking from './pages/home/sidebar/Booking';
import Messages from './pages/home/sidebar/Messages';
import Account from './pages/home/sidebar/Account';

// owner dashboard
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddItem from "./pages/owner/AddItem";
import MyListings from './pages/owner/MyListings';
import OwnerBookingsDashboard from './pages/owner/OwnerBookingsDashboard';
import OwnerEarnings from "./pages/owner/OwnerEarnings"; 
import OwnerProfile from "./pages/owner/OwnerProfile";

//map css
import "leaflet/dist/leaflet.css";

import { ThemeProvider } from "./context/ThemeContext";

import { motion } from "framer-motion";

if (!localStorage.getItem("fakeToken")) {
  const token = generateFakeToken();
  localStorage.setItem("fakeToken", token);
  console.log("Fake token generated for dev:", token);
}

function LandingPage() {
  const { isLoggedIn } = useContext(AuthContext);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="App">
      {/* Switch navbar based on login state */}
      {isLoggedIn ? <Navbar /> : <MainNav />}

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <HeroSection />
      </motion.section>
      
      {/* Other landing page sections */}
      <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <FeaturedCategories />
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <BrowseItems />
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <HowItWorks />
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <WhyChoose />
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <Testimonials />
      </motion.section>

      <Footer />
    </div>
  );
}

function App() {
  return (

    <AuthProvider>
      <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ownersignup" element={<OwnerSignup />} />
          <Route path="/ownersetup" element={<OwnerSetup />} />

          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/add-item" element={<AddItem />} />
          <Route path="/owner/my-listings" element={<MyListings />} />
          <Route path="/owner/bookings" element={<OwnerBookingsDashboard />} />
          <Route path="/owner/earnings" element={<OwnerEarnings />} />
          <Route path="/owner/profile" element={<OwnerProfile />} />
          
          <Route element={<MainLayout />}>
            <Route path="/browse" element={<BrowseRentals />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksSection />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            <Route path="/my-rentals" element={<MyRentals />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/chat" element={<Messages />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
