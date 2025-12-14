import React, { useState } from "react";
import { makeAPICall } from "../config/api";

export default function ReportModal({ isOpen, onClose, reportedType, reportedId }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Please select a reason");
      return;
    }

    setLoading(true);
    try {
      const reportData = {
        reportType: reportedType,
        reason,
        description,
      };

      if (reportedType === "user") {
        reportData.reportedUserId = reportedId;
      } else if (reportedType === "item") {
        reportData.reportedItemId = reportedId;
      } else if (reportedType === "booking") {
        reportData.reportedBookingId = reportedId;
      }

      await makeAPICall("/api/reports", {
        method: "POST",
        body: JSON.stringify(reportData),
      });

      setSubmitted(true);
      setTimeout(() => {
        setReason("");
        setDescription("");
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Report {reportedType}</h2>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <p className="text-gray-700 font-semibold">Report submitted successfully</p>
            <p className="text-gray-600 text-sm mt-2">Our team will review it shortly</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Reason for report
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason...</option>
                <option value="inappropriate_content">Inappropriate content</option>
                <option value="fraud">Fraud or scam</option>
                <option value="harassment">Harassment or abuse</option>
                <option value="damaged_item">Damaged or missing item</option>
                <option value="policy_violation">Policy violation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about your report..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
