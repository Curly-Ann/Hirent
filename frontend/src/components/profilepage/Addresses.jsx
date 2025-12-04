import { MapPin, MapPinned, Pencil, Trash2, Phone, Home, Building2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import AddressModal from "../modals/AddressModal";

export function AddressesComponent({ addresses, setAddresses }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [form, setForm] = useState({ label: "", phone: "", details: "" });

  function openModal(addr = null) {
    if (addr) {
        const lines = addr.details.split("\n"); // Split multiline details
        setEditingAddress(addr);
        setForm({
            label: addr.label || "",
            specify: addr.specify || "",
            phone: addr.phone || "",
            street: lines[0] || "",
            unit: lines[1] || "",
            barangay: lines[2]?.split(",")[0] || "",
            city: lines[2]?.split(",")[1]?.trim() || "",
            province: lines[3] || "",
            region: "", // optional
            postalCode: lines[3]?.split(",")[1]?.trim() || "",
            country: "Philippines",
        });
    } else {
        setEditingAddress(null);
        setForm({
            label: "",
            specify: "",
            phone: "",
            street: "",
            unit: "",
            barangay: "",
            city: "",
            province: "",
            region: "",
            postalCode: "",
            country: "Philippines",
        });
    }
    setIsModalOpen(true);
}


    function closeModal() {
        setIsModalOpen(false);
    }

    function saveAddress(e) {
    e.preventDefault();

    // Build details string from form fields
    const details = [
        form.street,
        form.unit,
        `${form.barangay}, ${form.city}`,
        form.province,
        form.region,
        form.country
    ]
        .filter(Boolean) // Remove empty lines
        .join("\n");

    if (editingAddress) {
        setAddresses((prev) =>
            prev.map((a) =>
                a.id === editingAddress.id ? { ...a, ...form, details } : a
            )
        );
    } else {
        setAddresses((prev) => [
            ...prev,
            { ...form, id: Date.now(), isDefault: false, details },
        ]);
    }
    closeModal();
}


    function setDefault(id) {
        setAddresses((prev) =>
            prev.map((a) => ({ ...a, isDefault: a.id === id }))
        );
    }

    function remove(id) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    }

    return (
        <div className="relative flex justify-center">
            {/* Adjust spacing: smaller gap on left, extra on right */}
            <div
                className={`${isModalOpen ? "filter blur-sm pointer-events-none" : ""} w-full max-w-7xl ml-[-40px] mr-12 collection-scale`}
            >
                <div className="bg-white  text-purple-900   rounded-2xl shadow-lg p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                            <MapPinned className="w-10 h-10 text-[#7A1CA9]" />
                        </div>
                        <div>
                            <h1 className="text-[26px] font-bold mt-1">Addresses</h1>
                            <p className="text-[16px] text-gray-500">
                                Manage your saved delivery or rental locations.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {addresses.map((addr) => {
                            const Icon = addr.label.toLowerCase() === "home" ? Home : Building2;

                            return (
                                <div
                                    key={addr.id}
                                    className={`relative border rounded-xl p-5 flex flex-col gap-3 ${addr.isDefault ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white  text-purple-900  "}`}
                                >
                                    {/* Top-right badge / set default */}
                                    <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-20">
                                        {addr.isDefault ? (
                                            <div className="bg-purple-600 text-white text-xs font-semibold rounded-full px-3 py-1">
                                                Default Address
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDefault(addr.id)}
                                                className="px-3 py-1 border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-sm text-purple-600 hover:bg-purple-50"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                    </div>

                                    {/* Buttons (Edit, Delete) */}
                                    <div className="absolute bottom-3 right-3 flex gap-2 z-20">
                                        <button
                                            onClick={() => openModal(addr)}
                                            className="px-3 py-1 bg-white  text-purple-900   border border-purple-200 rounded-lg shadow-sm text-sm flex items-center gap-1"
                                            title="Edit"
                                        >
                                            <Pencil size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => remove(addr.id)}
                                            className="px-3 py-1 border rounded-lg shadow-sm border-red-500 text-red-600 text-sm flex items-center gap-1"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>

                                    {/* Label with dynamic icon */}
                                    <div className="flex items-center gap-2 font-semibold text-lg">
                                        <Icon size={20} />
                                        <span className="text-[17px]">{addr.label}</span>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-2 text-[15px] text-gray-700">
                                        <Phone size={18} /> + 63
                                        <span className="-ml-0.5">{addr.phone || "917 123 4567"}</span>
                                    </div>

                                    {/* Full address multiline with icon on first line */}
                                    <div className="flex items-start gap-2 text-gray-700 text-[15px] leading-relaxed">
                                        <MapPin size={18} className="mt-1" />
                                        <div className="whitespace-pre-line">{addr.details}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => openModal()}
                        className="mt-6 flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
                    >
                        <Plus size={18} /> Add Address
                    </button>
                </div>
            </div>

           <AddressModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                saveAddress={saveAddress}
                editingAddress={editingAddress}
                form={form}
                setForm={setForm}
            />

        </div>
    );
}
