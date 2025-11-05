import gucci_duffle_bag from "../assets/items/gucci_duffle_bag.png";
import havit_hv from "../assets/items/havit_hv.png";
import IPS_lcd from "../assets/items/IPS_lcd.png";
import Keyboard from "../assets/items/Keyboard.png";
import laptop from "../assets/items/laptop.png";
import RGB_liquid_CPU from "../assets/items/RGB_liquid_CPU.png";

export const mockDashboardStats = {
  totalListings: 15,
  listingsChange: "+2 this month",
  activeRentals: 8,
  activeRentalsSubtext: "3 ending soon",
  pendingBookings: 7,
  pendingBookingsSubtext: "Awaiting approval",
  earnings: "₱ 5,500.00",
  earningsChange: "+18% from last month",
};

export const mockListings = [
  {
    id: 1,
    name: "Gucci duffle bag",
    category: "Fashion",
    price: "₱960",
    availability: "Rented",
    bookedDates: "Oct 20 - 24, 2025",
    status: "Active",
    image: gucci_duffle_bag,
  },
  {
    id: 2,
    name: "Havic HV G-92 Gamepad",
    category: "Gadgets",
    price: "₱560",
    oldPrice: "₱720",
    availability: "Available",
    bookedDates: "Oct 20 - 24, 2025",
    status: "Active",
    image: havit_hv,
  },
  {
    id: 3,
    name: "IPS LCD Monitor",
    category: "Electronics",
    price: "₱1,160",
    availability: "Rented",
    bookedDates: "Oct 20 - 24, 2025",
    status: "Active",
    image: IPS_lcd,
  },
  {
    id: 4,
    name: "AK-900 Wired Keyboard",
    category: "Gadgets",
    price: "₱450",
    oldPrice: "₱600",
    availability: "Available",
    bookedDates: "Oct 20 - 24, 2025",
    status: "Active",
    image: Keyboard,
  },
  {
    id: 5,
    name: "Gaming Laptop",
    category: "Electronics",
    price: "₱3,500",
    availability: "Available",
    bookedDates: "Oct 20 - 24, 2025",
    status: "Pending",
    image: laptop,
  },
  {
    id: 6,
    name: "RGB Liquid CPU Cooler",
    category: "PC Components",
    price: "₱1,960",
    availability: "Unavailable",
    bookedDates: "Oct 20 - 24, 2025",
    status: "Inactive",
    image: RGB_liquid_CPU,
  },
];
