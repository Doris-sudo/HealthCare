import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ShieldPlus, 
  Thermometer, 
  Cross, 
  Sparkles, 
  FileText 
} from 'lucide-react';

const ICON_MAP = {
  Activity: Activity,
  ShieldPlus: ShieldPlus,
  Thermometer: Thermometer,
  Cross: Cross,
  Sparkles: Sparkles,
  FileText: FileText
};

export const CategoryCard = ({ category }) => {
  const IconComponent = ICON_MAP[category.icon] || Activity;

  return (
    <Link to={`/medicines?category=${category.id}`} className="category-card">
      <div className="cat-icon-box">
        <IconComponent size={28} />
      </div>
      <h4 className="cat-name">{category.name}</h4>
      <span className="cat-count">{category.count} Products</span>
    </Link>
  );
};
