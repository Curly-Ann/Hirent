import { CreditCard, Wallet, BanknoteArrowDown, Plus, Pencil, Trash2, X } from "lucide-react";
import React, { useState } from "react";

import PaymentMethodModal from "../modals/PaymentMethodModal";

import gcashLogo from "../../assets/payment/gcash-logo.png";
import mayaLogo from "../../assets/payment/maya-logo.jpg";
import paypalLogo from "../../assets/payment/paypal-logo.png";

import bpi from "../../assets/payment/bpi.png";
import bdo from "../../assets/payment/bdo.png";
import metrobank from "../../assets/payment/logo-metrobank.png";
import landbank from "../../assets/payment/logo-landbank.png";

export function PaymentMethodsComponent({ paymentMethods, setPaymentMethods }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMethod, setEditingMethod] = useState(null);
    const [form, setForm] = useState({
        type: "",
        cardNumber: "",
        cardName: "",
        bankName: "",
        accountNumber: "",
        provider: "",
        providerAccount: "",
    });

    const allUsed = paymentMethods.length >= 3;


    function openModal(method = null) {
        if (!method) {
            setEditingMethod(null);
            setForm({
                type: "",
                cardNumber: "",
                cardName: "",
                bankName: "",
                accountNumber: "",
                provider: "",
                providerAccount: "",
            });
        } else {
            // Edit mode
            setEditingMethod(method);
            setForm({ ...method });
        }

        setIsModalOpen(true);
    }


    function closeModal() {
        setIsModalOpen(false);
    }

    function savePaymentMethod(e) {
        e.preventDefault();

        const isDuplicateType = paymentMethods.some(
            (m) => m.type === form.type && (!editingMethod || editingMethod.type !== form.type)
        );

        if (isDuplicateType) {
            alert(`You already added a ${form.type} payment method.`);
            return;
        }

        if (editingMethod) {
            setPaymentMethods((prev) =>
                prev.map((m) =>
                    m.id === editingMethod.id ? { ...m, ...form } : m
                )
            );
        } else {
            setPaymentMethods((prev) => [
                ...prev,
                { ...form, id: Date.now() }
            ]);
        }

        closeModal();
    }


    function remove(id) {
        setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
    }

    function getLogo(provider) {
        switch (provider) {
            case "GCash":
                return gcashLogo;
            case "Maya":
                return mayaLogo;
            case "PayPal":
                return paypalLogo;
            default:
                return null;
        }
    }

    function getBankLogo(bank) {
        switch (bank) {
            case "BPI":
                return { src: bpi, width: "w-12" };
            case "BDO":
                return { src: bdo, width: "w-12" };
            case "Metrobank":
                return { src: metrobank, width: "w-20" };
            case "Landbank":
                return { src: landbank, width: "w-20" };
            default:
                return { src: null, width: "w-16" };
        }
    }


    function getIcon(type) {
        switch (type) {
            case "Card":
                return <CreditCard size={20} />;
            case "Bank":
                return <BanknoteArrowDown size={20} />;
            case "Online":
                return <Wallet size={20} />;
            default:
                return <CreditCard size={20} />;
        }
    }

    return (
        <div className="relative flex justify-center">
            <div
                className={`${isModalOpen ? "filter blur-sm pointer-events-none" : ""} w-full max-w-7xl ml-[-40px] mr-12 collection-scale`}
            >
                <div className="bg-white  text-purple-900   rounded-2xl shadow-lg p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                            <Wallet className="w-10 h-10 text-[#7A1CA9]" />
                        </div>
                        <div>
                            <h1 className="text-[26px] font-bold mt-1">Payment Methods</h1>
                            <p className="text-[16px] text-gray-500">Manage your saved payment methods.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="relative border rounded-xl p-6 flex flex-col gap-3">
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                        onClick={() => openModal(method)}
                                        className="px-3 py-1 border rounded-lg shadow-sm text-sm flex items-center gap-1"
                                    >
                                        <Pencil size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => remove(method.id)}
                                        className="px-3 py-1 border rounded-lg shadow-sm border-red-500 text-red-600 text-sm flex items-center gap-1"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 font-semibold text-lg">
                                    {method.type === "Card" && (
                                        <>
                                            {getIcon(method.type)}
                                            <span>{method.type}</span>
                                            <span>• </span>
                                            <span className="bg-purple-50 rounded-lg py-0.5 px-2 font-mono text-gray-700 text-lg">
                                                {method.cardNumber?.replace(/\d{4}(?=\d)/g, "$& ")}
                                            </span>
                                        </>
                                    )}

                                    {method.type === "Bank" && (
                                        <div className="flex items-center gap-2 font-semibold text-lg">
                                            {getIcon(method.type)}
                                            <span>Bank</span>
                                            <span>•</span>

                                            {(() => {
                                                const bank = getBankLogo(method.bankName);
                                                return (
                                                    <img
                                                        src={bank.src}
                                                        alt={method.bankName}
                                                        className={`${bank.width} object-contain`}
                                                    />
                                                );
                                            })()}
                                        </div>
                                    )}

                                    {method.type === "Online" && (
                                        <div className="mt-1">
                                            <div className="flex items-center gap-2 font-semibold text-lg">
                                                {getIcon(method.type)}
                                                <span>{method.type}</span>
                                                <span>•</span>
                                                <img src={getLogo(method.provider)} alt={method.provider} className="w-16 object-contain" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {method.type === "Card" && (
                                    <div className="text-gray-700 text-sm">Card Name: {method.cardName}</div>
                                )}

                                {method.type === "Bank" && (
                                    <div className="text-gray-700 text-sm">Account Number: {method.accountNumber}</div>
                                )}

                                {method.type === "Online" && (
                                    <div className="text-gray-700 text-sm">Account: {method.accountNumber}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (allUsed) {
                                alert("You already added all available payment methods.");
                                return;
                            }
                            openModal();
                        }}
                        className={`mt-6 flex items-center gap-2 px-4 py-2 border rounded-lg text-sm ${allUsed ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <Plus size={18} /> Add Payment Method
                    </button>
                </div>
            </div>

            <PaymentMethodModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                savePaymentMethod={savePaymentMethod}
                editingMethod={editingMethod}
                form={form}
                setForm={setForm}
                paymentMethods={paymentMethods}
            />

        </div>
    );
}
