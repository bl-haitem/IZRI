import React, { useState, useEffect } from 'react';

export default function MotorcycleVisual({ 
  modelId, 
  imageSrc,
  color = "#E30613", 
  className = "w-full h-56",
  usePhotoOnly = false 
}) {
  const [imgError, setImgError] = useState(false);

  // Reset error when switching models
  useEffect(() => {
    setImgError(false);
  }, [modelId, imageSrc]);

  // Real official studio photos of VMS Industrie motorcycles (Akbou, Béjaïa)
  const modelPhotos = {
    'vms-cuxi-2': '/models/vms_cuxi_2.webp',
    'vms-driver-125': '/models/vms_driver_125.webp',
    'vms-estate-x': '/models/vms_estate_x.webp',
    'vms-vmax-200': '/models/vms_vmax_200.webp',
    'vms-xdv-300': '/models/vms_xdv_300.webp',
    'vms-victoria-300': '/models/vms_victoria_300.webp',
    // Aliases to avoid broken links
    'vms-cux-125': '/models/vms_cuxi_2.webp',
    'vms-s-125': '/models/vms_driver_125.webp',
    'vms-driver-150': '/models/vms_driver_125.webp',
    'vms-estate-125': '/models/vms_estate_x.webp',
    'vms-x-250': '/models/vms_vmax_200.webp',
    'vms-adventure-300': '/models/vms_xdv_300.webp',
  };

  const photoUrl = imageSrc || modelPhotos[modelId] || '/models/vms_cuxi_2.webp';

  if (!imgError) {
    return (
      <div className={`relative flex flex-col items-center justify-center group ${className}`}>
        {/* Studio spotlight glow */}
        <div className="absolute inset-0 bg-radial from-red-500/10 via-transparent to-transparent opacity-60 rounded-full blur-xl pointer-events-none" />

        {/* Real VMS Motorcycle Photo */}
        <img
          src={photoUrl}
          alt={`VMS Industrie ${modelId}`}
          className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 select-none"
          onError={() => setImgError(true)}
          loading="eager"
        />

        {/* Realistic studio floor reflection shadow */}
        <div className="w-3/4 h-3 bg-black/20 rounded-full blur-md -mt-2 pointer-events-none" />
      </div>
    );
  }

  // Graceful fallback to clean SVG vector if photo fails to load
  return (
    <svg viewBox="0 0 600 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="300" cy="355" rx="230" ry="18" fill="#000000" fillOpacity="0.12" />
      <circle cx="160" cy="300" r="62" fill="#18181B" stroke="#52525B" strokeWidth="6"/>
      <circle cx="445" cy="300" r="62" fill="#18181B" stroke="#52525B" strokeWidth="6"/>
      <path d="M160 300 L210 240 L310 240 L370 190 L420 180 L405 155 L350 170 L280 230 L220 230 L170 260 Z" fill="#18181B"/>
      <path d="M375 190 L425 180 L445 225 L385 240 Z" fill={color}/>
      <path d="M180 205 C210 190 280 190 325 215 C310 225 260 220 185 218 Z" fill="#09090B" stroke="#3F3F46" strokeWidth="2"/>
      <line x1="445" y1="300" x2="400" y2="175" stroke="#71717A" strokeWidth="12" strokeLinecap="round"/>
      <polygon points="425,175 448,185 435,200" fill="#FFFFFF"/>
      <text x="250" y="270" fill="#FFFFFF" fontSize="14" fontWeight="bold">VMS INDUSTRIE</text>
    </svg>
  );
}
