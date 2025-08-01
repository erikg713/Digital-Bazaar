import { useEffect, useState } from 'react';
import API from '../api';

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const purchase = async (id: number) => {
    await API.post(`/purchase/${id}`, { buyer_id: user.id });
    alert('Purchase recorded. Pay with Pi manually.');
  };

  useEffect(() => {
    API.get('/items').then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>{item.price_pi} Pi</strong></p>
            <button onClick={() => purchase(item.id)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
