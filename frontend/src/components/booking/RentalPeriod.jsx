import React from 'react';

const RentalPeriod = ({ rentalData, setRentalData }) => {

  const handleStartDateChange = (e) => {
    const start = e.target.value;

    setRentalData((prev) => ({ ...prev, startDate: start }));

    // If we already have a duration → auto-set end date
    if (rentalData.durationValue > 0) {
      autoComputeEndDate(start, rentalData.durationValue, rentalData.durationType);
    }
  };

  // ---------------------------------------------------------
  // 2. Update End Date
  // ---------------------------------------------------------
  const handleEndDateChange = (e) => {
    const end = e.target.value;

    setRentalData((prev) => ({ ...prev, endDate: end }));

    // auto compute duration based on start/end
    if (rentalData.startDate && end) {
      computeDurationFromDates(rentalData.startDate, end);
    }
  };

  // ---------------------------------------------------------
  // AUTO SET END DATE FROM DURATION
  // ---------------------------------------------------------
  const autoComputeEndDate = (startDate, value, type) => {
    if (!startDate) return;

    const start = new Date(startDate);
    const end = new Date(start);

    if (type === "days") end.setDate(start.getDate() + value);
    if (type === "weeks") end.setDate(start.getDate() + value * 7);
    if (type === "months") end.setMonth(start.getMonth() + value);

    setRentalData((prev) => ({
      ...prev,
      endDate: end.toISOString().split("T")[0],
      days: calculateDays(start, end),
    }));
  };

  // ---------------------------------------------------------
  // AUTO SET DAYS BASED ON START/END
  // ---------------------------------------------------------
  const computeDurationFromDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end) || end <= start) return;

    const days = calculateDays(start, end);

    setRentalData((prev) => ({
      ...prev,
      days,
      durationValue: days,
      durationType: "days",
    }));
  };

  // ---------------------------------------------------------
  // Days helper
  // ---------------------------------------------------------
  const calculateDays = (start, end) => {
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  // ---------------------------------------------------------
  // 3. Duration Number Change
  // ---------------------------------------------------------
  const handleDurationNumberChange = (e) => {
    let value = parseInt(e.target.value) || 1;

    if (rentalData.durationType === "months") value = 1;
    if (rentalData.durationType === "weeks") value = Math.min(value, 4);

    setRentalData((prev) => ({ ...prev, durationValue: value }));

    if (rentalData.startDate) {
      autoComputeEndDate(rentalData.startDate, value, rentalData.durationType);
    }
  };

  // ---------------------------------------------------------
  // 4. Type Change (Days/Weeks/Months)
  // ---------------------------------------------------------
  const handleDurationTypeChange = (e) => {
    const type = e.target.value;
    let adjustedValue = rentalData.durationValue;

    if (type === "months") adjustedValue = 1;
    if (type === "weeks") adjustedValue = Math.min(adjustedValue, 4);

    setRentalData((prev) => ({
      ...prev,
      durationType: type,
      durationValue: adjustedValue,
    }));

    if (rentalData.startDate) {
      autoComputeEndDate(rentalData.startDate, adjustedValue, type);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">Rental Period</h2>
      <p className="text-sm text-gray-500 mb-6">
        Start date must be scheduled 1–2 days after booking.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={rentalData.startDate}
            onChange={handleStartDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={rentalData.endDate}
            onChange={handleEndDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Rental Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rental Duration
          </label>

          <div className="flex items-center gap-2">
            {/* Number Input */}
            <input
              type="number"
              min="1"
              value={rentalData.durationValue}
              onChange={handleDurationNumberChange}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
            />

            {/* Select Dropdown */}
            <select
              value={rentalData.durationType}
              onChange={handleDurationTypeChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-purple-500"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RentalPeriod;
