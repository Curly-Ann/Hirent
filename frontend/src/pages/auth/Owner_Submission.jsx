import React from "react";
import "../../assets/Auth.css";
import logo from "../../assets/hirent-logo.png";
import Footer from "../../components/Footer";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Stepper from "../../components/Stepper";


const Owner_Submission = () => {
    const handleListItem = () => {
        console.log("Navigating to list your first item...");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="min-h-screen flex flex-col w-full items-center justify-center relative gradient-anim">
                <div className="absolute top-6 left-6">
                    <img src={logo} alt="Hirent Logo" className="w-24 h-auto mb-3" />
                </div>


                <div className="z-10 bg-white w-100 md:w-[350px] lg:w-[550px] h-[670px] rounded-lg shadow-lg p-10 flex flex-col justify-between">

                    <div className="w-full flex justify-center mb-2">
                        <Stepper activeStep={1} />
                    </div>

                    <div className="flex flex-col items-center mt-2">
                        <CheckCircleIcon className="w-44 h-44 text-[#4CE976] mb-6" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            Submitted Successfully!
                        </h1>
                        <p className="text-gray-600 text-center">
                            Now you can proceed to list your first item!
                        </p>
                    </div>

                    <div className="w-full flex justify-center mt-6">
                        <button
                            onClick={handleListItem}
                            className="bg-[#7A1CA9] text-white rounded-md px-36 py-2 hover:bg-purple-600 transition text-[15px] font-medium"
                        >
                            List Your Item
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Owner_Submission;
