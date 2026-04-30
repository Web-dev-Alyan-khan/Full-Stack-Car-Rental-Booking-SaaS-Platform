import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { ShieldCheck, CircleDollarSign, Zap } from 'lucide-react'

const Banner = () => {
  return (
    <div className="py-20">
      <div className='relative flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16 bg-[#0A0A0A] border border-white/5 max-w-7xl mx-4 md:mx-auto rounded-[40px] overflow-hidden group'>
        
        {/* --- BACKGROUND DECOR --- */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />

        {/* --- CONTENT SECTION --- */}
        <div className='relative z-10 text-white md:w-1/2'>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <Zap size={14} className="text-cyan-400 fill-cyan-400" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-400">
              Asset Monetization
            </span>
          </motion.div>

          <h2 className='text-4xl md:text-6xl font-black italic tracking-tighter leading-tight uppercase'>
            TURN YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-500">
              FLEET INTO CAPITAL
            </span>
          </h2>
          
          <p className='mt-6 text-gray-400 font-medium leading-relaxed max-w-md'>
            Monetize your luxury vehicle effortlessly. We handle the 
            <span className="text-white"> logistics, insurance, and elite verification </span> 
            while you collect high-yield passive income.
          </p>

          {/* Quick Perks HUD */}
          <div className="grid grid-cols-2 gap-4 mt-10">
             <div className="flex items-center gap-3">
                <ShieldCheck className="text-cyan-500" size={18} />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Verified Protection</span>
             </div>
             <div className="flex items-center gap-3">
                <CircleDollarSign className="text-emerald-500" size={18} />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Passive Yield</span>
             </div>
          </div>

          <button className='relative mt-12 px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:shadow-cyan-500/20'>
            List Your Asset
          </button>
        </div>

        {/* --- IMAGE SECTION --- */}
        <div className="relative md:w-1/2 mt-16 md:mt-0">
          {/* Neon Glow behind car */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-cyan-500/20 blur-[100px] rounded-full group-hover:bg-cyan-500/30 transition-all duration-700" />
          
          <motion.img 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src={assets.banner_car_image} 
            alt="Luxury Asset" 
            className='relative z-10 w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]'
          />
        </div>

      </div>
    </div>
  )
}

export default Banner