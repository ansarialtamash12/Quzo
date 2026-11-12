import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Hash, Sparkles, ShieldCheck, Smartphone, Globe, Blocks, BrainCircuit, Network } from "lucide-react";
import { HeroBackground } from "../components/quzo/HeroBackground"; // Background wapas import kiya

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [placement, setPlacement] = useState("right");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted");
  };

  // Same styling as Login
  const inputWrapper = "relative flex items-center rounded-xl border border-white/10 bg-[#031B23]/80 backdrop-blur-md transition-all duration-300 focus-within:border-[#19D8D0] focus-within:ring-2 focus-within:ring-[#19D8D0]/30 hover:border-white/20";
  const inputField = "w-full bg-transparent px-12 py-4 text-sm text-white outline-none placeholder:text-slate-500";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 relative overflow-hidden bg-[#031B23]">
      
      {/* HD Background - Same as Login */}
      <HeroBackground />
      <div className="absolute inset-0 bg-[#031B23]/40 z-0" />

      {/* Main Split Card Container - Thoda bada kiya hai Register ke liye */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1100px] min-h-[700px] relative z-10 flex rounded-[2rem] border border-white/10 bg-[#031B23]/70 backdrop-blur-2xl shadow-[0_0_100px_-20px_rgba(25,216,208,0.3)] overflow-hidden my-8"
      >
        
        {/* LEFT SIDE - Branding (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/3 relative flex-col justify-between p-12 bg-gradient-to-br from-[#052832]/90 to-[#031B23]/90 border-r border-white/5 overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#19D8D0]/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-3xl font-bold font-display text-white tracking-wide mb-12">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#19D8D0] to-[#64BDB7] flex items-center justify-center shadow-[0_0_30px_rgba(25,216,208,0.5)]">
                <span className="text-[#031B23] text-2xl">Q</span>
              </div>
              Quzo
            </div>

            <h1 className="text-4xl font-display text-white leading-tight">
              Join the <br />New Era.
            </h1>
            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
              Powering the future of wealth through AI and decentralised finance. Create your account to get started.
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
        <div className="w-full lg:w-2/3 p-8 md:p-12 flex flex-col justify-center relative bg-[#031B23]/40">
          
          <div className="flex flex-col items-start mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#19D8D0]/30 bg-[#19D8D0]/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#19D8D0]">
              <Sparkles size={14} />
              Create Account
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-white tracking-wider">
              REGISTER
            </h2>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              Join the ecosystem today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Referral & Placement */}
            <div>
              <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-2">
                <Hash size={16} className="text-[#19D8D0]" />
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Referral & Placement</h3>
              </div>
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Referral ID <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <input type="text" placeholder="Enter Referral ID" className={`${inputField} px-5`} required />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Placement Side <span className="text-[#19D8D0]">*</span></label>
                  <div className="flex rounded-xl border border-white/10 bg-[#031B23]/80 p-1.5 relative h-[52px]">
                    <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-lg bg-[#19D8D0]/20 border border-[#19D8D0]/30 transition-transform duration-300 ease-out ${placement === "right" ? "translate-x-[calc(100%+6px)]" : "translate-x-1.5"}`} />
                    <button type="button" onClick={() => setPlacement("left")} className={`relative z-10 flex-1 rounded-lg text-xs font-semibold transition-colors ${placement === "left" ? "text-[#19D8D0]" : "text-slate-400 hover:text-white"}`}>Left Team</button>
                    <button type="button" onClick={() => setPlacement("right")} className={`relative z-10 flex-1 rounded-lg text-xs font-semibold transition-colors ${placement === "right" ? "text-[#19D8D0]" : "text-slate-400 hover:text-white"}`}>Right Team</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Personal Information */}
            <div>
              <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-2">
                <User size={16} className="text-[#19D8D0]" />
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Personal Information</h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">First Name <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <User size={18} className="absolute left-4 text-slate-500" />
                    <input type="text" placeholder="John" className={inputField} required />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Last Name <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <User size={18} className="absolute left-4 text-slate-500" />
                    <input type="text" placeholder="Doe" className={inputField} required />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Email Address <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <Mail size={18} className="absolute left-4 text-slate-500" />
                    <input type="email" placeholder="john@example.com" className={inputField} required />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Mobile Number <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <Smartphone size={18} className="absolute left-4 text-slate-500" />
                    <input type="tel" placeholder="0000000000" className={inputField} required />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Country <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <Globe size={18} className="absolute left-4 text-slate-500 pointer-events-none" />
                    <select className={`${inputField} appearance-none`} required defaultValue="">
                      <option value="" disabled>Select Country</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Country Code <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <input type="text" defaultValue="+91" className={`${inputField} px-5`} required />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-slate-300">Password <span className="text-[#19D8D0]">*</span></label>
                  <div className={inputWrapper}>
                    <Lock size={18} className="absolute left-4 text-slate-500" />
                    <input type={showPassword ? "text" : "password"} placeholder="Create a strong password" className={`${inputField} pr-12`} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-slate-500 hover:text-[#19D8D0] transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={agreeTerms} 
                onChange={() => setAgreeTerms(!agreeTerms)} 
                className="mt-1 h-5 w-5 rounded border-white/20 bg-[#031B23] accent-[#19D8D0]" 
                required 
              />
              <label className="text-sm text-slate-400">
                I agree to the <Link to="/terms" className="text-[#19D8D0] hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-[#19D8D0] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="q-focus group flex w-full items-center justify-center gap-2 rounded-xl bg-[#19D8D0] py-4 text-[#031B23] text-base font-semibold shadow-[0_0_20px_rgba(25,216,208,0.3)] transition-all duration-300 hover:bg-[#7FF3EC] hover:shadow-[0_0_40px_rgba(25,216,208,0.6)] mt-2">
              CREATE ACCOUNT <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center lg:items-start">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#19D8D0] hover:text-[#7FF3EC] transition-colors ml-1">Sign in</Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}