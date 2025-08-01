import { useEffect, useState } from 'react';
import API from '../api';

type Item = {
  id: number;
  name: string;
  description: string;
  price_pi: number;
};

export default function Marketplace() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const purchase = async (item: Item) => {
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
      async onReadyForServerApproval(paymentId: string) {
        console.log('[Pi] Ready for server approval:', paymentId);
        await API.post('/purchase/start', {
          pi_payment_id: paymentId,
          buyer_id: user.id,
          item_id: item.id,
        });
      },

      async onReadyForServerCompletion(paymentId: string, txid: string) {
        console.log('[Pi] Completing payment:', paymentId, txid);
        await API.post('/purchase/complete', {
          pi_payment_id: paymentId,
          txid,
        });
        alert('🎉 Purchase complete! Your item is now available.');
      },

      onCancel(paymentId: string) {
        console.warn('[Pi] Payment cancelled:', paymentId);
        alert('❌ Payment was cancelled.');
      },

      onError(error: any) {
        console.error('[Pi] Payment error:', error);
        alert('⚠️ Payment failed. Please try again.');
      },
    };

    try {
      setLoading(true);
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error('Payment failed:', err);
      alert('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    API.get('/items')
      .then(res => setItems(res.data))
      .catch(err => {
        console.error('Failed to fetch items:', err);
        alert('Could not load items.');
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🛒 Marketplace</h1>
      {loading && <p className="text-yellow-600">Processing Pi payment...</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="font-bold text-purple-600">{item.price_pi} ⧫ Pi</p>
            <button
              onClick={() => purchase(item)}
              className="mt-3 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Buy with Pi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
