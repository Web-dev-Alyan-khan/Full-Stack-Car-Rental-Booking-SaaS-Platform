import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { X, User, Mail, Lock, Sparkles, LogIn, UserPlus, Car, Key, MapPin, Shield } from "lucide-react";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleStateToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setState(prev => prev === "login" ? "register" : "login");
      setName("");
      setEmail("");
      setPassword("");
      setIsTransitioning(false);
    }, 300);
  };

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        navigate('/');
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
        toast.success(state === "login" ? "Welcome back!" : "Account created successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      {/* Animated Car Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving Road Lines */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-roadLine"></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-roadLine delay-1000"></div>
        
        {/* Floating Cars */}
        <div className="absolute top-1/3 -left-20 animate-driveSlow">
          <Car className="w-12 h-12 text-blue-400/30" />
        </div>
        <div className="absolute top-2/3 -right-20 animate-driveFast">
          <Car className="w-16 h-16 text-red-400/20" />
        </div>
        
        {/* City Skyline Silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900/30 to-transparent">
          <div className="flex justify-around items-end h-full px-8">
            {[1,2,3,4,5,6,7].map((i) => (
              <div 
                key={i} 
                className="w-8 bg-gradient-to-t from-gray-800/40 to-gray-900/20"
                style={{ height: `${40 + Math.random() * 40}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Modal - Car Dashboard Inspired */}
      <form 
        onSubmit={onSubmitHandler} 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 backdrop-blur-xl shadow-2xl shadow-blue-500/10"
      >
        {/* Neon Border Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-2xl blur opacity-30 animate-pulse"></div>
        
        {/* Dashboard Header */}
        <div className="relative p-8 border-b border-gray-800/50">
          <button
            onClick={() => setShowLogin(false)}
            className="absolute right-6 top-6 p-2 rounded-xl hover:bg-gray-800/50 transition-all hover:rotate-90 duration-300 group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                {state === "login" ? "Welcome Back, Driver!" : "Start Your Journey"}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {state === "login" ? "Access your car rental dashboard" : "Create account to book your ride"}
              </p>
            </div>
          </div>
          
          {/* Mode Toggle - Speedometer Style */}
          <div className="flex items-center justify-center gap-2 p-1 bg-gray-900/50 rounded-full w-fit mx-auto">
            <button
              type="button"
              onClick={() => setState("login")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                state === "login" 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Key className="w-4 h-4" />
              Login
            </button>
            <button
              type="button"
              onClick={() => setState("register")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                state === "register" 
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg scale-105" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Content - Car Interior Inspired */}
        <div className={`p-8 space-y-6 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Speedometer Progress Indicator */}
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 ${
                state === "register" ? 'w-2/3' : 'w-1/3'
              }`}
            ></div>
          </div>

          {state === "register" && (
            <div className="space-y-4 animate-slideIn">
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gray-800/50 group-focus-within:bg-blue-500/20 transition-colors">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <label className="text-sm font-medium text-gray-300">Your Name</label>
                </div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 bg-gray-900/30 border-2 border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm backdrop-blur-sm"
                  type="text"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-4 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gray-800/50 group-focus-within:bg-blue-500/20 transition-colors">
                <Mail className="w-4 h-4 text-cyan-400" />
              </div>
              <label className="text-sm font-medium text-gray-300">Email Address</label>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="driver@example.com"
              className="w-full px-4 py-3.5 bg-gray-900/30 border-2 border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-sm backdrop-blur-sm"
              type="email"
              required
            />
          </div>

          <div className="space-y-4 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gray-800/50 group-focus-within:bg-blue-500/20 transition-colors">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <label className="text-sm font-medium text-gray-300">Secure Password</label>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your secure password"
              className="w-full px-4 py-3.5 bg-gray-900/30 border-2 border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm backdrop-blur-sm"
              type="password"
              required
            />
          </div>

          {/* Security Features Badge */}
          <div className="flex items-center justify-center gap-4 py-3 px-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-400">256-bit SSL Encryption • Secure Login</span>
          </div>

          {/* Submit Button - Start Engine Style */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm relative overflow-hidden group ${
              isLoading
                ? "bg-gradient-to-r from-gray-800 to-gray-900 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-cyan-500/30"
            }`}
          >
            {/* Engine Start Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white">
                  {state === "register" ? "Starting Your Engine..." : "Checking Credentials..."}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Car className="w-5 h-5" />
                <span className="text-white">
                  {state === "register" ? "Start Your Journey" : "Access Dashboard"}
                </span>
              </div>
            )}
          </button>

          {/* Toggle Link - Road Sign Style */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={handleStateToggle}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 group inline-flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full border-2 border-gray-700 group-hover:border-cyan-500 flex items-center justify-center transition-all">
                <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-cyan-500 transition-colors"></div>
              </div>
              <span>
                {state === "register" ? "Already have an account?" : "New to our fleet?"}
                <span className="ml-2 font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text group-hover:from-cyan-300 group-hover:to-emerald-300 transition-all">
                  {state === "register" ? "Switch to Login" : "Create Account"}
                </span>
              </span>
            </button>
          </div>

          {/* Features Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="flex items-center gap-2 p-3 bg-gray-900/30 rounded-lg border border-gray-800/50">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-300">100+ Locations</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-900/30 rounded-lg border border-gray-800/50">
              <Car className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-gray-300">Premium Fleet</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="px-8 py-4 border-t border-gray-800/50 bg-black/30">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>System Ready</span>
            </div>
            <span>DriveSafe® Rental System</span>
          </div>
        </div>
      </form>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes roadLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes driveSlow {
          0% { transform: translateX(0) rotate(0); }
          100% { transform: translateX(calc(100vw + 100px)) rotate(2deg); }
        }
        @keyframes driveFast {
          0% { transform: translateX(0) rotate(0); }
          100% { transform: translateX(calc(-100vw - 100px)) rotate(-2deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-roadLine {
          animation: roadLine 2s linear infinite;
        }
        .animate-driveSlow {
          animation: driveSlow 20s linear infinite;
        }
        .animate-driveFast {
          animation: driveFast 15s linear infinite;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        /* Smooth focus effects */
        input:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Login;