import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  count?: number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'bg-blue-600', count, className = '' }) => {
  return (
    <div className="relative">
      {children}
      {count !== undefined && count > 0 && (
        <span
          className={`absolute -top-1 -right-1 flex items-center justify-center h-5 min-w-5 text-xs text-white font-medium rounded-full px-1 ${color} ${className}`}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

export default Badge;