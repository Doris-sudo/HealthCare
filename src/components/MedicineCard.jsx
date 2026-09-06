import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, AlertCircle, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MedicineCard = ({ medicine }) => {
  const { addToCart } = useCart();

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(medicine, 1);
  };

  return (
    <div className="medicine-card">
      <div>
        {/* Badges: Rx vs OTC & Stock status */}
        <div className="med-badge-row">
          {medicine.isPrescription ? (
            <span className="badge badge-rx" title="Prescription required from a licensed doctor">
              <FileText size={12} /> Rx Required
            </span>
          ) : (
            <span className="badge badge-otc" title="Over-the-counter medicine">
              OTC Medicine
            </span>
          )}

          {medicine.inStock ? (
            <span className="badge badge-stock-in">In Stock</span>
          ) : (
            <span className="badge badge-stock-low">Out of Stock</span>
          )}
        </div>

        {/* Product Image */}
        <Link to={`/medicines/${medicine.id}`} className="med-image-wrapper">
          <img 
            src={medicine.image} 
            alt={medicine.name} 
            className="med-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80';
            }}
          />
        </Link>

        {/* Category */}
        <div className="med-category-tag">{medicine.categoryName}</div>

        {/* Name */}
        <Link to={`/medicines/${medicine.id}`}>
          <h3 className="med-title" title={medicine.name}>
            {medicine.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="med-short-desc">
          {medicine.shortDesc}
        </p>

        {/* Rating */}
        <div className="med-rating-row">
          <Star size={14} className="star-icon" />
          <span>{medicine.rating.toFixed(1)}</span>
          <span className="med-reviews-count">({medicine.reviewsCount})</span>
          <span style={{ margin: '0 4px', color: '#CBD5E1' }}>•</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{medicine.dosageForm}</span>
        </div>
      </div>

      {/* Footer: Price & Add to Cart */}
      <div className="med-footer-row">
        <div className="med-price-group">
          <span className="med-price">{formatPrice(medicine.price)}</span>
          {medicine.originalPrice && medicine.originalPrice > medicine.price && (
            <span className="med-original-price">{formatPrice(medicine.originalPrice)}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className="btn-add-cart"
          aria-label={`Add ${medicine.name} to cart`}
          disabled={!medicine.inStock}
        >
          <ShoppingCart size={15} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};
