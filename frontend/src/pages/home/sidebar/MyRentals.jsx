import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CircleCheckBig, CircleOff, Package } from "lucide-react";
import mockListings from "../../../data/mockData";
import sampleUsercollection from "../../../data/sampleUsercollection";
import CancelConfirmationModal from "../../../components/modals/CancelModal";
import { ViewDetailsModal } from "../../../components/modals/ViewDetailsModal";
import SortDropdown from "../../../components/dropdown/SortDropdown";
import { getFakeUser, generateFakeToken } from "../../../utils/fakeAuth";
import RentalCard from "../../../components/cards/RentalCard";

const MyRentalsPage = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedRentalId, setSelectedRentalId] = useState(null);


    const [rentals, setRentals] = useState([]);
    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("latest");

    useEffect(() => {
        document.title = "Hirent — My Rentals";

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

        const collectionData = user.collection?.length ? user.collection : sampleUsercollection;

        const merged = collectionData
            .map(r => {
                const product = mockListings.find(p => p.id === r.id);
                if (!product) return null;

                const parsedPrice = parseFloat(
                    (product.price || "0").toString().replace(/[^0-9.]/g, "")
                );

                return {
                    ...product,
                    ...r,
                    price: parsedPrice,
                    totalAmount: parsedPrice * (r.days || 1),
                    status:
                        r.status && r.status.trim() !== ""
                            ? r.status
                            : (!r.bookedFrom || !r.bookedTo)
                                ? "cancelled"
                                : "pending",
                };
            })
            .filter(Boolean);

        const limited = [];

        const approved = merged.filter(r => r.status === "approved").slice(0, 1);
        const pending = merged.filter(r => r.status === "pending").slice(0, 2);
        const cancelled = merged.filter(r => r.status === "cancelled").slice(0, 1);
        const completed = merged.filter(r => r.status === "completed").slice(0, 1);

        limited.push(...approved, ...pending, ...cancelled, ...completed);

        setRentals(limited);
    }, []);


    const handleCancel = (id) => {
        setRentals(prev =>
            prev.map(item =>
                item.id === id ? { ...item, status: "cancelled" } : item
            )
        );
    };

    const confirmCancel = () => {
        handleCancel(selectedId);
        setShowModal(false);
        setSelectedId(null);
    };


    const filtered = rentals.filter((r) => {
        if (filter === "approved") return r.status === "approved";
        if (filter === "pending") return r.status === "pending";
        if (filter === "cancelled") return r.status === "cancelled";
        if (filter === "completed") return r.status === "completed";

        return true; // all
    });

    const sorted = [...filtered].sort((a, b) => {
        const aDate = new Date(a.bookedFrom || a.addedAt || Date.now());
        const bDate = new Date(b.bookedFrom || b.addedAt || Date.now());
        return sortOrder === "latest" ? bDate - aDate : aDate - bDate;
    });

    return (
        <div className="flex min-h-screen px-4 md:px-6 lg:px-8">

            {/* LEFT STATIC COLUMN */}
            <div className="w-[560px] pl-16 flex-shrink-0 sticky top-10 self-start h-fit bg-gray-50 border-r border-gray-200">

                {/* Back + Sort in one row */}
                <div className="flex items-center justify-between mb-3 mt-10">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Go back
                    </button>


                </div>


                {/* MY RENTALS TITLE */}
                <div className="flex items-start gap-4 mb-5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                        <Package className="w-8 h-8 text-[#a12fda]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-purple-900 mt-1 ">
                            My Rentals
                        </h1>
                        <p className="text-gray-500 text-sm mr-4">View and manage your booked items</p>
                    </div>

                    <div className="mt-4">
                        <SortDropdown
                            options={["Latest", "Oldest"]}
                            onSortChange={(value) => setSortOrder(value.toLowerCase())}
                        />
                    </div>

                </div>

                {/* CATEGORY FILTER BUTTONS */}
                <div className="flex flex-wrap gap-2 mb-4 mr-5">
                    {["all", "approved", "pending", "cancelled", "completed"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-2 py-1 rounded-full text-[13px] transition ${filter === cat
                                ? "bg-[#7A1CA9] text-white"
                                : "bg-[#7A1CA9]/10 text-[#7A1CA9] border border-[#7A1CA9]/20 hover:bg-[#7A1CA9]/20"
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)} (
                            {rentals.filter(r => cat === "all" ? true : r.status === cat).length})
                        </button>
                    ))}
                </div>

                {/* RENTAL SUMMARY BOX */}
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm space-y-1 mr-5">
                    <h2 className="font-semibold text-[16px] mb-2">Rental Summary</h2>

                    <div className="flex items-center text-gray-600 mb-1 gap-1.5">
                        <Package className="w-4 h-4" />

                        <p className="text-[13px]">
                            {rentals.filter(r => r.status === "completed").length}{" "}
                            item
                            {rentals.filter(r => r.status === "completed").length > 1 ? "s" : ""} rented
                        </p>
                    </div>


                    {/* Status Breakdown */}
                    <div className="flex flex-col gap-1 ml-4  text-[13px]">

                        {rentals.filter(r => r.status === "approved").length > 0 && (
                            <div className="flex items-center gap-1.5 text-green-700">
                                <CircleCheckBig className="w-3 h-3" />
                                <span>{rentals.filter(r => r.status === "approved").length} approved</span>
                            </div>
                        )}

                        {rentals.filter(r => r.status === "pending").length > 0 && (
                            <div className="flex items-center gap-1.5 text-yellow-700">
                                <Clock className="w-3 h-3" />
                                <span>{rentals.filter(r => r.status === "pending").length} pending</span>
                            </div>
                        )}

                        {rentals.filter(r => r.status === "cancelled").length > 0 && (
                            <div className="flex items-center gap-1.5 text-red-700">
                                <CircleOff className="w-3 h-3" />
                                <span>{rentals.filter(r => r.status === "cancelled").length} cancelled</span>
                            </div>
                        )}

                    </div>


                    <hr className="my-3" />
                    {/* Approved Items */}
                    {rentals.filter(r => r.status === "approved").length > 0 && (
                        <div className="text-[13px] space-y-1 pb-2">
                            <p className="font-semibold mt-3 mb-2">Approved Rentals</p>
                            {rentals
                                .filter(r => r.status === "approved")
                                .map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span>₱{item.price}</span>
                                    </div>
                                ))}
                        </div>
                    )}

                    {rentals.filter(r => r.status === "pending").length > 0 && (
                        <div className="text-[13px] space-y-1 pb-2">
                            <p className="font-semibold mt-3 mb-2">Pending Rentals</p>
                            {rentals
                                .filter(r => r.status === "pending")
                                .map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span>₱{item.price}</span>
                                    </div>
                                ))}
                        </div>
                    )}

                    {/* Totals Section */}
                    <div className="text-[13px] space-y-1 pt-3  border-t border-gray-200">

                        {/** Calculate totals for completed rentals */}
                        {(() => {
                            const completedRentals = rentals.filter(r => r.status === "completed");

                            const subtotal = completedRentals.reduce((sum, item) => {
                                const pricePerDay = Number((item.price || 0));
                                const days = item.days || 1;
                                return sum + pricePerDay * days;
                            }, 0);

                            const totalShipping = completedRentals.reduce((sum, item) => {
                                return sum + (item.shipping || 0);
                            }, 0);

                            const totalCoupon = completedRentals.reduce((sum, item) => {
                                const discountPercent = item.couponDiscount || 0;
                                const pricePerDay = Number((item.price || 0));
                                const days = item.days || 1;
                                return sum + (pricePerDay * days * discountPercent) / 100;
                            }, 0);

                            const totalSecurity = completedRentals.reduce((sum, item) => sum + (item.securityDeposit || 0), 0);

                            const total = subtotal + totalShipping + totalSecurity - totalCoupon;

                            return (
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <span>Subtotal of Completed Items</span>
                                        <span>₱{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Coupon Discounts Used</span>
                                        <span>-₱{totalCoupon.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Security Deposit Used</span>
                                        <span>₱{totalSecurity.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 pb-2">
                                        <span>Total Expense</span>
                                        <span>₱{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>


                    {/* Info Box */}
                    <div className="space-y-3">
                        <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 rounded-md text-[13px]">
                            Your rental status updates appear here.
                        </div>
                    </div>
                </div>

                {/* FOOTER INFO */}
                <div className="bg-purple-100 p-4 mt-3 mb-10 mr-5 rounded-lg text-purple-700 text-[13px]">
                    <ul className="space-y-1">
                        <li>✓ View and manage all your booked items in one place</li>
                        <li>✓ Keep track of rental status (pending, approved, completed, cancelled)</li>
                        <li>✓ Get notified of updates and messages from owners</li>
                        <li>✓ Re-book completed rentals easily</li>
                    </ul>
                </div>


            </div>

            {/* RIGHT COLUMN — RENTALS LIST */}
            <div className="flex-1 pl-6 pb-20 pt-10">

                {/* RENTAL CARDS */}
                <div className="grid grid-cols-1 gap-4">
                    {sorted.map((item) => (
                        <RentalCard
                            key={item.id}
                            item={item}
                            onViewDetails={(id) => {
                                setSelectedRentalId(id);
                                setDetailsModalOpen(true);
                            }}
                            onRemove={(id) =>
                                setRentals((prev) => prev.filter((r) => r.id !== id))
                            }
                            onCancel={(id) => {
                                setSelectedId(id);
                                setShowModal(true);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* MODALS */}
            <CancelConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmCancel}
            />

            <ViewDetailsModal
                isOpen={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                rentalData={rentals}
                itemId={selectedRentalId}
            />
        </div>
    );

};

export default MyRentalsPage;
