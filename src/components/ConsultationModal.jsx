import React, { useState } from 'react';
import { X, Stethoscope, Phone, MessageSquare, Video, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: 'General Medication Advice',
    preferredChannel: 'WhatsApp Live Chat',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useCart();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Consultation request submitted! A pharmacist will reach out within 15 minutes.');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--success-green-light)', 
                color: 'var(--success-green)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto' 
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-navy)', marginBottom: '10px' }}>
              Consultation Scheduled!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 20px auto' }}>
              Our on-call clinical pharmacist has received your request. We will contact you via <strong>{formData.preferredChannel}</strong> at <strong>{formData.phone}</strong> shortly.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--secondary-teal)', background: 'var(--secondary-teal-light)', padding: '6px 14px', borderRadii: 'var(--radius-full)' }}>
              <Clock size={16} /> Average response time: Under 15 minutes
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--secondary-teal-light)', 
                  color: 'var(--secondary-teal)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <Stethoscope size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-navy)', lineHeight: 1.2 }}>
                  Talk to a Licensed Pharmacist
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Confidential, professional & complimentary guidance
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--navy-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
              Ask about medication interactions, correct dosage, generic alternatives, or chronic therapy management with our certified pharmacists.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Adebayo Adeleke" 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number (WhatsApp) *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+234 800 000 0000" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Consultation Channel</label>
                  <select 
                    className="form-select"
                    value={formData.preferredChannel}
                    onChange={(e) => setFormData({ ...formData, preferredChannel: e.target.value })}
                  >
                    <option value="WhatsApp Live Chat">WhatsApp Live Chat</option>
                    <option value="Direct Phone Call">Direct Phone Call</option>
                    <option value="Video Conference">Video Tele-Health</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Healthcare Topic</label>
                <select 
                  className="form-select"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                >
                  <option value="General Medication Advice">General Medication Advice</option>
                  <option value="Prescription Verification / Refill">Prescription Verification / Refill</option>
                  <option value="Hypertension & Cardiovascular Health">Hypertension & Cardiovascular Health</option>
                  <option value="Diabetes Management">Diabetes Management</option>
                  <option value="Pediatric & Maternal Care">Pediatric & Maternal Care</option>
                  <option value="Drug Interaction & Side Effects">Drug Interaction & Side Effects</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tell us about your question or symptoms (Optional)</label>
                <textarea 
                  className="form-textarea" 
                  rows="3" 
                  placeholder="e.g., I was prescribed Amoxicillin and wanted to confirm if I should take it before or after meals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--secondary-teal)' }} />
                <span>Your medical information is strictly protected by patient-pharmacist confidentiality.</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onClose} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-secondary">
                  Connect with Pharmacist
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
