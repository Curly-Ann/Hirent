import React from "react";
import { mockListings } from "../../data/mockData";
import CartIcon from "../../assets/icons/Cart1.svg";
import SortDropdown from "../../components/SortDropdown";
import FilterSidebar from "../../components/FilterSidebar";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import banner from "../../assets/banner.png";

const BrowseRentals = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Navigation Bar */}
            <MainNav />

            {/* Banner Section */}
            <div className="w-full">
                <img
                    src={banner}
                    alt="Browse Rentals Banner"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden px-6 py-6 gap-6 bg-white">
                {/* Filter Sidebar with spacing */}
                <div className="shrink-0">
                    <FilterSidebar />
                </div>

                {/* Right Scrollable Section */}
                <main className="flex-1 overflow-y-auto p-4 md:p-5 lg:p-6">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-medium text-gray-800 flex items-center gap-1">
                            <span className="inline-block w-3 h-6 bg-[#7A1CA9] rounded mr-2"></span>
                            Gadgets <span className="text-purple-600 font-normal ml-1">(64)</span>
                        </h2>

                        <SortDropdown />

                    </div>

                    {/* Listings Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4">
                        {mockListings.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white p-3"
                            >
                                <div className="relative bg-gray-100 aspect-square rounded-2xl flex flex-col items-center justify-center overflow-hidden">
                                    <button
                                        style={{ position: "absolute", top: 10, right: 10, zIndex: 50 }}
                                        className="bg-white rounded-full shadow p-1 hover:bg-gray-200 transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-gray-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </button>

                                    {/* Product Image */}
                                    <div className="flex-1 flex items-center justify-center px-1 pt-1 pb-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-4/5 h-4/5 object-contain"
                                        />
                                    </div>

                                    {/* Add to Cart */}
                                    <button className="bg-[#7A1CA9] hover:bg-[#681690] text-white text-[13px] py-3 w-full rounded-b-2xl transition flex justify-center items-center space-x-2">

                                        <img src={CartIcon} alt="Cart Icon" className="w-4 h-4" />
                                        <span>Add To Cart</span>
                                    </button>
                                </div>


                                {/* Product Info */}
                                <div className="text-left mt-3">
                                    <p className="text-gray-800 font-semibold text-sm mt-2 mb-1">{item.name}</p>
                                    <p className="text-[#7A1CA9] font-bold text-sm mb-1">
                                        {item.price}
                                        <span className="text-[#C59BD9] line-through text-sm font-normal ml-2">
                                            {item.oldPrice}
                                        </span>
                                    </p>


                                    {/* Rating */}
                                    <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                                        <span>★★★★★</span>
                                        <span className="text-gray-500 text-xs">(65)</span>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* More like this */}
                    <div className="flex justify-between items-center mb-6 mt-10">
                        <h2 className="text-xl font-medium text-gray-800 flex items-center gap-1">
                            <span className="inline-block w-3 h-6 bg-[#7A1CA9] rounded mr-2"></span>
                            More like this <span className="text-purple-600 font-normal ml-1">(154)</span>
                        </h2>
                    </div>

                    {/* Listings Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4">
                        {mockListings.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white p-3"
                            >
                                <div className="relative bg-gray-100 aspect-square rounded-2xl flex flex-col items-center justify-center overflow-hidden">
                                    <button
                                        style={{ position: "absolute", top: 10, right: 10, zIndex: 50 }}
                                        className="bg-white rounded-full shadow p-1 hover:bg-gray-200 transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-gray-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </button>

                                    {/* Product Image */}
                                    <div className="flex-1 flex items-center justify-center px-1 pt-1 pb-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-4/5 h-4/5 object-contain"
                                        />
                                    </div>

                                    {/* Add to Cart */}
                                    <button className="bg-[#7A1CA9] hover:bg-[#681690] text-white text-[13px] py-3 w-full rounded-b-2xl transition flex justify-center items-center space-x-2">

                                        <img src={CartIcon} alt="Cart Icon" className="w-4 h-4" />
                                        <span>Add To Cart</span>
                                    </button>
                                </div>


                                {/* Product Info */}
                                <div className="text-left mt-3">
                                    <p className="text-gray-800 font-semibold text-sm mt-2 mb-1">{item.name}</p>
                                    <p className="text-[#7A1CA9] font-bold text-sm mb-1">
                                        {item.price}
                                        <span className="text-[#C59BD9] line-through text-sm font-normal ml-2">
                                            {item.oldPrice}
                                        </span>
                                    </p>


                                    {/* Rating */}
                                    <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                                        <span>★★★★★</span>
                                        <span className="text-gray-500 text-xs">(65)</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default BrowseRentals;
