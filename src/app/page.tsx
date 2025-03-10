import React from 'react';
import Header from '@/components/Header';
import ZodiacCarousel from '@/components/ZodiacCarousel';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col px-4 md:px-8 py-6 relative">
      <Header />
      
      {/* Ana İçerik */}
      <div className="flex-grow mb-16 sm:mb-12">
        {/* Kart Carouselı */}
        <div className="mt-8">
          <ZodiacCarousel />
        </div>
        
        {/* Banner Reklam Alanı - Standard 728x90 AdSense - Masaüstü versiyonu */}
        <div className="ad-container max-w-[728px] mx-auto my-10 h-[90px] hidden sm:flex">
          <div className="text-neutral-500 text-xs">
            Bu alan Google AdSense reklamları için ayrılmıştır.
            <span className="text-xs opacity-75 ml-2">Banner Reklam</span>
          </div>
        </div>
      </div>
      
      {/* Mobil AdSense - Footer pozisyonunda */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-10">
        <div className="ad-container-mobile w-full h-[60px] flex items-center justify-center">
          <div className="text-neutral-500 text-xs">
            Bu alan Google AdSense reklamları için ayrılmıştır.
          </div>
        </div>
      </div>
      
      {/* Footer - Mobilde gizli */}
      <footer className="w-full text-center py-3 border-t border-neutral fixed bottom-0 left-0 right-0 bg-bg z-10 hidden sm:block">
        <div className="flex flex-wrap justify-center items-center gap-1 text-[10px] sm:text-xs text-accent max-w-[95%] mx-auto">
          <p className="whitespace-nowrap">© {new Date().getFullYear()} Günlük Burç Yorumları.</p>
          <p className="whitespace-nowrap">Tüm hakları saklıdır.</p>
          <span className="hidden sm:inline mx-1">|</span>
          <p className="whitespace-nowrap">Bu site üzerinden sunulan içerikler sadece bilgilendirme amaçlıdır.</p>
        </div>
      </footer>
    </main>
  );
}
