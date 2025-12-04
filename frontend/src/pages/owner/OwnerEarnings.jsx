import React, { useState, useEffect } from "react";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";

import { Wallet } from "lucide-react";

import {
  LineChart,
  Line,
  collectionesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Item image map
const imageMap = {
  "Gucci Duffle Bag": "/assets/items/gucci_duffle_bag.png",
  "Gaming Headset": "/assets/items/havit_hv.png",
  "IPS Monitor": "/assets/items/IPS_lcd.png",
  Keyboard: "/assets/items/Keyboard.png",
  Laptop: "/assets/items/laptop.png",
  "RGB Liquid CPU Cooler": "/assets/items/RGB_liquid_CPU.png",
};

const fallbackIcon = () => (
  <Wallet className="w-10 h-10 text-purple-700 opacity-60" />
);

// Colors
const donutColors = ["#a78bfa", "#c4b5fd", "#ddd6fe"];

// Soft block (Notion style)
const block = "bg-white  text-purple-900   rounded-2xl border border-gray-200 shadow-sm p-8";

// Gradient pill tag — Section Header
const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
      style={{
        background: "linear-gradient(90deg, #7A1CA9, #B27CFF)",
      }}
    >
      {title}
    </span>
    <div className="flex-1 border-t border-gray-200"></div>
  </div>
);

