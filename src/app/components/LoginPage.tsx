import { useState } from 'react';
import { ShoppingBag, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { SiteSettings } from '../store';

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
  settings: SiteSettings;
}

export function LoginPage({ onLogin, settings }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const success = onLogin(email, password);
    if (!success) {
      setError('Email atau password salah. Silakan coba lagi.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${settings.brandColor} 0%, ${settings.secondaryColor} 50%, #7c3aed 100%)` }}
      />
      {/* Decorative blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ background: settings.brandColor }} />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{ background: settings.secondaryColor }} />
      <div className="absolute top-[30%] left-[20%] w-[200px] h-[200px] rounded-full opacity-10 blur-2xl bg-white" />

      {/* Floating decorations */}
      <div className="absolute top-10 left-10 text-white/20 text-8xl select-none">🛍️</div>
      <div className="absolute bottom-10 right-10 text-white/20 text-8xl select-none">🎁</div>
      <div className="absolute top-1/2 right-10 text-white/10 text-6xl select-none">✨</div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6 text-center" style={{ background: `linear-gradient(135deg, ${settings.brandColor}15, ${settings.secondaryColor}15)` }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-3xl" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                {settings.logoEmoji}
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight mt-3" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {settings.logoText}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
          </div>

          {/* Form */}
          <div className="p-8 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Selamat Datang!</h2>
            <p className="text-gray-500 text-sm mb-6">Masuk untuk mengelola marketplace Anda</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@beli.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Ingat saya</span>
                </label>
                <span className="text-orange-500 hover:text-orange-600 cursor-pointer font-medium">Lupa Password?</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Masuk...
                  </span>
                ) : 'Masuk ke Dashboard'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs text-orange-700 font-semibold mb-1">Demo Credentials:</p>
              <p className="text-xs text-orange-600">Email: <span className="font-mono font-bold">admin@beli.com</span></p>
              <p className="text-xs text-orange-600">Password: <span className="font-mono font-bold">beli123</span></p>
            </div>
          </div>
        </div>

        <p className="text-center text-white/70 text-sm mt-6">
          © 2026 {settings.logoText} — All rights reserved
        </p>
      </div>
    </div>
  );
}
