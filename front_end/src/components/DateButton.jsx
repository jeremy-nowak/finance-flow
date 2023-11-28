import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const DateButton = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 30);

  const slides = [];

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(sevenDaysAgo);
    currentDate.setDate(sevenDaysAgo.getDate() + i);

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);

    slides.push(
      <SwiperSlide key={i}>
        <div>
        <button className="p-4 w-16 bg-opacity-20 bg-white" style={{ whiteSpace: 'pre-line', margin: '2%', color: 'white' }}>
          {`${dayOfWeek}\n${dayOfMonth}\n${month}`}
        </button>
        </div>
      </SwiperSlide>
    );
  }

  return (
      <Swiper 
        direction={'horizontal-reverse'}
        spaceBetween={2}
        slidesPerView={6}
        centeredSlides={true}
    >
      {slides}
    </Swiper>
  );
};

export default DateButton;
