import React from "react";
import { X, CheckCircle2, Package, Truck, Clock } from "lucide-react";

export default function DeliveryTrackingModal({ isOpen, onClose, trackingData }) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 z-50  flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl cart-scale shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-gray-900 font-semibold text-[16px]">Delivery Tracking</h2>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Delivery Timeline */}
                    <div className="space-y-4">
                        {trackingData.steps.map((step, index) => {
                            const isCompleted = index < trackingData.currentStep;
                            const isCurrent = index === trackingData.currentStep;
                            const Icon = step.icon;

                            return (
                                <div key={index} className="flex items-center text-[14px] gap-4">
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted ? "bg-[#7A1CA9] text-white" : "bg-gray-200 text-gray-400"
                                            } ${isCurrent ? "ring-4 ring-purple-100" : ""}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className={`${isCompleted || isCurrent ? "text-gray-900" : "text-gray-500"}`}>
                                            {step.label}
                                        </p>

                                        {isCurrent && trackingData.estimatedDate && (
                                            <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                                                <Clock className="w-3 h-3 opacity-65" />
                                                <span>Est. {trackingData.estimatedDate}</span>
                                            </div>
                                        )}

                                        {/* Show confirmation and preparing dates */}
                                        {trackingData.confirmedAt && step.key === "pending" && (
                                            <p className="text-gray-500 text-xs mt-1">Confirmed on: {trackingData.confirmedAt}</p>
                                        )}
                                        {trackingData.preparingAt && step.key === "preparing" && (
                                            <p className="text-gray-500 text-xs mt-1">Started preparing on: {trackingData.preparingAt}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Current Location & Courier Info */}
                    <div className="mt-5 space-y-2 text-[14px] text-gray-700">
                        <div>
                            <p className="text-gray-500 mb-0.5">Current Location</p>
                            <p className="text-gray-800">{trackingData.currentLocation}</p>
                        </div>
                        <hr />
                        {trackingData.courier && (
                            <div>
                                <p className="text-gray-500 mb-0.5">Courier</p>
                                <p className="text-gray-800">{trackingData.courier}</p>
                            </div>
                        )}
                    </div>

                    {/* Optional Map */}
                    {trackingData.mapUrl && (
                        <div className="mt-4">
                            <iframe
                                src={trackingData.mapUrl}
                                className="w-full h-48 rounded-lg"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
