import React, { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef(null);
  const dragStart = useRef(0);

  const testimonials = [
    {
      name: "Maria Santos",
      role: "5-star renter since 2023",
      rating: 5,
      comment:
        "Super easy to use and I get products I needed at such great prices. I'm hooked!",
      avatar: "MS",
    },
    {
      name: "John Reyes",
      role: "Renter",
      rating: 5,
      comment: "Hassle-free renting, exactly what I needed for my event!",
      avatar: "JR",
    },
    {
      name: "Sarah Chen",
      role: "5-star renter since 2023",
      rating: 5,
      comment: "Great service to rent cameras for my project!",
      avatar: "SC",
    },
  ];

  // Duplicate for loop scrolling
  const loopTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Auto scroll
  useEffect(() => {
    if (isDragging) return;

    const container = scrollRef.current;
    const maxScroll = container.scrollWidth / 3;

    const interval = setInterval(() => {
      container.scrollLeft += 1;

      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Drag events
  const startDrag = (e) => {
    setIsDragging(true);
    dragStart.current = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
  };

  const dragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const current = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const diff = dragStart.current - current;
    scrollRef.current.scrollLeft += diff;
    dragStart.current = current;
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <section className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-[28px] font-semibold text-gray-900">
            Our Happy Customers
          </h3>
          <p className="text-gray-600 text-[16px]">
            Real stories from members who love HiRent
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseDown={startDrag}
          onMouseMove={dragMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startDrag}
          onTouchMove={dragMove}
          onTouchEnd={stopDrag}
        >
          {loopTestimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition flex-shrink-0"
              style={{
                minWidth: "330px",
                maxWidth: "330px",
                minHeight: "150px",
              }}
            >
              {/* Stars */}
              <div className="flex items-center mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0..." />
                  </svg>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-[14px] leading-relaxed mb-4">
                “{t.comment}”
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-[13px] font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-[14px]">
                    {t.name}
                  </h4>
                  <p className="text-gray-600 text-[13px]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
