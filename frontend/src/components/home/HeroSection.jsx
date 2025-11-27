import React from 'react';
import { MoveRight } from "lucide-react";

const HeroSection = () => {
  return React.createElement(
    'section',
    {
      className: "relative px-8 md:px-16 lg:px-24 py-28 md:py-28",
      style: {
        backgroundImage: 'url("/assets/bg/landingBg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    },
    // Gradient overlay
    React.createElement('div', { className: 'absolute inset-0' }),

    React.createElement(
      'div',
      { className: 'cart-scale max-w-7xl mx-auto relative z-10' },

      // Flex container for text + image
      React.createElement(
        'div',
        { className: 'flex flex-col md:flex-row items-center md:items-start' },

        // Left: Text content
        React.createElement(
          'div',
          { className: 'max-w-3xl md:flex-1' },
          React.createElement(
            'h1',
            {
              className:
                'text-[36px] font-inter font-bold text-black mt-12 mb-3 leading-tight'
            },
            'Rent What You Need.',
            React.createElement('br'),
            "Earn From What You Don't."
          ),
          React.createElement(
            'p',
            {
              className:
                'text-[16px] font-inter text-black mb-5 leading-relaxed'
            },
            'Save money, reduce waste, and join the sharing economy with HiRENT.',
            React.createElement('br'),
            'Discover thousands of items available for rent near you.'
          ),
          React.createElement(
            'div',
            { className: 'flex flex-wrap gap-3 mb-12' },
            React.createElement(
              'button',
              {
                className:
                  'px-3 py-1.5 text-white rounded-md font-inter font-medium hover:opacity-90 transition shadow-md flex items-center gap-2 text-[13px]',
                style: { backgroundColor: '#7A1CA9' }
              },
              'Explore Rentals ',
              React.createElement(MoveRight, { size: 12 })
            ),
            React.createElement(
              'button',
              {
                className:
                  'px-3 py-1.5 bg-white rounded-md font-inter font-medium hover:bg-black hover:bg-opacity-5 transition text-[13px]',
                style: {
                  border: '1px solid #000000',
                  color: '#000000'
                }
              },
              'Learn More'
            )
          ),
          // Stats Section
          React.createElement(
            'div',
            { className: 'flex flex-wrap gap-8 md:gap-12' },
            React.createElement(
              'div',
              null,
              React.createElement(
                'h3',
                { className: 'text-[30px] font-inter font-bold', style: { color: '#7A1CA9' } },
                '10,000+'
              ),
              React.createElement(
                'p',
                { className: 'text-xs md:text-sm font-inter font-medium', style: { color: '#1F2937' } },
                'Items Listed'
              )
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                'h3',
                { className: 'text-[30px] font-inter font-bold', style: { color: '#7A1CA9' } },
                '5,000+'
              ),
              React.createElement(
                'p',
                { className: 'text-xs md:text-sm font-inter font-medium', style: { color: '#1F2937' } },
                'Active Users'
              )
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                'h3',
                { className: 'text-[30px] font-inter font-bold', style: { color: '#7A1CA9' } },
                '99%'
              ),
              React.createElement(
                'p',
                { className: 'text-xs md:text-sm font-inter font-medium', style: { color: '#1F2937' } },
                'Satisfaction'
              )
            )
          )
        ),

      )
    )
  );
};

export default HeroSection;
