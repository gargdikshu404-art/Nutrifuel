import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const JoinAuth = ({ setActivePage }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState('signin'); // signin | signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setActivePage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickMemberLogin = () => {
    login('alex.vance@nutrifuel.io', 'password123');
    setActivePage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-surface min-h-[calc(100vh-80px)] flex flex-col md:flex-row antialiased">
      {/* Left Side: Brand Imagery */}
      <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-full flex flex-col justify-end p-8 md:p-16 overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-outline-variant">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
            alt="Athletic Focus"
            className="w-full h-full object-cover grayscale brightness-40 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-block bg-secondary-container px-3 py-1 mb-4">
            <span className="font-label-caps text-[10px] uppercase text-white font-bold tracking-widest">
              Access Restricted to High Performers
            </span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-6xl uppercase text-white mb-3 leading-none">
            Fuel Your <br />
            <span className="text-secondary-container">Ambition.</span>
          </h1>
          <p className="font-body-lg text-sm text-on-surface-variant max-w-md hidden sm:block">
            Precision nutrition tailored for high-performance individuals. No compromises. Pure results.
          </p>

          <div className="mt-6 flex items-center gap-4 text-xs font-label-caps text-on-surface-variant">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">lock</span> End-to-End Encrypted</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">verified_user</span> HIPAA Compliant</span>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-surface-container-lowest">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display-lg text-3xl uppercase text-white mb-1">User Access Portal</h2>
            <p className="font-body-md text-xs text-on-surface-variant">
              Enter your credentials to manage your athletic nutrition & biofeedback profile.
            </p>
          </div>

          {/* Quick Demo Login Bar */}
          <div className="mb-6 p-3.5 bg-surface-container border border-secondary/30 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-label-caps text-[10px] text-secondary uppercase block font-bold">Quick Demo Login:</span>
              <span className="font-body-md text-xs text-white font-medium">Alex Vance (Athlete)</span>
            </div>
            <button
              type="button"
              onClick={handleQuickMemberLogin}
              className="px-3.5 py-1.5 bg-secondary-container text-white font-body-md text-xs font-semibold rounded-lg hover:bg-hot-pink transition-all neon-glow"
            >
              Sign In Demo Account
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-6">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 pb-3 text-center font-body-md text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                tab === 'signin'
                  ? 'border-secondary text-secondary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 pb-3 text-center font-body-md text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                tab === 'signup'
                  ? 'border-secondary text-secondary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-label-caps text-[11px] uppercase text-on-surface-variant mb-1.5 font-bold">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.vance@nutrifuel.io"
                className="w-full bg-background border border-white/15 rounded-xl px-3.5 py-2.5 font-body-md text-sm text-white focus:border-secondary focus:outline-none transition-all"
                required
              />
            </div>

            <div className="relative">
              <label className="block font-label-caps text-[11px] uppercase text-on-surface-variant mb-1.5 font-bold">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-background border border-white/15 rounded-xl px-3.5 py-2.5 font-body-md text-sm text-white focus:border-secondary focus:outline-none transition-all pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-on-surface-variant hover:text-secondary"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-background border-white/30 text-secondary focus:ring-0"
                />
                <span className="font-body-md text-on-surface-variant">Remember device</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Reset link dispatched to registered email.'); }} className="font-label-caps text-secondary hover:underline uppercase text-[11px]">
                Forgot Key?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-secondary-container to-secondary text-primary-container font-body-md text-sm font-bold uppercase rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{tab === 'signin' ? 'Sign In to Portal' : 'Register Account'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-outline-variant"></div>
              <span className="relative bg-surface-container-lowest px-3 font-label-caps text-[10px] text-on-surface-variant uppercase">
                Or Authenticate With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleQuickMemberLogin}
                className="flex items-center justify-center gap-2 py-2.5 bg-surface-container border border-white/10 hover:border-secondary text-xs font-label-caps uppercase text-white transition-colors"
              >
                <span className="font-bold">Google Auth</span>
              </button>
              <button
                type="button"
                onClick={handleQuickMemberLogin}
                className="flex items-center justify-center gap-2 py-2.5 bg-surface-container border border-white/10 hover:border-secondary text-xs font-label-caps uppercase text-white transition-colors"
              >
                <span className="font-bold">Apple ID</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
