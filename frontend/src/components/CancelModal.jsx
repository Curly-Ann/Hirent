import React from "react";

const CancelConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md py-6 px-7">
                <h2 className="text-[16px] font-semibold mb-2">Cancel Booking</h2>

                <p className="text-gray-600 mb-6 text-[13px]">
                    Are you sure you want to cancel this booking? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="text-[12px] px-2.5 py-1.5 font-medium  border rounded-lg hover:bg-gray-50"
                    >
                        Keep Booking
                    </button>

                    <button
                        onClick={onConfirm}
                        className="text-[12px] px-2.5 py-1.5 font-medium rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Yes, Cancel Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelConfirmationModal;
