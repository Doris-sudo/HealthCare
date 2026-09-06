import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Stethoscope, 
  Truck, 
  Clock, 
  Check, 
  HeartHandshake, 
  Award, 
  Lock, 
  Mail, 
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { MEDICINES } from '../data/medicines';
import { CATEGORIES } from '../data/categories';
import { SERVICES } from '../data/services';
import { TESTIMONIALS } from '../data/testimonials';
import { MedicineCard } from '../components/MedicineCard';
import { CategoryCard } from '../components/CategoryCard';
import { ServiceCard } from '../components/ServiceCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { ConsultationModal } from '../components/ConsultationModal';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const { showToast } = useCart();

  const popularMedicines = MEDICINES.filter((m) => m.popular).slice(0, 8);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      showToast('Thank you for subscribing to LifeCare Health Digest!');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 4000);
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <ShieldCheck size={16} style={{ color: 'var(--secondary-teal)' }} />
                <span>Licensed Community & Clinical Pharmacy</span>
              </div>
              <h1 className="hero-title">
                Your Health, <span>Our Priority.</span>
              </h1>
              <p className="hero-subtitle">
                Quality medicines, trusted healthcare services, and professional pharmaceutical care—all in one place.
              </p>

              <div className="hero-cta-group">
                <Link to="/medicines" className="btn btn-primary btn-lg">
                  <span>Shop Medicines</span>
                  <ArrowRight size={18} />
                </Link>
                <button 
                  onClick={() => setConsultModalOpen(true)} 
                  className="btn btn-secondary btn-lg"
                >
                  <Stethoscope size={18} />
                  <span>Talk to a Pharmacist</span>
                </button>
              </div>

              <div className="hero-trust-row">
                <div className="trust-item">
                  <div className="trust-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="trust-text">
                    100% Genuine<br />NAFDAC Approved
                  </div>
                </div>

                <div className="trust-item">
                  <div className="trust-icon">
                    <UserCheck size={18} />
                  </div>
                  <div className="trust-text">
                    Licensed<br />Pharmacists
                  </div>
                </div>

                <div className="trust-item">
                  <div className="trust-icon">
                    <Truck size={18} />
                  </div>
                  <div className="trust-text">
                    Express Doorstep<br />Safe Delivery
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Right */}
            <div className="hero-image-col">
              <div className="hero-image-card">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=700&q=80" 
                  alt="LifeCare Clinical Pharmacist" 
                  className="hero-img"
                />
                
                {/* Floating Verified Badge Card */}
                <div className="hero-floating-card">
                  <div className="floating-icon">
                    <Award size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark-navy)' }}>
                      Certified Care
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Pharmacists Council of Nigeria (PCN)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Browse By Health Category</span>
            <h2 className="section-title">Explore Essential Medicine Categories</h2>
            <p className="section-subtitle">
              Quickly find genuine prescription and over-the-counter remedies tailored to your wellness needs.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR MEDICINES SECTION */}
      <section className="section section-light-blue">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-badge">Featured Pharmacy Products</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Popular Medicines</h2>
            </div>
            <Link to="/medicines" className="btn btn-outline">
              <span>View All Medicines</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="medicines-grid">
            {popularMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HEALTHCARE SERVICES SECTION */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Comprehensive Clinical Services</span>
            <h2 className="section-title">Healthcare Services You Can Trust</h2>
            <p className="section-subtitle">
              Beyond medications, our certified clinical team provides specialized pharmaceutical care for your long-term wellbeing.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onConsultClick={() => setConsultModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="section section-light-blue">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The LifeCare Standard</span>
            <h2 className="section-title">Why Choose LifeCare Pharmacy?</h2>
            <p className="section-subtitle">
              Setting the gold standard in pharmaceutical safety, licensed dispensing, and compassionate patient care.
            </p>
          </div>

          <div className="why-choose-grid">
            <div className="why-feature-card">
              <div className="feature-icon-pill">
                <ShieldCheck size={26} />
              </div>
              <h3 className="feature-title">Genuine & Quality Medicines</h3>
              <p className="feature-desc">
                100% authentic pharmaceuticals sourced directly from verified manufacturers with verifiable NAFDAC registry codes.
              </p>
            </div>

            <div className="why-feature-card">
              <div className="feature-icon-pill">
                <UserCheck size={26} />
              </div>
              <h3 className="feature-title">Licensed Professional Pharmacists</h3>
              <p className="feature-desc">
                Every prescription is carefully verified by registered pharmacists to prevent adverse drug interactions and dosage errors.
              </p>
            </div>

            <div className="why-feature-card">
              <div className="feature-icon-pill">
                <Lock size={26} />
              </div>
              <h3 className="feature-title">Secure Ordering & Privacy</h3>
              <p className="feature-desc">
                Your medical history, prescription uploads, and personal details are protected with strict patient confidentiality standards.
              </p>
            </div>

            <div className="why-feature-card">
              <div className="feature-icon-pill">
                <Truck size={26} />
              </div>
              <h3 className="feature-title">Fast, Safe Doorstep Delivery</h3>
              <p className="feature-desc">
                Insulated, cold-chain compliant delivery vehicles ensure temperature-sensitive medications arrive potent and intact.
              </p>
            </div>

            <div className="why-feature-card">
              <div className="feature-icon-pill">
                <Stethoscope size={26} />
              </div>
              <h3 className="feature-title">Expert Pharmaceutical Guidance</h3>
              <p className="feature-desc">
                Direct access to clinical pharmacists for counseling on side effects, proper administration times, and chronic therapy.
              </p>
            </div>

            <div className="why-feature-card">
              <div className="feature-icon-pill">
                <HeartHandshake size={26} />
              </div>
              <h3 className="feature-title">Customer-Focused Healthcare</h3>
              <p className="feature-desc">
                Patient-first service, automated medication refills, and 24/7 on-call pharmacist support whenever you need help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PHARMACIST CONSULTATION BANNER */}
      <section className="section section-white">
        <div className="container">
          <div className="consult-banner">
            <div className="consult-content">
              <h2>Need Professional Health Advice?</h2>
              <p>
                Our qualified pharmacists are available to help you make informed decisions about your medicines and healthcare needs. Whether you have questions about dosages, interactions, or generic options, we are here for you.
              </p>
              <div className="consult-action-box">
                <button 
                  onClick={() => setConsultModalOpen(true)} 
                  className="btn btn-secondary btn-lg"
                >
                  <Stethoscope size={20} />
                  <span>Consult a Pharmacist</span>
                </button>
                <div className="consult-call-tag">
                  <Clock size={16} />
                  <span>Average response time: Under 15 minutes</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.2)', maxWidth: '340px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" 
                  alt="Pharmacist on duty" 
                  style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT SECTION */}
      <section className="section section-light-blue">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-box">
              <img 
                src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80" 
                alt="Inside LifeCare Pharmacy" 
                className="about-img"
              />
            </div>

            <div>
              <span className="section-badge">About LifeCare Pharmacy</span>
              <h2 className="section-title">Accessible, Reliable, and Professional Pharmaceutical Care</h2>
              <p style={{ marginBottom: '16px' }}>
                LifeCare Pharmacy was founded on the fundamental principle that every individual deserves safe, authentic, and dignified healthcare services. We bridge the gap between doctor diagnosis and patient recovery.
              </p>
              <p>
                From maintaining continuous cold-chain compliance for vaccines and biologics to conducting thorough contraindication checks, we take pharmaceutical integrity seriously.
              </p>

              <ul className="about-checklist">
                <li>
                  <div className="check-bullet"><Check size={16} /></div>
                  <span>Strict cold-chain temperature control for all biologicals</span>
                </li>
                <li>
                  <div className="check-bullet"><Check size={16} /></div>
                  <span>Full PCN registration and NAFDAC regulatory compliance</span>
                </li>
                <li>
                  <div className="check-bullet"><Check size={16} /></div>
                  <span>Experienced clinical pharmacists ready for direct consultation</span>
                </li>
              </ul>

              <Link to="/about" className="btn btn-primary" style={{ marginTop: '12px' }}>
                <span>Learn More About Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Patient Stories</span>
            <h2 className="section-title">Trusted by Families & Physicians</h2>
            <p className="section-subtitle">
              Read authentic feedback from everyday patients and doctors who rely on LifeCare Pharmacy.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER */}
      <section className="section section-light-blue">
        <div className="container">
          <div className="newsletter-card">
            <h2>Stay Healthy. Stay Informed.</h2>
            <p>
              Subscribe to the LifeCare Health Digest to receive certified pharmacist wellness tips, medication alerts, and seasonal healthcare guides.
            </p>

            {newsletterSubmitted ? (
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '14px 20px', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} />
                <span>You are successfully subscribed! Check your inbox for our latest wellness guide.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address (e.g. name@example.com)" 
                  required
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-white">
                  <Mail size={16} />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Pharmacist Consultation Modal */}
      <ConsultationModal 
        isOpen={consultModalOpen} 
        onClose={() => setConsultModalOpen(false)} 
      />
    </div>
  );
};
