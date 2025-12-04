import totalIcon from "../../assets/icons/total.svg";
import upcomingIcon from "../../assets/icons/upcoming.svg";
import pendingIcon from "../../assets/icons/pending.svg";

export default function BookingStatsBar({ stats }) {
  const icons = [
  <img src={totalIcon} alt="event" className="w-8 h-8" />,
  <img src={upcomingIcon} alt="calendar" className="w-8 h-8" />,
  <img src={pendingIcon} alt="pending" className="w-8 h-8" />
];


  return (
    <div className="flex gap-4 w-full">
      {stats.map((card, idx) => (
        <div
          key={card.label}
          className="
            bg-white  text-purple-900  
            rounded-xl
            border border-gray-200
            shadow-sm
            px-6 py-6
            min-w-[280px]
            flex flex-col
            justify-between
          "
        >
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-gray-700">
              {card.label}
            </span>

            {/* Icon Badge */}
            <span className="
              flex items-center justify-center
            ">
              {icons[idx]}
            </span>
          </div>

          {/* Value */}
          <div className={`text-2xl font-medium ${card.valueColor}`}>
            {card.value}
          </div>

          {/* Subtext */}
          <div className={`text-[13px] mt-1 ${card.subColor}`}>
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
