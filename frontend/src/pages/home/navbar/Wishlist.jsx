import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Star, ShoppingBag } from "lucide-react";
import SortDropdown from "../../../components/dropdown/SortDropdown";
import emptyWishlist from "../../../assets/empty-wishlist.png";
import emptyItems from "../../../assets/empty-listings.png";
import mockListings from "../../../data/mockData";
import { getFakeUser, generateFakeToken } from "../../../utils/fakeAuth";
import { Base64 } from "js-base64";

const WishlistPage = () => {
    const [wishlistIds, setWishlistIds] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    const categories = [
        "All",
        "Gadgets",
        "Clothes",
        "Electronics",
        "Vehicles",
        "Cameras",
        "Furniture",
        "Musical Instruments",
        "Tools",
        "Books",
        "Appliances",
        "Sports",
        "Outdoors",
    ];

    // Scroll drag handlers
    const scrollRef = React.useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.3; // drag speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };


    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("latest");

    useEffect(() => {
        document.title = "Hirent — Saved For Later";

        return () => {
            document.title = "Hirent";
        };
    }, []);

    useEffect(() => {
        let filtered = mockListings.filter((item) =>
            wishlistIds.includes(item.id)
        );

        // CATEGORY FILTER
        if (filter !== "All") {
            filtered = filtered.filter((item) => item.category === filter);
        }

        // SORTING
        filtered.sort((a, b) => {
            const dateA = new Date(a.availableFrom);
            const dateB = new Date(b.availableFrom);

            return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
        });

        setWishlistItems(filtered);
    }, [wishlistIds, filter, sortOrder]);


    // Load user wishlist
    useEffect(() => {
        let user = getFakeUser();

        if (!user) {
            const token = generateFakeToken();
            localStorage.setItem("fakeToken", token);
            user = getFakeUser();
        }

        setWishlistIds(user.wishlist || []);
    }, []);

    // Pull data from mockListings
    useEffect(() => {
        const filtered = mockListings.filter((item) =>
            wishlistIds.includes(item.id)
        );
        setWishlistItems(filtered);
    }, [wishlistIds]);

    // Remove item
    const removeFromWishlist = (id) => {
        const updated = wishlistIds.filter((itemId) => itemId !== id);
        setWishlistIds(updated);

        const user = getFakeUser();
        const updatedUser = { ...user, wishlist: updated };
        const base64Payload = Base64.encode(JSON.stringify(updatedUser));
        const newToken = `fakeHeader.${base64Payload}.fakeSignature`;
        localStorage.setItem("fakeToken", newToken);
    };

    const hasWishlistItems = wishlistIds.length > 0;
    const hasFilteredItems = wishlistItems.length > 0;


    return (
        <div className="flex flex-col min-h-screen pt-2 px-4 ml-4 pb-20 bg-gray-50">
            <div className="flex flex-1 ml-16">

                {/* MAIN CONTENT */}
                <div className="flex-1 mb-10">
                    <div className="max-w-8xl mx-auto pt-8">
                        <div>
                            <div className="p-1">
                                <div className="flex items-start gap-5">

                                    {/* Line + Text */}
                                    <div className="flex items-start mr-4 gap-4">
                                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                                            <Star className="w-8 h-8 text-[#a12fda]" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl font-bold text-purple-900 mt-1">Your Wishlist</h1>
                                            <p className="text-gray-500 text-sm">Items you saved for later</p>
                                        </div>
                                    </div>

                                    {/* CATEGORY BUTTONS */}
                                    <div className="w-full max-w-[950px] overflow-hidden">
                                        <div
                                            ref={scrollRef}
                                            onMouseDown={handleMouseDown}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseUp={handleMouseUp}
                                            onMouseMove={handleMouseMove}
                                            className="flex space-x-1 mt-5 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
                                        >
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setFilter(cat)}
                                                    className={`flex-shrink-0 px-3 py-1 rounded-full transition text-[13px] ${filter === cat
                                                        ? "bg-[#7A1CA9] text-white"
                                                        : "bg-[#7A1CA9]/10 text-[#7A1CA9] border border-[#7A1CA9]/20 hover:bg-[#7A1CA9]/20"
                                                        }`}
                                                >
                                                    {cat === "All" ? `All Items (${wishlistIds.length})` : `${cat}`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6 items-center">


                                        {/* SORT DROPDOWN */}
                                        <div className="ml-auto mt-4">
                                            <SortDropdown
                                                options={["Latest", "Oldest"]}
                                                onSortChange={(value) => setSortOrder(value.toLowerCase())}
                                            />
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        
                        <hr className="border-t border-gray-200 mb-6" />

                        <div className="flex flex-col md:flex-row gap-1">

                            {!hasFilteredItems ? (
                                hasWishlistItems ? (

                                    <div className="flex flex-col items-center justify-center h-[40vh] w-full">
                                        <img src={emptyItems} className="w-92 h-64 mt-32" />
                                        <p className="text-gray-500 text-center max-w-sm">
                                            No items found in this category.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
                                        <img src={emptyWishlist} className="w-92 h-64 mb-3" />
                                        <h2 className="text-[22px] font-bold">Your Saved List is Empty</h2>
                                        <p className="text-gray-500 text-center max-w-sm mb-4">
                                            Looks like you haven’t saved any items yet.
                                        </p>

                                        <button
                                            onClick={() => (window.location.href = "/browse")}
                                            className="bg-white border border-[#7A1CA9]/20  text-[#7A1CA9] px-3 py-1.5 text-sm rounded-lg shadow hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition"
                                        >
                                            Browse Items ➔
                                        </button>
                                    </div>
                                )
                            ) : (


                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-4 place-items-center">
                                    {wishlistItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="relative rounded-2xl shadow-sm hover:shadow-lg p-3 transition-all bg-white text-purple-900 w-full max-w-[270px]"
                                        >
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="absolute top-1 right-1 shadow-md text-red-500 hover:text-red-700 px-2 py-1 text-[13px] font-medium border border-red-300 rounded-full bg-white z-20"
                                            >
                                                Remove
                                            </button>

                                            <div className="relative w-full h-40 bg-gray-100 mx-auto rounded-xl mb-3 flex items-center justify-center overflow-hidden text-purple-900">

                                                <img
                                                    src={item.image}
                                                    className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
                                                />
                                                {item.featured && (
                                                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                                        Featured
                                                    </div>
                                                )}
                                                {item.sale && (
                                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                                                        Sale
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-[15px]">{item.name}</h3>
                                                <p className="text-[13px] text-gray-500 mb-2">by {item.owner}</p>

                                                <div className="flex items-center gap-1 text-gray-600 text-[13px] mb-1">
                                                    <MapPin size={15} />
                                                    {item.location}
                                                </div>

                                                <div className="flex items-center gap-1 text-gray-600 text-[13px] mb-3">
                                                    <Calendar size={15} />
                                                    {item.daysAvailable || item.days || item.availableDays} days available
                                                </div>

                                                <p className="text-[#7A1CA9] font-bold text-[18px] mb-4">
                                                    {item.price}{" "}
                                                    <span className="text-sm text-gray-600"></span>
                                                </p>

                                                <button className="w-full bg-[#7A1CA9] px-3 py-2 text-[13px] text-white border rounded-full hover:bg-purple-700 transition flex items-center justify-center gap-2">
                                                    <ShoppingBag className="w-4 h-4" />
                                                    Add to collection
                                                </button>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
