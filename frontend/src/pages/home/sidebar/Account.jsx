import React, { useState, useContext } from "react";
import { User, MapPin, CreditCard, Settings, LogOut } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";

import PersonalInformation from "../../../components/profilepage/Personal";
import { AddressesComponent } from '../../../components/profilepage/Addresses';
import { PaymentMethodsComponent } from '../../../components/profilepage/PaymentMethods';
import SettingsComponent from '../../../components/profilepage/Settings';

import profPic from "../../../assets/profile/prof_pic.jpg";

export default function RenterProfilePage() {

    const { logout } = useContext(AuthContext);

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            logout(); // remove fakeToken and set isLoggedIn to false
            window.location.href = "/login"; // redirect to login
        }
    };
    const [activeItem, setActiveItem] = useState("personal");

    const navItems = [
        { id: "personal", label: "Personal Information", icon: <User size={20} /> },
        { id: "addresses", label: "Addresses", icon: <MapPin size={20} /> },
        { id: "payment", label: "Payment Method", icon: <CreditCard size={20} /> },
        { id: "settings", label: "Settings", icon: <Settings size={20} /> },
        { id: "signout", label: "Sign Out", icon: <LogOut size={20} /> },
    ];

    const [form, setForm] = useState({
        firstName: "Genlord",
        lastName: "Loubot",
        email: "genlord@gmail.com",
        phone: "+63 912 345 6789",
        birthday: "",
        address: "Naga City, Camarines Sur",
        gender: "female",
    });

    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: "Card",
            cardNumber: "1234567890123456",
            cardName: "Genlord Loubot",
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



    function handleSave(e) {
        e.preventDefault();
        alert("Saved (Demo)");
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
                                <img src={profPic} alt="avatar" className="w-40 h-40 rounded-full mx-auto mb-5" />
                                <h3 className="text-[20px] font-semibold">{form.firstName} {form.lastName}</h3>
                                <div className="text-[15px] text-gray-500 mt-0.5">genlord@gmail.com</div>
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
            ${activeItem === item.id
                ? "bg-purple-50 border-l-4 border-[#7A1CA9] text-[#7A1CA9]"
                : "hover:bg-purple-100"
            }`}
        >
            {item.icon}
            <span className="text-[15px] font-medium">{item.label}</span>
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

                        {activeItem === "settings" && (
                            <SettingsComponent/>
                        )}

                        {activeItem === "signout" && (
                            <div className="bg-white  text-purple-900   rounded-2xl shadow-lg p-8">
                                <h2 className="text-xl font-semibold">Sign Out</h2>
                                <p className="text-gray-500">Are you sure you want to sign out?</p>
                            </div>
                        )}
                    </section>

                </main>
            </div>
        </div>
    );
}
