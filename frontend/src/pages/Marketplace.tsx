import { useEffect, useState } from 'react';
import API from '../api';

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const purchase = async (item: any) => {
    if (!window.Pi) {
      alert('Please open this app in the Pi Browser.');
      return;
    }

    const paymentData = {
      amount: item.price_pi,
      memo: `Purchase of ${item.name}`,
      metadata: { itemId: item.id, buyerId: user.id },
    };

    const callbacks = {
      onReadyForServerApproval(paymentId: string) {
        console.log('Ready for server approval:', paymentId);
        // Optional: record this in your DB
      },
      onReadyForServerCompletion(paymentId: string, txid: string) {
        console.log('Completing payment:', paymentId, txid);
        // Optional: mark purchase as completed
      },
      onCancel(paymentId: string) {
        alert('Payment cancelled.');
      },
      onError(error: any) {
        console.error('Payment error:', error);
      },
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error('Payment failed:', err);
    }
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
            <button
              onClick={() => purchase(item)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Buy with Pi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
