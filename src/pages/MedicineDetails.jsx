import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  FileText, 
  ArrowLeft, 
  Plus, 
  Minus, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Stethoscope 
} from 'lucide-react';
import { MEDICINES } from '../data/medicines';
import { MedicineCard } from '../components/MedicineCard';
import { ConsultationModal } from '../components/ConsultationModal';
import { useCart } from '../context/CartContext';

export const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const medicine = MEDICINES.find((m) => m.id === id);

  if (!medicine) {
    return (
      <div className="section section-light-blue" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <div className="container">
          <h2>Medicine Not Found</h2>
          <p style={{ margin: '14px 0 24px 0' }}>The requested medicine could not be found or may have been discontinued.</p>
          <Link to="/medicines" className="btn btn-primary">
            Back to Medicines Catalog
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

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
  };

  const handleBuyNow = () => {
    addToCart(medicine, quantity);
    navigate('/checkout');
  };

  const relatedMedicines = MEDICINES.filter(
    (m) => m.category === medicine.category && m.id !== medicine.id
  ).slice(0, 4);

  return (
    <div className="section section-light-blue">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <Link to="/medicines" style={{ color: 'var(--text-muted)' }}>Medicines</Link>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <Link to={`/medicines?category=${medicine.category}`} style={{ color: 'var(--text-muted)' }}>
            {medicine.categoryName}
          </Link>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <span style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>{medicine.name}</span>
        </div>

        {/* Product Details Main Card */}
        <div className="product-details-grid">
          {/* Left: Product Image Stage */}
          <div className="details-image-stage">
            <img 
              src={medicine.image} 
              alt={medicine.name} 
              className="details-large-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>

          {/* Right: Details, Dosage & Actions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              {medicine.isPrescription ? (
                <span className="badge badge-rx" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  <FileText size={14} /> Prescription Required (Rx)
                </span>
              ) : (
                <span className="badge badge-otc" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  Over-The-Counter (OTC)
                </span>
              )}

              {medicine.inStock ? (
                <span className="badge badge-stock-in">
                  <CheckCircle2 size={14} /> In Stock ({medicine.stockCount} packs available)
                </span>
              ) : (
                <span className="badge badge-stock-low">Out of Stock</span>
              )}
            </div>

            <h1 style={{ fontSize: '2.1rem', marginBottom: '8px', lineHeight: 1.2 }}>
              {medicine.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', marginBottom: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Brand/Manufacturer:</span>
              <strong style={{ color: 'var(--dark-navy)' }}>{medicine.brand}</strong>
            </div>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', gap: '2px', color: '#FFB300' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(medicine.rating) ? '#FFB300' : 'none'} 
                  />
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{medicine.rating.toFixed(1)}</span>
              <span style={{ color: 'var(--text-light)', fontSize: '0.88rem' }}>({medicine.reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="details-price-row">
              <span className="details-price">{formatPrice(medicine.price)}</span>
              {medicine.originalPrice && (
                <span style={{ fontSize: '1.05rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  {formatPrice(medicine.originalPrice)}
                </span>
              )}
              <span style={{ fontSize: '0.82rem', color: 'var(--secondary-teal)', fontWeight: 600 }}>
                Includes all pharmaceutical VAT
              </span>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--navy-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '22px' }}>
              {medicine.description}
            </p>

            {/* Dosage & Specifications Box */}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', padding: '16px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--dark-navy)' }}>
                Medication Specifications:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.86rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Dosage Form: </span>
                  <strong>{medicine.dosageForm}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Pack Size: </span>
                  <strong>{medicine.packSize}</strong>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Active Ingredients: </span>
                  <strong>{medicine.activeIngredients}</strong>
                </div>
              </div>
            </div>

            {/* Prescription Warning / Guidance */}
            {medicine.isPrescription ? (
              <div style={{ backgroundColor: '#FFF3E0', border: '1px solid #FFE0B2', borderRadius: 'var(--radius-sm)', padding: '14px 16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <AlertTriangle size={20} style={{ color: '#E65100', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ color: '#E65100', fontSize: '0.92rem', marginBottom: '4px' }}>
                      Doctor's Prescription Required
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: '#7E3B00', margin: 0 }}>
                      This is a regulated pharmaceutical product. You will be requested to upload your medical prescription file during checkout or consult our registered clinical pharmacist.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle2 size={18} style={{ color: '#2E7D32', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.84rem', color: '#1B5E20' }}>
                    Over-The-Counter item. No doctor prescription required for standard dispensing.
                  </span>
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <div className="details-qty-stepper">
                <button 
                  className="stepper-btn" 
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <div className="stepper-value">{quantity}</div>
                <button 
                  className="stepper-btn" 
                  onClick={() => setQuantity((q) => Math.min(medicine.stockCount, q + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart} 
                className="btn btn-primary"
                disabled={!medicine.inStock}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              <button 
                onClick={handleBuyNow} 
                className="btn btn-secondary"
                disabled={!medicine.inStock}
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Pharmacist Consultation Button */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--navy-muted)' }}>
                <Stethoscope size={18} style={{ color: 'var(--secondary-teal)' }} />
                <span>Have doubts about this medicine?</span>
              </div>
              <button 
                onClick={() => setConsultModalOpen(true)}
                className="btn btn-outline btn-sm"
                style={{ borderColor: 'var(--secondary-teal)', color: 'var(--secondary-teal)' }}
              >
                Ask a Pharmacist
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs / Clinical Guidance Accordion */}
        <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '32px', marginBottom: '50px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Clinical Usage & Patient Precautions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ borderLeft: '3px solid var(--primary-blue)', paddingLeft: '16px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--dark-navy)', marginBottom: '6px' }}>Dosage & Administration</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--navy-muted)' }}>{medicine.dosageInstructions}</p>
            </div>
            <div style={{ borderLeft: '3px solid var(--secondary-teal)', paddingLeft: '16px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--dark-navy)', marginBottom: '6px' }}>Storage Guidelines</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--navy-muted)' }}>{medicine.storage}</p>
            </div>
            <div style={{ borderLeft: '3px solid var(--warning-amber)', paddingLeft: '16px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--dark-navy)', marginBottom: '6px' }}>Warnings & Contraindications</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--navy-muted)' }}>{medicine.precautions}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedMedicines.length > 0 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-badge">Similar Solutions</span>
              <h2 style={{ fontSize: '1.6rem' }}>Related Medicines in {medicine.categoryName}</h2>
            </div>
            <div className="medicines-grid">
              {relatedMedicines.map((item) => (
                <MedicineCard key={item.id} medicine={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ConsultationModal 
        isOpen={consultModalOpen} 
        onClose={() => setConsultModalOpen(false)} 
      />
    </div>
  );
};
