import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Info, AlertCircle, Dot, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "Hirent — Notifications";

    return () => {
      document.title = "Hirent";
    };
  }, []);

  // =====================================================================
  // TODO: Replace mock notifications with backend API request
  // =====================================================================
  useEffect(() => {
    const loadMockData = () => {
      const mock = [
        // ============================
        // BOOKING NOTIFICATIONS
        // ============================
        {
          id: 1,
          type: "info",
          category: "booking",
          message: "Your booking for 'Canon EOS R6 Camera' was approved!",
          redirect: "/booking/123",
          time: "2 hours ago",
          unread: true,
        },
        {
          id: 2,
          type: "alert",
          category: "alert",
          message: "Pickup reminder: Tomorrow between 9–11 AM.",
          redirect: "/booking/123",
          time: "Yesterday",
          unread: true,
        },
        {
          id: 3,
          type: "info",
          category: "booking",
          message: "A renter asked a question about your listing 'DJI Mini Drone'.",
          redirect: "/owner/messages",
          time: "3 hours ago",
          unread: true,
        },
        {
          id: 4,
          type: "info",
          category: "booking",
          message: "Your rental return for 'GoPro Hero 11' is confirmed.",
          redirect: "/rentals",
          time: "2 days ago",
          unread: false,
        },
        {
          id: 5,
          type: "info",
          category: "booking",
          message: "Your rental extension request has been approved.",
          redirect: "/rentals",
          time: "1 day ago",
          unread: false,
        },
        {
          id: 6,
          type: "info",
          category: "booking",
          message: "A nearby listing similar to your recent search is now available.",
          redirect: "/browse",
          time: "4 hours ago",
          unread: true,
        },

        // ============================
        // PAYMENT NOTIFICATIONS
        // ============================
        {
          id: 7,
          type: "success",
          category: "payment",
          message: "Your payment for 'Canon EOS R6 Camera' was successful.",
          redirect: "/transactions",
          time: "3 days ago",
          unread: false,
        },
        {
          id: 8,
          type: "alert",
          category: "payment",
          message: "Your default payment method needs updating.",
          redirect: "/payment-methods",
          time: "5 days ago",
          unread: true,
        },
        {
          id: 9,
          type: "success",
          category: "payment",
          message: "Your payout for last week's rentals has been released.",
          redirect: "/owner/payouts",
          time: "2 days ago",
          unread: false,
        },
        {
          id: 10,
          type: "info",
          category: "payment",
          message: "Refund has been issued to your account.",
          redirect: "/refunds",
          time: "4 days ago",
          unread: false,
        },
        {
          id: 11,
          type: "alert",
          category: "payment",
          message: "A recent payment attempt failed. Please retry.",
          redirect: "/payment-methods",
          time: "6 hours ago",
          unread: true,
        },

        // ============================
        // SYSTEM / ACCOUNT
        // ============================
        {
          id: 12,
          type: "info",
          category: "system",
          message: "Your password has been changed successfully.",
          redirect: "/settings",
          time: "3 days ago",
          unread: false,
        },
        {
          id: 13,
          type: "alert",
          category: "system",
          message: "New login detected from a different device. Review activity.",
          redirect: "/security",
          time: "5 days ago",
          unread: true,
        },
        {
          id: 14,
          type: "info",
          category: "system",
          message: "Your identity verification is complete.",
          redirect: "/profile",
          time: "1 week ago",
          unread: false,
        },
        {
          id: 15,
          type: "info",
          category: "system",
          message: "Your profile is now 100% complete!",
          redirect: "/profile",
          time: "2 days ago",
          unread: false,
        },
        // ============================
        // ALERTS
        // ============================
        {
          id: 17,
          type: "alert",
          category: "alert",
          message: "Return reminder: 'Canon EF 70-200mm Lens' due today.",
          redirect: "/rentals",
          time: "Today",
          unread: true,
        },
        {
          id: 18,
          type: "alert",
          category: "alert",
          message: "Your listing 'Sony A7IV Camera' will expire soon.",
          redirect: "/owner/listings",
          time: "1 day ago",
          unread: false,
        },
        {
          id: 19,
          type: "alert",
          category: "alert",
          message: "Action required: Update missing details on your new listing.",
          redirect: "/owner/listings",
          time: "10 hours ago",
          unread: true,
        },
      ];

      setNotifications(mock);
      setLoading(false);
    };

    loadMockData();
  }, []);

  // =====================================================================
  // TODO: Replace with API call to mark single notification as read
  // =====================================================================
  const markAsRead = (id, redirect) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );

    // TODO: PATCH /notifications/:id/read

    if (redirect) navigate(redirect);
  };

  // =====================================================================
  // TODO: Replace with API call to mark ALL notifications as read
  // =====================================================================
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

    // TODO: PATCH /notifications/read-all
  };

  // =====================================================================
  // TODO: Replace with API call to CLEAR all notifications
  // =====================================================================
  const clearAll = () => {
    setNotifications([]);

    // TODO: DELETE /notifications/clear
  };

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "alert":
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.category === filter);

  return (
    <div
      className="min-h-screen pt-10 px-8 md:px-20 lg:px-40 pb-20"
      style={{
        background: "#fbfbfb",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mt-2 mb-6">
        <div className="p-1 mb-2">
          <div className="flex items-start gap-5">

            {/* Gradient Icon Box */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
              <Bell className="w-10 h-10 text-[#a12fda]" />
            </div>

            {/* Line + Text */}
            <div className="flex items-start gap-4">

              {/* Text Group */}
              <div>
                <h1 className="text-[24px] mt-1 font-bold text-purple-900">
                  Notifications
                </h1>
                <p className="text-gray-500 text-[15px]">
                  See new messages, mentions, and activity notifications.
                </p>
              </div>

            </div>

          </div>
        </div>

        <div className="flex gap-2">
          {notifications.some((n) => n.unread) && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-1.5 rounded-full text-sm bg-purple-50 text-[#8417bb] border border-[#7A1CA9]/20 /30 hover:bg-[#7A1CA9]/20 transition"
            >
              Mark All Read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-1.5 rounded-full text-sm text-red-500 hover:text-red-700 text-[13px] font-medium border border-red-300 bg-red-50 flex items-center gap-1 shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {["all", "booking", "payment", "alert", "system"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-[13px] transition ${filter === cat
              ? "bg-[#7A1CA9] text-white shadow-md"
              : "bg-[#7A1CA9]/10 text-[#7A1CA9] border border-[#7A1CA9]/20 /20 hover:bg-[#7A1CA9]/20"
              }`}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 text-sm">Loading notifications...</p>
      )}

      {/* ERROR */}
      {error && <p className="text-center text-red-500 text-sm">{error}</p>}

      {/* NOTIFICATION LIST */}
      {!loading && !error && (
        <div className="space-y-5">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id, notif.redirect)}
              className={`w-full px-5 py-4 rounded-2xl bg-white shadow-md cursor-pointer transform transition hover:scale-[1.01] ${notif.unread ? "border-l-4 border-[#7A1CA9] " : "opacity-90"
                }`}
            >
              <div className="flex items-start gap-4">
                {renderIcon(notif.type)}

                <div className="flex-1">
                  <p
                    className={`text-[15px] ${notif.unread ? "font-semibold" : "font-normal"
                      }`}
                  >
                    {notif.message}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                </div>

                {notif.unread && <Dot className="text-[#7A1CA9] w-6 h-6 mt-1" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredNotifications.length === 0 && (
        <div className="text-center text-gray-500 py-10 text-sm">
          No notifications found.
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;