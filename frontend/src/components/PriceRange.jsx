import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const PriceRangeSlider = () => {
  const [value, setValue] = useState([100, 5000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-0">
      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={10000}
        step={100}
        valueLabelDisplay="auto"
        sx={{
          color: "#7A1CA9",
          "& .MuiSlider-thumb": {
            backgroundColor: "#fff",
            border: "2px solid #7A1CA9", 
          },

          "& .MuiSlider-track": {
            backgroundColor: "#7A1CA9",
          },
          "& .MuiSlider-rail": {
            opacity: 0.3,
          },
        }}
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>₱{value[0]}</span>
        <span>₱{value[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
