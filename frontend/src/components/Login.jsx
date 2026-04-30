import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { X, User, Mail, Lock, Shield, Zap, ChevronRight } from "lucide-react";

// --- Reusable Dashboard Input ---
const DashboardInput = ({ icon: Icon, label, color, ...props }) => (
  <div className="space-y-2 group">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-gray-900/50 border border-white/5 group-focus-within:border-${color}-500/50 transition-all`}>
        <Icon className={`w-4 h-4 text-${color}-400`} />
      </div>
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</label>
    </div>
    <input
      {...props}
      className={`w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-${color}-500 focus:ring-1 focus:ring-${color}-500/20 transition-all text-sm font-medium`}
    />
  </div>
);

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();
  const [state, setState] = useState("login"); // 'login' or 'register'
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`/api/user/${state}`, formData);
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
        navigate('/');
        toast.success(state === "login" ? "Ignition Sequence Start." : "Pilot Profile Sync Complete.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Telemetry Error: Check Connection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <form 
        onSubmit={onSubmitHandler} 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
      >
        {/* Dynamic Glow Effect */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-[80px] opacity-20 transition-colors duration-1000 ${state === 'login' ? 'bg-cyan-500' : 'bg-emerald-500'}`} />

        <div className="relative z-10 p-10">
          {/* Close Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-colors ${state === 'login' ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                  {state === 'login' ? <Zap className="text-cyan-400" size={20} /> : <User className="text-emerald-400" size={20} />}
               </div>
               <div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">
                    {state === 'login' ? 'Access Console' : 'Pilot Entry'}
                  </h2>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Status: Ready for Sync</p>
               </div>
            </div>
            <button onClick={() => setShowLogin(false)} className="text-gray-600 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {state === "register" && (
              <DashboardInput icon={User} label="Full Name" name="name" color="emerald" placeholder="John Doe" value={formData.name} onChange={handleInput} required />
            )}
            
            <DashboardInput icon={Mail} label="Email Identifier" name="email" color={state === 'login' ? 'cyan' : 'emerald'} type="email" placeholder="pilot@elite.com" value={formData.email} onChange={handleInput} required />
            
            <DashboardInput icon={Lock} label="Authorization Key" name="password" color={state === 'login' ? 'cyan' : 'emerald'} type="password" placeholder="••••••••" value={formData.password} onChange={handleInput} required />
          </div>

          {/* --- ENHANCED BUTTON SYSTEM --- */}
          <div className="mt-12 flex flex-col gap-4">
            {/* Primary Action Button */}
            <button
              disabled={isLoading}
              className={`group relative w-full py-5 rounded-[20px] font-black text-[12px] uppercase tracking-[0.3em] transition-all overflow-hidden active:scale-95 flex items-center justify-center gap-3
                ${isLoading 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : state === 'login' 
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.3)]' 
                    : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.3)]'}`}
            >
              {isLoading ? 'Processing...' : (
                <>
                  <span>{state === 'login' ? 'Initialize Engine' : 'Sync Pilot Profile'}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Toggle State Button (The Secondary Action) */}
            <button 
              type="button" 
              onClick={() => setState(state === 'login' ? 'register' : 'login')}
              className="w-full py-4 rounded-xl border border-white/5 bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              {state === 'login' ? "New Pilot? Register Here" : "Authorized Member? Login"}
            </button>
          </div>
        </div>

        {/* Footer Hardware Info */}
        <div className="px-10 py-5 bg-black border-t border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield size={12} className={state === 'login' ? 'text-cyan-500' : 'text-emerald-500'} />
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">End-to-End Encryption</span>
            </div>
            <span className="text-[9px] font-black text-zinc-800 uppercase italic tracking-widest">System v2.0.26</span>
        </div>
      </form>
    </div>
  );
};

export default Login;