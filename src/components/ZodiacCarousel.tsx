"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

import ZodiacCard from './ZodiacCard';
import ZodiacDetail from './ZodiacDetail';
import { HoroscopeData, ZodiacSign } from '@/lib/types';
import { getAllHoroscopes } from '@/lib/api';

const ZodiacCarousel: React.FC = () => {
  const [horoscopes, setHoroscopes] = useState<HoroscopeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [equalHeight, setEqualHeight] = useState<number | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Kartları getir
  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        const data = await getAllHoroscopes();
        setHoroscopes(data);
        setLoading(false);
      } catch (error) {
        console.error('Burç yorumları yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };
    
    fetchHoroscopes();
  }, []);
  
  // Kart yüksekliklerini eşitle
  useEffect(() => {
    if (!loading && horoscopes.length > 0) {
      // Yeniden ölçüm için timeout kullan
      const timer = setTimeout(() => {
        // Tüm kartları kontrol et ve en yüksek olanı bul
        let maxHeight = 0;
        slidesRef.current.forEach(slide => {
          if (slide) {
            const cardContent = slide.querySelector('.zodiac-card');
            if (cardContent) {
              const height = cardContent.getBoundingClientRect().height;
              maxHeight = Math.max(maxHeight, height);
            }
          }
        });
        
        if (maxHeight > 0) {
          setEqualHeight(maxHeight);
        }
      }, 500);
      
      // Component unmount olduğunda timer'ı temizle
      return () => clearTimeout(timer);
    }
  }, [loading, horoscopes]);
  
  const handleCardClick = (sign: string) => {
    setSelectedSign(sign as ZodiacSign);
  };
  
  const handleBackToList = () => {
    setSelectedSign(null);
  };
  
  // Referans listesini güncellemek için yardımcı fonksiyon
  const updateSlidesRef = (index: number, ref: HTMLDivElement | null) => {
    slidesRef.current[index] = ref;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  // Eğer bir burç seçildiyse detay görünümünü göster
  if (selectedSign) {
    return <ZodiacDetail sign={selectedSign} onBack={handleBackToList} />;
  }
  
  return (
    <div className="w-full carousel-container relative">
      <Swiper
        modules={[Pagination, Navigation, Mousewheel]}
        spaceBetween={30}
        slidesPerView={1}
        grabCursor={true}
        centeredSlides={true}
        speed={300}
        slidesPerGroup={1}
        mousewheel={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="instagram-style-carousel py-6 mb-4"
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 1,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 1,
          },
          1280: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          },
        }}
      >
        {horoscopes.map((horoscope, index) => (
          <SwiperSlide 
            key={horoscope.sign} 
            className="h-auto py-6 card-slide"
          >
            <div 
              ref={(ref) => updateSlidesRef(index, ref)}
              className="zodiac-slide-item"
              style={equalHeight ? { height: `${equalHeight}px` } : {}}
            >
              <ZodiacCard 
                horoscope={horoscope} 
                onCardClick={handleCardClick}
                fixedHeight={equalHeight !== null}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ZodiacCarousel; 