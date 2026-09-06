import React, { useState } from 'react';
import { 
  FileText, 
  Stethoscope, 
  Truck, 
  HeartPulse, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { ConsultationModal } from '../components/ConsultationModal';

export const Services = () => {
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <section className="section section-light-blue" style={{ paddingBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="section-badge">Pharmaceutical & Clinical Excellence</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>
            Healthcare Services You Can Trust
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--navy-muted)' }}>
            We provide patient-centered pharmaceutical care combining clinical vigilance, modern prescription logistics, and one-on-one health counseling.
          </p>
        </div>
      </section>

      {/* Main Services Breakdown */}
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {SERVICES.map((service, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div 
                  key={service.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '50px',
                    alignItems: 'center',
                    padding: '36px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: isEven ? 'var(--bg-light-blue)' : 'var(--white)'
                  }}
                  className="service-detail-card"
                >
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <span className="badge" style={{ backgroundColor: 'var(--secondary-teal-light)', color: 'var(--secondary-teal)', marginBottom: '12px' }}>
                      {service.badge}
                    </span>
                    <h2 style={{ fontSize: '1.9rem', marginBottom: '14px', color: 'var(--dark-navy)' }}>
                      {service.title}
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'var(--navy-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                      {service.longDesc}
                    </p>

                    <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--dark-navy)' }}>Key Highlights:</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                      {service.highlights.map((h, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--navy-muted)' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--secondary-teal)', flexShrink: 0 }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {service.id === 'pharmacist-consultation' ? (
                      <button 
                        onClick={() => setConsultModalOpen(true)}
                        className="btn btn-secondary"
                      >
                        <Stethoscope size={18} />
                        <span>Schedule a Consultation</span>
                      </button>
                    ) : service.id === 'prescription-medicines' ? (
                      <a href="/medicines?category=prescription-medicines" className="btn btn-primary">
                        <span>Browse Prescription Catalog</span>
                        <ArrowRight size={16} />
                      </a>
                    ) : (
                      <button 
                        onClick={() => setConsultModalOpen(true)} 
                        className="btn btn-primary"
                      >
                        <span>Inquire About This Service</span>
                      </button>
                    )}
                  </div>

                  <div style={{ order: isEven ? 1 : 2, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', maxWidth: '440px', border: '4px solid var(--white)' }}>
                      <img 
                        src={
                          service.id === 'prescription-medicines'
                            ? 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80'
                            : service.id === 'pharmacist-consultation'
                            ? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
                            : service.id === 'home-delivery'
                            ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
                            : 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80'
                        }
                        alt={service.title}
                        style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="section section-light-blue">
        <div className="container">
          <div className="consult-banner">
            <div className="consult-content">
              <h2>Need Professional Health Advice?</h2>
              <p>
                Our qualified clinical pharmacists are on standby to address any questions concerning prescriptions, drug-drug interactions, dosage timing, and holistic health plans.
              </p>
              <button 
                onClick={() => setConsultModalOpen(true)} 
                className="btn btn-secondary btn-lg"
              >
                <Stethoscope size={20} />
                <span>Consult a Pharmacist</span>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '16px 20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Clock size={24} style={{ color: 'var(--secondary-teal)' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--white)' }}>Immediate Response</div>
                  <div style={{ fontSize: '0.82rem', color: '#B0C4DE' }}>Avg. connection time 5–15 mins</div>
                </div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '16px 20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <ShieldCheck size={24} style={{ color: 'var(--secondary-teal)' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--white)' }}>100% Confidential</div>
                  <div style={{ fontSize: '0.82rem', color: '#B0C4DE' }}>Protected patient-pharmacist consultation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal 
        isOpen={consultModalOpen} 
        onClose={() => setConsultModalOpen(false)} 
      />
    </div>
  );
};
