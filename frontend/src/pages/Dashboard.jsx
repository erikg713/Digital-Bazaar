import React, { useEffect, useState } from 'react';
import { getUserItems } from '../services/api';

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUserItems().then(setItems).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Purchased Items</h2>
      {items.length === 0 ? (
        <p>No items purchased yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white shadow p-4 rounded">
              <img src={item.imageUrl} alt={item.name} className="h-40 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

