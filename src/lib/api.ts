import { HoroscopeData, ZodiacSign } from "./types";

/**
 * Belirli bir burç için günlük yorumu getir
 */
export async function getHoroscopeForSign(sign: ZodiacSign): Promise<HoroscopeData> {
  try {
    const response = await fetch(`/api/horoscope?sign=${encodeURIComponent(sign)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Her zaman taze veri almak için
    });

    if (!response.ok) {
      throw new Error(`API isteği başarısız: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Burç yorumu getirirken hata oluştu:', error);
    throw error;
  }
}

/**
 * Tüm burçlar için günlük yorumları getir
 */
export async function getAllHoroscopes(): Promise<HoroscopeData[]> {
  try {
    const response = await fetch(`/api/horoscope`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Her zaman taze veri almak için
    });

    if (!response.ok) {
      throw new Error(`API isteği başarısız: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Tüm burç yorumlarını getirirken hata oluştu:', error);
    throw error;
  }
} 