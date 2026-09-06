import React from 'react';
import { 
  FileText, 
  Stethoscope, 
  Truck, 
  HeartPulse, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICE_ICONS = {
  FileText: FileText,
  Stethoscope: Stethoscope,
  Truck: Truck,
  HeartPulse: HeartPulse
};

export const ServiceCard = ({ service, onConsultClick }) => {
  const IconComponent = SERVICE_ICONS[service.icon] || HeartPulse;

  return (
    <div className="service-card">
      <div className="service-icon-box">
        <IconComponent size={28} />
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.shortDesc}</p>

      <ul className="service-highlights">
        {service.highlights.map((item, idx) => (
          <li key={idx} className="service-highlight-item">
            <CheckCircle2 size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '24px', paddingTop: '16px' }}>
        {service.id === 'pharmacist-consultation' ? (
          <button 
            onClick={onConsultClick} 
            className="btn btn-outline btn-sm"
            style={{ width: '100%', borderColor: 'var(--secondary-teal)', color: 'var(--secondary-teal)' }}
          >
            <span>Book Consultation</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <Link 
            to="/services" 
            className="btn btn-outline btn-sm"
            style={{ width: '100%' }}
          >
            <span>Learn More</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
};
