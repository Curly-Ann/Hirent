import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Calendar,
  Download,
  ChevronDown,
  Eye
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import cameraImg from "../../assets/items/camera.png";
import droneImg from "../../assets/items/drone.png";
import laptopImg from "../../assets/items/laptop.png";
import camera1Img from "../../assets/items/camera1.png";
import gimbalImg from "../../assets/items/gimbal.png";

import gcashIcon from "../../assets/payment/GCash.png";
import paypalIcon from "../../assets/payment/paypal.png";
import mayaIcon from "../../assets/payment/maya.png";
import bankIcon from "../../assets/payment/bank.png";
import cashIcon from "../../assets/payment/cash.png";

import totalBookingsIcon from "../../assets/icons/total.svg";
import activeRentalsIcon from "../../assets/icons/active.svg";
import pendingBookingsIcon from "../../assets/icons/pending.svg";
import totalEarningsIcon from "../../assets/icons/earnings.svg";

import Sidebar from "../../components/layouts/OwnerSidebar";
import profPic from "../../assets/profile/prof_pic.jpg";
import sampleBookings from "../../data/sampleBookings";
import DropdownPortal from "../../components/button/DropdownPortal";



// Compute stats dynamically
const totalBookings = sampleBookings.length;
const activeRentals = sampleBookings.filter(
  b => b.status === "Pending" || b.status === "Active"
).length;
const totalListings = [...new Set(sampleBookings.map(b => b.item))].length;
const totalEarnings = sampleBookings.reduce((sum, b) => sum + Number(b.pricePerDay), 0);

const stats = [
  {
    label: "Total Listings",
    value: totalBookings,
    sublabel: "+2 this month",
    sublabelColor: "text-green-500",
    date: "Updated just now",
    icon: totalBookingsIcon, // icon added here
  },
  {
    label: "Active Rentals",
    value: activeRentals,
    sublabel: "3 ending soon",
    sublabelColor: "text-red-500",
    date: "Updated just now",
    icon: activeRentalsIcon,
  },
  {
    label: "Pending Bookings",
    value: totalListings,
    sublabel: "Awaiting approval",
    sublabelColor: "text-yellow-500",
    date: "Updated just now",
    icon: pendingBookingsIcon,
  },
  {
    label: "Earnings This Month",
    value: `₱ ${totalEarnings.toLocaleString()}`,
    sublabel: "+18% from last month",
    sublabelColor: "text-green-500",
    date: "Updated just now",
    icon: totalEarningsIcon,
  },
];


