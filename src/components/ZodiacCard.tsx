"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { HoroscopeData, ZODIAC_SIGNS } from '@/lib/types';

interface ZodiacCardProps {
  horoscope: HoroscopeData;
  onCardClick?: (sign: string) => void;
  fixedHeight?: boolean;
}

// Metni belirli bir karakter sayısına göre kısaltan yardımcı fonksiyon
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const ZodiacCard: React.FC<ZodiacCardProps> = ({ horoscope, onCardClick, fixedHeight = false }) => {
  const [isClickAnimating, setIsClickAnimating] = useState(false);
  
  // Karakter sınırı
  const MAX_CHARS = 200;
  
  // Burç bilgilerini bul
  const zodiacInfo = ZODIAC_SIGNS.find(z => z.name === horoscope.sign);
  
  // Kısaltılmış metin
  const truncatedComment = useMemo(() => {
    return truncateText(horoscope.dailyComment, MAX_CHARS);
  }, [horoscope.dailyComment]);
  
  if (!zodiacInfo) return null;

  const handleClick = () => {
    if (onCardClick) {
      // Tıklama animasyonunu başlat
      setIsClickAnimating(true);
      
      // Animasyon bittikten sonra tıklama eylemini gerçekleştir
      setTimeout(() => {
        onCardClick(horoscope.sign);
      }, 300);
    }
  };
  
  return (
    <div 
      className={`flex flex-col rounded-lg overflow-hidden w-full h-full bg-bg-alt shadow-md hover:shadow-lg transition-all cursor-pointer zodiac-card ${isClickAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'}`}
      onClick={handleClick}
      style={{ 
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformOrigin: 'center'
      }}
    >
      {/* Kart Başlığı */}
      <div className="bg-accent text-bg p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif">{zodiacInfo.name}</h2>
          <Image 
            src={zodiacInfo.iconPath}
            alt={zodiacInfo.name}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        <div className="mt-1 text-sm">
          <span>{zodiacInfo.dateRange}</span>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-bg bg-opacity-20">
            {zodiacInfo.element}
          </span>
        </div>
      </div>
      
      {/* Kart İçeriği */}
      <div className={`p-5 flex-grow flex flex-col`}>
        <div className="text-xs text-accent mb-2">{horoscope.date}</div>
        <p className="text-text">
          {truncatedComment}
          {horoscope.dailyComment.length > MAX_CHARS && (
            <span className="text-accent"> ...</span>
          )}
        </p>
        
        {/* Devamını Oku İpucu */}
        <div className="mt-auto pt-3 text-xs text-accent text-right italic">
          Detaylar için tıklayın →
        </div>
      </div>
    </div>
  );
};

export default ZodiacCard; 