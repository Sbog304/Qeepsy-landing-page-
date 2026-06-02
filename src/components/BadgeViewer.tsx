import React, { useState } from 'react';
import { Cpu, HardDrive, Award, Music, Globe, Sparkles, Zap, Terminal, CheckCircle } from 'lucide-react';
import { EventBadgeStyle } from '../types';

interface BadgeViewerProps {
  badgeStyle: EventBadgeStyle;
  eventName: string;
  serialNumber?: string;
  ownerName?: string;
  ownerRole?: string;
  mintedTx?: string | null;
  size?: 'sm' | 'md' | 'lg';
  isInteractable?: boolean;
}

export default function BadgeViewer({
  badgeStyle,
  eventName,
  serialNumber = '001',
  ownerName,
  ownerRole,
  mintedTx,
  size = 'md',
  isInteractable = true
}: BadgeViewerProps) {
  const { shape, color, accentColor, icon, effect } = badgeStyle;
  const [rotated, setRotated] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Map icon name to Lucide components safely
  const renderIcon = () => {
    const iconProps = {
      className: `text-white ${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12'} transition-all`,
      style: { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }
    };

    switch (icon) {
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'HardDrive': return <HardDrive {...iconProps} />;
      case 'Award': return <Award {...iconProps} />;
      case 'Music': return <Music {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Zap': return <Zap {...iconProps} />;
      case 'Terminal': return <Terminal {...iconProps} />;
      default: return <Award {...iconProps} />;
    }
  };

  // Safe Math 3D Rotation simulation on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractable) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Rotate 15 degrees max
    setRotated({
      x: -(y / (box.height / 2)) * 14,
      y: (x / (box.width / 2)) * 14
    });
  };

  const handleMouseLeave = () => {
    setRotated({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Define SVG geometries
  const renderBadgeShape = () => {
    const gradientId = `grad-${shape}-${color.replace('#', '')}`;
    const fillSrc = `url(#${gradientId})`;

    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] transition-all duration-300`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D6CD" />
            <stop offset="30%" stopColor="#C49583" />
            <stop offset="70%" stopColor="#7B5345" />
            <stop offset="100%" stopColor="#4A2F26" />
          </linearGradient>

          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5ECE6" />
            <stop offset="25%" stopColor="#C49583" />
            <stop offset="50%" stopColor="#E9D6CD" />
            <stop offset="75%" stopColor="#7B5345" />
            <stop offset="100%" stopColor="#C49583" />
          </linearGradient>

          <radialGradient id={`shimmer-${gradientId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {shape === 'circle' && (
          <>
            {/* Outer embossed bezel rim */}
            <circle cx="50" cy="50" r="46" fill="rgba(252, 250, 247, 0.15)" stroke="url(#goldRim)" strokeWidth="3" />
            {/* Medallion face */}
            <circle cx="50" cy="50" r="41" fill={fillSrc} fillOpacity="0.8" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
          </>
        )}
        {shape === 'hexagon' && (
          <>
            <polygon
              points="50,6 89,25 89,75 50,94 11,75 11,25"
              fill="rgba(252, 250, 247, 0.15)"
              stroke="url(#goldRim)"
              strokeWidth="2.5"
            />
            <polygon
              points="50,11 85,29 85,71 50,89 15,71 15,29"
              fill={fillSrc}
              fillOpacity="0.85"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          </>
        )}
        {shape === 'shield' && (
          <>
            <path
              d="M50,8 C74,8 89,13 89,30 C89,62 50,92 50,92 C50,92 11,62 11,30 C11,13 26,8 50,8 Z"
              fill="rgba(252, 250, 247, 0.15)"
              stroke="url(#goldRim)"
              strokeWidth="2.5"
            />
            <path
              d="M50,13 C70,13 83,17 83,32 C83,58 50,85 50,85 C50,85 17,58 17,32 C17,17 30,13 50,13 Z"
              fill={fillSrc}
              fillOpacity="0.85"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          </>
        )}
        {shape === 'star' && (
          <>
            <polygon
              points="50,5 64,33 95,33 71,51 80,80 50,62 20,80 29,51 5,33 36,33"
              fill="rgba(252, 250, 247, 0.15)"
              stroke="url(#goldRim)"
              strokeWidth="2"
            />
            <polygon
              points="50,12 61,36 88,36 67,52 75,76 50,60 25,76 33,52 12,36 39,36"
              fill={fillSrc}
              fillOpacity="0.85"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          </>
        )}
        {shape === 'diamond' && (
          <>
            <polygon
              points="50,6 89,50 50,94 11,50"
              fill="rgba(252, 250, 247, 0.15)"
              stroke="url(#goldRim)"
              strokeWidth="2.5"
            />
            <polygon
              points="50,13 83,50 50,87 17,50"
              fill={fillSrc}
              fillOpacity="0.85"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          </>
        )}

        {/* Shimmer reflection layer on hover */}
        {isHovered && (
          shape === 'circle' ? (
            <circle cx="50" cy="35" r="30" fill={`url(#shimmer-${gradientId})`} opacity="0.8" />
          ) : (
            <polygon
              points="50,15 75,35 50,55 25,35"
              fill={`url(#shimmer-${gradientId})`}
              opacity="0.7"
            />
          )
        )}

        {/* Decorative inner golden rim, mirroring physical engraving */}
        {shape === 'circle' && (
          <>
            <circle cx="50" cy="50" r="34" fill="none" stroke="url(#goldRim)" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="2 1" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          </>
        )}
        {shape === 'hexagon' && (
          <polygon
            points="50,16 80,31 80,69 50,84 20,69 20,31"
            fill="none"
            stroke="url(#goldRim)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            strokeDasharray="4 2"
          />
        )}
        {shape === 'shield' && (
          <path
            d="M50,17 C68,17 80,21 80,34 C80,56 50,81 50,81 C50,81 20,56 20,34 C20,21 32,17 50,17 Z"
            fill="none"
            stroke="url(#goldRim)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            strokeDasharray="3 3"
          />
        )}
        {shape === 'star' && (
          <polygon
            points="50,16 59,38 82,38 63,52 70,74 50,60 30,74 37,52 18,38 41,38"
            fill="none"
            stroke="url(#goldRim)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        )}
        {shape === 'diamond' && (
          <polygon
            points="50,18 78,50 50,82 22,50"
            fill="none"
            stroke="url(#goldRim)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            strokeDasharray="4 2"
          />
        )}
      </svg>
    );
  };

  // Determine container styling sizes
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${isInteractable ? 'cursor-pointer' : ''} duration-200`}
      style={{
        transform: `perspective(1000px) rotateX(${rotated.x}deg) rotateY(${rotated.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.4s ease-out'
      }}
    >
      {/* Outer physics effect glows */}
      {effect === 'glow' && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-45 mix-blend-screen animate-pulse-glow"
          style={{ backgroundColor: color }}
        />
      )}
      {effect === 'holographic' && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40 mix-blend-overlay animate-holographic"
          style={{ backgroundImage: `linear-gradient(45deg, #00f0ff, #ff007b, #00ff66)` }}
        />
      )}
      {effect === 'metallic' && (
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20 bg-gradient-to-tr from-amber-400 via-amber-100 to-yellow-600"
        />
      )}

      {/* Main Badge Graphic */}
      <div className="relative flex items-center justify-center">
        <div className={sizeClasses[size]}>
          {renderBadgeShape()}
        </div>

        {/* Central Icon Overlay */}
        <div className="absolute flex flex-col items-center justify-center">
          {renderIcon()}
        </div>
      </div>

      {/* Verified Checked Status Emblem */}
      {mintedTx && size !== 'sm' && (
        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-lg border border-white flex items-center justify-center animate-bounce-short">
          <CheckCircle className="w-4 h-4" />
        </div>
      )}

      {/* Interactive ID tag or serial */}
      {size !== 'sm' && (
        <div className="mt-3 text-center">
          <span className="font-mono text-xs opacity-40 tracking-widest uppercase">
            #SUI-QE-{serialNumber}
          </span>
        </div>
      )}
    </div>
  );
}
