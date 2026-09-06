import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  X, 
  SlidersHorizontal, 
  FileText, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import { MEDICINES } from '../data/medicines';
import { CATEGORIES } from '../data/categories';
import { MedicineCard } from '../components/MedicineCard';

export const Medicines = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State from search parameters
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState('all'); // all, rx, otc
  const [maxPrice, setMaxPrice] = useState(35000);
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, rating, name
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync state when URL params change
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlSearch) setSearchQuery(urlSearch);
  }, [searchParams]);

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    return MEDICINES.filter((med) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        med.name.toLowerCase().includes(query) ||
        med.shortDesc.toLowerCase().includes(query) ||
        med.activeIngredients.toLowerCase().includes(query) ||
        med.categoryName.toLowerCase().includes(query);

      // Category match
      const matchesCategory =
        selectedCategory === 'all' || med.category === selectedCategory;

      // Type match (Rx vs OTC)
      const matchesType =
        selectedType === 'all' ||
        (selectedType === 'rx' && med.isPrescription) ||
        (selectedType === 'otc' && !med.isPrescription);

      // Price match
      const matchesPrice = med.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedType, maxPrice, sortBy]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedType, maxPrice, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage) || 1;
  const paginatedMedicines = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMedicines.slice(start, start + itemsPerPage);
  }, [filteredMedicines, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setMaxPrice(35000);
    setSortBy('popular');
    setSearchParams({});
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
  };

  return (
    <div className="section section-light-blue" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Page Title & Breadcrumbs */}
        <div style={{ marginBottom: '28px' }}>
          <span className="section-badge">Pharmacy Catalog</span>
          <h1 style={{ fontSize: '2.3rem', marginBottom: '8px' }}>All Medicines & Health Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Showing genuine prescription pharmaceuticals, OTC remedies, and health equipment in Nigerian Naira (₦).
          </p>
        </div>

        {/* Catalog Layout */}
        <div className="catalog-page-layout">
          {/* Sidebar Filter Panel */}
          <aside className="filter-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--dark-navy)' }}>
                <SlidersHorizontal size={18} style={{ color: 'var(--primary-blue)' }} />
                <span>Filters</span>
              </div>
              {(selectedCategory !== 'all' || selectedType !== 'all' || searchQuery || maxPrice < 35000) && (
                <button 
                  onClick={handleClearFilters}
                  style={{ background: 'none', border: 'none', color: 'var(--error-red)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RefreshCw size={12} /> Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Categories</h4>
              <ul className="filter-list">
                <li>
                  <label className="filter-option-label">
                    <div>
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === 'all'} 
                        onChange={() => setSelectedCategory('all')} 
                      />
                      <span>All Categories</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{MEDICINES.length}</span>
                  </label>
                </li>
                {CATEGORIES.map((cat) => {
                  const count = MEDICINES.filter((m) => m.category === cat.id).length;
                  return (
                    <li key={cat.id}>
                      <label className="filter-option-label">
                        <div>
                          <input 
                            type="radio" 
                            name="category" 
                            checked={selectedCategory === cat.id} 
                            onChange={() => setSelectedCategory(cat.id)} 
                          />
                          <span>{cat.name}</span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{count}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Prescription vs OTC Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Prescription Type</h4>
              <ul className="filter-list">
                <li>
                  <label className="filter-option-label">
                    <div>
                      <input 
                        type="radio" 
                        name="type" 
                        checked={selectedType === 'all'} 
                        onChange={() => setSelectedType('all')} 
                      />
                      <span>All Medications</span>
                    </div>
                  </label>
                </li>
                <li>
                  <label className="filter-option-label">
                    <div>
                      <input 
                        type="radio" 
                        name="type" 
                        checked={selectedType === 'otc'} 
                        onChange={() => setSelectedType('otc')} 
                      />
                      <span>Over-The-Counter (OTC)</span>
                    </div>
                    <span className="badge badge-otc" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>OTC</span>
                  </label>
                </li>
                <li>
                  <label className="filter-option-label">
                    <div>
                      <input 
                        type="radio" 
                        name="type" 
                        checked={selectedType === 'rx'} 
                        onChange={() => setSelectedType('rx')} 
                      />
                      <span>Prescription Only (Rx)</span>
                    </div>
                    <span className="badge badge-rx" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>Rx</span>
                  </label>
                </li>
              </ul>
            </div>

            {/* Price Filter Slider */}
            <div className="filter-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 className="filter-title" style={{ margin: 0 }}>Max Price</h4>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="35000" 
                step="500" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-blue)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '6px' }}>
                <span>₦1,000</span>
                <span>₦35,000</span>
              </div>
            </div>

            {/* Prescription Safety Notice */}
            <div style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 'var(--radius-sm)', padding: '12px', marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <FileText size={16} style={{ color: '#F57F17', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.78rem', color: '#6A4F00', margin: 0, lineHeight: 1.4 }}>
                  Prescription (Rx) medicines require a valid doctor’s prescription uploaded at checkout or verified during consultation.
                </p>
              </div>
            </div>
          </aside>

          {/* Catalog Products Area */}
          <div>
            {/* Top Toolbar */}
            <div className="catalog-top-bar">
              {/* Search Bar */}
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon-inside" />
                <input 
                  type="text" 
                  placeholder="Search by medicine name, generic ingredient (e.g. Paracetamol, Salbutamol)..." 
                  className="search-input-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Sorting & Result Count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <strong>{filteredMedicines.length}</strong> products found
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowUpDown size={16} style={{ color: 'var(--navy-muted)' }} />
                  <select 
                    className="form-select" 
                    style={{ padding: '8px 12px', fontSize: '0.88rem', width: 'auto' }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid or Empty State */}
            {paginatedMedicines.length > 0 ? (
              <div className="medicines-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                {paginatedMedicines.map((medicine) => (
                  <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            ) : (
              <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '50px 20px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <Search size={48} style={{ color: 'var(--text-light)', margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '8px' }}>
                  No matching medicines found
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                  We couldn’t find any medicines matching your search criteria. Try modifying your keywords or clearing selected filters.
                </p>
                <button onClick={handleClearFilters} className="btn btn-primary btn-sm">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-row">
                <button 
                  className="page-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i + 1} 
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  className="page-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
