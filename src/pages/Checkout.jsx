import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Building, 
  Banknote, 
  Truck, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  AlertCircle,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';

export const Checkout = () => {
  const { 
    items, 
    subtotal, 
    deliveryFee: initialDeliveryFee, 
    discountAmount, 
    total: initialTotal, 
    clearCart, 
    hasPrescriptionItems,
    showToast 
  } = useCart();

  const { currentUser } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    phone: currentUser ? currentUser.phone : '',
    address: currentUser ? currentUser.address : '',
    city: currentUser ? currentUser.city : 'Lekki Phase 1',
    state: currentUser ? currentUser.state : 'Lagos State',
    landmark: 'Near Admiralty Way Junction',
    deliverySpeed: 'standard', // standard (free/₦1500) or express (+₦1500)
    paymentMethod: 'card', // card, transfer, cod
    prescriptionFile: null
  });

  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
  };

  // Adjust delivery fee if express selected
  const deliverySpeedFee = formData.deliverySpeed === 'express' ? 1500 : 0;
  const deliveryFee = initialDeliveryFee + deliverySpeedFee;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      navigate('/medicines');
      return;
    }

    const order = placeOrder({
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state
      },
      items: items.map((i) => ({
        id: i.medicine.id,
        name: i.medicine.name,
        price: i.medicine.price,
        quantity: i.quantity,
        isPrescription: i.medicine.isPrescription
      })),
      paymentMethod: 
        formData.paymentMethod === 'card'
          ? 'Debit Card / Paystack'
          : formData.paymentMethod === 'transfer'
          ? 'Direct Bank Transfer'
          : 'Cash on Delivery',
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total
    });

    clearCart();
    setOrderConfirmed(order);
  };

  if (orderConfirmed) {
    return (
      <div className="section section-light-blue" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '40px 32px', textAlign: 'center', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'var(--success-green-light)', color: 'var(--success-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <CheckCircle2 size={42} />
            </div>

            <span className="badge badge-stock-in" style={{ fontSize: '0.85rem', padding: '6px 14px', marginBottom: '12px' }}>
              Order Confirmed & Verified
            </span>

            <h1 style={{ fontSize: '2rem', color: 'var(--dark-navy)', marginBottom: '8px' }}>
              Thank You for Your Order!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Your order has been safely placed with our clinical pharmacy dispatch team.
            </p>

            {/* Order details pill */}
            <div style={{ backgroundColor: 'var(--bg-light-blue)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'left', marginBottom: '28px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Tracking Number:</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-blue)' }}>{orderConfirmed.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Total Amount:</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--dark-navy)' }}>{formatPrice(orderConfirmed.total)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Estimated Delivery:</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--success-green)', fontWeight: 600 }}>{orderConfirmed.estimatedDelivery}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Delivery Address:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--dark-navy)', maxWidth: '240px', textAlign: 'right' }}>
                  {orderConfirmed.customer.address}, {orderConfirmed.customer.city}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate(`/track-order?orderId=${orderConfirmed.id}`)}
                className="btn btn-primary"
              >
                <span>Track This Order Live</span>
                <ArrowRight size={16} />
              </button>
              <Link to="/medicines" className="btn btn-outline">
                Back to Pharmacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section section-light-blue" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '28px' }}>
          <span className="section-badge">Secure Healthcare Checkout</span>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '6px' }}>Complete Your Order</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Provide your delivery details and choose your preferred pharmaceutical payment method.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="cart-layout">
            {/* Left: Checkout Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 1. Customer Information */}
              <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--dark-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserCheck size={20} style={{ color: 'var(--primary-blue)' }} />
                  <span>1. Patient & Customer Information</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Legal Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Babatunde Fashola"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (For Delivery Rider & Pharmacist Verification) *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 803 000 0000"
                  />
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--dark-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={20} style={{ color: 'var(--primary-blue)' }} />
                  <span>2. Doorstep Delivery Address</span>
                </h3>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 14 Adeleke Street, Off Admiralty Way"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">City / Town *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Lekki Phase 1"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <select 
                      className="form-select"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    >
                      <option value="Lagos State">Lagos State</option>
                      <option value="Abuja (FCT)">Abuja (FCT)</option>
                      <option value="Ogun State">Ogun State</option>
                      <option value="Rivers State">Rivers State</option>
                      <option value="Oyo State">Oyo State</option>
                      <option value="Enugu State">Enugu State</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Prominent Landmark</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      placeholder="e.g. Beside Zenith Bank"
                    />
                  </div>
                </div>

                {/* Delivery Speed Options */}
                <div style={{ marginTop: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <label className="form-label" style={{ marginBottom: '10px' }}>Delivery Option</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <label 
                      style={{ 
                        border: `1.5px solid ${formData.deliverySpeed === 'standard' ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '14px',
                        cursor: 'pointer',
                        backgroundColor: formData.deliverySpeed === 'standard' ? 'var(--primary-blue-light)' : 'transparent',
                        display: 'flex',
                        gap: '10px'
                      }}
                    >
                      <input 
                        type="radio" 
                        name="deliverySpeed" 
                        checked={formData.deliverySpeed === 'standard'} 
                        onChange={() => setFormData({ ...formData, deliverySpeed: 'standard' })}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--dark-navy)' }}>Standard Delivery</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>24–48 Hours Nationwide</div>
                      </div>
                    </label>

                    <label 
                      style={{ 
                        border: `1.5px solid ${formData.deliverySpeed === 'express' ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '14px',
                        cursor: 'pointer',
                        backgroundColor: formData.deliverySpeed === 'express' ? 'var(--primary-blue-light)' : 'transparent',
                        display: 'flex',
                        gap: '10px'
                      }}
                    >
                      <input 
                        type="radio" 
                        name="deliverySpeed" 
                        checked={formData.deliverySpeed === 'express'} 
                        onChange={() => setFormData({ ...formData, deliverySpeed: 'express' })}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--dark-navy)' }}>
                          Express Same-Day (+₦1,500)
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Delivered within 2–4 hours (Lagos & Abuja)</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* 3. Prescription Upload if Rx items */}
              {hasPrescriptionItems && (
                <div style={{ backgroundColor: '#FFFDF0', border: '1px solid #FFE57F', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <FileText size={22} style={{ color: '#F57F17' }} />
                    <h3 style={{ fontSize: '1.15rem', color: '#5D4037', margin: 0 }}>
                      Doctor's Prescription Verification
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#6D4C41', marginBottom: '14px' }}>
                    One or more items in your cart require a doctor's prescription. You can upload an image/PDF or opt for our on-call pharmacist to verify your prescription via telephone.
                  </p>

                  <div style={{ border: '2px dashed #FFCA28', borderRadius: 'var(--radius-sm)', padding: '24px', textAlign: 'center', backgroundColor: 'var(--white)', cursor: 'pointer' }}>
                    <UploadCloud size={32} style={{ color: '#F57F17', margin: '0 auto 8px auto' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--dark-navy)' }}>
                      Click to upload doctor's prescription (JPEG, PNG, PDF)
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      Or choose "Pharmacist will call to verify"
                    </span>
                  </div>
                </div>
              )}

              {/* 4. Payment Method */}
              <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--dark-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={20} style={{ color: 'var(--primary-blue)' }} />
                  <span>3. Payment Method</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '14px', 
                      border: `1.5px solid ${formData.paymentMethod === 'card' ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === 'card' ? 'var(--primary-blue-light)' : 'transparent'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'card'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    />
                    <CreditCard size={20} style={{ color: 'var(--primary-blue)' }} />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--dark-navy)' }}>Nigerian Debit Card / Paystack</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Visa, Mastercard, Verve accepted (Simulated)</div>
                    </div>
                  </label>

                  <label 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '14px', 
                      border: `1.5px solid ${formData.paymentMethod === 'transfer' ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === 'transfer' ? 'var(--primary-blue-light)' : 'transparent'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'transfer'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                    />
                    <Building size={20} style={{ color: 'var(--secondary-teal)' }} />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--dark-navy)' }}>Direct Bank Transfer</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Transfer directly to LifeCare Pharmacy Zenith/Access Bank Account</div>
                    </div>
                  </label>

                  <label 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '14px', 
                      border: `1.5px solid ${formData.paymentMethod === 'cod' ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === 'cod' ? 'var(--primary-blue-light)' : 'transparent'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'cod'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    />
                    <Banknote size={20} style={{ color: 'var(--success-green)' }} />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--dark-navy)' }}>Cash / POS on Delivery</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pay with cash or POS card machine upon doorstep inspection</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Breakdown */}
            <div className="summary-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '18px', color: 'var(--dark-navy)' }}>
                Order Summary ({items.length} items)
              </h3>

              {/* Items mini list */}
              <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '18px', paddingRight: '6px' }}>
                {items.map(({ medicine, quantity }) => (
                  <div key={medicine.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
                    <div style={{ maxWidth: '70%' }}>
                      <div style={{ fontWeight: 600, color: 'var(--dark-navy)' }}>{medicine.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Qty: {quantity} × {formatPrice(medicine.price)}</div>
                    </div>
                    <strong style={{ color: 'var(--primary-blue)' }}>{formatPrice(medicine.price * quantity)}</strong>
                  </div>
                ))}
              </div>

              {/* Price calculation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--navy-muted)' }}>Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--navy-muted)' }}>Delivery Fee:</span>
                  <span style={{ fontWeight: 600 }}>
                    {deliveryFee === 0 ? <span style={{ color: 'var(--success-green)' }}>FREE</span> : formatPrice(deliveryFee)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success-green)' }}>
                    <span>Discount:</span>
                    <strong>-{formatPrice(discountAmount)}</strong>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--dark-navy)' }}>Total:</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                  {formatPrice(total)}
                </span>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
              >
                <span>Place Order Now</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
                By placing your order, you confirm compliance with clinical pharmacy regulations and patient consent policies.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
