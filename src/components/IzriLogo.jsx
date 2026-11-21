import React from 'react';

export default function IzriLogo({ className = "h-9", light = false, showTagline = true }) {
  return (
    <div className="flex items-center gap-3">
      {/* Official IZRI Emblem from uploaded logo */}
      <div className="relative flex items-center justify-center">
        <img 
          src="/izri-logo.jpg" 
          alt="IZRI - VMS Industrie" 
          className={`${className} object-contain rounded-md filter ${light ? 'brightness-110' : ''}`}
          onError={(e) => {
            // Graceful fallback if image load fails
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.nextSibling) {
              e.currentTarget.nextSibling.style.display = 'flex';
            }
          }}
        />
        {/* Crisp vector fallback */}
        <div className="hidden items-center justify-center w-10 h-10 rounded-lg bg-[#191919] border border-red-600/30">
          <span className="text-white font-extrabold text-base tracking-tighter">
            I<span className="text-[#E30613]">Z</span>RI
          </span>
        </div>
      </div>

      {showTagline && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-lg uppercase ${light ? 'text-white' : 'text-[#191919]'}`}>
              IZ<span className="text-[#E30613]">R</span>I
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E30613]/10 text-[#E30613] tracking-widest uppercase">
              VMS
            </span>
          </div>
          <span className={`text-[10px] uppercase tracking-wider font-semibold ${light ? 'text-gray-400' : 'text-[#777777]'}`}>
            Industrie · Algérie
          </span>
        </div>
      )}
    </div>
  );
}
