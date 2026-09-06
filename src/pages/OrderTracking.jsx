import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  FileCheck, 
  Phone, 
  ShieldCheck, 
  AlertCircle,
  MapPin
} from 'lucide-react';
import { useOrders } from '../context/OrdersContext';

export const OrderTracking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlOrderId = searchParams.get('orderId') || '';
  const [orderInput, setOrderInput] = useState(urlOrderId || 'LC-89241');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const { getOrderById } = useOrders();

  const handleTrack = (idToSearch) => {
    const query = idToSearch || orderInput;
    if (!query) return;
    const found = getOrderById(query);
    if (found) {
      setSearchedOrder(found);
      setNotFound(false);
      setSearchParams({ orderId: found.id });
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (urlOrderId) {
      setOrderInput(urlOrderId);
      handleTrack(urlOrderId);
    } else {
      handleTrack('LC-89241');
    }
  }, [urlOrderId]);

  const steps = [
    { label: 'Order Placed', icon: Package, desc: 'Prescription received & logged' },
    { label: 'Pharmacist Review', icon: FileCheck, desc: 'Dosage & interaction verified' },
    { label: 'Clinical Packing', icon: ShieldCheck, desc: 'Sealed with tamper-evident tape' },
    { label: 'Out for Delivery', icon: Truck, desc: 'Dispatched in cold-chain vehicle' },
    { label: 'Delivered Safely', icon: CheckCircle2, desc: 'Handed over to patient' }
  ];

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
  };

  return (
    <div className="section section-light-blue" style={{ minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="section-badge">Live Medication Logistics</span>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Track Your Pharmacy Order</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Follow your medications step-by-step from pharmacist clinical check to doorstep arrival.
          </p>
        </div>

        {/* Search Box */}
        <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleTrack(); }} 
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input 
                type="text" 
                placeholder="Enter Order Tracking ID (e.g. LC-89241)"
                className="form-input"
                style={{ paddingLeft: '42px', textTransform: 'uppercase' }}
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Track Order
            </button>
          </form>

          {/* Quick Demo chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span>Quick test orders:</span>
            <button 
              type="button" 
              onClick={() => { setOrderInput('LC-89241'); handleTrack('LC-89241'); }}
              style={{ background: 'var(--bg-light-blue)', border: '1px solid var(--border-color)', padding: '3px 10px', borderRadius: 'var(--radius-full)', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 600 }}
            >
              LC-89241 (In Transit)
            </button>
            <button 
              type="button" 
              onClick={() => { setOrderInput('LC-77419'); handleTrack('LC-77419'); }}
              style={{ background: 'var(--bg-light-blue)', border: '1px solid var(--border-color)', padding: '3px 10px', borderRadius: 'var(--radius-full)', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 600 }}
            >
              LC-77419 (Delivered)
            </button>
          </div>
        </div>

        {/* Not Found state */}
        {notFound && (
          <div style={{ backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center', color: '#B71C1C' }}>
            <AlertCircle size={32} style={{ margin: '0 auto 8px auto' }} />
            <h4 style={{ margin: 0, marginBottom: '4px' }}>Order Not Found</h4>
            <p style={{ margin: 0, fontSize: '0.88rem' }}>
              We could not find an order matching "<strong>{orderInput}</strong>". Please check your Order ID and try again, or contact our helpline.
            </p>
          </div>
        )}

        {/* Order Details Display */}
        {searchedOrder && (
          <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Medication Tracking
                </span>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', margin: '2px 0 6px 0' }}>
                  {searchedOrder.id}
                </h2>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  Placed on {new Date(searchedOrder.date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${searchedOrder.status === 'Delivered' ? 'badge-stock-in' : 'badge-rx'}`} style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                  {searchedOrder.status}
                </span>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Expected Delivery: <strong style={{ color: 'var(--dark-navy)' }}>{searchedOrder.estimatedDelivery}</strong>
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="tracking-stepper">
              {steps.map((step, idx) => {
                const isCompleted = idx < searchedOrder.currentStepIndex;
                const isCurrent = idx === searchedOrder.currentStepIndex;
                const StepIcon = step.icon;

                return (
                  <div 
                    key={idx} 
                    className={`tracking-step ${isCompleted ? 'completed' : isCurrent ? 'current' : ''}`}
                  >
                    <div className="step-circle">
                      <StepIcon size={20} />
                    </div>
                    <div>
                      <div className="step-label">{step.label}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }} className="hide-mobile">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Courier & Dispatch Box */}
            <div style={{ backgroundColor: 'var(--bg-light-blue)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', margin: '30px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Assigned Courier
                </div>
                <strong style={{ color: 'var(--dark-navy)', fontSize: '0.95rem' }}>{searchedOrder.courier.riderName}</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--navy-muted)' }}>{searchedOrder.courier.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{searchedOrder.courier.vehicle}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Delivery Destination
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--dark-navy)', fontWeight: 600 }}>{searchedOrder.customer.fullName}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--navy-muted)' }}>{searchedOrder.customer.address}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--navy-muted)' }}>{searchedOrder.customer.city}, {searchedOrder.customer.state}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Order Total
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                  {formatPrice(searchedOrder.total)}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Payment: {searchedOrder.paymentMethod}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--success-green)', fontWeight: 600 }}>
                  {searchedOrder.paymentStatus}
                </div>
              </div>
            </div>

            {/* Items inside this order */}
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--dark-navy)', marginBottom: '12px' }}>
                Medications in This Package:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.isPrescription && <span className="badge badge-rx" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>Rx</span>}
                      <span style={{ fontWeight: 600, color: 'var(--dark-navy)' }}>{item.name}</span>
                    </div>
                    <span style={{ color: 'var(--navy-muted)' }}>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help CTA */}
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <Phone size={16} style={{ color: 'var(--secondary-teal)' }} />
                <span>Urgent delivery inquiry? Call our dispatch hotline: <strong>+234 700 LIFECARE</strong></span>
              </div>
              <Link to="/contact" className="btn btn-outline btn-sm">
                Contact Pharmacy Team
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
