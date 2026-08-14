import React from 'react';

interface RotaryLogoProps {
  variant?: 'light' | 'dark'; // 'light' bg (navy text) or 'dark' bg (white text)
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RotaryLogo: React.FC<RotaryLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
}) => {
  const isDarkBg = variant === 'dark';
  
  // Dimensions based on size
  const heightMap = {
    sm: 'h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Brand Text Column (Rotary + District 9141) */}
      <div className="flex flex-col text-left justify-center leading-none">
        <span
          className={`font-sans font-black tracking-tight ${
            size === 'sm'
              ? 'text-lg sm:text-xl'
              : size === 'lg'
              ? 'text-2xl sm:text-3xl lg:text-4xl'
              : 'text-xl sm:text-2xl lg:text-3xl'
          } ${isDarkBg ? 'text-white' : 'text-[#0B1E3D]'}`}
          style={{ fontFamily: 'sans-serif' }}
        >
          Rotary
        </span>
        <span
          className={`font-sans font-medium tracking-normal ${
            size === 'sm'
              ? 'text-xs'
              : size === 'lg'
              ? 'text-base sm:text-lg'
              : 'text-sm sm:text-base'
          } ${isDarkBg ? 'text-amber-400' : 'text-[#162C52]'}`}
        >
          District 9141
        </span>
      </div>

      {/* Official Rotary Wheel Vector SVG */}
      <div className={`${heightMap[size]} aspect-square flex-shrink-0 relative`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Gear Ring & Teeth */}
          <g fill="#F7A81B">
            {/* Gear teeth around the circle (24 teeth) */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = i * 15;
              return (
                <rect
                  key={i}
                  x="46"
                  y="2"
                  width="8"
                  height="8"
                  rx="1"
                  transform={`rotate(${angle} 50 50)`}
                />
              );
            })}
            {/* Main Outer Circle */}
            <circle cx="50" cy="50" r="42" />
          </g>

          {/* Inner Blue / White Ring for Text */}
          <circle cx="50" cy="50" r="34" fill={isDarkBg ? '#0B1E3D' : '#ffffff'} />
          <circle cx="50" cy="50" r="34" stroke="#F7A81B" strokeWidth="2.5" />

          {/* Rotary Gold Wheel Spokes & Center Hub */}
          <circle cx="50" cy="50" r="22" fill="#F7A81B" />
          
          {/* Center Hub Hole */}
          <circle cx="50" cy="50" r="9" fill={isDarkBg ? '#0B1E3D' : '#ffffff'} />
          <circle cx="50" cy="50" r="9" stroke="#F7A81B" strokeWidth="2" />

          {/* Keyway Notch in Hub */}
          <rect x="47.5" y="38" width="5" height="6" fill="#F7A81B" />

          {/* 6 Wheel Spokes */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = i * 60;
            return (
              <rect
                key={i}
                x="47"
                y="16"
                width="6"
                height="18"
                fill={isDarkBg ? '#0B1E3D' : '#ffffff'}
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}

          {/* Text inside gold ring: ROTARY INTERNATIONAL */}
          <path id="topCurve" d="M 22 50 A 28 28 0 0 1 78 50" fill="none" />
          <path id="bottomCurve" d="M 78 50 A 28 28 0 0 1 22 50" fill="none" />

          <text fill="#F7A81B" fontSize="6.5" fontWeight="900" letterSpacing="0.8">
            <textPath href="#topCurve" startOffset="50%" textAnchor="middle">
              ROTARY
            </textPath>
          </text>
          <text fill="#F7A81B" fontSize="5" fontWeight="900" letterSpacing="0.5">
            <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">
              INTERNATIONAL
            </textPath>
          </text>

          {/* Registered Symbol ® */}
          <text x="90" y="88" fill="#F7A81B" fontSize="8" fontWeight="bold">
            ®
          </text>
        </svg>
      </div>
    </div>
  );
};
