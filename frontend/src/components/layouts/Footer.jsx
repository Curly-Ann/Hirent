import React from "react";
import qrCode from "../../assets/qr-code.png";
import hirentLogo from "../../assets/hirent-logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#7A1CA9] text-white py-10 px-5 w-full text-sm">
  <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-10">

                {/* subscription */}
                <div>
                    <img
                        src={hirentLogo}
                        alt="Hirent Logo"
                        className="w-24 h-auto mb-4"
                    />

                    <p className="text-xs text-gray-300 mb-3">Subscribe</p>
                    <p className="text-xs text-gray-300 mb-4">
                        Get 10% off your first order
                    </p>

                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-52 bg-white  text-purple-900  ">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-2 py-2 text-gray-700 focus:outline-none text-xs"
                        />
                        <button className="bg-[#9e26da] hover:bg-purple-700 text-white text-xs px-3 py-2 h-full flex items-center justify-center">
                            ➤
                        </button>
                    </div>
                </div>

                {/* support */}
                <div className="space-y-4">
                    <h3 className="font-bold text-base mb-5">Support</h3>

                    <p className="text-xs text-gray-300 flex items-center gap-2">
                        <i className="fas fa-map-marker-alt w-3"></i>
                        Naga City, Camarines Sur,<br />
                        Philippines 4400
                    </p>

                    <p className="text-xs text-gray-300 flex items-center gap-2">
                        <i className="fas fa-envelope w-3"></i>
                        info@hirent.com
                    </p>

                    <p className="text-xs text-gray-300 flex items-center gap-2">
                        <i className="fas fa-phone-alt w-3"></i>
                        +88015-88888-9999
                    </p>
                </div>

                {/* account */}
                <div>
                    <h3 className="font-bold text-base mb-5">Account</h3>
                    <ul className="text-xs text-gray-300 space-y-4">
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">My Account</a></li>
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">Login / Register</a></li>
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">collection</a></li>
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">Wishlist</a></li>
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">Shop</a></li>
                    </ul>
                </div>

                {/* quick link */}
                <div>
                    <h3 className="font-bold text-base mb-5">Quick Link</h3>
                    <ul className="text-xs text-gray-300 space-y-4">
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">Privacy Policy</a></li>
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">Terms Of Use</a></li>
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">FAQ</a></li>
                        <li><a href="#" className="no-underline hover:no-underline hover:text-[#e3c6ff] transition-colors duration-200">Contact</a></li>
                    </ul>
                </div>

                {/* download app & social media */}
                <div>
                    <h3 className="font-bold text-base mb-5">Download App</h3>
                    <p className="text-xs text-gray-300 mb-3">
                        Save $3 with App New User Only
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                        <img src={qrCode} alt="QR Code" className="w-16 h-16 rounded-sm" />
                        <div className="flex flex-col gap-2">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="w-24"
                            />
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                className="w-24"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 text-gray-300 text-lg">
                        <a href="#" className="hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="hover:text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* copyright */}
            <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-400 pt-6">
                © Copyright Hirent 2025. All right reserved.
            </div>
        </footer>
    );
};

export default Footer;
