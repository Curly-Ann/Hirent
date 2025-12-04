import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Package, Star } from "lucide-react";
import { StepCard } from "../../../components/cards/StepCard";
import { FloatingParticles } from "../../../components/cards/FloatingParticles";

const steps = [
  {
    step: 1,
    title: "Search",
    description: "Browse thousands of rental items in your area",
    features: [
      "Filters for category, price, distance, and availability",
      "Smart search suggestions",
      "Trending items near you",
    ],
    icon: Search,
    animationVariant: "search",
  },
  {
    step: 2,
    title: "Select & Book",
    description: "View details and secure your rental",
    features: [
      "Item details, images, and owner ratings",
      "Availability calendar",
      "Instant booking or request-to-rent",
    ],
    icon: Calendar,
    animationVariant: "book",
  },
  {
    step: 3,
    title: "Pickup or Delivery",
    description: "Choose the most convenient option",
    features: [
      "Pickup location or delivery option",
      "In-app messaging with the owner",
      "Secure payment system",
    ],
    icon: MapPin,
    animationVariant: "pickup",
  },
  {
    step: 4,
    title: "Enjoy & Use",
    description: "Use your rental with peace of mind",
    features: [
      "Full access during rental period",
      "Tips and safety guidelines",
      "Smart return reminders",
    ],
    icon: Package,
    animationVariant: "enjoy",
  },
  {
    step: 5,
    title: "Return & Review",
    description: "Complete your rental journey",
    features: [
      "Return or arrange pickup",
      "Leave a review for the owner",
      "Earn reward points",
    ],
    icon: Star,
    animationVariant: "return",
  },
];

export function HowItWorksSection() {
  return (
    <section className="collection-scale relative min-h-screen py-12 overflow-hidden">
      <FloatingParticles />

      {/* Background glowing orbs */}
      <div className="absolute top-20 left-20 w-[26rem] h-[26rem] bg-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-[26rem] h-[26rem] bg-pink-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-[#7A1CA9]/20/30 mb-6"
          >
            <span className="bg-gradient-to-r from-[#7A1CA9] to-pink-600 bg-clip-text text-transparent">
              Simple & Seamless
            </span>
          </motion.div>

          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#7A1CA9] via-[#991BD8] to-pink-600 bg-clip-text text-transparent">
            How It Works
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-md">
            Renting on HiRent is fast, secure, and effortless. Here's how the process works.
          </p>
        </motion.div>

        {/* DESKTOP — TIMELINE */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8 mb-20 relative">
          {steps.map((step, index) => (
            <StepCard key={step.step} {...step} index={index} />
          ))}
        </div>

        {/* MOBILE — STACKED CARDS */}
        <div className="lg:hidden space-y-10 mb-20">
          {steps.map((step, index) => (
            <StepCard key={step.step} {...step} index={index} />
          ))}
        </div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-2 rounded-full bg-gradient-to-r from-[#991BD8] to-[#CB1BD8] text-white text-lg font-medium shadow-xl overflow-hidden"
          >
            <span className="relative z-10 text-[15px]">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#991BD8] to-[#CB1BD8]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <p className="mt-4 text-gray-500 text-sm">
            Join thousands of renters today • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
