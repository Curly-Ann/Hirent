import React, { useState, useEffect } from "react";
import "../../assets/Auth.css";
import logo from "../../assets/hirent-logo.png";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Stepper from "../../components/Stepper";
import { regions, provinces, cities, barangays } from "select-philippines-address";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Owner_Information = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sellerType: "individual",
    name: "",
    addressName: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    postalCode: "",
    detailAddress: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
  };

  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  useEffect(() => {
    const loadRegions = async () => {
      const data = await regions();
      setRegionList(data);
    };
    loadRegions();
  }, []);

  const handleRegionChange = async (e) => {
    const selectedRegion = regionList.find(r => r.region_code === e.target.value);
    const updatedForm = {
      ...formData,
      region: selectedRegion?.region_code || "",
      regionName: selectedRegion?.region_name || "",
      province: "",
      provinceName: "",
      city: "",
      cityName: "",
      barangay: ""
    };
    setFormData(updatedForm);
    const provincesData = await provinces(updatedForm.region);
    setProvinceList(provincesData);
    setCityList([]);
    setBarangayList([]);
    updatePickupAddress(updatedForm);
  };

  const handleProvinceChange = async (e) => {
    const selectedProvince = provinceList.find(p => p.province_code === e.target.value);
    const updatedForm = {
      ...formData,
      province: selectedProvince?.province_code || "",
      provinceName: selectedProvince?.province_name || "",
      city: "",
      cityName: "",
      barangay: ""
    };
    setFormData(updatedForm);
    const citiesData = await cities(updatedForm.province);
    setCityList(citiesData);
    setBarangayList([]);
    updatePickupAddress(updatedForm);
  };

  const handleCityChange = async (e) => {
    const selectedCity = cityList.find(c => c.city_code === e.target.value);
    const updatedForm = {
      ...formData,
      city: selectedCity?.city_code || "",
      cityName: selectedCity?.city_name || "",
      barangay: ""
    };
    setFormData(updatedForm);
    const barangaysData = await barangays(updatedForm.city);
    setBarangayList(barangaysData);
    updatePickupAddress(updatedForm);
  };

  const handleBarangayChange = (e) => {
    const updatedForm = { ...formData, barangay: e.target.value };
    setFormData(updatedForm);
    updatePickupAddress(updatedForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    if (name === "postalCode") updatePickupAddress(updatedForm);
  };


  const handleNext = (e) => {
    e.preventDefault();
    const requiredFields = ["name", "addressName", "region", "province", "city", "barangay"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      alert("Please fill out all required fields.");
      return;
    }
    navigate("/owner-submission");
  };

  const updatePickupAddress = (updatedForm) => {
    const { barangay, cityName, provinceName, regionName, postalCode } = updatedForm;
    if (regionName && provinceName && cityName && barangay && postalCode) {
      const fullAddress = `${barangay}, ${cityName}, ${provinceName}, ${regionName}, ${postalCode}`;
      setFormData((prev) => ({ ...prev, addressName: fullAddress }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="min-h-screen flex flex-col w-full items-center justify-center relative gradient-anim">

        <div className="absolute top-6 left-6">
          <img src={logo} alt="Hirent Logo" className="w-24 h-auto mb-3" />
        </div>

        <div className="z-10 bg-white w-100 md:w-[350px] lg:w-[550px] h-[670px] rounded-lg shadow-lg p-10 flex flex-col justify-center">

          <div className="w-[full] flex justify-center mb-6">
            <Stepper activeStep={0} />
          </div>

          <h2 className="text-[24px] font-bold text-gray-900 mb-1 text-center">
            Owner Information
          </h2>
          <p className="text-[15px] text-gray-600 mb-8 text-center">
            Enter your details below
          </p>

          <form className="space-y-3 max-w-[28rem] mx-auto" onSubmit={handleNext}>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seller Type</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-[15px] text-gray-800">
                  <input
                    type="radio"
                    name="sellerType"
                    value="individual"
                    checked={formData.sellerType === "individual"}
                    onChange={handleChange}
                    className="accent-[#7A1CA9] w-4 h-4"
                  />
                  Individual
                </label>
                <label className="flex items-center gap-2 text-[15px] text-gray-800">
                  <input
                    type="radio"
                    name="sellerType"
                    value="business"
                    checked={formData.sellerType === "business"}
                    onChange={handleChange}
                    className="accent-[#7A1CA9] w-4 h-4"
                  />
                  Business
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                placeholder="Owner Full Name/Business Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-1">Pickup Address <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="addressName"
                placeholder="Full Name of Address"
                value={formData.addressName}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Region <span className="text-red-500">*</span></label>
                <select
                  value={formData.region}
                  onChange={handleRegionChange}
                  className="bg-gray-100 border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-purple-600"
                >
                  <option value="" disabled hidden>Select Region</option>
                  {regionList.map((r) => (
                    <option key={r.psgc_code} value={r.region_code}>
                      {r.region_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Province <span className="text-red-500">*</span></label>
                <select
                  value={formData.province}
                  onChange={handleProvinceChange}
                  className="bg-gray-100 border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-purple-600"
                >
                  <option value="" disabled hidden>Select Province</option>
                  {provinceList.map((p) => (
                    <option key={p.psgc_code} value={p.province_code}>
                      {p.province_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                <select
                  value={formData.city}
                  onChange={handleCityChange}
                  className="bg-gray-100 border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-purple-600"
                >
                  <option value="" disabled hidden>Select City</option>
                  {cityList.map((c) => (
                    <option key={c.city_code} value={c.city_code}>
                      {c.city_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Barangay <span className="text-red-500">*</span></label>
                <select
                  value={formData.barangay}
                  onChange={handleBarangayChange}
                  className="bg-gray-100 border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-purple-600"
                >
                  <option value="" disabled hidden>Select Barangay</option>
                  {barangayList.map((b) => (
                    <option key={b.brgy_code} value={b.brgy_name}>
                      {b.brgy_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Postal <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-purple-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-1">
                Detailed Address
              </label>
              <input
                type="text"
                name="detailAddress"
                placeholder="Unit No., Building, Street, etc."
                value={formData.detailAddress}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleSave}
                className={`border rounded-md px-8 py-2 transition text-[15px] font-medium ${isSaved
                  ? "bg-green-100 border-green-500 text-green-600"
                  : "border-[#7A1CA9] text-[#7A1CA9] hover:bg-purple-50"
                  }`}
              >
                {isSaved ? (
                  <span className="flex items-center gap-2">
                    Saved <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  </span>
                ) : (
                  "Save"
                )}
              </button>

              <button
                type="submit"
                className="bg-[#7A1CA9] text-white rounded-md px-8 py-2 hover:bg-purple-600 transition text-[15px] font-medium"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Owner_Information;
