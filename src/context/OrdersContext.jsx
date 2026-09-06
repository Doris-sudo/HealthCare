import React, { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

const ORDERS_STORAGE_KEY = 'lifecare_orders_v1';

const INITIAL_ORDERS = [
  {
    id: 'LC-89241',
    date: '2025-02-28T10:30:00Z',
    status: 'In Transit',
    currentStepIndex: 3, // 0: Placed, 1: Verified, 2: Packed, 3: In Transit, 4: Delivered
    estimatedDelivery: 'Today, by 4:00 PM',
    courier: {
      name: 'LifeCare Express Courier',
      riderName: 'Samuel Okon',
      phone: '+234 812 345 6789',
      vehicle: 'Temperature-Controlled Dispatch Bike #04'
    },
    items: [
      {
        id: 'med-01',
        name: 'Paracetamol Extra 500mg/65mg',
        price: 1200,
        quantity: 2,
        isPrescription: false
      },
      {
        id: 'med-03',
        name: 'Vitamin C 1000mg + Zinc Effervescent',
        price: 4500,
        quantity: 1,
        isPrescription: false
      }
    ],
    customer: {
      fullName: 'Tunde Bakare',
      email: 'tunde.bakare@example.com',
      phone: '+234 803 123 4567',
      address: '14 Adeleke Street, Off Admiralty Way',
      city: 'Lekki Phase 1',
      state: 'Lagos State'
    },
    paymentMethod: 'Debit Card / Paystack',
    paymentStatus: 'Paid',
    subtotal: 6900,
    deliveryFee: 1500,
    discount: 0,
    total: 8400
  },
  {
    id: 'LC-77419',
    date: '2025-02-15T14:15:00Z',
    status: 'Delivered',
    currentStepIndex: 4,
    estimatedDelivery: 'Delivered on Feb 15, 2025',
    courier: {
      name: 'LifeCare Express Courier',
      riderName: 'Babajide Adeleke',
      phone: '+234 809 112 3344',
      vehicle: 'Medical Dispatch Van #01'
    },
    items: [
      {
        id: 'med-02',
        name: 'Amoxicillin & Clavulanate 625mg',
        price: 8500,
        quantity: 1,
        isPrescription: true
      }
    ],
    customer: {
      fullName: 'Tunde Bakare',
      email: 'tunde.bakare@example.com',
      phone: '+234 803 123 4567',
      address: '14 Adeleke Street, Off Admiralty Way',
      city: 'Lekki Phase 1',
      state: 'Lagos State'
    },
    paymentMethod: 'Direct Bank Transfer',
    paymentStatus: 'Verified & Completed',
    subtotal: 8500,
    deliveryFee: 1500,
    discount: 0,
    total: 10000
  }
];

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders state', e);
    }
  }, [orders]);

  const placeOrder = ({ customer, items, paymentMethod, subtotal, deliveryFee, discount, total }) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `LC-${randomNum}`;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'Order Placed',
      currentStepIndex: 0,
      estimatedDelivery: 'Tomorrow between 10:00 AM – 2:00 PM',
      courier: {
        name: 'LifeCare Certified Dispatch',
        riderName: 'Assigned on Dispatch',
        phone: '+234 700 LIFECARE',
        vehicle: 'Medical Temperature Seal Van'
      },
      items,
      customer,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending on Delivery' : 'Paid (Simulated)',
      subtotal,
      deliveryFee,
      discount,
      total
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === cleanId) || null;
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
