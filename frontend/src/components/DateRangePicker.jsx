import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function BasicDateRangePicker() {
    const [fromDate, setFromDate] = React.useState(dayjs());
    const [toDate, setToDate] = React.useState(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex items-center space-x-2">
                <DatePicker
                    label="From"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    slotProps={{
                        textField: {
                            size: "small",
                            sx: {
                                borderRadius: "8px",
                                width: "100%",
                                "& .MuiInputBase-input": {
                                    color: "rgba(0, 0, 0, 0.4)",
                                    fontSize: "13px",
                                    fontFamily: "Inter, sans-serif",
                                },
                                "& .MuiInputLabel-root": {
                                    color: "rgba(0, 0, 0, 0.7)",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                },
                                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                    borderColor: "#7A1CA9",
                                },
                                "& .MuiOutlinedInput-root:hover fieldset": {
                                    borderColor: "#7A1CA9",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#7A1CA9",
                                    backgroundColor: "rgba(122, 28, 169, 0.1)",
                                    borderRadius: "8px",
                                    padding: "3px",
                                    fontSize: "25px",
                                },
                            },

                        },
                    }}
                />
                <DatePicker
                    label="To"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    slotProps={{
                        textField: {
                            size: "small",
                            sx: {
                                borderRadius: "8px",
                                width: "100%",
                                "& .MuiInputBase-input": {
                                    color: "rgba(0, 0, 0, 0.4)", // grayish-black date text
                                    fontSize: "13px",
                                    fontFamily: "Inter, sans-serif",
                                },
                                "& .MuiInputLabel-root": {
                                    color: "rgba(0, 0, 0, 0.7)",
                                    fontWeight: 400, // not bold
                                    fontSize: "18px",
                                },
                                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                    borderColor: "#7A1CA9", // keep focus border purple
                                },
                                "& .MuiOutlinedInput-root:hover fieldset": {
                                    borderColor: "#7A1CA9", // purple border on hover
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#7A1CA9", // purple icon
                                    backgroundColor: "rgba(122, 28, 169, 0.1)", // light purple background
                                    borderRadius: "8px",
                                    padding: "3px",
                                    fontSize: "25px",
                                },
                            },
                        },
                    }}
                />
            </div>
        </LocalizationProvider>
    );
}
