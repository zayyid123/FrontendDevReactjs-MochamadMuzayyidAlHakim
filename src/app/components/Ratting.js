import React from 'react';

const Rating = ({ value, text, color }) => {
  const stars = [];
  const maxValue = 5;

  for (let i = 1; i <= maxValue; i++) {
    const starColor = i <= value ? color : 'gray'; // Mengatur warna bintang sesuai dengan nilai rating
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={starColor}
        stroke={starColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-star"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }

  return (
    <div className="flex justify-start items-center mb-2 mt-1">
      {stars}
      <span className='ml-1'>{text && text}</span>
    </div>
  );
};

export default Rating;
