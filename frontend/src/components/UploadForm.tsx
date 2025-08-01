import { useState } from 'react';
import API from '../api';

export default function UploadForm({ onUpload }: { onUpload: () => void }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const upload = async () => {
    await API.post('/items', {
      creator_id: user.id,
      name,
      description: desc,
      price_pi: parseInt(price),
      file_url: url,
    });
    setName('');
    setDesc('');
    setPrice('');
    setUrl('');
    onUpload();
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl mb-2">Upload New Item</h2>
      <div className="flex flex-col gap-2">
        <input placeholder="Item Name" value={name} onChange={e => setName(e.target.value)} className="border p-2" />
        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="border p-2" />
        <input placeholder="Price in Pi" value={price} onChange={e => setPrice(e.target.value)} className="border p-2" />
        <input placeholder="Download URL" value={url} onChange={e => setUrl(e.target.value)} className="border p-2" />
        <button onClick={upload} className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
      </div>
    </div>
  );
}
