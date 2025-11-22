import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layouts/OwnerSidebar";
import { mockDashboardStats, mockListings } from "../../data/mockData";

// Stats Data with Updated Icons
const stats = [
  {
    label: "Total Listings",
    value: mockDashboardStats.totalListings,
    sublabel: mockDashboardStats.listingsChange,
    icon: "/assets/icons/listing1.png",
    iconBg: "bg-purple-600",
    sublabelColor: "text-green-600",
  },
  {
    label: "Active Rentals",
    value: mockDashboardStats.activeRentals,
    sublabel: mockDashboardStats.activeRentalsSubtext,
    icon: "/assets/icons/calendar.png",
    iconBg: "bg-purple-600",
    sublabelColor: "text-red-600",
  },
  {
    label: "Pending Bookings",
    value: mockDashboardStats.pendingBookings,
    sublabel: mockDashboardStats.pendingBookingsSubtext,
    icon: "/assets/icons/bookings1.png",
    iconBg: "bg-purple-600",
    sublabelColor: "text-orange-500",
  },
  {
    label: "Earnings This Month",
    value: mockDashboardStats.earnings,
    sublabel: mockDashboardStats.earningsChange,
    icon: "/assets/icons/dollar1.png",
    iconBg: "bg-purple-600",
    sublabelColor: "text-green-600",
  },
];

// Actions Dropdown Component - NO EMOJIS
const ActionsDropdown = ({ listing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log('Edit listing:', listing);
    navigate(`/owner/edit-item/${listing.id}`);
    setIsOpen(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${listing.name}"?`);
    if (confirmDelete) {
      console.log('Delete listing:', listing);
    }
    setIsOpen(false);
  };

  const handleView = () => {
    console.log('View listing:', listing);
    navigate(`/owner/listing/${listing.id}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 font-bold text-xl focus:outline-none"
      >
        ⋮
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              <button
                onClick={handleView}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Details
              </button>
              <button
                onClick={handleEdit}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function OwnerDashboard() {
  const navigate = useNavigate();

  const handleAddListing = () => {
    navigate('/add-item');
  };

  const exportToCSV = () => {
    const headers = ["Item Name", "Category", "Price", "Availability", "Booked Dates", "Status"];
    const csvData = mockListings.map(listing => [
      listing.name,
      listing.category,
      listing.price,
      listing.availability,
      listing.bookedDates,
      listing.status
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-listings.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    let pdfContent = "MY LISTINGS\n\n";
    pdfContent += "Item Name | Category | Price | Availability | Booked Dates | Status\n";
    pdfContent += "=".repeat(80) + "\n";

    mockListings.forEach(listing => {
      pdfContent += `${listing.name} | ${listing.category} | ${listing.price} | ${listing.availability} | ${listing.bookedDates} | ${listing.status}\n`;
    });

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-listings.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Rented":
        return "bg-blue-100 text-blue-700";
      case "Available":
        return "bg-green-100 text-green-700";
      case "Unavailable":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Inactive":
        return "bg-gray-400 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
     <div className="fixed top-0 left-0 h-full w-64 z-50">
    <Sidebar />
  </div>
  <div className="flex-1 overflow-y-auto">
     <main className="cart-scale flex-1 ml-60 pt-12 max-w-7xl mx-auto">
        <div className="text-gray-400 text-xs mb-2">My Dashboard</div>
        <h2 className="text-2xl font-bold mb-1">
          Hello, <span className="text-black">Genlord!</span>
        </h2>
        <div className="text-gray-500 mb-8 text-base">
          Your hub to add, edit, and monitor all your listings and rental activity
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                  <img src={stat.icon} alt={stat.label} className="w-6 h-6" />
                </span>
              </div>
              <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
              <div className={`text-xs font-medium ${stat.sublabelColor}`}>{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {mockListings.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">My Listings</h2>
                <p className="text-sm text-gray-500">Manage all your rental items</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={exportToCSV}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/128/3502/3502477.png" 
                    alt="CSV" 
                    className="w-4 h-4" 
                  />
                  CSV
                </button>
                <button 
                  onClick={exportToPDF}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/128/7180/7180363.png" 
                    alt="PDF" 
                    className="w-4 h-4" 
                  />
                  PDF
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Availability</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Booked Dates</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden p-1">
                            <img 
                              src={listing.image} 
                              alt={listing.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{listing.name}</p>
                            <p className="text-xs text-gray-500">{listing.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-purple-600">{listing.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg ${getAvailabilityColor(listing.availability)}`}>
                          {listing.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{listing.bookedDates}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ActionsDropdown listing={listing} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t flex justify-center">
              <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">View all</button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl py-12 px-8 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-transparent flex items-center justify-center mb-4">
              <img src="/assets/bg/circle.png" alt="Empty state" className="w-32 h-32 rounded-full opacity-60" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center text-gray-900">
              Aw, you still don't have items
            </h3>
            <p className="text-gray-500 text-center mb-4 max-w-md">
              Your hub to add, edit, and monitor all your listings and rental activity
            </p>
            <button 
              onClick={handleAddListing}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Add a New Listing +
            </button>
          </div>
        )}
      </main>
      </div>
    </div>
  );
}
