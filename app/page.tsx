'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-4">
      {/* Background subtle pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <motion.div
        className="max-w-2xl w-full text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Marisa Peer branding */}
        <motion.p
          className="text-brand-gold tracking-[0.3em] uppercase text-xs font-medium mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Marisa Peer
        </motion.p>

        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark leading-tight mb-6">
          What Were You <br />
          <span className="italic text-brand-plum">Actually</span> Born To Do?
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-brand-dark/70 max-w-xl mx-auto mb-4 leading-relaxed">
          This isn't a career aptitude test. It's a 3-minute subconscious assessment based on 30+ years of working with the human mind.
        </p>

        <p className="text-sm text-brand-dark/50 mb-10">
          Your answers will reveal the hidden belief running your life, where it came from, and what you were actually designed to do.
        </p>

        {/* CTA Button */}
        <motion.button
          onClick={() => router.push('/quiz')}
          className="bg-brand-dark text-brand-cream px-10 py-4 rounded-full text-lg font-medium
                     hover:bg-brand-plum transition-colors duration-300 shadow-lg shadow-brand-dark/20
                     relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Discover My True Calling</span>
          <motion.div
            className="absolute inset-0 bg-brand-plum"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Social proof */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-brand-dark/40">
            Takes 3 minutes &middot; 100% free &middot; Deeply personalised
          </p>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-4 text-xs text-brand-dark/30">
            <span>400M+ YouTube views</span>
            <span className="w-1 h-1 rounded-full bg-brand-gold" />
            <span>18,000+ trained practitioners</span>
            <span className="w-1 h-1 rounded-full bg-brand-gold" />
            <span>6 bestselling books</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-gold/5 to-transparent pointer-events-none" />
    </div>
  );
}
