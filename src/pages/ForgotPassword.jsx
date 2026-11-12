import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, ArrowRight, Sparkles, ShieldCheck, Lock, ArrowLeft, Blocks, BrainCircuit, Network } from "lucide-react";
import { HeroBackground } from "../components/quzo/HeroBackground"; // Background import kiya

export default function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent");
  };

  const inputWrapper = "relative flex items-center rounded-xl border border-white/10 bg-[#031B23]/80 backdrop-blur-md transition-all duration-300 focus-within:border-[#19D8D0] focus-within:ring-2 focus-within:ring-[#19D8D0]/30 hover:border-white/20";
  const inputField = "w-full bg-transparent px-12 py-4 text-sm text-white outline-none placeholder:text-slate-500";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 relative overflow-hidden bg-[#031B23]">
      
      {/* HD Background - Same as Login */}
      <HeroBackground />
      <div className="absolute inset-0 bg-[#031B23]/40 z-0" />

      {/* Main Split Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1000px] min-h-[600px] relative z-10 flex rounded-[2rem] border border-white/10 bg-[#031B23]/70 backdrop-blur-2xl shadow-[0_0_100px_-20px_rgba(25,216,208,0.3)] overflow-hidden"
      >
        
        {/* LEFT SIDE - Branding */}
        <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-[#052832]/90 to-[#031B23]/90 border-r border-white/5 overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#19D8D0]/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 text-3xl font-bold font-display text-white tracking-wide mb-12 w-max">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#19D8D0] to-[#64BDB7] flex items-center justify-center shadow-[0_0_30px_rgba(25,216,208,0.5)]">
                <span className="text-[#031B23] text-2xl">Q</span>
              </div>
              Quzo
            </Link>

            <h1 className="text-4xl lg:text-5xl font-display text-white leading-tight">
              Recover <br />Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D8D0] to-[#64BDB7]">Access.</span>
            </h1>
            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
              Don't worry, it happens to the best of us. Enter your details and we'll help you get back into your account securely.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-4">
            {[
              { icon: ShieldCheck, text: "Bank-Grade Encryption" },
              { icon: Lock, text: "Secure Password Reset" },
              { icon: User, text: "Identity Verification" }
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
              Account Recovery
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-white tracking-wider">
              FORGOT <span className="text-[#19D8D0]">PASSWORD</span>
            </h2>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              Reset your account access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-300">User ID <span className="text-[#19D8D0]">*</span></label>
              <div className={inputWrapper}>
                <User size={20} className="absolute left-4 text-slate-500" />
                <input type="text" placeholder="Enter your User ID" className={inputField} required />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-300">Email Address <span className="text-[#19D8D0]">*</span></label>
              <div className={inputWrapper}>
                <Mail size={20} className="absolute left-4 text-slate-500" />
                <input type="email" placeholder="Enter your registered email" className={inputField} required />
              </div>
            </div>

            <button type="submit" className="q-focus group flex w-full items-center justify-center gap-2 rounded-xl bg-[#19D8D0] py-4 text-[#031B23] text-base font-semibold shadow-[0_0_20px_rgba(25,216,208,0.3)] transition-all duration-300 hover:bg-[#7FF3EC] hover:shadow-[0_0_40px_rgba(25,216,208,0.6)] mt-2">
              SEND RESET LINK <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center lg:items-start">
            <p className="text-sm text-slate-400">
              Back to{" "}
              <Link to="/login" className="font-medium text-[#19D8D0] hover:text-[#7FF3EC] transition-colors ml-1 inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Sign In
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}