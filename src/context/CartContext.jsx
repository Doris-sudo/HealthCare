import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'lifecare_cart_v1';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((current) => (current && current.message === message ? null : current));
    }, 3200);
  };

  const addToCart = (medicine, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.medicine.id === medicine.id);
      if (existing) {
        return prevItems.map((item) =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { medicine, quantity }];
      }
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${medicine.name}" to cart!`);
  };

  const removeFromCart = (medicineId) => {
    setItems((prevItems) => prevItems.filter((item) => item.medicine.id !== medicineId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (medicineId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );

  // Delivery: Free for orders over ₦25,000, otherwise ₦1,500
  const deliveryFee = items.length === 0 ? 0 : subtotal >= 25000 ? 0 : 1500;

  // Discount calculation
  const discountRate = appliedCoupon === 'LIFECARE10' ? 0.1 : 0;
  const discountAmount = Math.round(subtotal * discountRate);

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LIFECARE10') {
      setAppliedCoupon('LIFECARE10');
      showToast('Promo code applied: 10% discount!', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    showToast('Invalid coupon code. Try "LIFECARE10"', 'error');
    return { success: false, message: 'Invalid code. Use LIFECARE10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Helper check if cart requires prescription
  const hasPrescriptionItems = items.some((item) => item.medicine.isPrescription);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        total,
        totalItemCount,
        hasPrescriptionItems,
        toastMessage,
        setToastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
