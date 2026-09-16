import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ImagePlaceholderProps {
  src?: string;
  fallbackText?: string;
  alt: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '3:2' | '3:4' | '4:5' | '1:1' | 'auto';
  darkTheme?: boolean;
  priority?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '3:2',
  darkTheme = false,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    '3:4': 'aspect-[3/4]',
    '4:5': 'aspect-[4/5]',
    '1:1': 'aspect-[1/1]',
    'auto': '',
  }[aspectRatio];

  // If there's an image source and no load error
  const renderActualImage = src && !hasError;

  return (
    <div 
      className={`relative overflow-hidden group ${aspectClasses} ${className} ${
        darkTheme ? 'bg-[#16223A]' : 'bg-[#F8FAFC]'
      }`}
    >
      {renderActualImage ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div 
          className={`w-full h-full flex flex-col items-center justify-center p-4 text-center ${
            darkTheme ? 'bg-[#0F172A] text-slate-400' : 'bg-slate-100 text-slate-500'
          }`}
          aria-label={alt}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 text-amber-400">
            <Camera className="w-6 h-6" />
          </div>
          <p className="text-xs font-medium max-w-[200px] truncate opacity-80">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
};

