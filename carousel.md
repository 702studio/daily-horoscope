
Aşağıdaki örnek kod, **SwiperJS** kullanarak mouse tekerleği (mouse wheel) ile carousel kontrolünü etkinleştiren basit bir yapı sunuyor. Bu örnekte, Swiper'ın Mousewheel modülü kullanılıyor ve Next/Prev butonları yalnızca masaüstü görünümünde gösterilebilecek şekilde yapılandırılabilir. Aşağıdaki örneği, kendi projelerinizde ihtiyaçlarınıza göre uyarlayabilirsiniz.

```tsx
// Carousel.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Pagination, Navigation } from 'swiper';

// Swiper modüllerini yükleyin
SwiperCore.use([Mousewheel, Pagination, Navigation]);

const Carousel = () => {
  return (
    <Swiper
      direction="horizontal"
      slidesPerView={3}
      spaceBetween={20}
      mousewheel={{ forceToAxis: true }} // Mouse wheel ile yatay kaydırma sağlanır.
      pagination={{ clickable: true, el: '.swiper-pagination' }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'swiper-button-disabled',
      }}
      // Responsive ayarlar: Mobilde ok butonları gizleyebilir veya farklı davranış verebilirsiniz.
      breakpoints={{
        0: { slidesPerView: 1, navigation: false },
        768: { slidesPerView: 2, navigation: true },
        1024: { slidesPerView: 3, navigation: true },
      }}
      style={{ paddingBottom: '40px' }} // Pagination için ekstra boşluk
    >
      <SwiperSlide>
        <div className="card">Slide 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">Slide 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">Slide 3</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">Slide 4</div>
      </SwiperSlide>
      {/* Ek slaytlar ekleyin */}
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
};

export default Carousel;
```

### Açıklamalar

- **Mousewheel:**  
  `mousewheel={{ forceToAxis: true }}` ayarı, fare tekerleğinin yalnızca yatay eksende (carousel yönünde) çalışmasını sağlar.  
- **Pagination:**  
  Pagination bullet'larının clickable olması sağlanır ve `.swiper-pagination` sınıfı ile tanımlanır.  
- **Navigation:**  
  Next/Prev butonları için `.swiper-button-next` ve `.swiper-button-prev` elementleri tanımlanır. Responsive ayarlarda mobil görünümde bu butonlar gizlenir.  
- **Breakpoints:**  
  `breakpoints` ayarı, farklı ekran boyutlarına göre gösterilecek slayt sayısını ve navigasyon butonlarının durumunu belirler.

Bu örnek, carousel bileşeninizde mouse tekerleği ile kaydırma işlevselliğini sağlamanın yanı sıra, responsive davranışı da yönetmenizi sağlar. Mobil cihazlarda istenmeyen butonların yazılarla çakışmasını engellemek için ilgili ayarları breakpoints içerisinde düzenleyebilirsiniz.