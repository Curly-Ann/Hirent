import React, { useState, useEffect, useContext } from "react";
import { makeAPICall, ENDPOINTS } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch all admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes, itemsRes, bookingsRes, reportsRes] = await Promise.all([
          makeAPICall("/api/admin/dashboard/stats"),
          makeAPICall("/api/admin/users"),
          makeAPICall("/api/admin/items"),
          makeAPICall("/api/admin/bookings"),
          makeAPICall("/api/admin/reports"),
        ]);

        setStats(statsRes?.data);
        setUsers(usersRes?.data || []);
        setItems(itemsRes?.data || []);
        setBookings(bookingsRes?.data || []);
        setReports(reportsRes?.data || []);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user]);

  const handleSuspendUser = async (userId) => {
    try {
      await makeAPICall(`/api/admin/users/${userId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: "suspended" }),
      });
      // Refetch users
      const usersRes = await makeAPICall("/api/admin/users");
      setUsers(usersRes?.data || []);
    } catch (err) {
      console.error("Error suspending user:", err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await makeAPICall(`/api/admin/items/${itemId}`, {
        method: "DELETE",
      });
      // Refetch items
      const itemsRes = await makeAPICall("/api/admin/items");
      setItems(itemsRes?.data || []);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleUpdateReport = async (reportId, status) => {
    try {
      await makeAPICall(`/api/admin/reports/${reportId}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      // Refetch reports
      const reportsRes = await makeAPICall("/api/admin/reports");
      setReports(reportsRes?.data || []);
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage users, items, bookings, and reports</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Items</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalItems}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Pending Reports</p>
              <p className="text-3xl font-bold text-red-600">{stats.pendingReports}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Visits</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalVisits?.toLocaleString() || 0}</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {["overview", "users", "items", "bookings", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{u.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{u.email}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 capitalize">{u.role}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            u.status === 'suspended' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {u.status || 'active'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <button
                            onClick={() => handleSuspendUser(u._id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            {u.status === 'suspended' ? 'Activate' : 'Suspend'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Items Tab */}
          {activeTab === "items" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Oversight</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Owner</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Views</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{item.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{item.owner?.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 capitalize">{item.status}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{item.views}</td>
                        <td className="px-4 py-2 text-sm">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Bookings Overview</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Item</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Renter</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Owner</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Dates</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{booking.itemId?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{booking.userId?.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{booking.ownerId?.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm capitalize text-gray-600">{booking.status}</td>
                        <td className="px-4 py-2 text-sm font-semibold text-gray-900">₱{booking.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Reporter</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Reason</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report._id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{report.reporterId?.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 capitalize">{report.reportType}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{report.reason}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <select
                            value={report.status}
                            onChange={(e) => handleUpdateReport(report._id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                            <option value="dismissed">Dismissed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Recent Users</h3>
                  <p className="text-sm text-gray-600">{users.length} total users registered</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Active Items</h3>
                  <p className="text-sm text-gray-600">{items.filter(i => i.status === 'active').length} active items</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Ongoing Bookings</h3>
                  <p className="text-sm text-gray-600">{bookings.filter(b => b.status === 'approved').length} approved bookings</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Pending Reports</h3>
                  <p className="text-sm text-gray-600">{reports.filter(r => r.status === 'pending').length} reports need review</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
