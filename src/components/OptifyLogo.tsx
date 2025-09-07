interface OptifyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function OptifyLogo({ size = 'md', showText = true, className = '' }: OptifyLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`} style={{ filter: 'drop-shadow(0 2px 8px rgba(5, 150, 105, 0.3))' }}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer ring with gradient */}
          <defs>
            <linearGradient id="optifyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dcfce7" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
          </defs>
          
          {/* Outer circular border */}
          <circle cx="20" cy="20" r="18" fill="none" stroke="url(#optifyGradient)" strokeWidth="2"/>
          
          {/* Inner circle background */}
          <circle cx="20" cy="20" r="14" fill="url(#innerGradient)" opacity="0.8"/>
          
          {/* Stylized "O" with growth arrow */}
          <path 
            d="M12 20a8 8 0 1 1 16 0 8 8 0 0 1-16 0z" 
            fill="none" 
            stroke="url(#optifyGradient)" 
            strokeWidth="2.5"
          />
          
          {/* Growth arrow inside */}
          <path 
            d="M16 24 L20 16 L24 20 M20 16 L20 24" 
            fill="none" 
            stroke="url(#optifyGradient)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Subtle sparkle effects */}
          <circle cx="28" cy="12" r="1" fill="#22c55e" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="12" cy="28" r="0.8" fill="#16a34a" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="30" cy="28" r="0.6" fill="#059669" opacity="0.7">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent leading-none tracking-tight`}>
            Optify
          </span>
          {size === 'lg' && (
            <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase mt-1">
              Financial Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
}