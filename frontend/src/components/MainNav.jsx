import React from 'react';
import hirentLogo from "../assets/hirent-logo.png";

const Navbar = () => {
  return React.createElement(
    'nav',
    { className: 'px-6 md:px-16 lg:px-24 py-3.5', style: { backgroundColor: '#7A1CA9' } },
    React.createElement(
      'div',
      { className: 'flex items-center justify-between max-w-7xl mx-auto' },

      React.createElement(
        'div',
        { className: 'flex items-center' },
        React.createElement('img', {
          src: hirentLogo,
          alt: 'HiRENT',
          className: 'h-7'
        })
      ),

      React.createElement(
        'div',
        { className: 'hidden md:flex items-center space-x-10 font-inter text-[13px]' },
        React.createElement('a', {
          href: '#home',
          className: 'text-white hover:text-gray-200 transition'
        }, 'Home'),
        React.createElement('a', {
          href: '#browse',
          className: 'text-white hover:text-gray-200 transition'
        }, 'Browse'),
        React.createElement('a', {
          href: '#how-it-works',
          className: 'text-white hover:text-gray-200 transition'
        }, 'How It Works'),
        React.createElement('a', {
          href: '#about',
          className: 'text-white hover:text-gray-200 transition'
        }, 'About Us'),
        React.createElement('a', {
          href: '#seller',
          className: 'hover:opacity-80 transition underline',
          style: { color: '#FFFB83' }
        }, 'Be an Owner')
      ),

      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement(
          'button',
          {
            className: 'w-20 h-8 bg-white/5 border border-white/70 text-white rounded-md font-inter font-semibold hover:bg-white/20 transition text-[13px]',
          },
          'Login'
        ),
        React.createElement(
          'button',
          {
            className: 'w-24 h-8 bg-white rounded-md font-inter font-semibold hover:bg-gray-100 transition text-[13px]',
            style: { color: '#743593' }
          },
          'Register'
        )
      )

    )
  );
};

export default Navbar;