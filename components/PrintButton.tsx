import React from 'react';

interface PrintButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  showText?: boolean;
}

const PrintButton: React.FC<PrintButtonProps> = ({
  className = '',
  size = 'md',
  variant = 'secondary',
  showText = true
}) => {
  const handlePrint = () => {
    // Add print-specific class to body for additional styling control
    document.body.classList.add('printing');
    
    // Small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
      document.body.classList.remove('printing');
    }, 100);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 border-orange-600',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
    no-print
  `;

  const borderClasses = variant !== 'ghost' ? 'border' : '';

  return (
    <button
      onClick={handlePrint}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${borderClasses}
        ${className}
      `}
      title="Print recipe"
      aria-label="Print recipe"
    >
      <svg
        className={`${iconSizes[size]} ${showText ? 'mr-2' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      {showText && <span>Print Recipe</span>}
    </button>
  );
};

export default PrintButton;
