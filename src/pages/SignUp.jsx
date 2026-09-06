import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password should be at least 6 characters', 'error');
      return;
    }

    register({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone
    });

    showToast('Account created successfully! Welcome to LifeCare.');
    navigate('/account');
  };

  return (
    <div className="section section-light-blue" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '40px 36px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="brand-logo" style={{ justifyContent: 'center', marginBottom: '14px' }}>
              <div className="brand-icon-box" style={{ width: '40px', height: '40px' }}>
                <Plus size={26} strokeWidth={2.8} />
              </div>
              <span className="brand-name" style={{ fontSize: '1.3rem' }}>LifeCare</span>
            </div>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--dark-navy)', marginBottom: '6px' }}>
              Create Patient Account
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Join thousands of families enjoying secure medicine dispensing & delivery.
            </p>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label className="form-label">Full Legal Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. Amara Okafor"
                  style={{ paddingLeft: '42px' }}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input 
                    type="email" 
                    className="form-input" 
                    required 
                    placeholder="name@example.com"
                    style={{ paddingLeft: '42px' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input 
                    type="tel" 
                    className="form-input" 
                    required 
                    placeholder="+234 800 000 0000"
                    style={{ paddingLeft: '42px' }}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Create Password (Min. 6 characters) *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  required 
                  placeholder="Create a strong password"
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  className="form-input" 
                  required 
                  placeholder="Re-enter your password"
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--navy-muted)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  required
                  checked={formData.agreeTerms} 
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  style={{ accentColor: 'var(--primary-blue)', marginTop: '3px' }} 
                />
                <span>I agree to LifeCare Pharmacy Terms of Service, Pharmacist Consultation Policy, and Privacy Notice.</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', padding: '13px', fontSize: '1rem', justifyContent: 'center' }}
            >
              <span>Create Free Account</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
