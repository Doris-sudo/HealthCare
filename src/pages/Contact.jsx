import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Contact = () => {
  const { showToast } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Prescription & Medicine Inquiries',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our pharmacy care team!');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Prescription & Medicine Inquiries',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="section section-light-blue" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get in Touch</span>
          <h1 className="section-title">Contact LifeCare Pharmacy</h1>
          <p className="section-subtitle">
            Have questions about your medications, prescription refills, or need emergency pharmacist assistance? We are here to support you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'start' }}>
          {/* Contact Form */}
          <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--dark-navy)' }}>
              Send Us a Message
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Our pharmacists and support specialists respond to all inquiries within 1 to 2 hours.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--success-green-light)', color: 'var(--success-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '6px' }}>
                  Message Sent Successfully!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Thank you, <strong>{formData.name}</strong>. A LifeCare pharmacist will reply to your email or call you at <strong>{formData.phone}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="e.g. Samuel Adeleke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      required 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      required 
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select 
                      className="form-select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Prescription & Medicine Inquiries">Prescription & Medicine Inquiries</option>
                      <option value="Order Status & Delivery Tracking">Order Status & Delivery Tracking</option>
                      <option value="Pharmacist Consultation Booking">Pharmacist Consultation Booking</option>
                      <option value="Product Availability & Pricing">Product Availability & Pricing</option>
                      <option value="Corporate / Bulk Order Inquiry">Corporate / Bulk Order Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea 
                    className="form-textarea" 
                    rows="4" 
                    required 
                    placeholder="How can our clinical team help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '8px' }}>
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Locations, Helplines & Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Quick Helpline Box */}
            <div style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Phone size={24} />
                <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', margin: 0 }}>24/7 Clinical Emergency Line</h4>
              </div>
              <p style={{ color: '#E3F2FD', fontSize: '0.9rem', marginBottom: '18px' }}>
                Immediate medication guidance and poison control consultation:
              </p>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '16px' }}>
                +234 (0) 700-LIFECARE
              </div>
              <a 
                href="https://wa.me/2348031234567" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-white btn-sm"
                style={{ width: '100%', color: 'var(--primary-blue)' }}
              >
                <MessageSquare size={16} />
                <span>Chat with On-Duty Pharmacist on WhatsApp</span>
              </a>
            </div>

            {/* Store Branches */}
            <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '28px' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--dark-navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={18} style={{ color: 'var(--primary-blue)' }} />
                <span>Our Pharmacy Locations</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Victoria Island Flagship (Lagos)</strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '2px 0' }}>
                    18 Adetokunbo Ademola Street, Victoria Island, Lagos
                  </p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-teal)', fontWeight: 600 }}>Open Mon–Sun • 24/7 Dispensing</span>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Ikeja City Center (Lagos)</strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '2px 0' }}>
                    42 Isaac John Street, GRA, Ikeja, Lagos
                  </p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Mon–Sat: 8:00 AM – 9:00 PM</span>
                </div>

                <div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Abuja Central Branch</strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '2px 0' }}>
                    Plot 12 Aminu Kano Crescent, Wuse 2, Abuja, FCT
                  </p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Mon–Sat: 8:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
