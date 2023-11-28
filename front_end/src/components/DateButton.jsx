import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DateButton = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const someDaysAgo = new Date(today);
  someDaysAgo.setDate(today.getDate() - 30);

  const slides = [];

  for (let i = 1; i < 31; i++) {
    const currentDate = new Date(someDaysAgo);
    currentDate.setDate(someDaysAgo.getDate() + i);

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);

    slides.unshift(
      <div key={i}>
        <button className="p-4 w-20 bg-opacity-20 bg-white " style={{ whiteSpace: 'pre-line', margin: '2%', color: 'white' }}>
          {`${dayOfWeek}\n${dayOfMonth}\n${month}`}
        </button>
      </div>
    );
  }

  const sliderSettings = {
    
    infinite: false,
    speed: 500, // Adjust the speed for smoother transitions
    slidesToShow: 4,
    slidesToScroll: 4,
    rtl : true,
    ltr : false,
    ease: 'ease', // Use ease for smoother transitions

    
   
  };

  return (
    <Slider {...sliderSettings}>
      {slides}
    </Slider>
  );
};

export default DateButton;
