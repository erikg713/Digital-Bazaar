import UploadForm from '../components/UploadForm';
import { useEffect, useState } from 'react';
import API from '../api';

export default function CreatorDashboard() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchItems = async () => {
    const res = await API.get('/items');
    const mine = res.data.filter((item: any) => item.creator_id === user.id);
    setItems(mine);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Creator Dashboard</h1>
      <UploadForm onUpload={fetchItems} />
      <h2 className="text-xl mt-6 mb-2">Your Items</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <li key={item.id} className="border p-4">
            <p><strong>{item.name}</strong></p>
            <p>{item.description}</p>
            <p>{item.price_pi} Pi</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
