import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  FileText, 
  MapPin, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  UploadCloud, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';

export const UserAccount = () => {
  const { currentUser, logout, isAuthenticated, updateProfile, addPrescription } = useAuth();
  const { orders } = useOrders();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'prescriptions', 'profile'
  const [newRxModal, setNewRxModal] = useState(false);
  const [newRxData, setNewRxData] = useState({
    doctor: '',
    medication: '',
    file: 'uploaded_prescription.jpg'
  });

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="section section-light-blue" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Please Sign In</h2>
          <p style={{ margin: '14px 0 24px 0', color: 'var(--text-muted)' }}>
            You need to be logged in to access your pharmacy account, prescriptions, and order history.
          </p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
  };

  const handleLogout = () => {
    logout();
    showToast('Signed out successfully');
    navigate('/');
  };

  const handleUploadRx = (e) => {
    e.preventDefault();
    if (!newRxData.doctor || !newRxData.medication) {
      showToast('Please enter doctor and medication details', 'error');
      return;
    }
    addPrescription(newRxData);
    showToast('Prescription uploaded! Clinical team notified.');
    setNewRxModal(false);
    setNewRxData({ doctor: '', medication: '', file: 'uploaded_prescription.jpg' });
  };

  return (
    <div className="section section-light-blue" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Profile Header */}
        <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-blue-light)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', color: 'var(--dark-navy)', margin: 0 }}>{currentUser.name}</h1>
                <span className="badge badge-stock-in" style={{ fontSize: '0.72rem' }}>Verified Patient</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {currentUser.email} • {currentUser.phone}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '2px' }}>
                LifeCare Patient since {currentUser.memberSince || '2025'}
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-ghost" style={{ color: 'var(--error-red)' }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Nav Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.9rem' }}
          >
            <Package size={16} />
            <span>Order History ({orders.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('prescriptions')}
            className={`btn ${activeTab === 'prescriptions' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.9rem' }}
          >
            <FileText size={16} />
            <span>Prescriptions & Refills ({currentUser.prescriptions ? currentUser.prescriptions.length : 0})</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.9rem' }}
          >
            <MapPin size={16} />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div>
            {orders.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Order ID:</span>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-blue)' }}>{order.id}</div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Date Placed:</span>
                        <div style={{ fontSize: '0.88rem', color: 'var(--dark-navy)' }}>
                          {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Status:</span>
                        <div>
                          <span className={`badge ${order.status === 'Delivered' ? 'badge-stock-in' : 'badge-rx'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Total Paid:</span>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--dark-navy)' }}>
                          {formatPrice(order.total)}
                        </div>
                      </div>

                      <Link to={`/track-order?orderId=${order.id}`} className="btn btn-outline btn-sm">
                        <span>Track Delivery</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Order items mini grid */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {order.items.map((item, idx) => (
                        <span 
                          key={idx} 
                          style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--dark-navy)' }}
                        >
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <Package size={36} style={{ color: 'var(--text-light)', margin: '0 auto 10px auto' }} />
                <p>No past pharmacy orders yet.</p>
                <Link to="/medicines" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
                  Shop Medicines
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Manage verified doctor prescriptions and active recurring refill authorizations.
              </p>
              <button onClick={() => setNewRxModal(true)} className="btn btn-secondary btn-sm">
                <Plus size={16} />
                <span>Upload New Prescription</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {currentUser.prescriptions && currentUser.prescriptions.map((rx) => (
                <div key={rx.id} style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span className="badge badge-rx" style={{ fontSize: '0.74rem' }}>{rx.status}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{rx.date}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--dark-navy)', marginBottom: '4px' }}>{rx.medication}</h4>
                  <div style={{ fontSize: '0.84rem', color: 'var(--secondary-teal)', fontWeight: 500, marginBottom: '12px' }}>
                    Prescribing Physician: {rx.doctor}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                    Document File: {rx.file}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'profile' && (
          <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>Default Delivery Address</h3>
            <div style={{ backgroundColor: 'var(--bg-light-blue)', borderRadius: 'var(--radius-sm)', padding: '18px', border: '1px solid var(--border-color)', maxWidth: '480px' }}>
              <div style={{ fontWeight: 600, color: 'var(--dark-navy)', marginBottom: '4px' }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--navy-muted)' }}>{currentUser.address}</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--navy-muted)' }}>{currentUser.city}, {currentUser.state}</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-light)', marginTop: '8px' }}>Phone: {currentUser.phone}</div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Rx Modal */}
      {newRxModal && (
        <div className="modal-overlay" onClick={() => setNewRxModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark-navy)' }}>
              Upload Doctor's Prescription
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Upload your medical document. Our clinical pharmacist will review the dosage and drug indications before dispatch.
            </p>

            <form onSubmit={handleUploadRx}>
              <div className="form-group">
                <label className="form-label">Prescribing Doctor / Hospital *</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="e.g. Dr. Chinedu Eze (Lekki Medical)"
                  value={newRxData.doctor}
                  onChange={(e) => setNewRxData({ ...newRxData, doctor: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Medication Name & Prescribed Dosage *</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="e.g. Amoxicillin & Clavulanate 625mg"
                  value={newRxData.medication}
                  onChange={(e) => setNewRxData({ ...newRxData, medication: e.target.value })}
                />
              </div>

              <div style={{ border: '2px dashed var(--secondary-teal)', borderRadius: 'var(--radius-sm)', padding: '20px', textAlign: 'center', marginBottom: '20px', backgroundColor: 'var(--secondary-teal-light)' }}>
                <UploadCloud size={28} style={{ color: 'var(--secondary-teal)', margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark-navy)' }}>File attached: rx_medical_scan.pdf</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ready for clinical verification</div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setNewRxModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit to Pharmacist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
