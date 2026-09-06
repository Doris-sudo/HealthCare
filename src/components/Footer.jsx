import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo" style={{ textDecoration: 'none' }}>
              <div className="brand-icon-box" style={{ width: '38px', height: '38px' }}>
                <Plus size={24} strokeWidth={2.8} />
              </div>
              <div className="brand-text">
                <span className="brand-name" style={{ color: 'var(--white)' }}>
                  LifeCare<span style={{ color: 'var(--secondary-teal)' }}>.</span>
                </span>
                <span className="brand-tagline" style={{ color: '#88D4D0' }}>Pharmacy</span>
              </div>
            </Link>
            <p>
              LifeCare Pharmacy is a licensed, community-first pharmaceutical center committed to delivering authentic medications, professional pharmacist guidance, and accessible healthcare across Nigeria.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <a href="#facebook" aria-label="Facebook" style={{ color: '#B0C4DE', background: 'rgba(255,255,255,0.08)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#twitter" aria-label="Twitter" style={{ color: '#B0C4DE', background: 'rgba(255,255,255,0.08)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#instagram" aria-label="Instagram" style={{ color: '#B0C4DE', background: 'rgba(255,255,255,0.08)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" style={{ color: '#B0C4DE', background: 'rgba(255,255,255,0.08)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/medicines">All Medicines</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/services">Healthcare Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact & Stores</Link></li>
              <li><Link to="/track-order">Track My Order</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Prescription Refills</Link></li>
              <li><Link to="/services">Pharmacist Consultations</Link></li>
              <li><Link to="/services">Home Doorstep Delivery</Link></li>
              <li><Link to="/services">Blood Pressure & Vital Checks</Link></li>
              <li><Link to="/services">Chronic Disease Support</Link></li>
              <li><Link to="/services">Corporate Health Solutions</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="footer-col-title">Contact & Pharmacy Hours</h4>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>18 Adetokunbo Ademola St, Victoria Island, Lagos, Nigeria</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>+234 (0) 700-LIFECARE / +234 803 123 4567</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>care@lifecarepharmacy.ng</span>
            </div>

            <div className="footer-hours-box">
              <div className="footer-hours-title">Dispensing Hours:</div>
              <div className="footer-hours-text">
                Monday – Saturday: 8:00 AM – 9:00 PM<br />
                Sunday: 10:00 AM – 6:00 PM<br />
                <strong style={{ color: 'var(--secondary-teal)' }}>24/7 Emergency Helpline Available</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} LifeCare Pharmacy Nigeria Ltd. All rights reserved.
          </p>
          <div className="footer-compliance-badge">
            <ShieldCheck size={16} style={{ color: 'var(--secondary-teal)' }} />
            <span>Regulated by Pharmacists Council of Nigeria (PCN) & NAFDAC Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
