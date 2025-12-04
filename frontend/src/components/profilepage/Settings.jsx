import React, { useState } from "react";
import { Lock, Bell, EyeOff, Bolt, UserMinus } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";


export default function SettingsPage() {
    // --- State ---
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [notifications, setNotifications] = useState({
        rentalReminders: true,
        offers: true,
        messages: true,
    });

    const [privacy, setPrivacy] = useState({
        showEmail: true,
        showPhone: true,
        makeProfilePublic: false,
    });

    // --- Handlers ---
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };

    const savePassword = (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("New password and confirmation do not match!");
            return;
        }
        // TODO: Call API to save password
        alert("Password updated successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    const toggleNotification = (type) => {
        setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const togglePrivacy = (type) => {
        setPrivacy((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const deactivateAccount = () => {
        if (window.confirm("Are you sure you want to deactivate your account?")) {
            // TODO: Call API to deactivate
            alert("Account deactivated.");
        }
    };

    const deleteAccount = () => {
        if (window.confirm("This will permanently delete your account. Proceed?")) {
            // TODO: Call API to delete
            alert("Account deleted.");
        }
    };

    function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => !darkMode && toggleTheme()}
        className={`px-4 py-2 rounded-lg border ${
          !darkMode
            ? "bg-purple-600 text-white"
            : "bg-gray-100 text-purple-900 dark:bg-gray-700 dark:text-gray-200"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => darkMode && toggleTheme()}
        className={`px-4 py-2 rounded-lg border ${
          darkMode
            ? "bg-purple-600 text-white"
            : "bg-gray-100 text-purple-900 dark:bg-gray-700 dark:text-gray-200"
        }`}
      >
        Dark
      </button>
    </div>
  );
}


    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr] gap-8 mr-20">
            {/* --- LEFT: Settings Form --- */}
            <div className="bg-white  text-purple-900   collection-scale rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                        <Bolt className="w-10 h-10 text-[#7A1CA9]" />
                    </div>
                    <div>
                        <h1 className="text-[26px] font-bold mt-1">Settings</h1>
                        <p className="text-[16px] text-gray-500">
                            Manage your password, notifications, privacy settings, and account options.
                        </p>
                    </div>
                </div>

                <hr className="border-gray-200 mt-6 mb-6 -mx-8" />

                {/* --- Change Password --- */}
                <div>
                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                        <Lock /> Change Password
                    </h2>
                    <p className="text-gray-500 mb-5 text-[15px]">
                        Update your account password regularly to keep your account secure.
                    </p>
                    <form onSubmit={savePassword} className="space-y-3">
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 px-3 py-2 rounded-md"
                            required
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 px-3 py-2 rounded-md"
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 px-3 py-2 rounded-md"
                            required
                        />
                        <div className="flex justify-end pt-1">
                            <button
                                type="submit"
                                className="px-4 py-2 text-[15px] border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-purple-600 hover:bg-purple-50"
                            >
                                Save Password
                            </button>
                        </div>
                    </form>
                </div>

                <hr className="border-gray-200 mt-6 mb-6 -mx-8" />

                {/* --- Theme Toggle --- */}
<div className="mt-6">
  <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
    <Sun /> Theme
  </h2>
  <p className="text-gray-500 mb-3 text-[15px]">
    Switch between Light and Dark mode for the app.
  </p>

  <ThemeToggle />
</div>

<hr className="border-gray-200 mt-6 mb-6 -mx-8" />


                {/* --- Notifications & Privacy --- */}
                <div className="grid grid-cols-1 gap-8 mt-6">
                    {/* --- Notifications --- */}
                    <div>
                        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                            <Bell /> Notifications
                        </h2>
                        <p className="text-gray-500 mb-5 text-[15px]">
                            Control which notifications you receive about your rentals, offers, and messages.
                        </p>
                        {Object.keys(notifications).map((key) => (
                            <label key={key} className="flex items-center gap-3 mb-2">
                                <input
                                    type="checkbox"
                                    checked={notifications[key]}
                                    onChange={() => toggleNotification(key)}
                                    className="h-4 w-4 accent-purple-700"
                                />
                                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                            </label>
                        ))}
                    </div>

                    {/* --- Privacy --- */}
                    <div>
                        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                            <EyeOff /> Privacy
                        </h2>
                        <p className="text-gray-500 mb-5 text-[15px]">
                            Choose what information is visible to other users and make your profile public or private.
                        </p>
                        {Object.keys(privacy).map((key) => (
                            <label key={key} className="flex items-center gap-3 mb-2">
                                <input
                                    type="checkbox"
                                    checked={privacy[key]}
                                    onChange={() => togglePrivacy(key)}
                                    className="h-4 w-4 accent-purple-700"
                                />
                                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                            </label>
                        ))}

                        {/* Save Settings Button */}
                        <div className="flex justify-end pt-1">
                            <button
                                onClick={() => alert("Settings saved!")}
                                className="px-4 py-2 text-[15px] border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-purple-600 hover:bg-purple-50"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 mt-6 mb-6 -mx-8" />

                {/* --- Account Management --- */}
                <div>
                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                        <UserMinus /> Account Management
                    </h2>
                    <p className="text-gray-500 mb-6 text-[15px]">
                        Deactivate or delete your account. Deactivation is reversible, deletion is permanent.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <button
                            onClick={deactivateAccount}
                            className="px-6 py-2.5 rounded-xl shadow-sm font-medium border bg-red-600 text-white w-full 
               hover:bg-red-700 transition-colors duration-200"
                        >
                            Disable Account
                        </button>
                        <button
                            onClick={deleteAccount}
                            className="px-6 py-2.5 rounded-xl shadow-sm font-medium border bg-red-50 border-red-400 text-red-600 w-full 
               hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
                        >
                            Delete Account
                        </button>
                    </div>



                    {/* Info Box */}
                    <div className="bg-purple-50 border border-purple-200 text-purple-700 p-3 rounded-md text-[15px] mt-6">
                        Deactivating your account will hide your profile and stop notifications. You can reactivate later by logging in.
                    </div>
                </div>
            </div>
        </div>

    );
}
