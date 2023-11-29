import React from 'react';

const DateButton = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const someDaysAgo = new Date(today);
  someDaysAgo.setDate(today.getDate() - 30);

  const dates = [];

  for (let i = 0; i < 31; i++) {
    const currentDate = new Date(someDaysAgo);
    currentDate.setDate(someDaysAgo.getDate() + i);

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);

    dates.unshift(
      <div key={i} className='lg:flex lg:m-2 lg:ml-5 '>
        <div className='m-2 pb-4'>
        <button className="p-4 w-20 bg-opacity-20 bg-white rounded-xl" style={{ whiteSpace: 'pre-line', margin: '2%', color: 'white' }}>
          {`${dayOfWeek}\n${dayOfMonth}\n${month}`}
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex overflow-x-scroll flex-row-reverse xs:pr-40 xs:mb-5 lg:pr-[45%]'>
      {dates}
    </div>
  );
};

export default DateButton;
