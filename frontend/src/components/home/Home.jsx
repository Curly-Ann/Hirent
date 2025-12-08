import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";

import HeroSection from "./HeroSection";
import FeaturedCategories from "./FeaturedCategories";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import WhyChoose from "./WhyChoose";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // NEW
  const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW

  useEffect(() => {
    const token = localStorage.getItem("token");

    // User NOT logged in → don't fetch personalized homepage
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    async function loadHomeData() {
      try {
        const res = await fetch(`${API_URL}/home/personalized`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          console.warn("Personalized API returned no data.");
        }
      } catch (err) {
        console.error("Home API error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  // Optional loading state (nice for UI polish)
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading personalized recommendations...
      </div>
    );
  }

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection user={data?.userLocation} isLoggedIn={isLoggedIn} />

      {/* FEATURED CATEGORIES */}
      <FeaturedCategories
        categories={data?.categoryPreferences || []}
        recommended={data?.recommended || []}
      />

      {/* STATIC SECTIONS */}
      <HowItWorks />
      <Testimonials />

      {/* WHY CHOOSE US */}
      <WhyChoose nearbyItems={data?.nearbyItems || []} />
    </div>
  );
}
