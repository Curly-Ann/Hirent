import React, { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const RentalPeriod = ({ rentalData, setRentalData, bookedDates }) => {
  const [errors, setErrors] = useState({});

  const isDateRangeAvailable = (start, end) => {
    if (!start || !end) return true;
    const startDay = dayjs(start).startOf('day');
    const endDay = dayjs(end).endOf('day');
    return !bookedDates.some(({ startDate, endDate }) => {
      const bookingStart = dayjs(startDate).startOf('day');
      const bookingEnd = dayjs(endDate).endOf('day');
      return (
        startDay.isBetween(bookingStart, bookingEnd, 'day', '[]') ||
        endDay.isBetween(bookingStart, bookingEnd, 'day', '[]') ||
        bookingStart.isBetween(startDay, endDay, 'day', '[]') ||
        bookingEnd.isBetween(startDay, endDay, 'day', '[]')
      );
    });
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 1;
    const startDay = dayjs(start);
    const endDay = dayjs(end);
    if (!startDay.isValid() || !endDay.isValid() || endDay.isBefore(startDay) || endDay.isSame(startDay, 'day')) return 1;
    return endDay.diff(startDay, 'day') || 1;
  };

  const shouldDisableDate = (date) => {
    return bookedDates.some(({ startDate, endDate }) =>
      date.isBetween(
        dayjs(startDate).startOf('day'),
        dayjs(endDate).endOf('day'),
        'day',
        '[]'
      )
    );
  };

  const autoComputeEndDate = (startDate, value, type) => {
    if (!startDate) return;
    const start = dayjs(startDate);
    let end = start.clone();

    const numValue = Number(value);
    if (isNaN(numValue)) return;

    if (type === "days") end = start.add(numValue, 'day');
    if (type === "weeks") end = start.add(numValue, 'week');
    if (type === "months") end = start.add(numValue, 'month');

    const newEndDate = end.format('YYYY-MM-DD');
    setRentalData((prev) => ({
      ...prev,
      endDate: newEndDate,
      days: calculateDays(startDate, newEndDate),
    }));
  };

  const computeDurationFromDates = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    if (!start.isValid() || !end.isValid() || end.isBefore(start) || end.isSame(start, 'day')) {
      setRentalData((prev) => ({ ...prev, days: 1, durationValue: 1, durationType: "days" }));
      return;
    }
    const days = calculateDays(startDate, endDate);
    setRentalData((prev) => ({ ...prev, days, durationValue: days, durationType: "days" }));
  };

  const handleStartDateChange = (date) => {
    if (!date) return;
    
    const start = date.format('YYYY-MM-DD');
    const today = dayjs().startOf('day');
    const dayAfterTomorrow = today.add(2, 'day');

    if (dayjs(start).isBefore(dayAfterTomorrow)) {
      setErrors((prev) => ({ ...prev, startDate: "Start date must be at least 2 days from now." }));
    } else {
      setErrors((prev) => ({ ...prev, startDate: "" }));
    }

    setRentalData((prev) => ({ ...prev, startDate: start }));

    if (rentalData.durationValue > 0) {
      autoComputeEndDate(start, rentalData.durationValue, rentalData.durationType);
    }
  };

  const handleEndDateChange = (date) => {
    if (!date) return;
    
    const end = date.format('YYYY-MM-DD');
    const startDate = dayjs(rentalData.startDate);
    const endDate = dayjs(end);

    if (rentalData.startDate && (endDate.isBefore(startDate) || endDate.isSame(startDate, 'day'))) {
      setErrors((prev) => ({ ...prev, endDate: "End date must be after the start date." }));
    } else if (!isDateRangeAvailable(rentalData.startDate, end)) {
      setErrors((prev) => ({ ...prev, endDate: "Selected date range overlaps with an existing booking." }));
    } else {
      setErrors((prev) => ({ ...prev, endDate: "" }));
    }

    setRentalData((prev) => ({ ...prev, endDate: end }));

    if (rentalData.startDate && end) {
      computeDurationFromDates(rentalData.startDate, end);
    }
  };

  const handleDurationNumberChange = (e) => {
    let value = parseInt(e.target.value) || 1;
    if (rentalData.durationType === "months") value = 1;
    if (rentalData.durationType === "weeks") value = Math.min(value, 4);
    setRentalData((prev) => ({ ...prev, durationValue: value }));
    if (rentalData.startDate) {
      autoComputeEndDate(rentalData.startDate, value, rentalData.durationType);
    }
  };

  const handleDurationTypeChange = (e) => {
    const type = e.target.value;
    let adjustedValue = rentalData.durationValue;
    if (type === "months") adjustedValue = 1;
    if (type === "weeks") adjustedValue = Math.min(adjustedValue, 4);
    setRentalData((prev) => ({ ...prev, durationType: type, durationValue: adjustedValue }));
    if (rentalData.startDate) {
      autoComputeEndDate(rentalData.startDate, adjustedValue, type);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-white text-purple-900 rounded-lg shadow-sm p-6">
        <h2 className="text-[16px] text-purple-900">Rental Period</h2>
        <p className="text-[15px] text-gray-600 mb-6">Start date must be scheduled 1–2 days after booking.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[15px] font-medium text-black mb-2">Start Date</label>
            <DatePicker
              value={rentalData.startDate ? dayjs(rentalData.startDate) : null}
              onChange={handleStartDateChange}
              shouldDisableDate={shouldDisableDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  error: !!errors.startDate,
                  helperText: errors.startDate,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#7A1CA9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#7A1CA9',
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div>
            <label className="block text-[15px] font-medium text-black mb-2">End Date</label>
            <DatePicker
              value={rentalData.endDate ? dayjs(rentalData.endDate) : null}
              onChange={handleEndDateChange}
              shouldDisableDate={shouldDisableDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  error: !!errors.endDate,
                  helperText: errors.endDate,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#7A1CA9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#7A1CA9',
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div>
            <label className="block text-[15px] font-medium text-black mb-2">Rental Duration</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={rentalData.durationValue}
                onChange={handleDurationNumberChange}
                className="w-20 px-3 py-2 text-[15px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
              />
              <select
                value={rentalData.durationType}
                onChange={handleDurationTypeChange}
                className="px-3 py-2 text-[15px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default RentalPeriod;
