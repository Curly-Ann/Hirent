import React, { useEffect, useState } from "react";

const Stepper = ({ currentStep }) => {
  const [animateFirst, setAnimateFirst] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateFirst(true), 150);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex w-full max-w-[800px] gap-0">

        {/* Segment 1 */}
        <div className="w-1/3 h-2 bg-gray-200 rounded-l-full overflow-hidden">
          <div
            className="
              h-full bg-[#7A1CA9]
              transition-all duration-500 ease-in-out
              rounded-l-full
            "
            style={{
              width: animateFirst ? "100%" : "0%",
            }}
          ></div>
        </div>

        {/* Segment 2 */}
        <div className="w-1/3 h-2 bg-gray-200 overflow-hidden">
          <div
            className="
              h-full bg-[#7A1CA9]
              transition-all duration-500 ease-in-out
            "
            style={{
              width: currentStep >= 2 ? "100%" : "0%",
            }}
          ></div>
        </div>

        {/* Segment 3 */}
        <div className="w-1/3 h-2 bg-gray-200 rounded-r-full overflow-hidden">
          <div
            className="
              h-full bg-[#7A1CA9]
              transition-all duration-500 ease-in-out
              rounded-r-full
            "
            style={{
              width: currentStep === 3 ? "100%" : "0%",
            }}
          ></div>
        </div>

      </div>
    </div>
  );
};

export default Stepper;
