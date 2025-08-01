import React from 'react';

export default function ItemCard({ item, onBuy }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <img src={item.imageUrl} alt={item.name} className="h-48 object-cover rounded" />
      <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-green-600 font-bold">{item.price} ꓷ</span>
        <button
          onClick={() => onBuy(item)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
        >
          Buy
        </button>
      </div>
    </div>
  );
}

