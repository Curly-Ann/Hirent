// src/pages/owner/AddItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layouts/OwnerSidebar';
import AddNewItemForm from '../../components/forms/AddNewItemForm';

export default function AddItem() {
  const navigate = useNavigate();

  const handleSubmit = async (formData, images) => {
    console.log('Form Data:', formData);
    console.log('Images:', images);

    // TODO: Add your API call here to submit the new item
    navigate('/ownerdashboard');
  };

  const handleCancel = () => {
    navigate('/ownerdashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-50">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto ml-64">
        <main className="cart-scale pt-12 max-w-7xl mx-auto">
          <AddNewItemForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </main>
      </div>

    </div>
  );
}
