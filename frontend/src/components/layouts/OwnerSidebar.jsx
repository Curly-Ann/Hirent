// src/components/layout/OwnerSidebar.jsx
import React from 'react';
import {
    House,
    LayoutList,
    PackagePlus,
    CalendarClock,
    Wallet,
    User,
    LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import hirentLogo from '../../assets/hirent-logo-purple.png';

const OwnerSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const sidebarItems = [
        { icon: House, link: '/owner/dashboard', label: 'Dashboard' },
        { icon: LayoutList, link: '/owner/my-listings', label: 'My Listings' },
        { icon: PackagePlus, link: '/owner/add-item', label: 'Add Item' },
        { icon: CalendarClock, link: '/owner/bookings', label: 'Bookings' },
        { icon: Wallet, link: '/owner/earnings', label: 'Earnings' },
        { icon: User, link: '/owner/profile', label: 'Profile' }
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        navigate('/login');
    };

    return (
        <div
            className="bg-white border-r border-gray-200 flex flex-col min-h-screen w-72 z-20
             transition-shadow duration-300 hover:shadow-lg"
        >

            {/* Logo */}
            <div className="flex flex-col items-start ml-6 pt-6 pb-3">
                <img src={hirentLogo} alt="HiRENT Logo" className="h-7 mb-1" />
                <h2 className="text-[13px] text-gray-700">Owner Dashboard</h2>
            </div>

            <hr className="border-t border-gray-200 mb-3" />

            {/* Menu List */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                {sidebarItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className={`transition-all duration-200 rounded-r-md ${isActive(item.link)
                                ? 'bg-gray-100 text-[#7A1CA9] border-l-4 border-l-[#7A1CA9]'
                                : 'text-gray-700 hover:bg-purple-50 hover:text-[#7A1CA9] hover:scale-105'
                            }`}
                    >
                        <div className="flex items-center gap-4 px-6 py-2">
                            <item.icon className="w-5 h-5" />
                            <span className="text-[14px] font-medium">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-gray-50 transition w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-[14px] font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default OwnerSidebar;