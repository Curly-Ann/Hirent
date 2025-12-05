import React from "react";
import { Mail, Phone, MapPin, User, Mars, Venus, UserMinus, Wallet, Package, MessageCircle } from "lucide-react";

export default function PersonalInformation({ form, setForm, handleSave }) {
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    function handleGender(g) {
        setForm((s) => ({ ...s, gender: g }));
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] mr-16 ml-4 gap-8">

            {/* LEFT: Form container */}
            <div className="bg-white   collection-scale rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                        <User className="w-10 h-10 text-[#7A1CA9]" />
                    </div>

                    <div>
                        <h1 className="text-[26px] font-bold text-purple-900  mt-1">Personal Information</h1>
                        <p className="text-[16px] text-gray-500">
                            Update your account details.
                        </p>
                    </div>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSave}>

                    {/* First & Last Name – 2 equal boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <div className="relative">
                                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="w-full border bg-gray-50 rounded-lg px-10 py-2"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <div className="relative">
                                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="w-full border bg-gray-50 rounded-lg px-10 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email – full width */}
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <div className="relative">
                            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border bg-gray-50 rounded-lg px-10 py-2"
                            />
                        </div>
                    </div>

                    {/* Phone & Address – 2 equal boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <div className="relative">
                                <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full border bg-gray-50 rounded-lg px-10 py-2"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <div className="relative">
                                <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full border bg-gray-50 rounded-lg px-10 py-2"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Gender */}
                    <div>
                        <div className="text-sm font-medium mb-1">Gender</div>
                        <div className="flex gap-3">
                            {[{ id: "male", icon: Mars }, { id: "female", icon: Venus }, { id: "na", icon: UserMinus }].map((g) => (
                                <button
                                    key={g.id}
                                    type="button"
                                    onClick={() => handleGender(g.id)}
                                    className={`flex-1 p-6 rounded-xl border shadow-sm flex items-center justify-center gap-2 ${form.gender === g.id
                                        ? "bg-gradient-to-r from-[#a052db] to-[#7A1CA9] text-white"
                                        : "bg-white  text-purple-900  "
                                        }`}
                                >
                                    <g.icon size={22} /> {g.id === "na" ? "Prefer not to say" : g.id.charAt(0).toUpperCase() + g.id.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 justify-end pt-5">
                        <button type="submit" className="px-6 py-1 text-[15px] border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-purple-600 hover:bg-purple-50">
                            Save
                        </button>
                        <button type="button" onClick={() => window.location.reload()} className="px-6 py-2 rounded-lg text-[15px] border">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* RIGHT: Account Summary sidebar */}
            <aside className="bg-white collection-scale rounded-2xl shadow-sm p-6 sticky h-fit">
                <h3 className="font-semibold text-[18px] mb-4">Account Summary</h3>

                <div className="text-sm text-gray-600 space-y-3">
                    <div className="flex justify-between items-center text-[15px]">
                        <span className="flex items-center space-x-2.5">
                            <Package className="text-green-500" size={18} /> {/* Active Rentals Icon */}
                            <span>Active rentals</span>
                        </span>
                        <span className="font-medium">5</span> {/* Update this value dynamically based on rentals */}
                    </div>

                    <div className="flex justify-between items-center text-[15px]">
                        <span className="flex items-center space-x-2.5">
                            <Wallet className="text-yellow-500" size={16} /> {/* Total Expense Icon */}
                            <span>Total expense</span>
                        </span>
                        <span className="font-medium">₱3,100.00</span> {/* Update the expense dynamically */}
                    </div>

                    <div className="flex justify-between items-center text-[15px]">
                        <span className="flex items-center space-x-2.5">
                            <MessageCircle className="text-blue-500" size={16} /> {/* Pending Messages Icon */}
                            <span>Pending messages</span>
                        </span>
                        <span className="font-medium">3</span> {/* This can be dynamic too */}
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#a052db] to-[#7A1CA9] text-white font-medium">
                        Go to My Rentals
                    </button>
                    <button className="w-full py-2.5 rounded-lg border">
                        Contact Support
                    </button>
                </div>
            </aside>
        </div>
    );
}
