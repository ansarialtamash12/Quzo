import { Link } from "react-router-dom";
import { User, Mail, ArrowRight, Sparkles, ShieldCheck, KeyRound } from "lucide-react";

const field = "w-full rounded-xl border bg-[#031B23] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-300 focus:border-[#19D8D0] focus:outline-none";

export default function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#031B23] px-4 py-12">
      <div className="w-full max-w-[460px]">
        
        {/* Main Card */}
        <div className="rounded-[28px] border border-white/10 bg-[#052832]/70 p-8 md:p-10 shadow-2xl">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 text-3xl font-bold font-display text-white tracking-wide">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#19D8D0] to-[#64BDB7] flex items-center justify-center">
                <span className="text-[#031B23]">Q</span>
              </div>
              Quzo
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#19D8D0]/30 bg-[#19D8D0]/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#19D8D0]">
              <Sparkles size={14} />
              Recover Account
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-white tracking-wide">
              FORGOT <br />
              <span className="text-[#19D8D0]">PASSWORD</span>
            </h1>
            <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              Reset your account access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            {/* Account Details Section */}
            <div className="rounded-2xl border border-white/10 bg-[#052832]/50 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#19D8D0] text-[#031B23]">
                  <KeyRound size={18} />
                </div>
                <h2 className="font-mono text-sm uppercase tracking-wider text-[#19D8D0]">
                  Account Details
                </h2>
              </div>

              <div className="space-y-5">
                {/* User ID Input */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">User ID <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter your User ID" 
                      className={`${field} border-white/15 pl-11`} 
                      required 
                    />
                  </div>
                </div>

                {/* Email Address Input */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-300">Email Address <span className="text-[#19D8D0]">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className={`${field} border-white/15 pl-11`} 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="q-focus q-btn-primary group w-full justify-center py-4 rounded-xl text-sm"
            >
              SEND RESET LINK <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Remembered?</span>
            <span className="h-px flex-1 bg-white/10"></span>
          </div>

          {/* Footer Link */}
          <div className="mt-5 text-center">
            <p className="text-sm text-slate-400">
              Back to{" "}
              <Link to="/login" className="font-medium text-[#19D8D0] hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>

        {/* Bottom Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500">
          <ShieldCheck size={16} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Secure Encrypted Access</span>
        </div>

      </div>
    </div>
  );
}