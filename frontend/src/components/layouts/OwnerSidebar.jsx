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

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // <-- useNavigate for redirect

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
        // 1. Clear user session (example with localStorage)
        localStorage.removeItem('userToken'); // adjust key if different
        localStorage.removeItem('userData');

        // 2. Redirect to login page
        navigate('/login');
    };

    return (
        <div
            className="bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-screen w-70 z-10
             transition-shadow duration-300 hover:shadow-lg"
        >
            {/* Logo + Title */}
            <div className="flex flex-col items-start ml-5 pt-6 pb-4">
                <img src={hirentLogo} alt="HiRENT Logo" className="h-6 mb-1" />
                <h2 className="text-[13px] text-gray-700">Owner Dashboard</h2>
            </div>

            <hr className="border-t border-gray-200 mb-3" />

            {/* Scrollable Menu */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                {sidebarItems.map((item, index) => {
                    const active = isActive(item.link);
                    return (
                        <Link
                            key={index}
                            to={item.link}
                            className={`relative transition-all duration-200 transform ${active
                                    ? 'bg-gray-100 text-[#7A1CA9] border-l-4 border-l-[#7A1CA9]'
                                    : 'text-gray-700 hover:bg-purple-50 hover:text-[#7A1CA9] hover:scale-105'
                                } rounded-r-md`}
                        >
                            <div className="flex items-center gap-4 px-5 py-2">
                                <item.icon className="w-5 h-5" />
                                <span className="text-[13px] font-medium whitespace-nowrap">
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Fixed Bottom Logout */}
            <div className="border-t border-gray-200 mt-auto">
                <button
                    className="flex items-center gap-4 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-all w-full"
                    onClick={handleLogout} // <-- call handleLogout
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-[13px] font-medium whitespace-nowrap">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
