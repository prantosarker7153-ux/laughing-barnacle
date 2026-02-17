import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { Movie } from '../types';

interface MovieTileProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (movie: Movie) => void;
}

const MovieTile: React.FC<MovieTileProps> = ({ movie, isFavorite, onToggleFavorite, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(movie)}
      whileTap={{ scale: 0.94 }}
      style={{ cursor: 'pointer' }}
    >
      {/* POSTER — clean, no text inside */}
      <div style={{
        position: 'relative',
        aspectRatio: '2/3',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#0f1420',
        marginBottom: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Shimmer */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(110deg, #0f1420 30%, #1a2035 50%, #0f1420 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        )}

        {/* Poster image — FULL, clean */}
        <img
          src={movie.thumbnail}
          alt={movie.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s',
          }}
        />

        {/* Very subtle bottom vignette only — poster mostly clean */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '30%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
        }} />

        {/* UPCOMING badge */}
        {movie.isUpcoming && (
          <div style={{
            position: 'absolute', top: 8, left: 0, zIndex: 10,
            background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
            padding: '3px 8px 3px 6px',
            borderRadius: '0 8px 8px 0',
          }}>
            <span style={{ fontSize: '7px', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>SOON</span>
          </div>
        )}

        {/* Exclusive badge */}
        {movie.isExclusive && !movie.isUpcoming && (
          <div style={{
            position: 'absolute', top: 8, left: 0, zIndex: 10,
            background: 'linear-gradient(90deg, #DCB43C, #F59E0B)',
            padding: '3px 8px 3px 6px',
            borderRadius: '0 8px 8px 0',
          }}>
            <span style={{ fontSize: '7px', fontWeight: 900, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>EXCL</span>
          </div>
        )}

        {/* Fav button — top right, small */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(movie.id); }}
          style={{
            position: 'absolute', top: 7, right: 7, zIndex: 10,
            width: 26, height: 26, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isFavorite ? 'rgba(239,68,68,0.9)' : 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            border: isFavorite ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Heart size={11} style={{ color: '#fff', fill: isFavorite ? '#fff' : 'none' }} />
        </button>
      </div>

      {/* INFO — Netflix style, OUTSIDE poster */}
      <div style={{ padding: '0 2px' }}>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '12px', fontWeight: 700,
          color: 'rgba(255,255,255,0.9)',
          lineHeight: '1.25',
          marginBottom: '3px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          letterSpacing: '-0.01em',
        }}>
          {movie.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Star size={9} fill="#DCB43C" color="#DCB43C" />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px', fontWeight: 700,
            color: '#DCB43C',
          }}>
            {movie.rating}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '8px' }}>·</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '9.5px', color: 'rgba(255,255,255,0.35)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {movie.category === 'Korean Drama' ? 'K-Drama' : movie.category}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default MovieTile;
