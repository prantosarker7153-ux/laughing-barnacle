import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Star } from 'lucide-react';
import { Movie } from '../types';

interface BannerProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  currentIndex?: number;
  totalBanners?: number;
  onDotClick?: (index: number) => void;
}

const Banner: React.FC<BannerProps> = ({
  movie, onClick, onPlay,
  currentIndex = 0, totalBanners = 1, onDotClick
}) => {
  const displayImage = movie.bannerThumbnail || movie.thumbnail;
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) onDotClick?.((currentIndex + 1) % totalBanners);
      else onDotClick?.((currentIndex - 1 + totalBanners) % totalBanners);
    }
    touchStartX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        // Portrait — Chorki style tall hero
        aspectRatio: '9/14',
        maxHeight: '90vh',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* FULL POSTER */}
          <img
            src={displayImage}
            alt={movie.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              pointerEvents: 'none',
            }}
          />

          {/* Top dark fade — header visible */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '25%',
            background: 'linear-gradient(to bottom, rgba(8,8,12,0.7) 0%, transparent 100%)',
          }} />

          {/* Bottom cinematic gradient — deep */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '60%',
            background: 'linear-gradient(to top, #08080c 0%, rgba(8,8,12,0.92) 30%, rgba(8,8,12,0.5) 60%, transparent 100%)',
          }} />

          {/* CONTENT at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '0 20px 44px',
            zIndex: 20,
          }}>

            {/* Category label */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#DCB43C',
                marginBottom: '8px',
                display: 'flex', alignItems: 'center', gap: '7px',
              }}
            >
              <span style={{ width: '18px', height: '2px', background: '#DCB43C', borderRadius: '2px', display: 'inline-block' }} />
              {movie.category || 'Featured'}
            </motion.p>

            {/* Title — big, bold */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(30px, 10vw, 52px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: '0.95',
                letterSpacing: '-0.03em',
                marginBottom: '10px',
                textShadow: '0 4px 30px rgba(0,0,0,0.7)',
              }}
            >
              {movie.title}
            </motion.h1>

            {/* Gold divider line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '40%', opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, #DCB43C, transparent)',
                borderRadius: '2px',
                marginBottom: '10px',
              }}
            />

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '18px',
              }}
            >
              {movie.rating && (
                <span style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'rgba(220,180,60,0.12)',
                  border: '1px solid rgba(220,180,60,0.3)',
                  borderRadius: '20px', padding: '3px 9px',
                }}>
                  <Star size={10} fill="#DCB43C" color="#DCB43C" />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 800, color: '#DCB43C' }}>{movie.rating}</span>
                </span>
              )}
              {(movie as any).year && (
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{(movie as any).year}</span>
              )}
              {(movie as any).duration && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{(movie as any).duration}</span>
                </>
              )}
              {(movie.videoQuality || (movie as any).quality) && (
                <span style={{
                  fontSize: '8px', fontWeight: 800, letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '2px 6px', borderRadius: '4px',
                  textTransform: 'uppercase',
                }}>
                  {movie.videoQuality || (movie as any).quality}
                </span>
              )}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: '10px' }}
            >
              {/* Play — primary gold */}
              <button
                onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: '#DCB43C',
                  color: '#000',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px', fontWeight: 900,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '13px 0',
                  borderRadius: '14px',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(220,180,60,0.4)',
                  maxWidth: '170px',
                }}
              >
                <Play size={14} fill="#000" color="#000" />
                PLAY
              </button>

              {/* Add to list */}
              <button
                onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px', fontWeight: 600,
                  padding: '13px 20px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} />
                Info
              </button>
            </motion.div>
          </div>

          {/* DOTS — bottom center */}
          {totalBanners > 1 && (
            <div style={{
              position: 'absolute', bottom: 18, right: 20,
              display: 'flex', gap: '5px', zIndex: 30,
            }}>
              {[...Array(totalBanners)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); onDotClick?.(idx); }}
                  style={{
                    width: idx === currentIndex ? '22px' : '5px',
                    height: '4px', borderRadius: '3px',
                    background: idx === currentIndex ? '#DCB43C' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
