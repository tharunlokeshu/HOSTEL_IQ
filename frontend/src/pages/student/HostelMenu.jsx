import React from "react";
import "./HostelMenu.css";

const FoodMenu = () => {
  const menu = {
    Monday: {
      breakfast: "Idly (4) with Sambar / Chutney, Coffee/Milk",
      lunch: "Kaboli Senagalu Kobbarikaya Curry, Anapakaya Pappu, Sambar, Pickel, Curd, White Rice, Appadalu",
      snacks: "Onion Bajji with Chutney, Tea/Milk",
      dinner: "Aloo Curry, Rasam, Curd, White Rice, Banana, Pulka, Chips, Sorakaya Pappu",
    },
    Tuesday: {
      breakfast: "Poori (2) with Curry, Coffee/Milk",
      lunch: "Egg Curry / Paneer Capsicum Curry, Mamidikaya Pappu, Sambar, Curd, White Rice, Pickel, Aloo 65 Fry",
      snacks: "Curry Puff (1), Sauce Packet, Tea/Milk",
      dinner: "Pakodi Curry, Pappu Charu, Banana, White Rice, Pulka, Chips, Curd",
    },
    Wednesday: {
      breakfast: "Garelu (3) / Upma with Chutney (2 types), Coffee/Milk",
      lunch: "Potato Meal Maker Curry, Cabbage Fry, Sambar, Curd, White Rice, Tomato Pappu, Pickel",
      snacks: "Samosa (1), Sauce Packet, Tea/Milk",
      dinner: "Chicken Curry / Paneer Curry, White Rice, Dal, Rasam, Chips",
    },
    Thursday: {
      breakfast: "Onion Dosa (1), Plain Dosa (1) with Chutney (2 types), Coffee/Milk",
      lunch: "Bobarla Curry, Aloo Mukkala Fry, Sambar, Curd, White Rice, Sorakaya Pappu, Pickel",
      snacks: "Masala Vada (2), Tea/Milk",
      dinner: "Bundi Curry, Tomato Pappu, Curd, White Rice, Rasam, Pulka, Chips, Banana",
    },
    Friday: {
      breakfast: "Onion Bajji (4) with Chutney, Coffee/Milk",
      lunch: "Egg Curry / Capsicum Paneer Curry, Sorakaya Pappu, Brinjal Meal Maker Curry, Cabbage Fry, Curd, Sambar, White Rice, Pickel",
      snacks: "Pakodi, Tea/Milk",
      dinner: "Veg Biryani, Raita, Aloo Kurma, Veg Gravy",
    },
    Saturday: {
      breakfast: "Pesarattu (1), Upma with Chutney (2 types), Coffee/Milk",
      lunch: "Mullakada Tomato Curry, Cabbage Pappu, Aratikaya Fry, Sambar, Curd, White Rice, Pickel",
      snacks: "Samosa (1), Sauce Packet, Tea/Milk",
      dinner: "White Rice, Rasam, Meal Maker Senagalu Pappu Curry, Tomato Pappu, Chips, Banana, Pulka, Curd",
    },
    Sunday: {
      breakfast: "Chapathi (2) with Aloo Kurma, Coffee/Milk",
      lunch: "White Rice, Sambar, Tomato Pappu Curry, Cabbage Senagapappu Curry, Aloo Mukkala Fry, Curd, Mango Pickel, Sweet",
      snacks: "Roll Cake (1), Tea/Milk",
      dinner: "Biryani Rice with Chicken Curry / Mushroom Curry with Raita and Butter Milk",
    },
  };

  return (
    <div className="food-menu-container">
      <h2 className="food-menu-title">🍴 Pragathi College – Mess Menu</h2>
      <table className="food-menu-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Snacks</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(menu).map((day, idx) => (
            <tr key={idx}>
              <td className="day-column">{day}</td>
              <td>{menu[day].breakfast}</td>
              <td>{menu[day].lunch}</td>
              <td>{menu[day].snacks}</td>
              <td>{menu[day].dinner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">Note: Curries may change according to seasonal availability of vegetables.</p>
    </div>
  );
};

export default FoodMenu;
