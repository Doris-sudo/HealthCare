import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div>
        <div className="testimonial-stars">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill={i < testimonial.rating ? '#FFB300' : 'none'} 
              color="#FFB300" 
            />
          ))}
        </div>
        <p className="testimonial-comment">
          "{testimonial.comment}"
        </p>
      </div>

      <div className="testimonial-author">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="testimonial-avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80';
          }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="author-name">{testimonial.name}</span>
            {testimonial.verified && (
              <span title="Verified Patient" style={{ color: 'var(--success-green)', display: 'inline-flex' }}>
                <CheckCircle2 size={14} />
              </span>
            )}
          </div>
          <span className="author-role">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
};