export default function OwnerDashboard() {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const downloadButtonRef = React.useRef(null);
  const dashboardRef = React.useRef(null);


  const ActionsDropdown = ({ booking }) => {
    return (
      <button
        onClick={() => console.log("View booking", booking.id)}
        className="w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-gray-100 transition"
      >
        <Eye className="w-4 h-4 text-gray-600" />
      </button>
    );
  };

  const paymentIcons = {
    gcash: gcashIcon,
    maya: mayaIcon,
    paypal: paypalIcon,
    "bank transfer": bankIcon,
    cash: cashIcon,
  };


  const itemImages = {
    camera: cameraImg,
    drone: droneImg,
    laptop: laptopImg,
    camera1: camera1Img,
    gimbal: gimbalImg,
  };

  const avatarPNGs = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
  ];


  const getRenterAvatar = (renter, index) => {
    // Pick avatar based on index for simplicity
    return avatarPNGs[index % avatarPNGs.length];
  };

  const exportToCSV = () => {
    // --- STATS ---
    const statsHeader = ["Stat", "Value"];
    const statsRows = stats.map(s => [s.label, s.value]);

    // --- BOOKINGS TABLE ---
    const bookingsHeader = ["Booking ID", "Item", "Price", "Renter", "Booked Date", "Payment Method", "Status"];
    const bookingsRows = sampleBookings.map(b => [
      b.id,
      b.item,
      `₱ ${b.pricePerDay}`,
      b.renter,
      b.bookedDate,
      b.paymentMethod,
      b.status,
    ]);

    // Combine stats and bookings with an empty row in between
    const csvContent = [
      ["DASHBOARD STATS"],
      statsHeader,
      ...statsRows,
      [], // empty row
      ["BOOKINGS TABLE"],
      bookingsHeader,
      ...bookingsRows,
    ]
      .map(row => row.join(","))
      .join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dashboard-data.csv");
    link.click();
  };


  const exportDashboardToPDF = () => {
    const doc = new jsPDF();

    // --- STATS ---
    doc.setFontSize(14);
    doc.text("Dashboard Stats", 14, 15);

    stats.forEach((stat, index) => {
      doc.setFontSize(12);
      doc.text(`${stat.label}: ${stat.value}`, 14, 25 + index * 10);
    });

    // --- BOOKINGS TABLE ---
    const tableColumn = ["Booking ID", "Item", "Price", "Renter", "Booked Date", "Payment", "Status"];
    const tableRows = [];

    sampleBookings.forEach(b => {
      const row = [
        b.id,
        b.item,
        `₱ ${b.pricePerDay}`,
        b.renter,
        b.bookedDate,
        b.paymentMethod,
        b.status,
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
    });

    doc.save("dashboard-data.pdf");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 dark:bg-gray-900">
      <Sidebar />

      {/* Main Content */}
      <main ref={dashboardRef} className="collection-scale flex-1 py-8">

        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-5">

          {/* Search */}
          <div className="flex items-center bg-white  text-purple-900   px-4 py-2 rounded-xl shadow-sm border max-w-sm w-full">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              placeholder="Search"
              className="ml-2 w-full bg-transparent focus:outline-none text-sm text-gray-700"
            />
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-5">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="flex items-center gap-2">
              <img
                src={profPic}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold  text-gray-900 ">Genlord</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
            </div>
          </div>

        </div>

        <hr className="borde-gray-200 mb-5"></hr>

        {/* TITLE + DOWNLOAD */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold  text-gray-900  mb-1">
              Welcome, <span className="text-[#7A1CA9] font-bold">Genlord 👋</span>
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your booking data easily with us
            </p>
          </div>

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
                className="block text-sm w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Download as CSV
              </button>
              <button
                onClick={exportDashboardToPDF}
                className="block text-sm w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Download as PDF
              </button>

            </DropdownPortal>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white  text-purple-900   rounded-xl p-4 shadow-sm border relative"
            >
              {/* Icon box */}
              {stat.icon && (
                <div className="absolute top-4 right-4 rounded-lg flex items-center justify-center">
                  <img src={stat.icon} alt={`${stat.label} icon`} className="w-10 h-10" />
                </div>
              )}


              <p className="text-[13px] text-gray-700 mb-2">{stat.label}</p>
              <p className="text-2xl font-bold  text-gray-900  mt-1">{stat.value}</p>

              {stat.sublabel && (
                <p className={`text-[13px] ${stat.sublabelColor}`}>{stat.sublabel}</p>
              )}

              {/* Full-width horizontal line right below sublabel */}
              {stat.sublabel && (
                <hr className="border-gray-200 mt-2 my-2 -mx-4" />

              )}

              <p className="text-xs text-gray-400">{stat.date}</p>
            </div>
          ))}

        </div>


        {/* REVENUE + SCHEDULE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Revenue */}
          <div className="lg:col-span-2 bg-white  text-purple-900   p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold  text-gray-900 ">
                Revenue Statistics
              </h2>
              <select className="border text-sm px-3 py-1.5 rounded-lg text-gray-600">
                <option>This Month</option>
              </select>
            </div>

            {/* Placeholder chart */}
            <div className="h-52 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 font-medium">
              Bar Chart Placeholder
            </div>
          </div>

          {/* Booking Schedule */}
          <div className="bg-white  text-purple-900   p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold  text-gray-900 ">
                Booking Schedule
              </h2>
              <button className="border rounded-lg p-2 hover:bg-gray-100">
                <Calendar className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Placeholder Calendar */}
            <div className="h-52 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 font-medium">
              Calendar Placeholder
            </div>
          </div>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="bg-white  text-purple-900   rounded-xl shadow-sm border overflow-hidden">
          {/* Header of BOOKINGS TABLE */}
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold  text-gray-900 ">Bookings</h2>
              <p className="text-sm text-gray-500">
                Manage all your booking activity
              </p>
            </div>

            <div>
              <button
                onClick={() => navigate("/owner/bookings")}
                className="px-3 py-1.5 border text-sm rounded-lg hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900"
              >
                See All
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b">
                <tr className="text-gray-400 font-normal">
                  <th className="px-6 py-3 font-normal">Booking ID</th>
                  <th className="px-6 py-3 font-normal">Item & Price</th>
                  <th className="px-6 py-3 font-normal">Renter</th>
                  <th className="px-6 py-3 font-normal">Booked Date</th>
                  <th className="px-6 py-3 font-normal">Payment Method</th>
                  <th className="px-6 py-3 font-normal">Status</th>
                  <th className="px-6 py-3 font-normal">Action</th>
                </tr>
              </thead>


              <tbody className="divide-y">
                {sampleBookings.map((row, i) => (
                  <tr key={row.id} className="hover:bg-purple-50 transition">
                    {/* Booking ID */}
                    <td className="px-6 py-4"><span className="text-gray-600">{row.id}</span></td>

                    {/* Item */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Image with gray rounded background */}
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          <img
                            src={itemImages[row.itemKey]}
                            alt={row.item}
                            className="w-10 h-10 object-contain"
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="font-medium  text-gray-900 ">{row.item}</span>
                          {row.pricePerDay && (
                            <span className="text-[13px] text-gray-500">₱ {row.pricePerDay} per day</span>
                          )}
                        </div>
                      </div>
                    </td>


                    {/* Renter */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={getRenterAvatar(row.renter, i)} // pass row index from map
                          alt={row.renter}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium  text-gray-900 ">{row.renter}</span>
                          <span className="text-xs text-gray-500">{row.renterEmail}</span>
                        </div>
                      </div>
                    </td>


                    {/* Booked Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{row.bookedDate}</span>
                      </div>
                    </td>

                    {/* Payment Method */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={paymentIcons[row.paymentMethod.toLowerCase()]}
                          alt={row.paymentMethod}
                          className="w-5 h-5 object-contain"
                        />
                        <span>{row.paymentMethod}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${row.status === "Completed"
                          ? "bg-green-50 text-green-500"
                          : row.status === "Cancelled"
                            ? "bg-red-50 text-red-500"
                            : row.status === "Pending"
                              ? "bg-yellow-50 text-yellow-500"
                              : row.status === "Active"
                                ? "bg-orange-50 text-orange-500"
                                : "bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 text-gray-600"
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <ActionsDropdown booking={row} />
                    </td>
                  </tr>
                ))}
              </tbody>


            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
