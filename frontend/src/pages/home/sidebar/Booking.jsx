import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import { Calendar, MapPin, MessageCircle, Eye, ClockFading, CircleCheckBig, CircleOff } from "lucide-react";
import mockListings from "../../../data/mockData";
import sampleUserCart from "../../../data/sampleUserCart";
import { getFakeUser, generateFakeToken } from "../../../utils/fakeAuth";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    let user = getFakeUser();

    if (!user) {
      const token = generateFakeToken();
      localStorage.setItem("fakeToken", token);
      user = getFakeUser();
    }

    // Merge user's cart with product details
    const mergedBookings = (user.cart?.length ? user.cart : sampleUserCart)
      .map((r) => {
        const product = mockListings.find((p) => p.id === r.id);
        if (!product) return null;

        const price = parseFloat(product.price.toString().replace(/[^0-9.]/g, ""));
        return {
          ...r,
          ...product,
          price,
          totalAmount: price * (r.days || 1),
          status: r.status || (!r.bookedFrom || !r.bookedTo ? "cancelled" : "pending"),
        };
      })
      .filter(Boolean);

    setBookings(mergedBookings);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfb]">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
          <p className="text-gray-500 mb-6">View and manage your booked items.</p>

          {bookings.length === 0 ? (
            <div className="text-center mt-20 text-gray-500">
              No bookings found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => {
                const durationDays = booking.bookedFrom && booking.bookedTo
                  ? Math.ceil((new Date(booking.bookedTo) - new Date(booking.bookedFrom)) / (1000 * 60 * 60 * 24))
                  : 0;

                return (
                  <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    {/* Status */}
                    <span
                      className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        booking.status === "approved"
                          ? "bg-purple-100 text-purple-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status === "approved" && <CircleCheckBig className="w-3 h-3" />}
                      {booking.status === "pending" && <ClockFading className="w-3 h-3" />}
                      {booking.status === "cancelled" && <CircleOff className="w-3 h-3" />}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>

                    <div className="flex gap-5">
                      {/* Image */}
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img src={booking.image} alt={booking.name} className="w-28 h-28 object-cover rounded-xl" />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="text-lg font-semibold">{booking.name}</h2>
                          <span className="text-xs px-1 bg-gray-200 text-gray-700 rounded-md border">{booking.category}</span>
                        </div>

                        <p className="text-sm text-gray-600">Listed by {booking.owner}</p>

                        <div className="mt-3 mb-3 flex items-center gap-10 text-sm text-gray-800">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 opacity-60" />
                              {booking.bookedFrom ? new Date(booking.bookedFrom).toLocaleDateString() : "-"} – {booking.bookedTo ? new Date(booking.bookedTo).toLocaleDateString() : "-"}
                            </div>
                            {durationDays > 0 && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <ClockFading className="w-4 h-4 opacity-60" />
                                {durationDays} day{durationDays > 1 ? "s" : ""}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 opacity-60" />
                            {booking.location || "Unknown"}
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex items-center gap-12">
                            <div>
                              <p className="text-sm text-gray-500">Rent per day</p>
                              <p className="font-medium text-[18px] text-gray-800">₱{booking.price}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total amount</p>
                              <p className="font-medium text-[18px] text-gray-800">₱{booking.totalAmount}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button className="px-3 py-1.5 text-sm border rounded-lg flex items-center gap-1 hover:bg-gray-50">
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button className="px-3 py-1.5 text-sm border rounded-lg flex items-center gap-1 hover:bg-gray-50">
                            <MessageCircle className="w-4 h-4" />
                            Message Owner
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
