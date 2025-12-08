import React, { useState, useEffect } from "react";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";

import {
  Search,
  MapPin,
  CalendarDays,
  ChevronUp,
  Filter,
  Download,
  Plus,
  Hash,
  TrendingUp,
  Eye,
  Clock,
  Package,
} from "lucide-react";

import { CircleCheck, CheckCheck, Ban } from "lucide-react";

import RentalHistoryPanel from "../../components/listings/RentalHistoryPanel";
import EditItemModal from "../../components/listings/EditItemModal";
import DeleteConfirmModal from "../../components/listings/DeleteConfirmModal";
import ItemPageModal from "../../components/listings/ItemPageModal";
import ItemActionsMenu from "../../components/listings/ItemActionsMenu";
import { API_URL, ENDPOINTS } from "../../config/api";

// ---------------------------------------------------------------------------
//  HARD CODED LISTINGS (original sample data preserved)
// ---------------------------------------------------------------------------
const HARD_CODED_LISTINGS = [
  {
    id: 1,
    productId: "PRD-2024-001",
    name: "RGB Gaming Keyboard",
    category: "Electronics",
    price: 150,
    availability: "Rented",
    status: "Active",
    image: "/assets/items/Keyboard.png",
    rented: true,
    renter: "Jonathan Reyes",
    dates: "Feb 20–25, 2025",
    location: "Davao City",
    condition: "Good",
    description: "Mechanical RGB keyboard with hot-swappable switches.",
    securityDeposit: 300,
    itemOptions: ["USB Cable", "High Resolution"],
    views: 234,
    totalBookings: 12,
    revenue: 1800,
    history: [
      { renter: "Jonathan Reyes", dates: "Feb 20–25, 2025", status: "Returned", notes: "Smooth transaction." },
      { renter: "Carla Mendez", dates: "Jan 10–15, 2025", status: "Returned" },
    ],
  },

  {
    id: 2,
    productId: "PRD-2024-002",
    name: "Gucci Duffle Bag",
    category: "Bags",
    price: 250,
    availability: "Available",
    status: "Active",
    image: "/assets/items/gucci_duffle_bag.png",
    rented: false,
    location: "Tagum City",
    condition: "Like New",
    description: "Luxury duffle bag made of premium leather.",
    securityDeposit: 500,
    itemOptions: ["Waterproof"],
    views: 456,
    totalBookings: 8,
    revenue: 2000,
    history: [
      { renter: "Maria Santos", dates: "Mar 3–6, 2025", status: "Returned" },
    ],
  },

  {
    id: 3,
    productId: "PRD-2024-003",
    name: "IPS LCD Monitor",
    category: "Electronics",
    price: 200,
    availability: "Unavailable",
    status: "Inactive",
    image: "/assets/items/IPS_lcd.png",
    rented: false,
    neverRented: true,
    location: "Panabo City",
    condition: "Fair",
    description: "Color-accurate IPS panel monitor perfect for editing.",
    securityDeposit: 200,
    itemOptions: ["Extra Battery"],
    views: 89,
    totalBookings: 0,
    revenue: 0,
    history: [],
  },

  {
    id: 4,
    productId: "PRD-2024-004",
    name: "Gaming Laptop i7",
    category: "Computers",
    price: 350,
    availability: "Available",
    status: "Active",
    image: "/assets/items/laptop.png",
    rented: false,
    location: "Davao City",
    condition: "Like New",
    description: "High-performance gaming laptop with RTX graphics.",
    securityDeposit: 700,
    itemOptions: ["Charger Included"],
    views: 678,
    totalBookings: 15,
    revenue: 5250,
    history: [
      { renter: "Alex Torres", dates: "Jan 2–6, 2025", status: "Returned" },
      { renter: "Ralph Lim", dates: "Dec 15–18, 2024", status: "Overdue", notes: "Late by 1 day." },
    ],
  },

  {
    id: 5,
    productId: "PRD-2024-005",
    name: "Havit Gaming Headset",
    category: "Electronics",
    price: 120,
    availability: "Rented",
    status: "Active",
    image: "/assets/items/havit_hv.png",
    rented: true,
    renter: "Maria Santos",
    dates: "Mar 3–6, 2025",
    location: "Davao del Norte",
    condition: "Good",
    description: "Surround-sound RGB gaming headset with mic.",
    securityDeposit: 200,
    itemOptions: ["USB Cable"],
    views: 345,
    totalBookings: 10,
    revenue: 1200,
    history: [
      { renter: "Maria Santos", dates: "Mar 3–6, 2025", status: "Returned" },
      { renter: "Darren Lum", dates: "Feb 1–4, 2025", status: "Returned" },
    ],
  },

  {
    id: 6,
    productId: "PRD-2024-006",
    name: "RGB Liquid CPU Cooler",
    category: "PC Parts",
    price: 180,
    availability: "Available",
    status: "Active",
    image: "/assets/items/RGB_liquid_CPU.png",
    rented: false,
    location: "Tagum City",
    condition: "Like New",
    description: "High-end liquid cooler for gaming PCs.",
    securityDeposit: 400,
    itemOptions: ["Mount Kit Included"],
    views: 123,
    totalBookings: 0,
    revenue: 0,
    history: [],
  },
];

