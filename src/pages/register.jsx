import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Hash, Sparkles, ShieldCheck, Smartphone, Globe } from "lucide-react";

const field = "w-full rounded-xl border bg-[#031B23] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-300 focus:border-[#19D8D0] focus:outline-none";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [placement, setPlacement] = useState("right");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#031B23] px-4 py-12">
     
      <div className="w-full max-w-[640px]">
        
        <div className="rounded-[28px] border border-white/10 bg-[#052832]/70 p-8 md:p-10 shadow-2xl">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 text-3xl font-bold font-display text-white tracking-wide">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#19D8D0] to-[#64BDB7] flex items-center justify-center">
                <span className="text-[#031B23]">Q</span>
              </div>
              Quzo
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#19D8D0]/30 bg-[#19D8D0]/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#19D8D0]">
              <Sparkles size={14} />
              Join the new era
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-white tracking-wide">
              CREATE <span className="text-[#19D8D0]">ACCOUNT</span>
            </h1>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              Powering the future of wealth
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            {/* 1. Referral & Placement Section */}
            <div className="rounded-2xl border border-white/10 bg-[#052832]/50 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19D8D0] text-[#031B23]">
                  <Hash size={18} />
                </div>
                <div>
                  <h2 className="font-mono text-sm uppercase tracking-wider text-[#19D8D0]">Referral & Placement</h2>
                  <p className="text-[11px] text-slate-400">Connect with your sponsor</p>
                </div>
              </div>
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Referral ID <span className="text-[#19D8D0]">*</span></label>
                  <input type="text" placeholder="Enter Referral ID" className={`${field} border-white/15`} required />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Placement Side <span className="text-[#19D8D0]">*</span></label>
                  <div className="flex rounded-xl border border-white/15 bg-[#031B23] p-1.5">
                    <button type="button" onClick={() => setPlacement("left")} className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${placement === "left" ? "bg-[#19D8D0]/20 text-[#19D8D0]" : "text-slate-400 hover:text-white"}`}>Left Team</button>
                    <button type="button" onClick={() => setPlacement("right")} className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${placement === "right" ? "bg-[#19D8D0]/20 text-[#19D8D0]" : "text-slate-400 hover:text-white"}`}>Right Team</button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Personal Information Section */}
            <div className="rounded-2xl border border-white/10 bg-[#052832]/50 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19D8D0] text-[#031B23]">
                  <User size={18} />
                </div>
                <h2 className="font-mono text-sm uppercase tracking-wider text-[#19D8D0]">Personal Information</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">First Name <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500"><User size={16} /></div>
                    <input type="text" placeholder="John" className={`${field} border-white/15 pl-10`} required />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Last Name <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500"><User size={16} /></div>
                    <input type="text" placeholder="Doe" className={`${field} border-white/15 pl-10`} required />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Email Address <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500"><Mail size={16} /></div>
                    <input type="email" placeholder="john@example.com" className={`${field} border-white/15 pl-10`} required />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Mobile Number <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500"><Smartphone size={16} /></div>
                    <input type="tel" placeholder="0000000000" className={`${field} border-white/15 pl-10`} required />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Country <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500"><Globe size={16} /></div>
                    <select className={`${field} border-white/15 pl-10 appearance-none`} required defaultValue="">
                      <option value="" disabled>Select Country</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Country Code */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Country Code <span className="text-[#19D8D0]">*</span></label>
                  <input type="text" defaultValue="+91" className={`${field} border-white/15`} required />
                </div>

                {/* Password  */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-slate-300">Password <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500"><Lock size={16} /></div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a strong password" 
                      className={`${field} border-white/15 pl-10 pr-10`} 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-[#19D8D0] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-[#031B23] accent-[#19D8D0]" 
                required
              />
              <label className="text-xs text-slate-400">
                I agree to the{" "}
                <Link to="/terms" className="text-[#19D8D0] hover:underline">Terms & Conditions</Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#19D8D0] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="q-focus q-btn-primary group w-full justify-center py-4 rounded-xl text-sm"
            >
              CREATE ACCOUNT <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Or</span>
            <span className="h-px flex-1 bg-white/10"></span>
          </div>

          {/* Footer Link */}
          <div className="mt-5 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#19D8D0] hover:underline">
                Sign in
              </Link>
            </p>
          </div>

        </div>

        {/* Bottom Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500">
          <ShieldCheck size={16} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Your data is encrypted & secure</span>
        </div>

      </div>
    </div>
  );
}