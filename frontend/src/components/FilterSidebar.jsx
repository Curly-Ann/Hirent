import React, { useState, useRef } from "react";
import BasicDateRangePicker from "./DateRangePicker";
import PriceRangeSlider from "./PriceRange";
import dayjs from "dayjs";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const getAddressFromLatLng = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data?.address) {
            const { road, suburb, city, state, country } = data.address;
            return [road, suburb, city, state, country].filter(Boolean).join(", ");
        }
    } catch (error) {
        console.error("Error fetching address:", error);
    }
    return "Address not found";
};

const MapPicker = ({ setLocation }) => {
    const [position, setPosition] = useState(null);

    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            setPosition(e.latlng);
            const address = await getAddressFromLatLng(lat, lng);
            setLocation(address);
        },
    });

    return position ? <Marker position={position} /> : null;
};

const FilterSidebar = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRange, setSelectedRange] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [mapOpen, setMapOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [priceRangeKey, setPriceRangeKey] = useState(0);

    const categories = [
        "Gadgets",
        "Clothes",
        "Vehicles",
        "Cameras",
        "Furniture",
        "Tools",
    ];

    const handleDateRange = (range) => {
        const today = dayjs();
        setSelectedRange(range);
        if (range === "Today") {
            setFromDate(today);
            setToDate(today);
        } else if (range === "This Week") {
            setFromDate(today.startOf("week"));
            setToDate(today.endOf("week"));
        } else if (range === "This Month") {
            setFromDate(today.startOf("month"));
            setToDate(today.endOf("month"));
        }
    };

    const handleClearAll = () => {
        setSelectedCategory("");
        setSelectedRange("");
        setFromDate(dayjs());
        setToDate(dayjs());
        setLocation("");
        setPriceRangeKey((prev) => prev + 1);
    };

    return (
        <aside className="w-80 bg-white shadow-md border border-gray-200 rounded-2xl max-h-[500vh] flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 pt-4 space-y-3 pb-0">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
                    <button
                        onClick={handleClearAll}
                        className="text-[#7A1CA9] text-sm font-medium hover:underline"
                    >
                        Clear All
                    </button>
                </div>

                {/* Category */}
                <div>
                    <p className="font-light text-[15px] text-gray-700 mb-3">Category</p>
                    <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap border transition ${selectedCategory === cat
                                    ? "bg-[#7A1CA9] text-white border-[#7A1CA9]"
                                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Location */}
                <div>
                    <p className="font-light text-[15px] text-gray-700 mb-3">Location</p>
                    <div
                        className="w-full border border-purple-300 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-pointer hover:bg-purple-50 transition"
                        onClick={() => setMapOpen(true)}
                    >
                        {location || "Select your location on the map"}
                    </div>
                </div>

                {/* Date Range */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="font-light text-[15px] text-gray-700 mb-3">Date Range</p>
                        <button
                            onClick={() => {
                                setSelectedRange("");
                                setFromDate(dayjs());
                                setToDate(dayjs());
                            }}
                            className="text-purple-600 text-sm mb-3 font-medium hover:underline"
                        >
                            Reset
                        </button>
                    </div>
                    <BasicDateRangePicker fromDate={fromDate} toDate={toDate} />
                    <div className="flex flex-nowrap justify-between mt-3 space-x-2">
                        {["Today", "This Week", "This Month"].map((range) => (
                            <button
                                key={range}
                                onClick={() => handleDateRange(range)}
                                className={`flex-1 text-xs px-4 py-2 rounded-lg border transition whitespace-nowrap ${selectedRange === range
                                    ? "bg-[#7A1CA9] text-white border-[#7A1CA9]"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="mb-4 pb-6">

                    <div className="flex justify-between items-center mb-2">
                        <p className="font-light text-[15px] text-gray-700">Price Range</p>
                        <button
                            onClick={() => setPriceRangeKey((prev) => prev + 1)}
                            className="text-purple-600 text-sm font-medium hover:underline mb-3"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="[&>*]:mb-0 [&>*]:pb-0">
                        <PriceRangeSlider key={priceRangeKey} />
                    </div>
                </div>
            </div>
            <div className="px-6 pb-4 mt-0 mb-3">
                <button className="w-full bg-[#7A1CA9] hover:bg-[#681690] text-white rounded-lg py-2 text-[15px] font-normal transition">
                    Apply Filter
                </button>
            </div>


        </aside>

    );
};

export default FilterSidebar;
