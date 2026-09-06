import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const { login } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in your email and password', 'error');
      return;
    }
    login(email, password);
    showToast('Signed in successfully! Welcome back.');
    navigate('/account');
  };

  const handleDemoLogin = () => {
    setEmail('tunde.bakare@example.com');
    setPassword('LifeCarePass2025!');
    login('tunde.bakare@example.com', 'LifeCarePass2025!');
    showToast('Signed in as Demo Patient (Tunde Bakare)');
    navigate('/account');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setResetSent(true);
    showToast('Password reset link sent to your email');
    setTimeout(() => {
      setResetSent(false);
      setForgotPasswordModal(false);
    }, 2800);
  };

  return (
    <div className="section section-light-blue" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
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
              Patient & Member Login
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Access your prescriptions, order history, and pharmacist consults.
            </p>
          </div>

          {/* Quick Demo Fill Button */}
          <button 
            type="button" 
            onClick={handleDemoLogin}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', marginBottom: '22px', backgroundColor: 'var(--primary-blue-light)', borderColor: 'var(--primary-blue)', fontSize: '0.84rem' }}
          >
            <UserCheck size={16} />
            <span>Quick Login with Demo Account</span>
          </button>

          <form onSubmit={handleLogin}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password *</label>
                <button 
                  type="button" 
                  onClick={() => setForgotPasswordModal(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  required 
                  placeholder="Enter your password"
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--navy-muted)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--primary-blue)' }} 
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', padding: '13px', fontSize: '1rem', justifyContent: 'center' }}
            >
              <span>Sign In to Account</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Don't have an account yet?{' '}
            <Link to="/signup" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>
              Create an Account
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <div className="modal-overlay" onClick={() => setForgotPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark-navy)' }}>
              Reset Your Password
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Enter your registered email address and we'll send you clinical account recovery instructions.
            </p>

            {resetSent ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <CheckCircle2 size={36} style={{ color: 'var(--success-green)', margin: '0 auto 10px auto' }} />
                <div style={{ fontWeight: 600, color: 'var(--dark-navy)' }}>Reset Link Sent!</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Check your email inbox shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    placeholder="name@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="button" onClick={() => setForgotPasswordModal(false)} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
