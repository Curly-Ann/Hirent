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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
        <AddNewItemForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
    </div>
  );
}
