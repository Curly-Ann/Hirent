import React, { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  const dragStartRef = useRef(0);

  const createStarIcon = () => {
    return React.createElement(
      'svg',
      { className: 'w-5 h-5 text-yellow-400', fill: 'currentColor', viewBox: '0 0 20 20' },
      React.createElement('path', {
        d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
      })
    );
  };

  const testimonials = [
    {
      name: 'Maria Santos',
      role: '5 star renter since 2023',
      rating: 5,
      comment: 'Super easy to use and I get products I needed at such great prices. I\'m hooked!',
      avatar: 'MS',
      bgColor: 'bg-purple-600',
    },
    {
      name: 'John Reyes',
      role: 'Renter',
      rating: 5,
      comment: 'Hassle free renting, exactly what I needed for my event!',
      avatar: 'JR',
      bgColor: 'bg-purple-600',
    },
    {
      name: 'Sarah Chen',
      role: '5 star renter since 2023',
      rating: 5,
      comment: 'Great service to rent cameras for my project',
      avatar: 'SC',
      bgColor: 'bg-purple-600',
    },
  ];

  // Duplicate testimonials to create seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isDragging) return;

    const scroll = () => {
      if (scrollDirection === 1) {
        // Scrolling right
        scrollContainer.scrollLeft += 1;
        
        // Check if we've scrolled past the first set of testimonials
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      } else {
        // Scrolling left
        scrollContainer.scrollLeft -= 1;
        
        // Check if we've scrolled to the beginning
        if (scrollContainer.scrollLeft <= 0) {
          const maxScroll = scrollContainer.scrollWidth / 3;
          scrollContainer.scrollLeft = maxScroll;
        }
      }
    };

    const intervalId = setInterval(scroll, 20); // Adjust speed here (lower = faster)

    return () => clearInterval(intervalId);
  }, [isDragging, scrollDirection]);

  // Change direction every 10 seconds
  useEffect(() => {
    const directionInterval = setInterval(() => {
      setScrollDirection(prev => prev * -1);
    }, 10000); // Change direction every 10 seconds

    return () => clearInterval(directionInterval);
  }, []);

  // Drag/Swipe handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = dragStartRef.current - currentX;
    scrollRef.current.scrollLeft += diff;
    dragStartRef.current = currentX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const createTestimonialCard = (testimonial, index) => {
    return React.createElement(
      'div',
      { 
        key: index, 
        className: 'bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition flex-shrink-0',
        style: { minWidth: '350px', width: '350px' }
      },
      
      // Stars
      React.createElement(
        'div',
        { className: 'flex items-center mb-4' },
        ...Array(testimonial.rating).fill(0).map((_, i) => createStarIcon())
      ),
      
      // Comment
      React.createElement('p', { className: 'font-inter text-[14px] text-gray-700 mb-6 leading-relaxed' }, `"${testimonial.comment}"`),
      
      // User Info
      React.createElement(
        'div',
        { className: 'flex items-center gap-4' },
        React.createElement(
          'div',
          { className: `w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center text-[13px] text-white font-inter font-semibold` },
          testimonial.avatar
        ),
        React.createElement(
          'div',
          null,
          React.createElement('h4', { className: 'font-inter font-semibold text-[14px] text-gray-900' }, testimonial.name),
          React.createElement('p', { className: 'text-[13px] font-inter text-gray-600' }, testimonial.role)
        )
      )
    );
  };

  return React.createElement(
    'section',
    { className: 'py-24 px-6 md:px-16 lg:px-24 bg-gray-50 overflow-hidden' },
    React.createElement(
      'div',
      { className: 'max-w-7xl mx-auto' },
      
      // Header
      React.createElement(
        'div',
        { className: 'text-center mb-12' },
        React.createElement('h3', { className: 'text-[26px] font-semibold text-gray-900' }, 'Our Happy Customers'),
        React.createElement('p', { className: 'text-gray-600 text-[15px] mb-1' }, 'Real stories from real members who transformed their lives with Hirent')
      ),
      
      // Testimonials Carousel
      React.createElement(
        'div',
        { 
          ref: scrollRef,
          className: 'flex gap-8 overflow-x-hidden cursor-grab active:cursor-grabbing select-none',
          style: { 
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch'
          },
          onMouseDown: handleDragStart,
          onMouseMove: handleDragMove,
          onMouseUp: handleDragEnd,
          onMouseLeave: handleDragEnd,
          onTouchStart: handleDragStart,
          onTouchMove: handleDragMove,
          onTouchEnd: handleDragEnd
        },
        ...duplicatedTestimonials.map(createTestimonialCard)
      )
    )
  );
};

export default Testimonials;
