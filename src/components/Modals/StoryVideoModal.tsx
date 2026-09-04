import React, { useState } from 'react';
import { X, Play, Volume2, Award, Clock, Sparkles } from 'lucide-react';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { APP_ASSETS } from '../../data/assets';

interface StoryVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryVideoModal: React.FC<StoryVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#0F172A]/90 backdrop-blur-md animate-kkf-rise"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[860px] bg-[#0F172A] rounded-[28px] border border-white/15 overflow-hidden text-white shadow-2xl">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Area */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          {isPlaying ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0F172A] via-[#16223A] to-black">
              <div className="w-20 h-20 rounded-full border-4 border-amber-400/40 border-t-amber-400 animate-spin mb-4" />
              <p className="font-['Poppins'] font-semibold text-lg text-white">Streaming &quot;From Borrowed Cameras to Industry Impact&quot;</p>
              <p className="text-sm text-slate-400 mt-1">HD 1080p · 03:42 Documentary Mini-film</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-amber-400 font-mono">
                <span className="flex items-center gap-1.5"><Volume2 className="w-4 h-4" /> Audio: Swahili / English Subtitles</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Runtime: 3m 42s</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <ImagePlaceholder
                src={APP_ASSETS.cameraFilmSet}
                fallbackText="hero/story-poster.jpg: Documentary film poster, Young Kenyan creatives in Nairobi studio (16:9)"
                alt="KKF Documentary Story Trailer"
                aspectRatio="16:9"
                className="w-full h-full opacity-70"
                darkTheme={true}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40 flex flex-col justify-between p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[100px] bg-white/10 backdrop-blur-md text-amber-400 text-xs font-['Poppins'] font-semibold border border-white/15 w-fit">
                  <Sparkles className="w-3.5 h-3.5" />
                  Official Foundation Mini-Doc
                </div>

                <div className="text-center my-auto">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] flex items-center justify-center transition-all transform hover:scale-110 shadow-lg shadow-amber-500/30 mx-auto cursor-pointer"
                    aria-label="Play documentary video"
                  >
                    <Play className="w-8 h-8 fill-[#0F172A] ml-1" />
                  </button>
                  <h3 className="font-['Poppins'] font-bold text-2xl text-white mt-4">
                    Your Talent Can Build Your Future
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mt-1">
                    Follow three young Nairobi & Mombasa creators on their journey from initial curiosity to their first paid creative contract.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Directed by KKF Alumni Collective
                  </span>
                  <span>4K UHD · Stereo</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Notes */}
        <div className="p-6 md:p-8 bg-[#16223A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-['Poppins'] font-semibold text-base text-white">
              About the Documentary
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              Shot across Nairobi, Kisumu, and Mombasa, this mini-documentary features real testimonies from students, mentors, and partner studio heads who hired KKF graduates in 2025 and 2026.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-xs transition-colors shrink-0"
          >
            Close Film
          </button>
        </div>

      </div>
    </div>
  );
};
