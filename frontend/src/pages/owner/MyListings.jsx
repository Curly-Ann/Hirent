import React, { useState } from "react";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";
import {
  Search,
  MapPin,
  CalendarDays,
  ChevronUp,
} from "lucide-react";

// Components
import RentalHistoryPanel from "../../components/listings/RentalHistoryPanel";
import EditItemModal from "../../components/listings/EditItemModal";
import DeleteConfirmModal from "../../components/listings/DeleteConfirmModal";
import ItemPageModal from "../../components/listings/ItemPageModal";
import ItemActionsMenu from "../../components/listings/ItemActionsMenu";

export default function MyListings() {
  // UI state
  const [expanded, setExpanded] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Modals + Slide Panel
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewPageModal, setViewPageModal] = useState(null);
  const [historyPanel, setHistoryPanel] = useState(null);

  // Listings with unique rental histories per item
  const [listings, setListings] = useState([
    {
      id: 1,
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

      history: [
        {
          renter: "Jonathan Reyes",
          dates: "Feb 20–25, 2025",
          status: "Returned",
          notes: "Smooth transaction.",
        },
        {
          renter: "Carla Mendez",
          dates: "Jan 10–15, 2025",
          status: "Returned",
        },
      ],
    },

    {
      id: 2,
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

      history: [
        {
          renter: "Maria Santos",
          dates: "Mar 3–6, 2025",
          status: "Returned",
        },
      ],
    },

    {
      id: 3,
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

      history: [],
    },

    {
      id: 4,
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

      history: [
        {
          renter: "Alex Torres",
          dates: "Jan 2–6, 2025",
          status: "Returned",
        },
        {
          renter: "Ralph Lim",
          dates: "Dec 15–18, 2024",
          status: "Overdue",
          notes: "Late by 1 day.",
        },
      ],
    },

    {
      id: 5,
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

      history: [
        {
          renter: "Maria Santos",
          dates: "Mar 3–6, 2025",
          status: "Returned",
        },
        {
          renter: "Darren Lum",
          dates: "Feb 1–4, 2025",
          status: "Returned",
        },
      ],
    },

    {
      id: 6,
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

      history: [],
    },
  ]);

  // Sorting logic
  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "category")
      return a.category.localeCompare(b.category);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return a.name.localeCompare(b.name);
  });

  // Search filter
  const filteredListings = sortedListings.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  // Badges
  const availabilityBadge = {
    Available: "bg-green-100 text-green-700",
    Rented: "bg-purple-100 text-purple-700",
    Unavailable: "bg-gray-300 text-gray-700",
  };

  const statusBadge = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-200 text-gray-700",
  };

  const badge = (text, styles) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {text}
    </span>
  );

  // Action handlers
  const handleDuplicate = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      name: item.name + " (Copy)",
    };
    setListings((prev) => [...prev, newItem]);
  };

  const handleToggleStatus = (item) => {
    setListings((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, status: i.status === "Active" ? "Inactive" : "Active" }
          : i
      )
    );
  };

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 min-h-screen">
      <OwnerSidebar />

      <main className="collection-scale flex-1 mt-12">

      {/* Main Content */}
        <h2 className="text-2xl font-bold mb-1 mt-6">
          My Listings
        </h2>
        <div className="text-gray-500 mb-8 text-base">
          Your hub to add, edit, and monitor all your listings and rental activity
        </div>

        {/* Search + Sort */}
        <div className="flex gap-3 mb-6">
          <div className="flex items-center border bg-white  text-purple-900   rounded-lg px-3 py-2 w-full">
            <Search size={16} className="text-gray-400" />
            <input
              className="ml-2 w-full text-sm outline-none"
              placeholder="Search listings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white  text-purple-900  "
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort: Name</option>
            <option value="price">Sort: Price</option>
            <option value="category">Sort: Category</option>
            <option value="status">Sort: Status</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white  text-purple-900   rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-b">
              <tr className="text-sm text-gray-600">
                <th className="py-3 px-4 font-semibold">Item</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Availability</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredListings.map((item) => (
                <React.Fragment key={item.id}>
                  {/* MAIN ROW */}
                  <tr
                    className="border-b hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 cursor-pointer"
                    onClick={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                  >
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.category}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-purple-600 font-semibold">
                      ₱{item.price}/day
                    </td>

                    <td className="py-4 px-4">
                      {badge(
                        item.availability,
                        availabilityBadge[item.availability]
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {badge(item.status, statusBadge[item.status])}
                    </td>

                    {/* ACTIONS MENU */}
                    <td
                      className="py-4 px-4 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
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

                  {/* EXPANDED DETAILS */}
                  {expanded === item.id && (
                    <tr className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-900">
                      <td colSpan="5" className="p-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Description</p>
                            <p className="mt-1">{item.description}</p>
                          </div>

                          <div>
                            <p className="text-gray-500">Location</p>
                            <p className="flex items-center gap-1 mt-1">
                              <MapPin size={14} />
                              {item.location}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500">Condition</p>
                            <p className="mt-1">{item.condition}</p>
                          </div>

                          <div>
                            <p className="text-gray-500">
                              Security Deposit
                            </p>
                            <p className="mt-1">
                              ₱{item.securityDeposit}
                            </p>
                          </div>

                          <div className="col-span-2">
                            <p className="text-gray-500">Options</p>
                            <div className="flex gap-2 mt-1 flex-wrap">
                              {item.itemOptions.map((opt, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-gray-200 rounded-full text-xs"
                                >
                                  {opt}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Renter Status */}
                          <div className="col-span-2 mt-4 p-3 bg-white  text-purple-900   border rounded-lg shadow-sm">
                            {item.rented ? (
                              <>
                                <p className="text-purple-900 font-medium">
                                  Rented by {item.renter}
                                </p>
                                <p className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                  <CalendarDays size={14} />
                                  {item.dates}
                                </p>
                              </>
                            ) : item.neverRented ? (
                              <p className="text-gray-600">
                                Never rented before
                              </p>
                            ) : (
                              <p className="text-gray-600">
                                Not currently rented
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          className="text-sm text-purple-600 mt-4 flex items-center gap-1"
                          onClick={() => setExpanded(null)}
                        >
                          Hide details
                          <ChevronUp size={16} />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODALS + PANEL */}
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
