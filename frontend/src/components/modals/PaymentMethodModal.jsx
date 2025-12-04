import React from "react";
import { X } from "lucide-react";

import ProviderDropdown from "../dropdown/ProviderDropdown";
import TypeDropdown from "../dropdown/TypeDropdown";
import BankProviderDropdown from "../dropdown/BankProviderDropdown";

export default function PaymentMethodModal({
    isOpen,
    closeModal,
    savePaymentMethod,
    editingMethod,
    form,
    setForm,
    paymentMethods,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="collection-scale mt-20 rounded-2xl w-full max-w-4xl relative shadow-lg bg-white  text-purple-900   overflow-hidden">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <div className="p-6">
                    <h2 className="text-xl font-bold">
                        {editingMethod ? "Edit Payment Method" : "Add Payment Method"}
                    </h2>
                </div>

                <div className="border-t border-gray-200"></div>

                <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 p-6">
                    <form onSubmit={savePaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* TYPE */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <TypeDropdown
                                value={form.type}
                                usedTypes={
                                    editingMethod
                                        ? paymentMethods
                                            .filter((m) => m.id !== editingMethod.id)
                                            .map((m) => m.type)
                                        : paymentMethods.map((m) => m.type)
                                }
                                onChange={(val) => {
                                    if (
                                        paymentMethods.some(
                                            (m) =>
                                                m.type === val &&
                                                (!editingMethod || m.id !== editingMethod.id)
                                        )
                                    ) {
                                        alert(`You already added a ${val} method.`);
                                        return;
                                    }
                                    setForm({ ...form, type: val });
                                }}
                            />
                        </div>

                        {/* PROVIDER — Online Mode Only */}
                        {form.type === "Online" && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Provider</label>
                                <ProviderDropdown
                                    value={form.provider}
                                    onChange={(val) => setForm({ ...form, provider: val })}
                                />
                            </div>
                        )}

                        {/* CARD FIELDS */}
                        {form.type === "Card" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Card Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.cardName}
                                        onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                                        className="border px-3 py-2 rounded w-full bg-white  text-purple-900  "
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={form.cardNumber}
                                        onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                                        className="w-full border px-3 py-2 rounded-md bg-white  text-purple-900  "
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* BANK FIELDS */}
                        {form.type === "Bank" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Bank Provider</label>
                                    <BankProviderDropdown
                                        value={form.bankName}
                                        onChange={(val) => setForm({ ...form, bankName: val })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Account Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234567890"
                                        value={form.accountNumber}
                                        onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                                        className="w-full border px-3 py-2 rounded-md bg-white  text-purple-900  "
                                        required
                                    />
                                </div>
                            </>
                        )}


                        {/* ONLINE ACCOUNT NUMBER */}
                        {form.type === "Online" && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Account Number</label>
                                <input
                                    type="text"
                                    placeholder="09XXXXXXXXX / your@email.com"
                                    value={form.accountNumber}
                                    onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                                    className="w-full border px-3 py-2 rounded-md bg-white  text-purple-900  "
                                    required
                                />
                            </div>
                        )}

                        {/* INFO NOTE */}
                        {form.type === "Online" && (
                            <div className="md:col-span-2 mt-2 p-3 rounded-lg bg-purple-100 border border-purple-300 text-purple-600 text-[15px]">
                                This online payment method is linked to a third-party provider.
                            </div>
                        )}

                        {form.type === "Card" && (
                            <div className="md:col-span-2 mt-2 p-3 rounded-lg bg-purple-100 border border-purple-300 text-purple-600 text-[15px]">
                                Your card details are securely stored and processed through the payment gateway.
                            </div>
                        )}

                        {form.type === "Bank" && (
                            <div className="md:col-span-2 mt-2 p-3 rounded-lg bg-purple-100 border border-purple-300 text-purple-600 text-[15px]">
                                Your bank account details are securely stored and verified for transactions.
                            </div>
                        )}


                        {/* SAVE BUTTON */}
                        <div className="md:col-span-2 text-right mt-2">
                            <button
                                type="submit"
                                className="px-5 py-2 text-[15px] border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-purple-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
