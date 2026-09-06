import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Tag, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    deliveryFee, 
    discountAmount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    total, 
    hasPrescriptionItems 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="section section-light-blue" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary-blue-light)', 
              color: 'var(--primary-blue)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 20px auto' 
            }}
          >
            <ShoppingBag size={40} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--dark-navy)', marginBottom: '10px' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 28px auto' }}>
            You haven’t added any medicines or healthcare items yet. Explore our genuine pharmacy catalog to get started.
          </p>
          <Link to="/medicines" className="btn btn-primary btn-lg">
            <span>Explore Medicines</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Free delivery threshold: ₦25,000
  const freeDeliveryThreshold = 25000;
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="section section-light-blue" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Title */}
        <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="section-badge">Shopping Basket</span>
            <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Review Your Prescription & Order</h1>
          </div>
          <button 
            onClick={clearCart} 
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--error-red)' }}
          >
            <Trash2 size={16} />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--dark-navy)' }}>
            <Truck size={18} style={{ color: 'var(--secondary-teal)' }} />
            {remainingForFree === 0 ? (
              <span style={{ fontWeight: 600, color: 'var(--success-green)' }}>
                Congratulations! You qualified for Free Express Delivery!
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(remainingForFree)}</strong> more to get <strong>Free Delivery</strong> (Orders over ₦25,000)
              </span>
            )}
          </div>
          <div style={{ width: '100%', height: '7px', backgroundColor: '#EDF2F7', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${progressPercent}%`, 
                height: '100%', 
                backgroundColor: progressPercent >= 100 ? 'var(--success-green)' : 'var(--secondary-teal)', 
                transition: 'width 0.4s ease' 
              }} 
            />
          </div>
        </div>

        {/* Prescription Banner if needed */}
        {hasPrescriptionItems && (
          <div style={{ backgroundColor: '#FFF3E0', border: '1px solid #FFE0B2', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <FileText size={24} style={{ color: '#E65100', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, color: '#E65100', fontSize: '0.92rem' }}>
                Your order contains Prescription-Only (Rx) Medication
              </div>
              <div style={{ fontSize: '0.82rem', color: '#7E3B00' }}>
                In accordance with PCN regulations, our pharmacist will verify your prescription details during checkout or arrange a complimentary consultation call.
              </div>
            </div>
          </div>
        )}

        {/* Cart Layout: Left Items, Right Summary */}
        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-table-card">
            <div style={{ paddingBottom: '14px', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <span>Item Description</span>
              <span className="hide-mobile">Price / Qty</span>
              <span>Subtotal</span>
            </div>

            <div>
              {items.map(({ medicine, quantity }) => (
                <div key={medicine.id} className="cart-item-row">
                  {/* Thumb */}
                  <img 
                    src={medicine.image} 
                    alt={medicine.name} 
                    className="cart-item-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80';
                    }}
                  />

                  {/* Title & Info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      {medicine.isPrescription && (
                        <span className="badge badge-rx" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>Rx</span>
                      )}
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{medicine.categoryName}</span>
                    </div>
                    <Link to={`/medicines/${medicine.id}`}>
                      <h4 style={{ fontSize: '0.98rem', color: 'var(--dark-navy)', lineHeight: 1.3 }}>
                        {medicine.name}
                      </h4>
                    </Link>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '2px' }}>
                      {medicine.dosageForm} • {medicine.packSize}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div>
                    <div className="details-qty-stepper" style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                      <button 
                        className="stepper-btn" 
                        onClick={() => updateQuantity(medicine.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="stepper-value">{quantity}</div>
                      <button 
                        className="stepper-btn" 
                        onClick={() => updateQuantity(medicine.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }} className="hide-mobile">
                      {formatPrice(medicine.price)} each
                    </div>
                  </div>

                  {/* Total for item */}
                  <div style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: '1.05rem', textAlign: 'right' }}>
                    {formatPrice(medicine.price * quantity)}
                  </div>

                  {/* Remove button */}
                  <div>
                    <button 
                      onClick={() => removeFromCart(medicine.id)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '6px', borderRadius: 'var(--radius-sm)' }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/medicines" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
                <ArrowLeft size={16} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="summary-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '18px', color: 'var(--dark-navy)' }}>
              Order Summary
            </h3>

            {/* Price breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px', marginBottom: '18px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--navy-muted)' }}>
                <span>Subtotal:</span>
                <strong style={{ color: 'var(--dark-navy)' }}>{formatPrice(subtotal)}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--navy-muted)' }}>
                <span>Estimated Doorstep Delivery:</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong style={{ color: 'var(--success-green)' }}>FREE</strong>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success-green)' }}>
                  <span>Promo Discount (10%):</span>
                  <strong>-{formatPrice(discountAmount)}</strong>
                </div>
              )}
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--dark-navy)' }}>Total:</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                {formatPrice(total)}
              </span>
            </div>

            {/* Coupon input */}
            <div style={{ marginBottom: '24px' }}>
              {appliedCoupon ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--success-green-light)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--success-green)', fontWeight: 600 }}>
                    <Tag size={14} />
                    <span>Coupon "{appliedCoupon}" Applied</span>
                  </div>
                  <button 
                    onClick={removeCoupon} 
                    style={{ background: 'none', border: 'none', color: 'var(--error-red)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Coupon code (e.g. LIFECARE10)" 
                    className="form-input"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout CTA */}
            <button 
              onClick={() => navigate('/checkout')} 
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Trust badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-light)' }}>
              <ShieldCheck size={16} style={{ color: 'var(--secondary-teal)' }} />
              <span>Safe & Secure Pharmaceutical Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
