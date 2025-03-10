// Burç listesi için type tanımlaması
export type ZodiacSign = 
  | 'Koç' 
  | 'Boğa' 
  | 'İkizler' 
  | 'Yengeç' 
  | 'Aslan' 
  | 'Başak' 
  | 'Terazi' 
  | 'Akrep' 
  | 'Yay' 
  | 'Oğlak' 
  | 'Kova' 
  | 'Balık';

// API'den gelen burç yorumu verisi için interface
export interface HoroscopeData {
  sign: ZodiacSign;
  date: string;
  dailyComment: string;
}

// Tüm burçların temel özellikleri
export interface ZodiacSignInfo {
  name: ZodiacSign;
  element: 'Ateş' | 'Toprak' | 'Hava' | 'Su';
  symbol: string;
  dateRange: string;
  iconPath: string; // SVG dosya yolu
  englishName: string; // İngilizce isim (dosya isimlerini eşleştirmek için)
}

// Tüm burçlar için sabit bilgileri içeren liste
export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    name: 'Koç',
    element: 'Ateş',
    symbol: '♈',
    dateRange: '21 Mart - 19 Nisan',
    iconPath: '/icons/icons8_aries_1.svg',
    englishName: 'aries'
  },
  {
    name: 'Boğa',
    element: 'Toprak',
    symbol: '♉',
    dateRange: '20 Nisan - 20 Mayıs',
    iconPath: '/icons/icons8_taurus_1.svg',
    englishName: 'taurus'
  },
  {
    name: 'İkizler',
    element: 'Hava',
    symbol: '♊',
    dateRange: '21 Mayıs - 20 Haziran',
    iconPath: '/icons/icons8_gemini_4.svg', 
    englishName: 'gemini'
  },
  {
    name: 'Yengeç',
    element: 'Su',
    symbol: '♋',
    dateRange: '21 Haziran - 22 Temmuz',
    iconPath: '/icons/icons8_cancer_1.svg',
    englishName: 'cancer'
  },
  {
    name: 'Aslan',
    element: 'Ateş',
    symbol: '♌',
    dateRange: '23 Temmuz - 22 Ağustos',
    iconPath: '/icons/icons8_leo_1.svg',
    englishName: 'leo'
  },
  {
    name: 'Başak',
    element: 'Toprak',
    symbol: '♍',
    dateRange: '23 Ağustos - 22 Eylül',
    iconPath: '/icons/icons8_virgo_1.svg',
    englishName: 'virgo'
  },
  {
    name: 'Terazi',
    element: 'Hava',
    symbol: '♎',
    dateRange: '23 Eylül - 22 Ekim',
    iconPath: '/icons/icons8_libra_1.svg',
    englishName: 'libra'
  },
  {
    name: 'Akrep',
    element: 'Su',
    symbol: '♏',
    dateRange: '23 Ekim - 21 Kasım',
    iconPath: '/icons/icons8_scorpio_1.svg',
    englishName: 'scorpio'
  },
  {
    name: 'Yay',
    element: 'Ateş',
    symbol: '♐',
    dateRange: '22 Kasım - 21 Aralık',
    iconPath: '/icons/icons8_sagittarius_1.svg',
    englishName: 'sagittarius'
  },
  {
    name: 'Oğlak',
    element: 'Toprak',
    symbol: '♑',
    dateRange: '22 Aralık - 19 Ocak',
    iconPath: '/icons/icons8_capricorn_1.svg',
    englishName: 'capricorn'
  },
  {
    name: 'Kova',
    element: 'Hava',
    symbol: '♒',
    dateRange: '20 Ocak - 18 Şubat',
    iconPath: '/icons/icons8_aquarius_1.svg',
    englishName: 'aquarius'
  },
  {
    name: 'Balık',
    element: 'Su',
    symbol: '♓',
    dateRange: '19 Şubat - 20 Mart',
    iconPath: '/icons/icons8_pisces_1.svg',
    englishName: 'pisces'
  }
]; 