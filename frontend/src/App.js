import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Owner Dashboard pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AddItem from './pages/owner/AddItem';
import OwnerProfile from './pages/owner/OwnerProfile'; // Updated import

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Owner Dashboard Routes */}
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/add-item" element={<AddItem />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
