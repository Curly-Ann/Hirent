import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OwnerInformation from "./pages/auth/Owner_Information";
import OwnerSubmission from "./pages/auth/Owner_Submission";
import Onboarding1 from "./pages/onboarding/Onboarding1";
import Onboarding2 from "./pages/onboarding/Onboarding2";
import Onboarding3 from "./pages/onboarding/Onboarding3";
import Onboarding4 from "./pages/onboarding/Onboarding4";
import OnboardingLayout from "./layouts/OnboardingLayout";
import BrowseRentals from "./pages/home/BrowseRentals";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner-information" element={<OwnerInformation />} />
        <Route path="/owner-submission" element={<OwnerSubmission />} />

        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          <Route path="/onboarding3" element={<Onboarding3 />} />
          <Route path="/onboarding4" element={<Onboarding4 />} />
        </Route>
        <Route path="/browse" element={<BrowseRentals />} />
      </Routes>
    </Router>
  );
}

export default App;