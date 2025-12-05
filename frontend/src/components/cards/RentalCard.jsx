// for items
import React from "react";
import {
    Calendar,
    MapPin,
    Eye,
    User,
    MessageCircle,
    CalendarPlus,
    CircleOff,
    BadgeCheck,
    CircleCheckBig,
    ClockFading,
} from "lucide-react";
import mockListings from "../../data/mockData";

const RentalCard = ({
    item,
    onViewDetails,
    onRemove,
    onCancel,
}) => {

    // calculate total
    const calculateTotal = () => {
        const listing = mockListings.find(l => l.id === item.id);

        const pricePerDay = listing
            ? Number((listing.price || "₱0").toString().replace(/[^\d.]/g, ""))
            : 0;

        let daysCount = item.days || 1;
        if (item.bookedFrom && item.bookedTo) {
            const from = new Date(item.bookedFrom);
            const to = new Date(item.bookedTo);
            const msPerDay = 1000 * 60 * 60 * 24;
            const diff = Math.floor((to - from) / msPerDay) + 1;
            daysCount = diff > 0 ? diff : daysCount;
        }

        const shippingFee =
            typeof item.shipping === "number"
                ? item.shipping
                : listing?.shipping || 0;

        const discountPercent =
            typeof item.couponDiscount === "number"
                ? item.couponDiscount
                : listing?.couponDiscount || 0;

        const securityDeposit = item.securityDeposit || 0;
        const subtotal = pricePerDay * daysCount;
        const discountAmount = (subtotal * discountPercent) / 100;
        const total = subtotal - discountAmount + shippingFee + securityDeposit;

        return total.toFixed(2);
    };

    // count days
    const countDays = () => {
        if (!item.bookedFrom || !item.bookedTo) return `${item.days || 1} day`;
        const from = new Date(item.bookedFrom);
        const to = new Date(item.bookedTo);
        const diff = Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;
        return `${diff} day${diff > 1 ? "s" : ""}`;
    };


    return (
        <div className="relative bg-white rounded-2xl border border-gray-100 p-4 shadow-sm shadow-gray-100 hover:shadow-md transition">

            {/* STATUS BADGE */}
            <span
                className={`absolute top-4 right-4 px-2 py-1 rounded-full text-[12.5px] font-medium flex items-center gap-1 
                    ${item.status === "approved" ? "bg-purple-100 text-purple-700" :
                        item.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                            item.status === "cancelled" ? "bg-red-100 text-red-700" :
                                "bg-green-100 text-green-700"}`}
            >
                {item.status === "approved" && <BadgeCheck className="w-4 h-4" />}
                {item.status === "pending" && <ClockFading className="w-4 h-4" />}
                {item.status === "cancelled" && <CircleOff className="w-4 h-4" />}
                {item.status === "completed" && <CircleCheckBig className="w-4 h-4" />}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>

            {/* CARD CONTENT */}
            <div className="flex gap-5">

                {/* IMAGE */}
                <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                        src={item.image}
                        className="w-32 h-32 object-cover rounded-lg"
                        alt={item.name}
                    />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h2 className="font-semibold text-[16px]">{item.name}</h2>
                        <span className="text-xs font-medium px-1 bg-purple-100 text-purple-600 rounded-md border">
                            {item.category}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-[13px]">

                        <div className="flex items-center gap-1 text-gray-600">
                            <User className="w-4 h-4" />
                            <p className="text-gray-600">
                                Listed by {item.owner}
                            </p>
                        </div>

                        <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {mockListings.find(l => l.id === item.id)?.location || "Unknown"}
                        </div>
                    </div>

                    {/* DATE & LOCATION */}
                    <div className="mt-3 mb-3 flex items-center gap-14 text-[13px] text-gray-900">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {item.bookedFrom
                                    ? new Date(item.bookedFrom).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                    : "-"}
                                {" – "}
                                {item.bookedTo
                                    ? new Date(item.bookedTo).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                    : "-"}
                            </div>

                            {item.bookedFrom && item.bookedTo && (
                                <div className="flex items-center gap-1 text-yellow-600">
                                    <ClockFading className="w-4 h-4" />
                                    {countDays()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className="mt-2 flex items-center gap-12">
                        <div>
                            <p className="text-[13px] text-gray-500">Rent per day</p>
                            <p className="text-[16px] font-bold text-purple-900">₱{item.price}</p>
                        </div>

                        {item.status !== "cancelled" && (
                            <div>
                                <p className="text-[13px] text-gray-500">Total amount</p>
                                <p className="font-bold text-[16px] text-[#7A1CA9]">
                                    ₱{calculateTotal()}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* BUTTONS — fixed to BOTTOM RIGHT */}
                    <div className="flex items-center gap-2 justify-end ">
                        {(item.status === "approved" || item.status === "pending") && (
                            <>
                                <button
                                    onClick={() => onViewDetails(item.id)}
                                    className="px-3 py-1.5 text-[13px] border rounded-full font-medium flex items-center hover:bg-gray-50"
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View More Details
                                </button>

                                <button className="px-3 py-1.5 text-[13px]  border rounded-full font-medium flex items-center hover:bg-gray-50">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Message Owner
                                </button>
                            </>
                        )}

                        {item.status === "cancelled" && (
                            <button
                                onClick={() => onRemove(item.id)}
                                className="px-3 py-1.5 text-[13px]  border rounded-full text-red-500 border-red-300 bg-red-50 hover:bg-red-100"
                            >
                                Remove
                            </button>
                        )}

                        {item.status === "completed" && (
                            <>
                                <button
                                    onClick={() => alert(`Re-renting ${item.name}`)}
                                    className="px-3 py-1.5 text-[13px]  border rounded-full font-medium flex items-center hover:bg-gray-50"
                                >
                                    <CalendarPlus className="w-4 h-4 mr-1" />
                                    Book Again
                                </button>

                                <button className="px-3 py-1.5 text-[13px]  border rounded-full font-medium flex items-center hover:bg-gray-50">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Message Owner
                                </button>
                            </>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default RentalCard;