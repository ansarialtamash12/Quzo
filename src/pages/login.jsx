import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Blocks, BrainCircuit, Network } from "lucide-react";
import { HeroBackground } from "../components/quzo/HeroBackground"; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRobot, setIsRobot] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  const inputWrapper = "relative flex items-center rounded-xl border border-white/10 bg-[#031B23]/80 backdrop-blur-md transition-all duration-300 focus-within:border-[#19D8D0] focus-within:ring-2 focus-within:ring-[#19D8D0]/30 hover:border-white/20";
  const inputField = "w-full bg-transparent px-12 py-4 text-sm text-white outline-none placeholder:text-slate-500";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 relative overflow-hidden bg-[#031B23]">
      
      {/* HD Background */}
      <HeroBackground />
      <div className="absolute inset-0 bg-[#031B23]/40 z-0" />

      {/* Main Split Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1000px] min-h-[650px] relative z-10 flex rounded-[2rem] border border-white/10 bg-[#031B23]/70 backdrop-blur-2xl shadow-[0_0_100px_-20px_rgba(25,216,208,0.3)] overflow-hidden"
      >
        
        {/* LEFT SIDE - Branding & Graphics (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-[#052832]/90 to-[#031B23]/90 border-r border-white/5 overflow-hidden">
          {/* Internal Glow */}
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#19D8D0]/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-3xl font-bold font-display text-white tracking-wide mb-12">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#19D8D0] to-[#64BDB7] flex items-center justify-center shadow-[0_0_30px_rgba(25,216,208,0.5)]">
                <span className="text-[#031B23] text-2xl">Q</span>
              </div>
              Quzo
            </div>

            <h1 className="text-4xl lg:text-5xl font-display text-white leading-tight">
              Intelligence <br />Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D8D0] to-[#64BDB7]">Finance.</span>
            </h1>
            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
              An AI-powered blockchain ecosystem connecting digital assets, decentralised finance and intelligent trading.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-4">
            {[
              { icon: Blocks, text: "EVM-Compatible Infrastructure" },
              { icon: BrainCircuit, text: "AI-Powered Intelligence" },
              { icon: Network, text: "Multi-Market Connectivity" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <item.icon size={16} className="text-[#19D8D0]" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - The Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-[#031B23]/40">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#19D8D0]/30 bg-[#19D8D0]/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#19D8D0]">
              <Sparkles size={14} />
              Welcome Back
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-white tracking-wider">
              SIGN <span className="text-[#19D8D0]">IN</span>
            </h2>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              Continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-300">Username <span className="text-[#19D8D0]">*</span></label>
              <div className={inputWrapper}>
                <User size={20} className="absolute left-4 text-slate-500" />
                <input type="text" placeholder="Enter your userid" className={inputField} required />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-xs font-medium text-slate-300">Password <span className="text-[#19D8D0]">*</span></label>
                <Link to="/forgot-password" className="text-[11px] text-[#19D8D0] hover:text-white transition-colors hover:underline">Forgot?</Link>
              </div>
              <div className={inputWrapper}>
                <Lock size={20} className="absolute left-4 text-slate-500" />
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className={inputField} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-slate-500 hover:text-[#19D8D0] transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#031B23]/60 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={isRobot} onChange={() => setIsRobot(!isRobot)} className="h-5 w-5 rounded border-white/20 bg-[#031B23] accent-[#19D8D0]" />
                <span className="text-sm text-slate-300">I'm not a robot</span>
              </label>
              <ShieldCheck size={20} className="text-[#19D8D0]/70" />
            </div>

            <button onClick={handleSubmit} className="q-focus group flex w-full items-center justify-center gap-2 rounded-xl bg-[#19D8D0] py-4 text-[#031B23] font-semibold shadow-[0_0_20px_rgba(25,216,208,0.3)] transition-all duration-300 hover:bg-[#7FF3EC] hover:shadow-[0_0_40px_rgba(25,216,208,0.6)]">
              SIGN IN <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center lg:items-start">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-[#19D8D0] hover:text-[#7FF3EC] transition-colors">Create account</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}