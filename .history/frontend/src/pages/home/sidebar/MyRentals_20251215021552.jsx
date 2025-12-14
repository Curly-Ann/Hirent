import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, AlertTriangle, Loader, ShoppingBag } from "lucide-react";
import CancelConfirmationModal from "../../../components/modals/CancelModal";
import { ViewDetailsModal } from "../../../components/modals/ViewDetailsModal";
import RentalSummary from "../../../components/cards/RentalSummary";
import SortDropdown from "../../../components/dropdown/SortDropdown";
import RentalCard from "../../../components/cards/MyRentalsCard";
import { AuthContext } from "../../../context/AuthContext";
import { makeAPICall, ENDPOINTS } from "../../../config/api";

const MyRentalsPage = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Hirent — My Rentals";
    return () => {
      document.title = "Hirent";
    };
  }, []);

  const fetchRentals = async () => {
    if (!user || !token) {
      setError("You must be logged in to view your rentals.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await makeAPICall(ENDPOINTS.BOOKINGS.GET_MY, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.success && Array.isArray(response.data)) {
        setRentals(response.data);
      } else {
        setError(response.msg || "Failed to fetch rentals.");
      }
    } catch (err) {
      setError("An error occurred while fetching your rentals.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [user, token]);

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;

    try {
      const response = await makeAPICall(
        ENDPOINTS.BOOKINGS.CANCEL(selectedBookingId),
        { method: "PUT" }
      );

      if (response.success) {
        setRentals((prev) =>
          prev.map((r) =>
            r._id === selectedBookingId ? { ...r, status: "cancelled" } : r
          )
        );
      } else {
        console.error("Failed to cancel booking:", response.msg);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setShowCancelModal(false);
      setSelectedBookingId(null);
    }
  };

  const filteredRentals = rentals.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const sortedRentals = [...filteredRentals].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="flex min-h-screen px-4 md:px-6 lg:px-8">
      <div className="w-[560px] pl-16 flex-shrink-0 sticky top-10 self-start h-fit bg-gray-50 border-r border-gray-200">
        <div className="flex items-center justify-between mb-3 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go back
          </button>
        </div>

        <div className="flex items-start gap-4 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
            <Package className="w-8 h-8 text-[#a12fda]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-purple-900 mt-1">
              My Rentals
            </h1>
            <p className="text-gray-500 text-sm mr-4">
              View and manage your booked items
            </p>
          </div>
          <div className="mt-4">
            <SortDropdown
              options={["Latest", "Oldest"]}
              onSortChange={(value) => setSortOrder(value.toLowerCase())}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 mr-5">
          {["all", "approved", "pending", "cancelled", "completed"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 py-1 rounded-lg text-[13px] transition ${
                filter === cat
                  ? "bg-[#7A1CA9] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#7A1CA9]/10"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)} (
              {
                rentals.filter((r) => (cat === "all" ? true : r.status === cat))
                  .length
              }
              )
            </button>
          ))}
        </div>

        <RentalSummary rentals={rentals} />

        <div className="bg-purple-100 p-4 mt-3 mb-10 mr-5 rounded-lg text-purple-700 text-[13px]">
          <ul className="space-y-1">
            <li>✓ View and manage all your booked items in one place</li>
            <li>✓ Keep track of rental status</li>
            <li>✓ Get notified of updates and messages from owners</li>
          </ul>
        </div>
      </div>

      <div className="flex-1 pl-6 pb-20 pt-10">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin text-purple-600" size={48} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-red-600">
            <AlertTriangle size={48} className="mb-4" />
            <p className="text-center">{error}</p>
          </div>
        ) : sortedRentals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {sortedRentals.map((booking) => (
              <RentalCard
                key={booking._id}
                item={booking} // Pass the whole booking object
                onViewDetails={() => {
                  setSelectedBookingId(booking._id);
                  setDetailsModalOpen(true);
                }}
                onCancel={() => {
                  setSelectedBookingId(booking._id);
                  setShowCancelModal(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full pt-20">
            <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-6 rounded-2xl mb-6">
              <ShoppingBag size={64} className="text-[#7A1CA9]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">No Rentals Yet</h2>
            <p className="text-gray-600 text-sm mb-8 max-w-sm text-center">
              You haven't rented any items yet. Start exploring and find something amazing to rent!
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="flex items-center gap-2 px-6 py-3 bg-[#7A1CA9] text-white font-semibold rounded-xl hover:bg-[#6a1894] transition shadow-lg"
            >
              <ShoppingBag size={20} />
              Book Now
            </button>
          </div>
        )}
      </div>

      <CancelConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelBooking}
      />

      <ViewDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        bookingId={selectedBookingId} // Pass bookingId instead of itemId
      />
    </div>
  );
};

export default MyRentalsPage;