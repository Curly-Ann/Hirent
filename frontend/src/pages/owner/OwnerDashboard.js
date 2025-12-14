import React, { useState, useEffect, useContext, useMemo } from "react";
import { makeAPICall, ENDPOINTS } from "../../config/api";
import { Search, Bell, Download, ChevronDown, Eye } from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import totalBookingsIcon from "../../assets/icons/total.svg";
import activeRentalsIcon from "../../assets/icons/active.svg";
import pendingBookingsIcon from "../../assets/icons/pending.svg";
import totalEarningsIcon from "../../assets/icons/earnings.svg";

import AnimatedWelcome from "../../components/AnimatedWelcome";

import Sidebar from "../../components/layouts/OwnerSidebar";
import DropdownPortal from "../../components/button/DropdownPortal";

import Stats from "../../components/ownerdashboard/Stats";
import RevenueStats from "../../components/ownerdashboard/RevenueStats";
import Booking from "../../components/ownerdashboard/Booking";
import BookingTable from "../../components/ownerdashboard/BookingTable";

import { AuthContext } from "../../context/AuthContext"; // ⭐ NEW — to use real user data

export default function OwnerDashboard() {
  const { user } = useContext(AuthContext); // ⭐ get logged-in owner
  
  // Memoize ownerId to prevent unnecessary re-fetches
  const ownerId = useMemo(() => user?.id, [user?.id]);

  // --------------------------------------------
  // ⚠️ Fallback avatar if the user has none
  // --------------------------------------------
  const avatar =
    user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name;

  // Dashboard State
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const downloadButtonRef = React.useRef(null);
  const dashboardRef = React.useRef(null);
  const [revenuePeriod, setRevenuePeriod] = useState("week");

  // ==================================================
  // FETCH REAL OWNER DATA (NO MOCK DATA ANYWHERE)
  // ==================================================
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!ownerId) return; // wait for user load

      setLoading(true);
      setError(null);

      try {
        const [bookingsResponse, listingsData] = await Promise.all([
          makeAPICall(ENDPOINTS.BOOKINGS.OWNER_BOOKINGS),
          makeAPICall(ENDPOINTS.ITEMS.BY_OWNER(ownerId)), // ⭐ REAL OWNER LISTINGS
        ]);

        setBookings(bookingsResponse?.data && Array.isArray(bookingsResponse.data) ? bookingsResponse.data : []);
        setListings(Array.isArray(listingsData) ? listingsData : []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [ownerId]);

  // ==================================================
  // REAL STATS — based on backend data
  // ==================================================
  const now = new Date();

  // Total Listings — count items created in the last month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const recentListingsCount = listings.filter(
    (item) => new Date(item.createdAt) >= oneMonthAgo
  ).length;

  // Active Rentals — count bookings ending in the next 2 days
  const activeRentals = bookings.filter((b) =>
    ["approved", "completed"].includes(b.status)
  );
  const endingSoonCount = activeRentals.filter((b) => {
    if (!b.endDate) return false;
    const end = new Date(b.endDate);
    const diffDays = (end - now) / (1000 * 60 * 60 * 24);
    return diffDays <= 2 && diffDays >= 0;
  }).length;

  // Pending Bookings
  const pendingBookings = bookings.filter((b) => b.status === "pending");

  // Earnings This Month
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const earningsThisMonth = bookings
    .filter((b) => new Date(b.createdAt) >= firstDayOfMonth)
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Earnings last month for percentage
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  const earningsLastMonth = bookings
    .filter(
      (b) =>
        new Date(b.createdAt) >= lastMonthStart &&
        new Date(b.createdAt) <= lastMonthEnd
    )
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const earningsChange = earningsLastMonth
    ? ((earningsThisMonth - earningsLastMonth) / earningsLastMonth) * 100
    : 0;

  const stats = [
    {
      label: "Total Listings",
      value: listings.length,
      sublabel: `+${recentListingsCount} this month`,
      sublabelColor: "text-green-500",
      icon: totalBookingsIcon,
    },
    {
      label: "Active Rentals",
      value: activeRentals.length,
      sublabel: endingSoonCount
        ? `${endingSoonCount} ending soon`
        : "No rentals ending soon",
      sublabelColor: endingSoonCount > 0 ? "text-red-500" : "text-gray-500",
      icon: activeRentalsIcon,
    },
    {
      label: "Pending Bookings",
      value: pendingBookings.length,
      sublabel:
        pendingBookings.length > 0
          ? `+${pendingBookings.length} pending`
          : "No pending bookings",
      sublabelColor:
        pendingBookings.length > 0 ? "text-yellow-500" : "text-gray-500",
      icon: pendingBookingsIcon,
    },
    {
      label: "Earnings This Month",
      value: `₱ ${earningsThisMonth.toLocaleString()}`,
      sublabel: earningsChange
        ? `${earningsChange > 0 ? "+" : ""}${earningsChange.toFixed(
            0
          )}% from last month`
        : "No change from last month",
      sublabelColor: earningsChange >= 0 ? "text-green-500" : "text-red-500",
      icon: totalEarningsIcon,
    },
  ];

  // --------------------------------------------
  // ACTION DROPDOWN
  // --------------------------------------------
  const ActionsDropdown = ({ booking }) => {
    return (
      <button
        onClick={() => console.log("View booking", booking._id)}
        className="w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-gray-100 transition"
      >
        <Eye className="w-4 h-4 text-gray-600" />
      </button>
    );
  };

  // --------------------------------------------
  // CSV EXPORT
  // --------------------------------------------
  const exportToCSV = () => {
    const statsHeader = ["Stat", "Value"];
    const statsRows = stats.map((s) => [s.label, s.value]);

    const revenueRows = [
      ["This Month", bookings.reduce((s, b) => s + (b.totalPrice || 0), 0)],
    ];

    const bookingsRows = bookings.map((b) => [
      b._id?.slice(0, 8),
      b.itemId?.title || "Unknown",
      b.userId?.name || "Unknown",
      "₱ " + (b.totalAmount || 0).toLocaleString(),
      b.status,
    ]);

    const csv = [
      ["DASHBOARD STATS"],
      statsHeader,
      ...statsRows,
      [],
      ["REVENUE STATS"],
      ["Period", "Amount"],
      ...revenueRows,
      [],
      ["BOOKINGS"],
      ["ID", "Item", "Renter", "Total", "Status"],
      ...bookingsRows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dashboard.csv";
    link.click();
  };

  // --------------------------------------------
  // PDF EXPORT
  // --------------------------------------------
  const exportDashboardToPDF = () => {
    const doc = new jsPDF();
    let y = 15;

    doc.text("Dashboard Stats", 14, y);
    y += 10;
    stats.forEach((s) => {
      doc.text(`${s.label}: ${s.value}`, 14, y);
      y += 7;
    });

    y += 5;
    doc.text("Bookings", 14, y);
    y += 5;

    const tableRows = bookings.map((b) => [
      b._id?.slice(0, 8),
      b.itemId?.title,
      b.userId?.name,
      "₱ " + (b.totalAmount || 0).toLocaleString(),
      b.status,
    ]);

    autoTable(doc, {
      startY: y + 5,
      head: [["ID", "Item", "Renter", "Total", "Status"]],
      body: tableRows,
      styles: { fontSize: 10 },
    });

    doc.save("dashboard.pdf");
  };

  return (
    <div className="pl-60 flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main ref={dashboardRef} className="collection-scale flex-1 py-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center bg-white text-purple-900 px-4 py-2 rounded-xl shadow-sm border max-w-sm w-full">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              placeholder="Search"
              className="ml-2 w-full bg-transparent focus:outline-none text-sm text-gray-700"
            />
          </div>

          <div className="flex items-center gap-5">
            <Bell className="w-5 h-5 text-gray-600" />

            {/* REAL USER DATA - NO MOCK */}
            <div className="flex items-center gap-2">
              <img
                src={avatar}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {user?.name || "Owner"}
                </p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-5" />

        {/* TITLE + DOWNLOAD */}
        <div className="flex justify-between items-center mb-4">
          <AnimatedWelcome name={user?.name || "Owner"} />

          <div className="relative inline-block text-left">
            <button
              ref={downloadButtonRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-[#7A1CA9] text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <Download className="w-4 h-4" />
              Download
              <ChevronDown className="w-4 h-4" />
            </button>

            <DropdownPortal open={dropdownOpen} buttonRef={downloadButtonRef}>
              <button
                onClick={exportToCSV}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                Download CSV
              </button>
              <button
                onClick={exportDashboardToPDF}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                Download PDF
              </button>
            </DropdownPortal>
          </div>
        </div>

        {/* STATS */}
        <Stats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Left column - Revenue chart */}
          <RevenueStats
            revenuePeriod={revenuePeriod}
            setRevenuePeriod={setRevenuePeriod}
          />

          {/* Right column - Booking schedule */}
          <Booking bookings={bookings} />
        </div>

        {/* BOOKINGS TABLE */}
        {loading ? (
          <div className="bg-white p-8 rounded-xl text-center">
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-8 rounded-xl text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <BookingTable bookings={bookings} ActionsDropdown={ActionsDropdown} />
        )}
      </main>
    </div>
  );
}
