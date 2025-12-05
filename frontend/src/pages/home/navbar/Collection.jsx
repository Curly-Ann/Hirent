import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emptycollection from "../../../assets/empty-collection.png";
import {
    ArrowLeft,
    Calendar,
    Truck,
    ShoppingBag,
    CircleCheckBig,
    Clock,
    Package,
    CalendarOff,
    ShieldAlert,
} from "lucide-react";
import sampleUsercollection from "../../../data/sampleUsercollection";
import SortDropdown from "../../../components/dropdown/SortDropdown";
import CancelConfirmationModal from "../../../components/modals/CancelModal";
import mockListings from "../../../data/mockData";
import { getFakeUser, generateFakeToken } from "../../../utils/fakeAuth";

const CollectionPage = () => {
    const navigate = useNavigate();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedCancelId, setSelectedCancelId] = useState(null);

    const [collectionItems, setcollectionItems] = useState([]);

    useEffect(() => {
        document.title = "Hirent — Collection";
        return () => {
            document.title = "Hirent";
        };
    }, []);

    useEffect(() => {
        let user = getFakeUser();

        if (!user) {
            const token = generateFakeToken();
            localStorage.setItem("fakeToken", token);
            user = getFakeUser();
        }

        const merged = (user.collection || [])
            .map((collectionItem) => {
                const product = mockListings.find((p) => p.id === collectionItem.id);
                if (!product) return null;

                const rawPrice = product.price ? product.price.toString() : "0";
                const price = parseFloat(rawPrice.replace(/[^0-9.]/g, "")) || 0;

                const defaultcollectionItem =
                    sampleUsercollection.find((i) => i.id === collectionItem.id) || {};

                return {
                    ...product,
                    ...defaultcollectionItem,
                    ...collectionItem,
                    price,
                    days: collectionItem.days || defaultcollectionItem.days || 1,
                    shipping:
                        collectionItem.shipping ?? defaultcollectionItem.shipping ?? 0,
                    status:
                        collectionItem.status ||
                        defaultcollectionItem.status ||
                        "pending",
                    bookedFrom:
                        collectionItem.bookedFrom ||
                        defaultcollectionItem.bookedFrom ||
                        "",
                    bookedTo:
                        collectionItem.bookedTo || defaultcollectionItem.bookedTo || "",
                    couponDiscount:
                        collectionItem.couponDiscount ??
                        defaultcollectionItem.couponDiscount ??
                        0,
                    adjustedSubtotal:
                        price *
                        (collectionItem.days ||
                            defaultcollectionItem.days ||
                            1),
                };
            })
            .filter(Boolean);

        setcollectionItems(merged);
    }, []);

    const updateFakeUsercollection = (newcollection) => {
        const user = getFakeUser();
        if (!user) return;
        const updatedUser = { ...user, collection: newcollection };
        const base64Payload = btoa(JSON.stringify(updatedUser));
        const newToken = `fakeHeader.${base64Payload}.fakeSignature`;
        localStorage.setItem("fakeToken", newToken);
    };

    const handleRemoveItem = (id) => {
        const newcollection = collectionItems.filter((item) => item.id !== id);
        setcollectionItems(newcollection);
        updateFakeUsercollection(newcollection);
    };

    const calculateItemTotal = (item) => {
        const pricePerDay = item.price || 0;
        let daysCount = item.days || 1;

        if (item.bookedFrom && item.bookedTo) {
            const from = new Date(item.bookedFrom);
            const to = new Date(item.bookedTo);
            const msPerDay = 1000 * 60 * 60 * 24;
            const diff = Math.floor((to - from) / msPerDay) + 1;
            daysCount = diff > 0 ? diff : daysCount;
        }

        const shippingFee = typeof item.shipping === "number" ? item.shipping : 0;

        const sampleItem = sampleUsercollection.find((si) => si.id === item.id);
        const discountPercent = sampleItem ? sampleItem.couponDiscount : 0;

        const subtotal = pricePerDay * daysCount;
        const discountAmount = (subtotal * discountPercent) / 100;
        const total = subtotal + shippingFee - discountAmount;

        return { subtotal, discountAmount, shippingFee, total, daysCount, pricePerDay };
    };

    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("latest");

    const openCancelModal = (id) => {
        setSelectedCancelId(id);
        setShowCancelModal(true);
    };

    const confirmCancelBooking = () => {
        const updatedcollection = collectionItems.map((item) => {
            if (item.id === selectedCancelId) {
                return {
                    ...item,
                    status: "not booked",
                    bookedFrom: null,
                    bookedTo: null,
                };
            }
            return item;
        });

        setcollectionItems(updatedcollection);
        updateFakeUsercollection(updatedcollection);
        setShowCancelModal(false);
        setSelectedCancelId(null);
        alert("Booking canceled successfully.");
    };

    const filteredItems = collectionItems.filter((item) => {
        if (filter === "all") return true;
        if (filter === "approved") return item.status === "approved";
        if (filter === "pending") return item.status === "pending";
        if (filter === "notBooked") return item.status !== "booked";
        return true;
    });


    const sortedItems = [...filteredItems].sort((a, b) => {
        const aDate = new Date(a.addedAt || a.bookedFrom || Date.now());
        const bDate = new Date(b.addedAt || b.bookedFrom || Date.now());
        return sortOrder === "latest" ? bDate - aDate : aDate - bDate;
    });

    const notBookedItems = collectionItems.filter(
        item => item.status !== "booked"
    );

    const approvedItems = collectionItems.filter(
        (item) => item.status === "approved"
    );

    const approvedTotals = approvedItems.reduce(
        (acc, item) => {
            const itemTotals = calculateItemTotal(item);
            acc.subtotal += itemTotals.subtotal;
            acc.shipping += itemTotals.shippingFee;
            acc.discount += itemTotals.discountAmount;
            return acc;
        },
        { subtotal: 0, shipping: 0, discount: 0 }
    );

    const approvedSecurityDepositTotal = approvedItems.reduce(
        (acc, item) => acc + (item.securityDeposit || 0),
        0
    );

    const approvedGrandTotal =
        approvedTotals.subtotal +
        approvedTotals.shipping -
        approvedTotals.discount;

    const approvedGrandTotalWithDeposit =
        approvedGrandTotal + approvedSecurityDepositTotal;

    const waitingCount = collectionItems.filter(
        (item) => item.status === "pending"
    ).length;

    // --------------------------------------------------------------------
    // NEW LAYOUT: LEFT COLUMN STATIC / RIGHT COLUMN SCROLLABLE
    // --------------------------------------------------------------------

    return (
        <div className="flex min-h-screen px-4 md:px-6 lg:px-8">

            {/* LEFT STATIC COLUMN */}
            <div className="w-[520px] pl-16 flex-shrink-0 sticky top-10 self-start h-screen bg-gray-50 border-r border-gray-200">

                {/* Back Button */}
                <div className="mb-3 mt-10">
                    <button
                        onClick={() => navigate(-1)} // Go back to the previous page
                        className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Go back
                    </button>
                </div>

                {/* RENTAL SUMMARY BELOW FILTERS — STATIC */}
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm space-y-1 mr-5 ">
                    <h2 className="font-semibold text-[16px] mb-2">Rental Summary</h2>

                    <div className="flex items-center text-gray-600 mb-1 gap-1.5">
                        <Package className="w-4 h-4" />
                        <p className="text-[13px]">
                            {collectionItems.length} item{collectionItems.length > 1 ? "s" : ""} in collection
                        </p>
                    </div>

                    {/* Approved + Waiting */}
                    <div className="flex flex-col gap-1 ml-4 text-[13px]">
                        {approvedItems.length > 0 && (
                            <div className="flex items-center gap-1.5 text-green-700">
                                <CircleCheckBig className="w-3 h-3" />
                                <span>{approvedItems.length} approved</span>
                            </div>
                        )}

                        {waitingCount > 0 && (
                            <div className="flex items-center mb-2 gap-1.5 text-yellow-700">
                                <Clock className="w-3 h-3" />
                                <span>{waitingCount} waiting for approval</span>
                            </div>
                        )}
                    </div>

                    {/* Add spacing above and below hr */}
                    <hr className="my-3" />

                    {/* Approved Items List */}
                    {approvedItems.length > 0 && (
                        <div className="text-[13px] space-y-1 pb-2">
                            <p className="font-semibold mt-3 mb-3">Approved Items</p>
                            {approvedItems.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>₱{item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <hr className="my-3" /> {/* Add spacing here too */}

                    {/* Approved Totals */}
                    <div className="text-[13px] space-y-1 pt-2 pb-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₱{approvedTotals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>
                                {approvedItems.length > 0
                                    ? approvedTotals.shipping === 0
                                        ? "Free"
                                        : `₱${approvedTotals.shipping.toFixed(2)}`
                                    : "--"}
                            </span>
                        </div>
                        {approvedTotals.discount > 0 && (
                            <div className="flex justify-between text-green-700">
                                <span>Discount</span>
                                <span>-₱{approvedTotals.discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Security Deposit</span>
                            <span>
                                {approvedItems.length > 0
                                    ? `₱${approvedSecurityDepositTotal.toFixed(2)}`
                                    : "--"}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₱{approvedGrandTotalWithDeposit.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Info Boxes */}
                    <div className="space-y-3">
                        {approvedItems.length > 0 && (
                            <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 rounded-md text-[13px]">
                                Continue to booking for each approved item to finalize your rental dates and complete payment.
                            </div>
                        )}

                        {waitingCount > 0 && (
                            <div className="bg-yellow-50 text-yellow-900 border border-yellow-200 p-3 rounded-md text-[13px]">
                                {waitingCount} item{waitingCount > 1 ? "s" : ""} are waiting for owner approval.
                            </div>
                        )}
                    </div>

                </div>


                <div className="bg-gray-100 p-4 mt-3 mb-10 mr-5 rounded-lg text-gray-700 text-[13px]">
                    <ul className="space-y-1">
                        <li>✓ Secure checkout</li>
                        <li>✓ Fast approval process</li>
                        <li>✓ Owner verification guarantee</li>
                    </ul>
                </div>
            </div>

            {/* RIGHT SCROLLABLE ITEMS LIST */}
            <div className="flex-1 pl-6 pb-20">

                {collectionItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[90vh] w-full">
                        <img src={emptycollection} className="w-64 h-64 mb-3" />
                        <h2 className="text-[22px] font-bold">Your Collection is Empty</h2>
                        <p className="text-gray-500 text-center max-w-sm mb-4">
                            Looks like you haven’t added any items yet.
                        </p>
                        <button
                            onClick={() => navigate("/browse")}
                            className="bg-white border border-[#7A1CA9]/20 text-[#7A1CA9] px-3 py-1.5 text-sm rounded-lg shadow hover:bg-gray-50"
                        >
                            Go to Shop ➔
                        </button>
                    </div>
                ) : (
                    <>

                        {/* Title */}
                        <div className="flex items-center justify-between mb-5 mt-10 mr-5">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                                    <ShoppingBag className="w-8 h-8 text-[#a12fda]" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-purple-900 mt-1">Your Collection</h1>
                                    <p className="text-gray-500 text-sm">Items you gathered for booking</p>
                                </div>
                            </div>

                            {/* Sort beside header */}
                            <SortDropdown
                                options={["Latest", "Oldest"]}
                                onSortChange={(value) => setSortOrder(value.toLowerCase())}
                            />
                        </div>
                        {/* Category Filter Buttons */}
                        <div className="flex gap-2 mb-5">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-2 py-1 rounded-full text-[13px] transition ${filter === "all"
                                    ? "bg-[#7A1CA9] text-white"
                                    : "bg-[#7A1CA9]/10 text-[#7A1CA9] border border-[#7A1CA9]/20 hover:bg-[#7A1CA9]/20"
                                    }`}
                            >
                                All Items ({collectionItems.length})
                            </button>

                            <button
                                onClick={() => setFilter("approved")}
                                className={`px-2 py-1 rounded-full text-[13px] transition ${filter === "approved"
                                    ? "bg-[#7A1CA9] text-white"
                                    : "bg-[#7A1CA9]/10 text-[#7A1CA9] border border-[#7A1CA9]/20 hover:bg-[#7A1CA9]/20"
                                    }`}
                            >
                                Approved ({approvedItems.length})
                            </button>

                            <button
                                onClick={() => setFilter("pending")}
                                className={`px-2 py-1 rounded-full text-[13px] transition ${filter === "pending"
                                    ? "bg-[#7A1CA9] text-white"
                                    : "bg-[#7A1CA9]/10 text-[#7A1CA9] border border-[#7A1CA9]/20 hover:bg-[#7A1CA9]/20"
                                    }`}
                            >
                                Pending ({waitingCount})
                            </button>

                            <button
                                onClick={() => setFilter("notBooked")}
                                className={`px-2 py-1 rounded-full text-[13px] transition ${filter === "notBooked"
                                    ? "bg-[#7A1CA9] text-white"
                                    : "bg-[#7A1CA9]/10 text-[#7A1CA9] border border-[#7A1CA9]/20 hover:bg-[#7A1CA9]/20"
                                    }`}
                            >
                                Not Booked Yet ({notBookedItems.length})
                            </button>
                        </div>

                        <hr className="border-t border-gray-200 mb-4" />

                        <div className="space-y-4">
                            {sortedItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative bg-white shadow-md shadow-gray-100 rounded-2xl p-3 hover:shadow-md transition"
                                >
                                    {/* Item Layout */}
                                    <div className="flex gap-6 relative">
                                        <img
                                            src={item.image}
                                            className="w-36 h-36 bg-gray-100 object-contain rounded-xl"
                                        />

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h2 className="font-semibold text-[16px]">{item.name}</h2>
                                                <div className="text-[13px] mt-1 text-gray-700">
                                                    <div className="flex items-center gap-1">Listed by {item.owner}</div>

                                                    {/* Status Badge */}
                                                    <div
                                                        className={`absolute top-1 right-0 inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full ${item.status === "approved"
                                                            ? "bg-green-200 text-green-800"
                                                            : item.status === "pending"
                                                                ? "bg-yellow-200 text-yellow-800"
                                                                : "bg-gray-200 text-gray-700"
                                                            }`}
                                                    >
                                                        {item.status === "approved" && <CircleCheckBig className="w-3 h-3" />}
                                                        {item.status === "pending" && <Clock className="w-3 h-3" />}
                                                        {item.status !== "approved" && item.status !== "pending" && <CalendarOff className="w-3 h-3" />}

                                                        <span>
                                                            {item.status === "approved"
                                                                ? "Approved"
                                                                : item.status === "pending"
                                                                    ? "Waiting"
                                                                    : "Not Booked Yet"}
                                                        </span>
                                                    </div>


                                                    {/* Delivery + Security Deposit (always show) */}
                                                    <div className="flex justify-between items-start gap-4 mt-2 text-[13px] text-gray-950">
                                                        {/* Left: Date booked (only if booked) / Shipping / Deposit */}
                                                        <div className="flex flex-col gap-1">
                                                            {item.bookedFrom && item.bookedTo && (
                                                                <>
                                                                    <p className="text-[13px] text-gray-900 font-semibold">Date booked</p>
                                                                    <div className="flex items-center gap-1 text-gray-800 mb-3">
                                                                        <Calendar className="w-4 h-4" />
                                                                        <span>{item.bookedFrom} - {item.bookedTo}</span>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {item.status !== "approved" && item.status !== "pending" && (
                                                                <div className="flex items-center gap-1 text-gray-800 text-[13px] mb-3">
                                                                    <Calendar size={15} />
                                                                    {item.daysAvailable || item.days || item.availableDays} days available
                                                                </div>
                                                            )}

                                                            <div className="flex items-center text-[12px] gap-2 text-gray-500 mt-1">
                                                                <div className="flex items-center gap-1">
                                                                    <Truck className="w-4 h-4" />
                                                                    <span>{item.shipping > 0 ? `Delivery (₱${Math.round(item.shipping)})` : "Delivery (Free)"}</span>
                                                                </div>
                                                                <span className="text-[10px] text-gray-400">•</span>
                                                                <div className="flex items-center gap-1">
                                                                    <ShieldAlert className="w-4 h-4" />
                                                                    <span>Security Deposit (₱{item.securityDeposit ?? 0})</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right: Price / Subtotal / Total */}
                                                        <div className="text-right text-[13px] flex flex-col gap-0.5">
                                                            {/* Price per day — always show */}
                                                            <span className="font-bold text-[15px] text-purple-900">₱{item.price}/day</span>

                                                            {/* Only show subtotal and total for approved or pending items */}
                                                            {(item.status === "approved" || item.status === "pending") && (() => {
                                                                const itemTotals = calculateItemTotal(item);
                                                                const totalWithDeposit = itemTotals.total + (item.securityDeposit || 0);
                                                                return (
                                                                    <div className="flex justify-between w-full text-[13px] gap-1">
                                                                        <span className="text-gray-500">
                                                                            Subtotal <span className="text-gray-900">₱{itemTotals.subtotal}</span>
                                                                        </span>
                                                                        <span className="text-gray-500">
                                                                            Total <span className="font-semibold text-gray-900">₱{totalWithDeposit}</span>
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            {/* Buttons */}
                                            <div className="absolute bottom-1 right-0 flex items-center gap-1.5">

                                                {item.status === "approved" || item.status === "pending" ? (
                                                    <button
                                                        onClick={() => openCancelModal(item.id)}
                                                        className="px-4 py-1.5 text-[12.5px] shadow-sm rounded-full text-red-500 border-red-300 bg-red-50 hover:bg-red-100"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="px-4 py-1.5 text-[12.5px] shadow-sm rounded-full text-red-500 border-red-300 bg-red-50 hover:bg-red-100"
                                                    >
                                                        Remove to collection
                                                    </button>
                                                )}

                                                {item.status === "approved" ? (
                                                    <button
                                                        onClick={() => alert(`Contacting owner: ${item.owner}`)}
                                                        className="px-4 py-1.5 text-[12.5px] shadow-md bg-[#7A1CA9] text-white rounded-full flex items-center gap-1 hover:bg-purple-500"
                                                    >
                                                        Message Owner
                                                    </button>
                                                ) : item.status === "pending" ? (
                                                    <button
                                                        onClick={() => navigate(`/edit-booking/${item.id}`)}
                                                        className="px-4 py-1.5 text-[12.5px] shadow-md bg-[#7A1CA9] text-white rounded-full flex items-center gap-1 hover:bg-purple-500"
                                                    >
                                                        Edit Booking Details
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => navigate(`/booking/${item.id}`)}
                                                        className="px-4 py-1.5 text-[12.5px] shadow-md bg-[#7A1CA9] text-white rounded-full flex items-center gap-1 hover:bg-purple-500"
                                                    >
                                                        Continue to Booking
                                                    </button>
                                                )}


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <CancelConfirmationModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={confirmCancelBooking}
            />
        </div>
    );
};

export default CollectionPage;