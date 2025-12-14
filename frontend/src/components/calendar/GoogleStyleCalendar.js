import * as React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Tooltip from "@mui/material/Tooltip";

dayjs.extend(isBetweenPlugin);

export default function GoogleStyleCalendar({ bookings }) {
  // Filter bookings to only show active ones (not cancelled, rejected, or completed)
  const activeBookings = React.useMemo(() => {
    return (bookings || []).filter(booking => {
      // Only render bookings that should block dates on the calendar
      const activeStatuses = ['pending', 'approved', 'ongoing'];
      return activeStatuses.includes(booking.status);
    });
  }, [bookings]);

  const renderDay = (dayProps) => {
    const day = dayProps.day;

    
    let bgColor = "transparent";
    let textColor = "inherit";
    let circleColor = null;
    let tooltipContent = null;

    activeBookings.forEach((booking) => {
      const start = dayjs(booking.startDate);
      const end = dayjs(booking.endDate);
      const isStart = day.isSame(start, "day");
      const isEnd = day.isSame(end, "day");
      const isBetween = day.isAfter(start) && day.isBefore(end);

      if (isStart || isEnd || isBetween) {
        bgColor = "#f0e5fb"; 
        textColor = isStart || isEnd ? "white" : "black";
        circleColor = isStart ? "#7A1CA9" : isEnd ? "#DB0B81" : circleColor;

        
        const bookingTooltip = (
          <div style={{ whiteSpace: "pre-line" }}>
            <div>Booking ID: {booking.id}</div>
            <div>Item: {booking.item}</div>
            <div>Renter: {booking.renter}</div>
            {isStart && <div>Start date: {booking.startDate}</div>}
            {isEnd && <div>End date: {booking.endDate}</div>}
            {isBetween && (
              <div>
                {end.diff(day, "day")} day{end.diff(day, "day") > 1 ? "s" : ""}{" "}
                remaining
              </div>
            )}
          </div>
        );

        
        tooltipContent = tooltipContent ? (
          <div>
            {tooltipContent}
            <hr style={{ margin: "2px 0" }} />
            {bookingTooltip}
          </div>
        ) : (
          bookingTooltip
        );
      }
    });

    return (
      <Tooltip key={day.toString()} title={tooltipContent || ""}>
        <PickersDay
          {...dayProps}
          day={day}
          sx={{
            position: "relative",
            backgroundColor: bgColor,
            color: textColor,
            borderRadius: 0,
            width: "34px",
            height: "34px",
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: circleColor ? 600 : 400,
            fontSize: "14px",
            "&:hover": { backgroundColor: "#FFFFFF" },
          }}
        >
          {circleColor && (
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: circleColor,
                zIndex: 0,
              }}
            />
          )}
          <span style={{ position: "relative", zIndex: 1 }}>
            {day.format("D")}
          </span>
        </PickersDay>
      </Tooltip>
    );
  };

  
  const firstBookingStart = bookings.length
    ? dayjs(bookings[0].startDate)
    : dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        key={bookings.map((b) => b.id).join("-")} 
        defaultCalendarMonth={firstBookingStart}
        value={null}
        onChange={() => {}}
        slots={{ day: renderDay }}
      />
    </LocalizationProvider>
  );
}
