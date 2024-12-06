import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export const processCheckout = async () => {
  const { user, updateBalance } = useAuthStore.getState();
  const { total, items, clearCart } = useCartStore.getState();

  if (!user) {
    throw new Error('User not authenticated');
  }

  if (user.balance < total) {
    throw new Error('Insufficient funds');
  }

  const newBalance = user.balance - total;
  updateBalance(newBalance);
  clearCart();

  return {
    success: true,
    newBalance,
    orderDetails: {
      items,
      total,
      date: new Date().toISOString(),
      orderId: Math.random().toString(36).substr(2, 9),
    },
  };
};