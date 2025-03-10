import { NextRequest, NextResponse } from 'next/server';
import { ZodiacSign, HoroscopeData } from '@/lib/types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

// İngilizce burç isimlerini Türkçe burç isimlerine eşleme
const SIGN_MAPPING: Record<ZodiacSign, string> = {
  "Koç": "aries", 
  "Boğa": "taurus", 
  "İkizler": "gemini", 
  "Yengeç": "cancer", 
  "Aslan": "leo", 
  "Başak": "virgo", 
  "Terazi": "libra", 
  "Akrep": "scorpio", 
  "Yay": "sagittarius", 
  "Oğlak": "capricorn", 
  "Kova": "aquarius", 
  "Balık": "pisces"
};

// Burçların doğal sıralaması
const SIGN_ORDER: ZodiacSign[] = [
  "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", 
  "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"
];

// Gerçek yorumlar (API çağrısı başarısız olursa)
const BACKUP_HOROSCOPES: Record<ZodiacSign, string> = {
  "Koç": "Bugün kariyer hayatınızda önemli gelişmeler yaşanabilir. Yeni fırsatlar için gözünüzü açık tutun ve cesur adımlar atmaktan çekinmeyin. Finansal konularda temkinli davranmanızda fayda var.",
  "Boğa": "Maddi konularda şanslı bir gün. Uzun süredir beklediğiniz gelişmeler gerçekleşebilir. İlişkilerinizde sakin ve sabırlı olmanız, olası tartışmaları önleyecektir.",
  "İkizler": "İletişim yetenekleriniz bugün dorukta. Düşüncelerinizi ifade etmek için ideal bir gün. Sosyal çevrenizde kendinizi gösterebilir, yeni bağlantılar kurabilirsiniz.",
  "Yengeç": "Ailenizle ilgili konularda hassasiyet gösterebilirsiniz. Duygusal derinliğinizi yaratıcı projelerinize yansıtmanız, büyük başarı getirebilir. Sezigilere dikkat edin.",
  "Aslan": "Kendinizi ifade etme konusunda şanslı bir gündesiniz. Yaratıcı fikirleriniz takdir toplayacak. Liderlik vasıflarınızı öne çıkarabilir, çevrenizi etkileyebilirsiniz.",
  "Başak": "Detaylara olan dikkatiniz sayesinde fark yaratabilirsiniz. İş hayatınızda verimli olabilir, karmaşık sorunları çözebilirsiniz. Sağlığınıza özen göstermeniz gereken bir gün.",
  "Terazi": "İlişkilerinizde denge ve uyum ön planda. Diplomatik yaklaşımınız sayesinde çatışmaları çözebilirsiniz. Sanatsal aktiviteler için uygun bir gün.",
  "Akrep": "Derin duygular ve tutkular gün içinde sizi etkileyebilir. Gizli konular ortaya çıkabilir. Finansal konularda stratejik yaklaşımlar geliştirmelisiniz.",
  "Yay": "Özgürlük ve macera arzunuz artabilir. Yeni yerler keşfetmek, yeni bilgiler edinmek için ideal bir gün. İyimserliğiniz çevrenizdeki kişilere de yansıyacak.",
  "Oğlak": "Kariyer hedeflerinize ulaşmak için doğru adımları atabilirsiniz. Disiplinli çalışmanız meyvelerini verecek. Uzun vadeli planlarınızı gözden geçirmenin tam zamanı.",
  "Kova": "Yenilikçi fikirlerinizle dikkat çekebilirsiniz. Teknolojik konularda şanslı bir gün. Arkadaşlarınızla olan bağlarınız güçlenebilir, yeni sosyal çevreler edinebilirsiniz.",
  "Balık": "Sezgisel yetenekleriniz bugün çok güçlü. Sanatsal projeleriniz için ilham dolu bir gün. Hayaller ve gerçekler arasında denge kurmanız önemli."
};

// Astro API'den burç yorumunu almak için yardımcı fonksiyon
async function fetchHoroscopeFromAPI(sign: string): Promise<string> {
  try {
    // Gerçek API çağrısı yapıyoruz
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=today`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API isteği başarısız: ${response.status}`);
    }

    const data = await response.json();
    return data.data.horoscope_data || "Bugün için burç yorumu bulunamadı.";
  } catch (error) {
    console.error(`Burç yorumu alınırken hata oluştu (${sign}):`, error);
    
    // API hatası durumunda yedek veri kullan
    const turkishSign = Object.keys(SIGN_MAPPING).find(
      key => SIGN_MAPPING[key as ZodiacSign] === sign
    ) as ZodiacSign;
    
    if (turkishSign && BACKUP_HOROSCOPES[turkishSign]) {
      return BACKUP_HOROSCOPES[turkishSign];
    }
    
    return "Burç yorumu şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.";
  }
}

// Tüm burçlar için günlük yorumları almak
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sign = searchParams.get('sign') as ZodiacSign | null;
  const today = new Date();
  const formattedDate = format(today, 'd MMMM yyyy', { locale: tr });

  // Eğer belirli bir burç isteniyorsa sadece o burcu döndür
  if (sign && SIGN_MAPPING[sign]) {
    try {
      // Gerçek API'den veri almaya çalış
      const englishSign = SIGN_MAPPING[sign];
      const horoscopeText = await fetchHoroscopeFromAPI(englishSign);
      
      const horoscope: HoroscopeData = {
        sign,
        date: formattedDate,
        dailyComment: horoscopeText
      };
      
      return NextResponse.json(horoscope);
    } catch (error) {
      console.error(`${sign} burcu için veri alınırken hata:`, error);
      // Hata durumunda yedek veriyi kullan
      return NextResponse.json({
        sign,
        date: formattedDate,
        dailyComment: BACKUP_HOROSCOPES[sign]
      });
    }
  }
  
  // Tüm burçlar için (paralel istek yap)
  try {
    const promises = Object.keys(SIGN_MAPPING).map(async (turkishSign) => {
      const englishSign = SIGN_MAPPING[turkishSign as ZodiacSign];
      try {
        const horoscopeText = await fetchHoroscopeFromAPI(englishSign);
        return {
          sign: turkishSign as ZodiacSign,
          date: formattedDate,
          dailyComment: horoscopeText
        };
      } catch (error) {
        // Tek bir burç için hata olursa, yedek veriyi kullan
        return {
          sign: turkishSign as ZodiacSign,
          date: formattedDate,
          dailyComment: BACKUP_HOROSCOPES[turkishSign as ZodiacSign]
        };
      }
    });
    
    const allHoroscopes = await Promise.all(promises);
    
    // Burçları doğal sıralamaya göre sırala (Koç ile başlayan sıralama)
    const sortedHoroscopes = [...allHoroscopes].sort((a, b) => {
      const indexA = SIGN_ORDER.indexOf(a.sign);
      const indexB = SIGN_ORDER.indexOf(b.sign);
      return indexA - indexB;
    });
    
    return NextResponse.json(sortedHoroscopes);
  } catch (error) {
    console.error("Tüm burç yorumları alınırken hata:", error);
    
    // Hata durumunda tüm burçlar için yedek veriyi kullan
    const fallbackData = SIGN_ORDER.map(sign => ({
      sign: sign as ZodiacSign,
      date: formattedDate,
      dailyComment: BACKUP_HOROSCOPES[sign]
    }));
    
    return NextResponse.json(fallbackData);
  }
} 