export default function MyListings() {
  // UI states
  const [expanded, setExpanded] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterAvailability, setFilterAvailability] = useState("All");

  // Modals & panels
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewPageModal, setViewPageModal] = useState(null);
  const [historyPanel, setHistoryPanel] = useState(null);

  // Listings = Merged (hardcoded + backend)
  const [listings, setListings] = useState(HARD_CODED_LISTINGS);

  // ---------------------------------------------------------------------------
  // LOAD BACKEND DATA + MERGE WITH HARDCODED FALLBACK
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function loadBackendListings() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // no token → stay with hardcoded

        const payload = JSON.parse(atob(token.split(".")[1]));
        const ownerId = payload?.id;

        const res = await fetch(`${API_URL}/items/owner/${ownerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!data.success) return;

        // Merge backend items with fallback values
        const merged = data.items.map((item) => ({
          ...item,

          // Normalize field names for UI compatibility
          id: item._id,
          productId: item.productId ?? `PRD-${item._id.slice(-6)}`,
          name: item.title,
          category: item.category?.name ?? "Uncategorized",
          price: item.pricePerDay,

          // Fallbacks for fields backend doesn't provide yet
          availability: item.available ? "Available" : "Unavailable",
          status: item.active ? "Active" : "Inactive",

          image: item.images?.[0] ?? "/assets/items/placeholder.png",

          views: item.views ?? 0,
          totalBookings: item.totalBookings ?? 0,
          revenue: item.revenue ?? 0,
          history: item.history ?? [],

          description: item.description ?? "",
          condition: item.condition ?? "Good",
          location: item.location?.city ?? "Unknown",
          securityDeposit: item.securityDeposit ?? 0,
          itemOptions: item.itemOptions ?? [],
        }));

        // Replace hardcoded listings with backend items
        if (merged.length > 0) setListings(merged);
      } catch (err) {
        console.warn("Backend not ready → using hardcoded sample items");
      }
    }

    loadBackendListings();
  }, []);

  // ---------------------------------------------------------------------------
  // STATS
  // ---------------------------------------------------------------------------
  const stats = {
    total: listings.length,
    active: listings.filter((i) => i.status === "Active").length,
    rented: listings.filter((i) => i.availability === "Rented").length,
    totalRevenue: listings.reduce((sum, i) => sum + (i.revenue || 0), 0),
  };

  // ---------------------------------------------------------------------------
  // SORTING
  // ---------------------------------------------------------------------------
  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "category") return a.category.localeCompare(b.category);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    if (sortBy === "revenue") return b.revenue - a.revenue;
    if (sortBy === "views") return b.views - a.views;
    return a.name.localeCompare(b.name);
  });

  // ---------------------------------------------------------------------------
  // SEARCH + FILTER
  // ---------------------------------------------------------------------------
  const filteredListings = sortedListings.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.productId.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === "All" || i.status === filterStatus;
    const matchesAvailability =
      filterAvailability === "All" || i.availability === filterAvailability;

    return matchesSearch && matchesStatus && matchesAvailability;
  });

  // ---------------------------------------------------------------------------
  // BADGES
  // ---------------------------------------------------------------------------
  const availabilityBadge = {
    Available: { bg: "bg-green-100", text: "text-green-600", icon: CircleCheck },
    Rented: { bg: "bg-pink-100", text: "text-pink-600", icon: CheckCheck },
    Unavailable: { bg: "bg-gray-100", text: "text-gray-500", icon: Ban },
  };

  const statusIndicator = (status) => {
    const colorMap = {
      Active: { circle: "bg-green-500", text: "text-green-600" },
      Inactive: { circle: "bg-gray-400", text: "text-gray-500" },
    };

    const colors = colorMap[status] || { circle: "bg-gray-300", text: "text-gray-600" };

    return (
      <div className={`flex items-center gap-2 text-[13px] font-medium ${colors.text}`}>
        <span className={`w-2 h-2 rounded-full ${colors.circle}`} />
        <span>{status}</span>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // ACTION HANDLERS
  // ---------------------------------------------------------------------------
  const handleDuplicate = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      productId: `PRD-2024-${String(Date.now()).slice(-3)}`,
      name: item.name + " (Copy)",
      views: 0,
      totalBookings: 0,
      revenue: 0,
    };
    setListings((prev) => [...prev, newItem]);
  };

  const handleToggleStatus = (item) => {
    setListings((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: i.status === "Active" ? "Inactive" : "Active" } : i))
    );
  };

  const handleDelete = (item) => {
    setDeleteModal(null);
    setListings((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleExport = () => {
    const data = listings.map((item) => ({
      ProductID: item.productId,
      Name: item.name,
      Category: item.category,
      Price: item.price,
      Status: item.status,
      Availability: item.availability,
      Views: item.views,
      Bookings: item.totalBookings,
      Revenue: item.revenue,
    }));
    console.log("Exporting:", data);
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <OwnerSidebar />

      <div className="flex-1 p-8 ml-60">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Listings</h1>
            <p className="text-gray-500">Manage all your rental items</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download size={16} />
              Export
            </button>

            <button className="flex items-center gap-2 px-3 py-2 bg-[#7A1CA9] text-white rounded-xl text-sm font-medium hover:bg-[#6a1894]">
              <Plus size={16} />
              Add New Item
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-8 h-8 text-[#7A1CA9]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Listings</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
                <p className="text-xs text-gray-500">Active Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.rented}</p>
                <p className="text-xs text-gray-500">Currently Rented</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">₱{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & SORT */}
        <div className="bg-white rounded-xl border shadow-sm p-4 mb-4">
          <div className="flex gap-3 mb-3">
            <div className="flex items-center border bg-white rounded-lg px-3 py-2 flex-1">
              <Search size={16} className="text-gray-400" />
              <input
                className="ml-2 w-full text-sm outline-none"
                placeholder="Search by name, product ID, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="border rounded-lg px-3 py-2 text-sm bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort: Name</option>
              <option value="price">Sort: Price</option>
              <option value="category">Sort: Category</option>
              <option value="status">Sort: Status</option>
              <option value="revenue">Sort: Revenue</option>
              <option value="views">Sort: Views</option>
            </select>
          </div>

          {/* FILTERS */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">Filters:</span>

            {/* Status Filter */}
            <div className="flex gap-2">
              {["All", "Active", "Inactive"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    filterStatus === status
                      ? "bg-[#7A1CA9] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="w-px h-4 bg-gray-300 mx-1"></div>

            {/* Availability Filter */}
            <div className="flex gap-2">
              {["All", "Available", "Rented", "Unavailable"].map((avail) => (
                <button
                  key={avail}
                  onClick={() => setFilterAvailability(avail)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    filterAvailability === avail
                      ? "bg-[#7A1CA9] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {avail}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COUNT */}
        <p className="text-sm text-gray-500 mb-2">
          Showing {filteredListings.length} of {listings.length} listings
        </p>

        {/* TABLE */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr className="text-[13px] text-gray-600">
                <th className="py-2 px-4 font-semibold">Item</th>
                <th className="py-2 px-12 font-semibold">Price</th>
                <th className="py-2 px-12 font-semibold">Performance</th>
                <th className="py-2 px-12 font-semibold">Availability</th>
                <th className="py-2 px-12 font-semibold">Status</th>
                <th className="py-2 px-12 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 text-sm">No listings found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredListings.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={item.image} className="w-14 h-14 object-cover rounded-lg border" />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Hash size={12} />
                              {item.productId} • {item.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-12 text-purple-800 font-semibold">
                        ₱{item.price}/day
                      </td>

                      <td className="py-3 px-12">
                        <div className="text-xs space-y-1">
                          <p className="flex items-center gap-1 text-gray-600">
                            <Eye size={12} />
                            {item.views} views
                          </p>
                          <p className="flex items-center gap-1 text-gray-600">
                            <Package size={12} />
                            {item.totalBookings} bookings
                          </p>
                          <p className="text-green-600 font-medium">
                            ₱{item.revenue.toLocaleString()} earned
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-12">
                        {(() => {
                          const badgeStyle = availabilityBadge[item.availability];
                          const Icon = badgeStyle.icon;
                          return (
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${badgeStyle.bg} ${badgeStyle.text}`}
                            >
                              <Icon className="w-3 h-3" />
                              {item.availability}
                            </span>
                          );
                        })()}
                      </td>

                      <td className="py-3 px-12">{statusIndicator(item.status)}</td>

                      <td className="py-3 px-12 text-right relative" onClick={(e) => e.stopPropagation()}>
                        <ItemActionsMenu
                          item={item}
                          menuOpen={menuOpen}
                          setMenuOpen={setMenuOpen}
                          onEdit={() => setEditModal(item)}
                          onDuplicate={handleDuplicate}
                          onViewPage={() => setViewPageModal(item)}
                          onHistory={() => setHistoryPanel(item)}
                          onToggleStatus={handleToggleStatus}
                          onDelete={() => setDeleteModal(item)}
                        />
                      </td>
                    </tr>

                    {expanded === item.id && (
                      <tr className="bg-gray-50">
                        <td colSpan="6" className="p-6">
                          {/* DETAILS */}
                          <div className="grid grid-cols-3 gap-4 text-sm">

                            {/* Column 1 */}
                            <div className="bg-white p-4 rounded-xl">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Package size={16} className="text-[#7A1CA9]" />
                                Product Details
                              </h4>
                              <p className="text-gray-500">Product ID</p>
                              <p className="font-mono">{item.productId}</p>

                              <p className="text-gray-500 mt-2">Description</p>
                              <p>{item.description}</p>

                              <p className="text-gray-500 mt-2">Condition</p>
                              <p>{item.condition}</p>
                            </div>

                            {/* Column 2 */}
                            <div className="bg-white p-4 rounded-xl">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <MapPin size={16} className="text-[#7A1CA9]" />
                                Location & Pricing
                              </h4>

                              <p className="text-gray-500">Location</p>
                              <p>{item.location}</p>

                              <p className="text-gray-500 mt-2">Security Deposit</p>
                              <p className="font-semibold">₱{item.securityDeposit}</p>

                              <p className="text-gray-500 mt-2">Options</p>
                              <div className="flex gap-2 flex-wrap mt-1">
                                {item.itemOptions.map((opt, i) => (
                                  <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Column 3 */}
                            <div className="bg-white p-4 rounded-xl">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <CalendarDays size={16} className="text-[#7A1CA9]" />
                                Rental Status
                              </h4>

                              {item.rented ? (
                                <>
                                  <p className="text-gray-500">Rented By</p>
                                  <p className="font-medium">{item.renter}</p>

                                  <p className="text-gray-500 mt-2">Duration</p>
                                  <p>{item.dates}</p>
                                </>
                              ) : item.neverRented ? (
                                <p className="text-gray-600">Never rented before</p>
                              ) : (
                                <p className="text-gray-600">Available for rent</p>
                              )}
                            </div>
                          </div>

                          {/* HIDE DETAILS */}
                          <button
                            className="text-sm text-purple-600 mt-4 flex items-center gap-1 hover:text-purple-700"
                            onClick={() => setExpanded(null)}
                          >
                            Hide details
                            <ChevronUp size={16} />
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      <EditItemModal open={!!editModal} onClose={() => setEditModal(null)} item={editModal} />

      <DeleteConfirmModal
        open={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onDelete={handleDelete}
        item={deleteModal}
      />

      <ItemPageModal open={!!viewPageModal} onClose={() => setViewPageModal(null)} item={viewPageModal} />

      <RentalHistoryPanel open={!!historyPanel} onClose={() => setHistoryPanel(null)} item={historyPanel} />
    </div>
  );
}