export default function OwnerEarnings() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState(null);
  const [wallet, setWallet] = useState(null);

  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [recent, setRecent] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [lowItems, setLowItems] = useState([]);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // =====================================================
  // TODO: Replace mock data with backend API fetch calls 🌐
  // =====================================================
  useEffect(() => {
    const mock = {
      wallet: {
        total: 18500,
        pending: 4200,
        available: 14300,
        payoutMethod: "Bank Account •••• 4321",
      },

      summary: {
        monthEarnings: 14500,
        lastMonth: 13900,
        totalEarnings: 110400,
      },

      chart: [
        { month: "Jan", amount: 8200 },
        { month: "Feb", amount: 9100 },
        { month: "Mar", amount: 8600 },
        { month: "Apr", amount: 10400 },
        { month: "May", amount: 11200 },
        { month: "Jun", amount: 13700 },
        { month: "Jul", amount: 12800 },
        { month: "Aug", amount: 14200 },
        { month: "Sep", amount: 15000 },
        { month: "Oct", amount: 13900 },
        { month: "Nov", amount: 15800 },
        { month: "Dec", amount: 17200 },
      ],

      categories: [
        { name: "Electronics", percent: 67 },
        { name: "Fashion", percent: 22 },
        { name: "Accessories", percent: 11 },
      ],

      weeklyActivity: [
        { day: "Mon", views: 520, messages: 12, bookings: 4 },
        { day: "Tue", views: 480, messages: 10, bookings: 3 },
        { day: "Wed", views: 610, messages: 15, bookings: 5 },
        { day: "Thu", views: 720, messages: 18, bookings: 6 },
        { day: "Fri", views: 910, messages: 22, bookings: 7 },
        { day: "Sat", views: 1300, messages: 30, bookings: 12 },
        { day: "Sun", views: 900, messages: 14, bookings: 4 },
      ],

      recent: [
        { id: 1, item: "Sony A7IV Camera", net: 2350, date: "Feb 23, 2025" },
        { id: 2, item: "IPS Monitor", net: 1220, date: "Feb 20, 2025" },
        { id: 3, item: "Keyboard", net: 860, date: "Feb 18, 2025" },
      ],

      topItems: [
        { item: "Laptop", amount: 40200 },
        { item: "Gucci Duffle Bag", amount: 31000 },
        { item: "Gaming Headset", amount: 20000 },
      ],

      lowItems: [
        { item: "RGB Liquid CPU Cooler", amount: 6000 },
        { item: "Keyboard", amount: 4800 },
      ],
    };

    setWallet(mock.wallet);
    setSummary(mock.summary);
    setChartData(mock.chart);
    setCategories(mock.categories);
    setWeeklyActivity(mock.weeklyActivity);
    setRecent(mock.recent);
    setTopItems(mock.topItems);
    setLowItems(mock.lowItems);

    setLoading(false);
  }, []);

  if (loading)
    return <p className="pt-20 text-center text-gray-600">Loading...</p>;

  const growth =
    ((summary.monthEarnings - summary.lastMonth) / summary.lastMonth) * 100;

  // =====================================================
  // WITHDRAW HANDLER (mock)
  // TODO: Replace with backend POST request
  // =====================================================
  const handleWithdraw = () => {
    if (!withdrawAmount || withdrawAmount <= 0) return;

    console.log("TODO: Withdraw:", withdrawAmount);
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FB]">
      <OwnerSidebar />

      <div className="flex-1 px-12 py-12">

        {/* ====================================================
                PAGE TITLE
        ===================================================== */}
        <h1 className="text-3xl font-bold text-purple-900 mb-10">
          Earnings
        </h1>

        {/* ====================================================
                SECTION — WALLET OVERVIEW
        ===================================================== */}
        <div className={block}>
          <SectionHeader title="Wallet Overview" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Total Wallet */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white  text-purple-900   shadow-sm">
              <p className="text-gray-600 text-sm">Total Balance</p>
              <h2 className="text-3xl font-bold mt-2">
                ₱{wallet.total.toLocaleString()}
              </h2>
            </div>

            {/* Pending */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white  text-purple-900   shadow-sm">
              <p className="text-gray-600 text-sm">Pending Earnings</p>
              <h2 className="text-3xl font-bold mt-2 text-orange-500">
                ₱{wallet.pending.toLocaleString()}
              </h2>
            </div>

            {/* Available */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white  text-purple-900   shadow-sm">
              <p className="text-gray-600 text-sm">Available to Withdraw</p>
              <h2 className="text-3xl font-bold mt-2 text-green-600">
                ₱{wallet.available.toLocaleString()}
              </h2>
            </div>

            {/* Withdraw Button */}
            <div className="flex items-center lg:justify-end">
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="px-6 py-3 rounded-full text-white font-semibold transition shadow-md hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg, #7A1CA9, #B27CFF)",
                }}
              >
                Withdraw Funds
              </button>
            </div>
          </div>

          {/* Payout Method */}
          <p className="mt-6 text-sm text-gray-500">
            Payout Method:{" "}
            <span className="font-medium text-gray-700">
              {wallet.payoutMethod}
            </span>
          </p>
        </div>

        {/* ====================================================
                SECTION — EARNINGS OVERVIEW
        ===================================================== */}
        <div className={`${block} mt-12`}>
          <SectionHeader title="Earnings Overview" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            {/* This Month */}
            <div className="p-6 rounded-xl bg-white  text-purple-900   border border-gray-200 shadow-sm">
              <p className="text-gray-600 text-sm">This Month</p>
              <h1 className="text-3xl font-bold mt-2">
                ₱{summary.monthEarnings.toLocaleString()}
              </h1>
              <p
                className={`mt-1 text-sm ${
                  growth >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {growth >= 0 ? "+" : ""}
                {growth.toFixed(1)}% since last month
              </p>
            </div>

            {/* Lifetime */}
            <div className="p-6 rounded-xl bg-white  text-purple-900   border border-gray-200 shadow-sm">
              <p className="text-gray-600 text-sm">Lifetime Earnings</p>
              <h1 className="text-3xl font-bold mt-2">
                ₱{summary.totalEarnings.toLocaleString()}
              </h1>
              <p className="mt-1 text-sm text-gray-500">Total revenue earned</p>
            </div>

            {/* Growth */}
            <div className="p-6 rounded-xl bg-white  text-purple-900   border border-gray-200 shadow-sm">
              <p className="text-gray-600 text-sm">Monthly Growth</p>
              <h1
                className={`text-3xl font-bold mt-2 ${
                  growth >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {growth.toFixed(1)}%
              </h1>
              <p className="mt-1 text-sm text-gray-500">Compared month-to-month</p>
            </div>
          </div>
        </div>

        {/* ====================================================
                SECTION — ANALYTICS
        ===================================================== */}
        <div className={`${block} mt-12`}>
          <SectionHeader title="Analytics" />

          {/* Line + Pie charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Line Chart */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Monthly Earnings Trend
              </h2>

              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <collectionesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />

                    {/* Gradient & red dip markers */}
                    <defs>
                      <linearGradient id="lineColor" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#7A1CA9" stopOpacity="1" />
                        <stop offset="100%" stopColor="#B27CFF" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="url(#lineColor)"
                      strokeWidth={4}
                      dot={(props) => {
                        const prev =
                          props.index > 0 ? chartData[props.index - 1] : null;
                        const isDip =
                          prev && props.payload.amount < prev.amount;

                        return (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={7}
                            fill={isDip ? "#EF4444" : "#22C55E"}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        );
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart + Custom Legend */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Category Breakdown
              </h2>

              <div className="w-full h-72 flex">
                {/* Donut */}
                <ResponsiveContainer width="60%" height="100%">
                  <PieChart>
                    <Pie
                      data={categories}
                      dataKey="percent"
                      outerRadius={100}
                      innerRadius={60}
                    >
                      {categories.map((c, i) => (
                        <Cell key={i} fill={donutColors[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="ml-6 space-y-3 flex flex-col justify-center">
                  {categories.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: donutColors[i] }}
                      ></span>
                      <p className="text-gray-700 text-sm font-medium">
                        {c.name} — {c.percent}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Weekly Activity */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Weekly Activity
            </h2>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <collectionesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#A78BFA" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="messages" fill="#C4B5FD" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="bookings" fill="#DDD6FE" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ====================================================
                SECTION — ITEM PERFORMANCE
        ===================================================== */}
        <div className={`${block} mt-12`}>
          <SectionHeader title="Item Performance" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Top Items */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Top Performing Items
              </h2>

              <div className="space-y-4">
                {topItems.map((t, i) => {
                  const img = imageMap[t.item];

                  return (
                    <div
                      key={i}
                      className="p-4 border border-gray-200 rounded-xl bg-white  text-purple-900   shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border border-gray-200 flex items-center justify-center">
                          {img ? (
                            <img
                              src={img}
                              alt={t.item}
                              className="w-14 h-14 object-contain"
                            />
                          ) : (
                            fallbackIcon()
                          )}
                        </div>

                        <p className="text-purple-900 font-medium">{t.item}</p>
                      </div>

                      <p className="text-xl font-bold text-green-600">
                        ₱{t.amount.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Low Items */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Low Performing Items
              </h2>

              <div className="space-y-4">
                {lowItems.map((t, i) => {
                  const img = imageMap[t.item];

                  return (
                    <div
                      key={i}
                      className="p-4 border border-gray-200 rounded-xl bg-white  text-purple-900   shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border border-gray-200 flex items-center justify-center">
                          {img ? (
                            <img
                              src={img}
                              alt={t.item}
                              className="w-14 h-14 object-contain"
                            />
                          ) : (
                            fallbackIcon()
                          )}
                        </div>

                        <p className="text-purple-900 font-medium">{t.item}</p>
                      </div>

                      <p className="text-xl font-bold text-red-600">
                        ₱{t.amount.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
                SECTION — RECENT EARNINGS
        ===================================================== */}
        <div className={`${block} mt-12`}>
          <SectionHeader title="Recent Earnings" />

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 text-sm">
                <th className="pb-3">Item</th>
                <th className="pb-3">Net Earnings</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {recent.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-gray-200/70 hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition"
                >
                  <td className="py-3 font-medium">{e.item}</td>
                  <td className="py-3">₱{e.net.toLocaleString()}</td>
                  <td className="py-3">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>


      {/* ====================================================
                WITHDRAW MODAL
      ===================================================== */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

          <div
            className="bg-white  text-purple-900   rounded-2xl p-8 w-[400px] shadow-xl border border-gray-200 transition-all"
            style={{
              transform: "scale(1)",
              animation: "fadeScale 0.2s ease-out",
            }}
          >
            <h2 className="text-xl font-semibold text-purple-900 mb-4">
              Withdraw Funds
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Available balance:{" "}
              <span className="font-semibold text-green-600">
                ₱{wallet.available.toLocaleString()}
              </span>
            </p>

            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter amount"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                onClick={() => setShowWithdrawModal(false)}
              >
                Cancel
              </button>

              <button
                onClick={handleWithdraw}
                className="px-6 py-2 rounded-lg text-white font-semibold shadow-md transition hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg, #7A1CA9, #B27CFF)",
                }}
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal animation keyframes */}
      <style>{`
        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

    </div>
  );
}
