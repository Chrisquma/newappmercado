import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { processCheckout } from '../utils/checkout';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeItem } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      setError(null);
      const result = await processCheckout();
      if (result.success) {
        navigate('/profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Start shopping to add items to your cart</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-6 border-b border-gray-200 last:border-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 ml-6">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-gray-900 font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Your Balance:</span>
            <span>${user?.balance.toFixed(2)}</span>
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            onClick={handleCheckout}
            disabled={processing || !user?.balance || user.balance < total}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {processing ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;