import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  Building2, 
  FileCheck2, 
  Cross 
} from 'lucide-react';

export const AboutUs = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section section-light-blue" style={{ paddingBottom: '50px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="section-badge">Our Mission & Heritage</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '18px' }}>
            Committed to Accessible, Reliable, and Professional Pharmaceutical Care
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--navy-muted)', lineHeight: 1.6 }}>
            LifeCare Pharmacy was established to redefine community pharmaceutical services in Nigeria by combining clinical accuracy, authentic medicine sourcing, and empathetic patient engagement.
          </p>
        </div>
      </section>

      {/* Story & Commitment */}
      <section className="section section-white">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-badge">Who We Are</span>
              <h2 className="section-title">A New Standard for Healthcare Delivery</h2>
              <p style={{ marginBottom: '16px', lineHeight: 1.6 }}>
                At LifeCare Pharmacy, we believe that health is not merely the absence of disease, but a state of complete physical, mental, and social wellness. We serve as the trusted frontline bridge between medical practitioners and the patients who rely on their prescriptions.
              </p>
              <p style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                Every single medication in our distribution center is subjected to rigorous quality audits. We work in strict adherence with guidelines issued by the Pharmacists Council of Nigeria (PCN) and the National Agency for Food and Drug Administration and Control (NAFDAC).
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                <div style={{ backgroundColor: 'var(--bg-light-blue)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '4px' }}>
                    100%
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--dark-navy)' }}>
                    NAFDAC Verified Stock
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Direct-from-manufacturer sourcing channels only.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--secondary-teal-light)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--secondary-teal)', marginBottom: '4px' }}>
                    15k+
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--dark-navy)' }}>
                    Patients Served Safely
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Prescriptions dispensed without a single quality compromise.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-img-box">
              <img 
                src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80" 
                alt="Inside LifeCare Pharmacy facility" 
                className="about-img"
                style={{ height: '440px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Clinical Team */}
      <section className="section section-light-blue">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Superintendent & Clinical Leadership</span>
            <h2 className="section-title">Guided by Licensed Pharmacists</h2>
            <p className="section-subtitle">
              Our clinical governance ensures that every medicine dispensed meets stringent pharmacology guidelines.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Pharm. Zainab Aliyu" 
                style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px auto', border: '3px solid var(--primary-blue-light)' }}
              />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--dark-navy)', marginBottom: '4px' }}>Pharm. Zainab Aliyu, B.Pharm, FPCPharm</h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--secondary-teal)', fontWeight: 600, marginBottom: '12px' }}>
                Superintendent Pharmacist
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Over 18 years of clinical and community pharmacy practice. Fellow of the West African Postgraduate College of Pharmacists.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Pharm. Emeka Okeke" 
                style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px auto', border: '3px solid var(--primary-blue-light)' }}
              />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--dark-navy)', marginBottom: '4px' }}>Pharm. Emeka Okeke, PharmD</h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--secondary-teal)', fontWeight: 600, marginBottom: '12px' }}>
                Head of Medication Therapy
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Specializes in chronic illness management (Hypertension & Diabetes) and adverse drug interaction screening.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <img 
                src="https://images.unsplash.com/photo-1594824813590-798835824510?auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Pharm. Amina Bello" 
                style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px auto', border: '3px solid var(--primary-blue-light)' }}
              />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--dark-navy)', marginBottom: '4px' }}>Pharm. Amina Bello, B.Pharm</h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--secondary-teal)', fontWeight: 600, marginBottom: '12px' }}>
                Head of Dispensing & Cold-Chain
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Manages pharmaceutical temperature validation, storage humidity tracking, and rapid doorstep logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Pillars</span>
            <h2 className="section-title">The LifeCare Promise</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <ShieldCheck size={32} style={{ color: 'var(--primary-blue)', marginBottom: '14px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Integrity & Safety</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Zero tolerance for counterfeit medications. Direct batch track-and-trace on all products.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <HeartHandshake size={32} style={{ color: 'var(--secondary-teal)', marginBottom: '14px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Compassion</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Treating every customer as family with patience, listening to their symptoms, and guiding recovery.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <FileCheck2 size={32} style={{ color: 'var(--success-green)', marginBottom: '14px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Professional Diligence</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Thorough double-checks on every prescription to prevent contraindications and dosage conflicts.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <Award size={32} style={{ color: '#FB8C00', marginBottom: '14px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Affordability</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Ensuring essential life-saving therapies are priced fairly and accessible across communities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
