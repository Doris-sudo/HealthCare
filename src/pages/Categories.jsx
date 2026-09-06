import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ShieldPlus, 
  Thermometer, 
  Cross, 
  Sparkles, 
  FileText, 
  ArrowRight 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { MEDICINES } from '../data/medicines';

const CATEGORY_ICONS = {
  Activity: Activity,
  ShieldPlus: ShieldPlus,
  Thermometer: Thermometer,
  Cross: Cross,
  Sparkles: Sparkles,
  FileText: FileText
};

export const Categories = () => {
  return (
    <div className="section section-light-blue" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Health Departments</span>
          <h1 className="section-title">All Medicine Categories</h1>
          <p className="section-subtitle">
            Explore our curated inventory of licensed pharmaceuticals, daily health supplements, emergency first aid equipment, and personal care remedies.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
          {CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.icon] || Activity;
            const categoryMedicines = MEDICINES.filter((m) => m.category === cat.id);

            return (
              <div 
                key={cat.id} 
                style={{
                  backgroundColor: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)'
                }}
                className="category-showcase-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--primary-blue-light)',
                      color: 'var(--primary-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent size={28} />
                  </div>
                  <span className="badge" style={{ backgroundColor: '#F1F5F9', color: 'var(--navy-muted)' }}>
                    {cat.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-navy)', marginBottom: '10px' }}>
                  {cat.name}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  {cat.description}
                </p>

                {/* Sample items */}
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                    Popular in this department:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {categoryMedicines.slice(0, 3).map((item) => (
                      <span 
                        key={item.id} 
                        style={{ fontSize: '0.78rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '3px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--dark-navy)' }}
                      >
                        {item.name.split(' ')[0]}
                      </span>
                    ))}
                  </div>

                  <Link 
                    to={`/medicines?category=${cat.id}`} 
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    <span>Browse {cat.name}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
