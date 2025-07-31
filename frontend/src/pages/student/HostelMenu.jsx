import React from 'react';
import './HostelMenu.css';

const weeklyMenu = {
  Monday: {
    breakfast: 'Idli & Sambar',
    lunch: 'Rice, Dal, Potato Curry',
    dinner: 'Chapati, Mixed Veg Curry',
  },
  Tuesday: {
    breakfast: 'Dosa & Chutney',
    lunch: 'Rice, Rajma, Cabbage',
    dinner: 'Paratha, Paneer Curry',
  },
  Wednesday: {
    breakfast: 'Upma & Chutney',
    lunch: 'Rice, Sambar, Brinjal Fry',
    dinner: 'Chapati, Egg Curry',
  },
  Thursday: {
    breakfast: 'Poori & Aloo Curry',
    lunch: 'Rice, Dal, Bhindi Fry',
    dinner: 'Fried Rice, Manchurian',
  },
  Friday: {
    breakfast: 'Pongal & Chutney',
    lunch: 'Rice, Sambar, Drumstick Curry',
    dinner: 'Chapati, Chicken Curry',
  },
  Saturday: {
    breakfast: 'Bread Omelette',
    lunch: 'Veg Biryani & Raita',
    dinner: 'Chapati, Dal Tadka',
  },
  Sunday: {
    breakfast: 'Masala Dosa',
    lunch: 'Chicken Biryani, Raita',
    dinner: 'Curd Rice, Pickle',
  },
};

export default function HostelMenu() {
  return (
    <div className="hostel-menu">
      <h2>🍽️ Weekly Hostel Menu</h2>
      <div className="menu-grid">
        {Object.entries(weeklyMenu).map(([day, meals]) => (
          <div className="menu-card" key={day}>
            <h3>{day}</h3>
            <p><strong>Breakfast:</strong> {meals.breakfast}</p>
            <p><strong>Lunch:</strong> {meals.lunch}</p>
            <p><strong>Dinner:</strong> {meals.dinner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
