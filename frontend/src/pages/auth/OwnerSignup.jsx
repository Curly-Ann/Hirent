import React, { useState, useContext } from "react";
import "../../assets/Auth.css";
import logo from "../../assets/logo.png";
import hirentLogo from "../../assets/hirent-logo-purple.png";
import bg from "../../assets/auth-owner-bg.jpg";
import Footer from "../../components/layouts/Footer";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const OwnerSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const validateName = (name) => {
        const words = name.trim().split(" ").filter((w) => w.length > 1);
        return words.length >= 2;
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name) {
            setError("Full name is required.");
            return;
        }
        if (!validateName(formData.name)) {
            setError("Enter your first and last name (min 2 characters each).");
            return;
        }

        if (!formData.email) {
            setError("Email is required.");
            return;
        }
        if (!validateEmail(formData.email)) {
            setError("Enter a valid email address.");
            return;
        }

        if (!formData.password) {
            setError("Password is required.");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (!/[0-9]/.test(formData.password)) {
            setError("Password must include at least one number.");
            return;
        }
        if (!/[!@#$%^&*(),.?\":{}|<>]/.test(formData.password)) {
            setError("Password must include at least one special character.");
            return;
        }

        setError("");

        console.log("Owner Setup Signup data:", formData);
        navigate("/ownersetup");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div
                className="min-h-screen w-full flex flex-col items-center justify-center relative"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute top-6 left-6">
                          <img src={logo} alt="Hirent Logo" className="w-8 h-auto" />
                        </div>
                <div
                    className="z-10 cursor-default bg-white  text-purple-900   w-[480px] h-[650px] rounded-2xl shadow-2xl flex flex-row overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
                >
                    <div className="flex flex-col justify-center items-center w-full p-5">
                        <div className="flex flex-col items-start justify-start ml-12 w-full">
                            <img src={hirentLogo} alt="Hirent Logo" className="w-24 h-auto mb-6" />
                        </div>

                        <div className="w-full flex flex-col items-start ml-14">
                            <h2 className="text-[23px] font-bold text-purple-900">
                                Become an Owner
                            </h2>

                            <p className="text-[14.5px] font-medium text-gray-600 mb-4">
                                Create your account to start listing your items
                            </p>
                        </div>

                        <form className="space-y-2 w-[90%]" onSubmit={handleSubmit}>
                            <div className="relative w-full mx-auto rounded-b-md overflow-hidden">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder=" "
                                    className="block rounded-t-lg px-2 pb-2 pt-4 w-full text-[14px]  text-gray-900  bg-white  text-purple-900   
                                    border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 
                                    focus:border-[#bb84d6] peer"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute text-[14px] duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] left-2
                    peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500
                    peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-[#bb84d6]"
                                >
                                    Full Name
                                </label>
                            </div>

                            <div className="relative w-full mx-auto rounded-b-md overflow-hidden">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    placeholder=" "
                                    className="block rounded-t-lg px-2 pb-2 pt-4 w-full text-[14px]  text-gray-900  
                                    bg-white  text-purple-900   border-0 border-b-2 border-gray-200  appearance-none focus:outline-none 
                                    focus:ring-0 focus:border-[#bb84d6] peer"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute text-[14px] duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] left-2
                    peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500
                    peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-[#bb84d6]"
                                >
                                    Email
                                </label>
                            </div>

                            <div className="relative w-full mx-auto rounded-b-md overflow-hidden">
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                id="password"
                                                                value={formData.password}
                                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                                placeholder=" "
                                                                autoComplete="current-password"
                                                                className="block rounded-t-lg px-2 pb-2 pt-4 w-full text-[14px]   text-gray-900  bg-[#ffffff]  border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#bb84d6] peer"
                                                            />
                            
                                                            <label
                                                                htmlFor="password"
                                                                className="absolute text-[14px] duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] left-2
                                                peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500
                                                peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-[#bb84d6]"
                                                            >
                                                                Password
                                                            </label>
                            
                                                            {/* Eye toggle */}
                                                            {formData.password.length > 0 && (
                                                                <span
                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#7A1CA9]"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                >
                                                                    {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20} />}
                                                                </span>
                                                            )}
                                                        </div>

                            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className="relative w-full mx-auto border border-[#7A1CA9]  bg-[#7A1CA9] text-white py-3 text-[14px] font-medium rounded-md overflow-hidden group transition-all duration-300 hover:bg-[#65188a] mt-2"
                                >
                                    <span className="relative z-10">
                                        Continue to email
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="w-full mx-auto border border-gray-400 flex items-center 
                                    justify-center gap-2 py-3 text-[14px] rounded-md text-gray-700 
                                    hover:text-[#9935cb] hover:border-[#9935cb] hover:bg-gray-10 transition-all"
                                >
                                    <img
                                        src="https://www.svgrepo.com/show/355037/google.svg"
                                        alt="Google"
                                        className="w-5 h-5"
                                    />
                                    Sign up with Google
                                </button>
                            </div>
                        </form>

                        <p className="text-[12.5px] text-gray-600 text-center mt-5 mb-8">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#862bb3] hover:underline font-medium"
                            >
                                Login ➔
                            </Link>
                        </p>

                        <div className="w-full flex flex-col items-start ml-12">
                            <p className="text-[12px] font-light text-gray-600 mb-3">
                                By creating an owner account, you agree to the {" "}
                                <span className="text-blue-600 hover:underline cursor-pointer">
                                     Terms and <br /> Conditions
                                </span>{" "}
                                and {" "}
                                <span className="text-blue-600 hover:underline cursor-pointer">
                                    Privacy Policy
                                </span>
                            </p>
                        </div>

                        <div className="w-full flex gap-3 text-[12px] text-gray-500 mt-4 justify-start ml-12">
                            <span className="hover:underline cursor-pointer">Help</span>
                            <span className="hover:underline cursor-pointer">Privacy</span>
                            <span className="hover:underline cursor-pointer">Terms</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OwnerSignup;
