import React from 'react';

export default function PiPayButton({ amount, memo, metadata, onPaymentSuccess }) {
  const handleClick = async () => {
    try {
      const paymentData = {
        amount,
        memo,
        metadata,
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          // Send paymentId to your server for approval
          console.log('Payment ready for server approval:', paymentId);
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          // Tell your server to complete the payment
          console.log('Payment ready to be completed:', paymentId, txid);
          onPaymentSuccess(paymentId, txid);
        },
        onCancel: (reason) => {
          console.warn('Payment canceled:', reason);
        },
        onError: (error) => {
          console.error('Payment error:', error);
        },
      });
    } catch (error) {
      console.error('Pi Payment failed:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
    >
      Pay with Pi
    </button>
  );
}
