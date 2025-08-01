import React, { useState } from 'react';
import { createItem } from '../services/api';

export default function CreateItem() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem(form);
      alert('Item created successfully!');
      setForm({ name: '', description: '', price: '', imageUrl: '' });
    } catch (err) {
      alert(`Failed to create item: ${err.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Item Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full border px-4 py-2 rounded"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Price in Pi"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Image URL"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded font-semibold"
        >
          Create Item
        </button>
      </form>
    </div>
  );
}

