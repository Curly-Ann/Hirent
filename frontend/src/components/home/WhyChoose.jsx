import React from 'react';

const WhyChoose = () => {
  const benefits = [
    {
      title: 'Save Money',
      description: 'Why buy when you can rent? Access what you need at a fraction of the cost. Perfect for one-time events or temporary needs.',
      icon: '/assets/icons/save.png',
    },
    {
      title: 'Earn Income',
      description: 'Turn your unused items into cash. List what you own and start earning passive income from items sitting idle in your home.',
      icon: '/assets/icons/star.png',
    },
    {
      title: 'Support Sustainability',
      description: 'Reduce waste and your carbon footprint. By sharing resources, we create a more sustainable future for everyone.',
      icon: '/assets/icons/sustainability.png',
    },
  ];

  const createBenefitCard = (benefit, index) => {
    return React.createElement(
      'div',
      {
        key: index,
        className: 'rounded-2xl px-3 py-7 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-transform transition-shadow duration-500',
        style: { background: 'linear-gradient(135deg, #743593 0%, #991BD8 100%)' }
      },

      // Icon Image
      React.createElement(
        'div',
        { className: 'flex justify-center mb-6' },
        React.createElement('img', {
          src: benefit.icon,
          alt: benefit.title,
          className: 'w-16 h-16 object-contain'
        })
      ),

      // Title
      React.createElement('h3', {
        className: 'text-xl font-medium text-center mb-3'
      }, benefit.title),
      // Description
      React.createElement('p', {
        className: 'text-[14px] font-thin text-center max-w-xs mx-auto',
        style: { color: '#E9D5FF' }
      }, benefit.description)

    );
  };

  return React.createElement(
    'section',
    { className: 'py-16 px-4 md:px-16 lg:px-24', style: { backgroundColor: '#F5F5F5' } },
    React.createElement(
      'div',
      { className: 'cart-scale max-w-7xl mx-auto' },

      // Header
      React.createElement(
        'div',
        { className: 'text-center mb-14' },
        React.createElement('h2', {
          className: 'text-2xl md:text-3xl font-semibold text-black mb-2'
        }, 'Why Choose Hirent?'),
        React.createElement('p', {
          className: 'text-gray-600 text-[16px] mt-1'
        }, 'Join thousands of users who are already saving money and earning income')
      ),

      // Benefits Grid
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-3 gap-14' },
        ...benefits.map(createBenefitCard)
      )
    )
  );
};

export default WhyChoose;
