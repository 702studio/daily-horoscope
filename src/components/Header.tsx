import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text">
        Günlük Burç Yorumları
      </h1>
      <p className="mt-4 text-accent max-w-2xl mx-auto">
        Burçların günlük enerjilerini ve etkilerini keşfedin. 
        Minimal ve sade bir tasarımla hazırlanmış günlük yorumlar.
      </p>
    </header>
  );
};

export default Header; 