import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { fetchItems, buyItem } from '../services/api';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems).catch(console.error);
  }, []);

  const handleBuy = (item) => {
    buyItem(item.id)
      .then(() => alert(`Purchased ${item.name} successfully!`))
      .catch((err) => alert(`Error: ${err.message}`));
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onBuy={handleBuy} />
      ))}
    </div>
  );
}

