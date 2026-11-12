import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const field = "w-full rounded-xl border bg-[#031B23] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-300 focus:border-[#19D8D0] focus:outline-none";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRobot, setIsRobot] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#031B23] px-4 py-12">
      
      <div className="w-full max-w-[440px]">
        
        {/* Main Card */}
        <div className="rounded-[28px] border border-white/10 bg-[#052832]/70 p-8 shadow-2xl">
          
          {/* Logo */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 text-3xl font-bold font-display text-white tracking-wide">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#19D8D0] to-[#64BDB7] flex items-center justify-center">
                <span className="text-[#031B23]">Q</span>
              </div>
              Quzo
            </div>

            {/* Welcome Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#19D8D0]/30 bg-[#19D8D0]/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#19D8D0]">
              <Sparkles size={14} />
              Welcome Back
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl text-white tracking-wider">
              SIGN <span className="text-[#19D8D0]">IN</span>
            </h1>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              Continue your journey
            </p>
          </div>

          {/* Form Container */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#052832]/50 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#19D8D0] text-[#031B23] shadow-lg shadow-[#19D8D0]/20">
                <Lock size={18} />
              </div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-[#19D8D0]">
                Account Access
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Input */}
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-300">Username <span className="text-[#19D8D0]">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter your userid" 
                    className={`${field} border-white/15 pl-11`} 
                    required 
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-300">Password <span className="text-[#19D8D0]">*</span></label>
                  <Link to="/forgot-password" className="text-[11px] text-[#19D8D0] hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    className={`${field} border-white/15 pl-11 pr-11`} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-[#19D8D0] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Captcha Box */}
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#052832]/50 p-5">
            <label className="flex cursor-pointer items-center gap-3">
              <input 
                type="checkbox" 
                checked={isRobot}
                onChange={() => setIsRobot(!isRobot)}
                className="h-5 w-5 rounded border-white/20 bg-[#031B23] accent-[#19D8D0]" 
              />
              <span className="text-sm text-slate-300">I'm not a robot</span>
            </label>
            <div className="flex flex-col items-center text-[#19D8D0]">
              <ShieldCheck size={20} />
              <span className="text-[9px] uppercase tracking-widest mt-1 text-slate-400">Privacy</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit} 
            className="q-focus q-btn-primary group mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5"
          >
            SIGN IN <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

          {/* Footer Link with Divider */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex w-full items-center gap-3 mb-4">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">New Here?</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-[#19D8D0] hover:underline transition-colors">
                Create account
              </Link>
            </p>
          </div>

        </div>

        {/* Bottom Security Text */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
          <Lock size={14} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Secure Encrypted Access</span>
        </div>

      </div>
    </div>
  );
}