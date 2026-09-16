import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { STORIES, FEATURED_CREATOR } from '../data/content';
import { APP_ASSETS } from '../data/assets';
import { PageHero } from '../components/PageHero';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ArrowRight, Quote, MapPin, Award, RotateCcw } from 'lucide-react';
import { StoriesGridSkeleton } from '../components/Skeleton';

interface StoriesPageProps {
  onNavigate: (page: PageId) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ 
  onNavigate,
  onBack,
  isLoading: externalLoading 
}) => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 350);
  };

  const showSkeleton = externalLoading ?? (isInitialLoading || isRefreshing);
  return (
    <div id="stories-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Alumni Imagery) */}
      <PageHero
        badge="Alumni Journeys"
        badgeColor="amber"
        title="Real People. Real Creative Journeys."
        description="The people below came in with ability and left with a body of work. These are their words."
        imageSrc={APP_ASSETS.featuredFilmmaker}
        imageAlt="Young filmmaker and KKF alumnus working on documentary production"
        imagePosition="object-center"
        breadcrumbs={[{ label: 'Alumni Stories', active: true }]}
        onNavigate={onNavigate}
        onBack={onBack}
      />

      {/* 2. CREATIVE OF THE MONTH */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-[#F8FAFC] rounded-[30px] p-8 md:p-14 border border-[#E8EDF4] card-glow grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 rounded-[24px] overflow-hidden shadow-lg border border-[#E8EDF4]">
              <ImagePlaceholder
                src={FEATURED_CREATOR.image}
                fallbackText={FEATURED_CREATOR.imagePlaceholderText}
                alt={FEATURED_CREATOR.name}
                aspectRatio="4:5"
                className="w-full h-full"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#F59E0B] uppercase block mb-3">
                  Creative of the Month
                </span>
                <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[42px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                  {FEATURED_CREATOR.name}
                </h2>
                <span className="font-['Poppins'] text-sm font-semibold text-[#2563EB] block mt-1">
                  {FEATURED_CREATOR.role} · {FEATURED_CREATOR.county}
                </span>
              </div>

              <p className="font-['Inter'] text-[16px] text-[#475569] leading-relaxed">
                {FEATURED_CREATOR.bio}
              </p>

              <blockquote className="p-5 rounded-[16px] bg-white border-l-4 border-[#F59E0B] text-[15px] text-[#334155] italic leading-relaxed shadow-xs">
                {FEATURED_CREATOR.quote}
              </blockquote>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#E8EDF4]">
                {FEATURED_CREATOR.stats.map((st, idx) => (
                  <div key={idx}>
                    <span className="font-['Poppins'] font-bold text-xl text-[#0F172A] block">{st.val}</span>
                    <span className="text-[11px] text-[#64748B] font-['Inter']">{st.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. JOURNEYS GRID (6 stories) */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-t border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 pb-4 border-b border-[#E8EDF4]">
            <div>
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-2">
                Testimonials &amp; Outcomes
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                Alumni Journeys
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={showSkeleton}
                title="Reload alumni stories"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8EDF4] text-xs font-['Poppins'] font-medium text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${showSkeleton ? 'animate-spin text-[#2563EB]' : ''}`} />
                <span>Refresh Stories</span>
              </button>
              <span className="text-xs text-[#64748B] font-mono">
                {STORIES.length} Verified Profiles
              </span>
            </div>
          </div>

          {showSkeleton ? (
            <StoriesGridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-kkf-rise">
              {STORIES.map((story) => (
                <div
                  key={story.slug}
                  className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between"
                >
                  <div>
                    <Quote className="w-8 h-8 text-[#2563EB]/25 mb-4" />
                    <p className="font-['Inter'] text-[17px] text-[#0F172A] leading-[1.65] mb-6 italic">
                      {story.quote}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#E8EDF4] flex items-center gap-4">
                    <div className="w-[52px] h-[52px] rounded-full overflow-hidden shrink-0 border-2 border-[#2563EB]/30">
                      <ImagePlaceholder
                        src={story.avatar}
                        fallbackText={story.avatarPlaceholderText}
                        alt={story.name}
                        aspectRatio="1:1"
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-['Poppins'] font-bold text-[16px] text-[#0F172A] leading-tight">
                        {story.name}
                      </h3>
                      <p className="text-xs text-[#2563EB] font-['Poppins'] font-semibold mt-0.5">
                        {story.field}
                      </p>
                      <p className="text-[11px] text-[#64748B] font-['Inter']">
                        {story.role} · {story.county}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white text-center">
        <div className="max-w-[1240px] mx-auto px-6 max-w-[700px]">
          <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[46px] leading-[1.10] tracking-[-0.03em] mb-6">
            Your story could be next.
          </h2>
          <p className="font-['Inter'] text-[17.5px] text-white/80 leading-relaxed mb-10">
            Apply to the Creative or Digital Academy cohorts today. No formal prior qualifications required.
          </p>

          <button
            type="button"
            onClick={() => onNavigate('get-involved')}
            className="px-9 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-[16px] transition-all shadow-lg shadow-blue-600/30"
          >
            Apply Now
          </button>
        </div>
      </section>

    </div>
  );
};
