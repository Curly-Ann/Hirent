import { LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion"
import { useRef } from "react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  animationVariant: "search" | "book" | "pickup" | "enjoy" | "return";
  index: number;
}

export function StepCard({
  step,
  title,
  description,
  features,
  icon: Icon,
  animationVariant,
  index,
}: StepCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const iconAnimation = {
    search: { scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] },
    book: { scale: [1, 1.1, 1], y: [0, -6, 0] },
    pickup: { y: [0, -10, 0], x: [0, 4, 0] },
    enjoy: { rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] },
    return: { scale: [1, 0.92, 1], rotate: [0, -8, 0] },
  }[animationVariant];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Connecting line for desktop timeline */}
      {index < 4 && (
        <motion.div
          className="hidden lg:block absolute top-28 left-[calc(100%-2rem)] w-[calc(100%-4rem)] h-1 bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}

      {/* MAIN CARD */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative px-6 py-8 w-[240px] rounded-3xl shadow-xl border border-white/50 backdrop-blur-xl bg-white  text-purple-900  /40"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        {/* Step number */}
        <div className="absolute -top-4 -left-4 w-11 h-11 rounded-full font-semibold bg-gradient-to-br from-[#991BD8] to-[#CB1BD8] text-white flex items-center justify-center shadow-lg">
          {step}
        </div>

        {/* Icon */}
        <motion.div
          animate={iconAnimation}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="
    relative w-20 h-20 mx-auto mb-6 rounded-full
    bg-gradient-to-br from-[#991BD8] to-[#CB1BD8]
    flex items-center justify-center shadow-lg
  "
        >
          <Icon className="w-10 h-10 text-white relative z-10" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <h3 className="text-center text-xl font-semibold mb-3 bg-gradient-to-r from-[#743593] to-[#991BD8] bg-clip-text text-transparent">
          {title}
        </h3>

        <p className="text-center text-gray-700 text-[15px] mb-4">{description}</p>

        {/* Features */}
        <ul className="space-y-1">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.15 + i * 0.1 + 0.2,
              }}
              className="flex items-start gap-2 text-purple-900"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
