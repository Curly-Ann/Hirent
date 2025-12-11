import React, { useState, useEffect, useContext } from "react";
import "../../assets/Auth.css";
import logo from "../../assets/logo.png";
import bg from "../../assets/auth-owner-bg.jpg";
import Footer from "../../components/layouts/Footer";
import Stepper from "../../components/Stepper";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const OwnerSetup = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [agree, setAgree] = useState(false);
  const [contactFocused, setContactFocused] = useState(false);
  const [step, setStep] = useState(1);

  // --------------------------
  // FORM STATES
  // --------------------------
  const [formData, setFormData] = useState({
    sellerType: "individual",
    name: "",
    contact: "",
    ownerAddress: "",
    pickupAddress: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    postalCode: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("ownerFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setIsSaved(true);
    }
  }, []);

  // Load Regions (only Step 1)
  useEffect(() => {
    if (step === 1) {
      regions().then(setRegionList);
    }
  }, [step]);

  // --------------------------
  // HELPER FUNCTIONS
  // --------------------------
  const updateAutoAddress = (updatedForm) => {
    const { barangay, cityName, provinceName, regionName, postalCode } = updatedForm;
    if (cityName && provinceName && regionName) {
      let parts = [];
      if (barangay) parts.push(barangay);
      parts.push(cityName, provinceName, regionName);
      if (postalCode) parts.push(postalCode);

      const fullAddress = parts.join(", ");
      setFormData((prev) => ({
        ...prev,
        ownerAddress: fullAddress,
        pickupAddress: fullAddress,
      }));
    }
  };

  const handleRegionChange = async (e) => {
    const selected = regionList.find((r) => r.region_code === e.target.value);

    const updated = {
      ...formData,
      region: selected?.region_code || "",
      regionName: selected?.region_name || "",
      province: "",
      provinceName: "",
      city: "",
      cityName: "",
      barangay: "",
    };

    setFormData(updated);
    setProvinceList(await provinces(updated.region));
    setCityList([]);
    setBarangayList([]);

    updateAutoAddress(updated);
  };

  const handleProvinceChange = async (e) => {
    const selected = provinceList.find((p) => p.province_code === e.target.value);

    const updated = {
      ...formData,
      province: selected?.province_code || "",
      provinceName: selected?.province_name || "",
      city: "",
      cityName: "",
      barangay: "",
    };

    setFormData(updated);
    setCityList(await cities(updated.province));
    setBarangayList([]);

    updateAutoAddress(updated);
  };

  const handleCityChange = async (e) => {
    const selected = cityList.find((c) => c.city_code === e.target.value);

    const updated = {
      ...formData,
      city: selected?.city_code || "",
      cityName: selected?.city_name || "",
      barangay: "",
    };

    setFormData(updated);
    setBarangayList(await barangays(updated.city));

    updateAutoAddress(updated);
  };

  const handleBarangayChange = (e) => {
    const updated = { ...formData, barangay: e.target.value };
    setFormData(updated);
    updateAutoAddress(updated);
  };

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (e.target.name === "postalCode") updateAutoAddress(updated);
  };

  const isStep1Valid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.contact.trim() !== "" &&
      formData.ownerAddress.trim() !== "" &&
      formData.pickupAddress.trim() !== "" &&
      formData.region !== "" &&
      formData.province !== "" &&
      formData.city !== ""
    );
  };

  // --------------------------
  // API CALLS
  // --------------------------
  const handleSave = async () => {
    const form = document.getElementById("ownerForm");
    if (!form.reportValidity()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sellerType: formData.sellerType,
          phone: formData.contact,
          ownerAddress: formData.ownerAddress,
          pickupAddress: formData.pickupAddress,
          region: formData.region,
          regionName: formData.regionName,
          province: formData.province,
          provinceName: formData.provinceName,
          city: formData.city,
          cityName: formData.cityName,
          barangay: formData.barangay,
          postalCode: formData.postalCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("ownerFormData", JSON.stringify(formData));
        setIsSaved(true);
      } else {
        alert("Failed to save: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error saving data: " + err.message);
    }
  };

  const handleCompleteSetup = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ownerSetupCompleted: true }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("ownerFormData");
        navigate("/owner/dashboard");
      } else {
        console.error("Failed to complete setup:", data.message);
      }
    } catch (err) {
      console.error("Setup completion error:", err);
    }
  };

  const handleNext = () => {
    const form = document.getElementById("ownerForm");
    if (!form.reportValidity()) return;
    setStep(2);
  };

  // --------------------------
  // RENDER CONTENT
  // --------------------------
  const renderContent = () => {
    if (step === 3) {
      return (
        <div className="flex flex-col items-center mt-2">
          <CheckCircleIcon className="w-44 h-44 text-[#4CE976] mb-6 mt-6" />
          <h1 className="text-[24px] font-bold text-gray-900 mb-1 text-center">
            Submitted Successfully!
          </h1>
          <p className="text-gray-600 text-[15px] text-center mb-8">
            Now you can proceed to list your first item.
          </p>
          <button
            className="w-80 bg-[#7A1CA9] text-white rounded-md py-2 hover:bg-purple-600 transition text-[15px] font-medium"
            onClick={handleCompleteSetup}
          >
            List Your Item
          </button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="flex flex-col h-full">
          <div className="p-10 overflow-y-auto max-h-[400px]">
            <h1 className="text-[18px] font-bold text-gray-900 mb-4">Terms & Conditions</h1>
            <p className="text-gray-700 mb-4 text-[14px] leading-relaxed">
              Welcome to Hirent! Before becoming a rental item owner, please review the Terms & Conditions.
            </p>
            {/* ... include your T&C sections here */}
            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-5 h-5 accent-[#7A1CA9]"
              />
              <label htmlFor="agree" className="text-purple-900 font-medium text-[15px]">
                I have read and agree to the Terms & Conditions.
              </label>
            </div>
          </div>
          <div className="mt-auto px-10 py-6 bg-white flex justify-end gap-3">
            <button
              onClick={() => setStep(1)}
              className="border border-gray-400 text-gray-700 rounded-md px-8 py-2 text-[14px]"
            >
              Back
            </button>
            <button
              disabled={!agree}
              onClick={() => setStep(3)}
              className={`px-8 py-2 rounded-md text-[14px] transition ${
                agree
                  ? "bg-[#7A1CA9] text-white hover:bg-purple-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // Step 1 form
    return (
      <form id="ownerForm" className="space-y-3 max-w-[700px] mx-auto" onSubmit={handleNext}>
        {/* Form fields like Seller Type, Name, Contact, Address */}
        {/* Use handleChange, handleRegionChange, handleProvinceChange, handleCityChange, handleBarangayChange */}
        {/* Save & Next buttons */}
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute top-6 left-6">
          <img src={logo} alt="Hirent Logo" className="w-8 h-auto" />
        </div>
        <div className="relative z-10 bg-white w-100 md:w-[600px] lg:w-[800px] min-h-[500px] rounded-lg shadow-lg p-15 flex flex-col">
          <div className={`w-full flex flex-col items-center justify-center ${step === 2 ? "mb-0" : "mb-8"}`}>
            <Stepper currentStep={step} />
          </div>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OwnerSetup;