"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { HoroscopeData, ZodiacSign, ZODIAC_SIGNS } from '@/lib/types';
import { getHoroscopeForSign } from '@/lib/api';

interface ZodiacDetailProps {
  sign: ZodiacSign;
  onBack: () => void;
}

const ZodiacDetail: React.FC<ZodiacDetailProps> = ({ sign, onBack }) => {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'content'>(
    'initial'
  );
  
  // Burç bilgilerini bul
  const zodiacInfo = ZODIAC_SIGNS.find(z => z.name === sign);
  
  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const data = await getHoroscopeForSign(sign);
        setHoroscope(data);
        setLoading(false);
      } catch (error) {
        console.error('Burç yorumu yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };
    
    // İlk animasyon fazı tamamlandığında içerik görünür hale gelir
    const initialTimer = setTimeout(() => {
      setAnimationComplete(true);
      fetchHoroscope();
      
      // İkinci animasyon fazı - içerik animasyonu
      setTimeout(() => {
        setAnimationPhase('content');
      }, 300);
    }, 400);
    
    return () => clearTimeout(initialTimer);
  }, [sign]);
  
  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onBack();
    }, 400);
  };
  
  if (!zodiacInfo) return null;
  
  if (loading && !animationComplete) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className={`w-full max-w-6xl mx-auto mb-16 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} style={{ transition: 'all 300ms ease-in-out' }}>
      {/* Geri Butonu */}
      <button 
        onClick={handleBackClick}
        className={`mb-6 px-4 py-2 flex items-center text-accent hover:text-text transition-colors group ${
          animationPhase === 'initial' ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
        } transition-all duration-500 delay-200`}
      >
        <span className="mr-2 transform transition-transform group-hover:-translate-x-2">←</span> Tüm Burçlara Dön
      </button>
      
      {/* Burç Detay Kartı */}
      <div className={`bg-bg-alt rounded-lg overflow-hidden shadow-xl ${
        animationPhase === 'initial' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } transition-all duration-500 delay-100`}>
        {/* Kart Başlığı */}
        <div className="bg-accent text-bg p-6">
          <div className={`flex items-center justify-between ${
            animationPhase === 'initial' ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-700 delay-300`}>
            <h2 className="text-4xl font-serif">{zodiacInfo.name}</h2>
            <Image 
              src={zodiacInfo.iconPath}
              alt={zodiacInfo.name}
              width={52}
              height={52}
              className={`object-contain transform ${
                animationPhase === 'initial' ? 'rotate-45 scale-0' : 'rotate-0 scale-100'
              } transition-all duration-700 delay-400`}
            />
          </div>
          <div className={`mt-2 ${
            animationPhase === 'initial' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          } transition-all duration-500 delay-500`}>
            <span className="text-lg">{zodiacInfo.dateRange}</span>
            <span className="ml-3 px-3 py-1 rounded-full bg-bg bg-opacity-20 text-sm">
              {zodiacInfo.element} Elementi
            </span>
          </div>
        </div>
        
        {/* Kart İçeriği */}
        <div className={`p-6 ${
          animationPhase === 'initial' ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-500 delay-600`}>
          <div className="text-sm text-accent mb-4">
            {horoscope?.date} Günlük Yorumu
          </div>
          <p className="text-lg leading-relaxed">{horoscope?.dailyComment}</p>
        </div>
        
        {/* Ek Bilgiler */}
        <div className={`border-t border-neutral p-6 bg-bg bg-opacity-50 ${
          animationPhase === 'initial' ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
        } transition-all duration-500 delay-700`}>
          <h3 className="font-serif text-xl mb-3">Burç Özellikleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`transform ${
              animationPhase === 'initial' ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            } transition-all duration-500 delay-800`}>
              <h4 className="font-medium text-accent">Genel Karakteri</h4>
              <p className="mt-1">
                {zodiacInfo.name} burcu {zodiacInfo.element} elementine bağlıdır ve 
                {zodiacInfo.element === 'Ateş' && ' tutkulu, enerjik ve liderdir.'}
                {zodiacInfo.element === 'Toprak' && ' pratik, çalışkan ve güvenilirdir.'}
                {zodiacInfo.element === 'Hava' && ' iletişimci, sosyal ve entelektüeldir.'}
                {zodiacInfo.element === 'Su' && ' duygusal, sezgisel ve empatiyle doludur.'}
              </p>
            </div>
            <div className={`transform ${
              animationPhase === 'initial' ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            } transition-all duration-500 delay-900`}>
              <h4 className="font-medium text-accent">Uyumlu Burçlar</h4>
              <p className="mt-1">
                {zodiacInfo.element === 'Ateş' && 'Aslan, Yay, Koç burçlarıyla uyumludur.'}
                {zodiacInfo.element === 'Toprak' && 'Boğa, Başak, Oğlak burçlarıyla uyumludur.'}
                {zodiacInfo.element === 'Hava' && 'İkizler, Terazi, Kova burçlarıyla uyumludur.'}
                {zodiacInfo.element === 'Su' && 'Yengeç, Akrep, Balık burçlarıyla uyumludur.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacDetail; 