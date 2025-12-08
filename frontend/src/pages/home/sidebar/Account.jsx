import React, { useState, useContext, useEffect } from "react";
import { User, MapPin, CreditCard, Settings, LogOut, UserCircle } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import PersonalInformation from "../../../components/profilepage/Personal";
import { AddressesComponent } from "../../../components/profilepage/Addresses";
import { PaymentMethodsComponent } from "../../../components/profilepage/PaymentMethods";
import SettingsComponent from "../../../components/profilepage/Settings";

import profPic from "../../../assets/profile/prof_pic.jpg";

export default function RenterProfilePage() {
  const { logout, user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      logout(); 
      navigate("/login");
    }
  };
  const [activeItem, setActiveItem] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const navItems = [
    { id: "personal", label: "Personal Information", icon: <User size={20} /> },
    { id: "addresses", label: "Addresses", icon: <MapPin size={20} /> },
    { id: "payment", label: "Payment Method", icon: <CreditCard size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    { id: "signout", label: "Sign Out", icon: <LogOut size={20} /> },
  ];

  // Initialize form with real user data from AuthContext
  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "User",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthday: user?.birthday || "",
    address: user?.address || "",
    gender: user?.gender || "",
    bio: user?.bio || "",
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user?.name?.split(" ")[0] || "User",
        lastName: user?.name?.split(" ").slice(1).join(" ") || "",
        email: user?.email || "",
        phone: user?.phone || "",
        birthday: user?.birthday || "",
        address: user?.address || "",
        gender: user?.gender || "",
        bio: user?.bio || "",
      });
    }
  }, [user]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Card",
      cardNumber: "1234567890123456",
      cardName: user?.name || "User",
    },
    {
      id: 2,
      type: "Online",
      provider: "GCash",
      accountNumber: "0995363411",
    },
  ]);

  const [addresses, setAddresses] = React.useState([
    {
      id: 1,
      label: "Home",
      phone: "917 123 4567",
      details: `123 Mango Street
Unit 4B
Poblacion, Makati City
Metro Manila, 1210`,
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      phone: "912 345 6789",
      details: `456 Pine Avenue
5th Floor
Ortigas Center, Pasig City
Metro Manila, 1600`,
      isDefault: false,
    },
  ]);

  // Save profile changes
  async function handleSave(updatedForm) {
    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: `${updatedForm.firstName} ${updatedForm.lastName}`,
          phone: updatedForm.phone,
          address: updatedForm.address,
          gender: updatedForm.gender,
          birthday: updatedForm.birthday,
          bio: updatedForm.bio,
        })
      });

      const data = await response.json();
      if (data.success) {
        setSaveMessage("Profile updated successfully!");
        setForm(updatedForm);
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("Error updating profile: " + data.message);
      }
    } catch (err) {
      console.error("Save error:", err);
      setSaveMessage("Error saving profile. Please try again.");
    }
    setIsSaving(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter flex justify-center">
      <div className="flex flex-1 ml-5">
        <main
          className="
                    w-full 
                    max-w-[1800px] 
                    mx-auto 
                    pl-24 
                    py-10 
                    grid grid-cols-1 
                    lg:grid-cols-[290px_minmax(0,1fr)]
                "
        >
          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="bg-white collection-scale rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 text-center border-b">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-40 h-40 rounded-full mx-auto mb-5 object-cover"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full mx-auto mb-5 bg-purple-100 flex items-center justify-center">
                    <UserCircle size={80} className="text-purple-600" />
                  </div>
                )}
                <h3 className="text-[20px] font-semibold">
                  {user?.name || "User"}
                </h3>
                <div className="text-[15px] text-gray-500 mt-0.5">
                  {user?.email || "user@email.com"}
                </div>
                {user?.role && (
                  <div className="text-[12px] text-gray-400 mt-1 uppercase font-medium">
                    {user.role}
                  </div>
                )}
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => {
                        if (item.id === "signout") {
                          handleSignOut();
                        } else {
                          setActiveItem(item.id);
                        }
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
            ${
              activeItem === item.id
                ? "bg-purple-50 border-l-4 border-[#7A1CA9] text-[#7A1CA9]"
                : "hover:bg-purple-100"
            }`}
                    >
                      {item.icon}
                      <span className="text-[15px] font-medium">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* CENTER CONTENT */}
          <section className="col-span-1">
            {activeItem === "personal" && (
              <PersonalInformation
                form={form}
                setForm={setForm}
                handleSave={handleSave}
              />
            )}

            {activeItem === "addresses" && (
              <AddressesComponent
                addresses={addresses}
                setAddresses={setAddresses}
              />
            )}

            {activeItem === "payment" && (
              <PaymentMethodsComponent
                paymentMethods={paymentMethods}
                setPaymentMethods={setPaymentMethods}
              />
            )}

            {activeItem === "settings" && <SettingsComponent />}

            {activeItem === "signout" && (
              <div className="bg-white  text-purple-900   rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold">Sign Out</h2>
                <p className="text-gray-500">
                  Are you sure you want to sign out?
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
