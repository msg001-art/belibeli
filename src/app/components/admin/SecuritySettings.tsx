import { useState } from 'react';
import { Eye, EyeOff, Shield, Key, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { SiteSettings } from '../../store';

interface SecuritySettingsProps {
  currentPassword: string;
  settings: SiteSettings;
  onChangePassword: (newPassword: string) => void;
}

export function SecuritySettings({ currentPassword, settings, onChangePassword }: SecuritySettingsProps) {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const requirements = [
    { label: 'Minimal 6 karakter', met: form.newPass.length >= 6 },
    { label: 'Mengandung huruf', met: /[a-zA-Z]/.test(form.newPass) },
    { label: 'Mengandung angka', met: /[0-9]/.test(form.newPass) },
    { label: 'Password cocok', met: form.newPass === form.confirm && form.confirm.length > 0 },
  ];

  const strength = requirements.filter(r => r.met).length;
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
  const strengthLabels = ['Sangat Lemah', 'Lemah', 'Sedang', 'Kuat'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult('idle');
    setErrorMsg('');

    if (form.current !== currentPassword) {
      setResult('error');
      setErrorMsg('Password saat ini tidak sesuai.');
      return;
    }
    if (form.newPass.length < 6) {
      setResult('error');
      setErrorMsg('Password baru minimal 6 karakter.');
      return;
    }
    if (form.newPass !== form.confirm) {
      setResult('error');
      setErrorMsg('Konfirmasi password tidak cocok.');
      return;
    }
    onChangePassword(form.newPass);
    setResult('success');
    setForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setResult('idle'), 4000);
  };

  const PassField = ({ label, value, field, showKey }: { label: string; value: string; field: keyof typeof form; showKey: keyof typeof show }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show[showKey] ? 'text' : 'password'}
          value={value}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white transition-all pr-12"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShow({ ...show, [showKey]: !show[showKey] })}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show[showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h2 className="text-xl font-black text-gray-900">Keamanan Akun</h2>
        <p className="text-sm text-gray-500">Kelola password dan keamanan akun admin</p>
      </div>

      {/* Current user info */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl text-white font-black flex-shrink-0" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
            A
          </div>
          <div>
            <h3 className="font-black text-gray-900">Admin BeliBeli</h3>
            <p className="text-sm text-gray-500">admin@beli.com</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-semibold text-green-600">Super Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
            <Key className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="font-black text-gray-900">Ganti Password</h3>
        </div>

        {result === 'success' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700 text-sm font-semibold">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            Password berhasil diubah!
          </div>
        )}
        {result === 'error' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PassField label="Password Saat Ini" value={form.current} field="current" showKey="current" />
          <PassField label="Password Baru" value={form.newPass} field="newPass" showKey="new" />

          {/* Strength meter */}
          {form.newPass.length > 0 && (
            <div>
              <div className="flex gap-1 mb-1.5">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < strength ? strengthColors[strength - 1] : 'bg-gray-200'}`} />
                ))}
              </div>
              <p className="text-xs text-gray-500">{strengthLabels[strength - 1] || 'Terlalu pendek'}</p>
            </div>
          )}

          <PassField label="Konfirmasi Password Baru" value={form.confirm} field="confirm" showKey="confirm" />

          {/* Requirements */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-600 mb-2">Persyaratan password:</p>
            {requirements.map(req => (
              <div key={req.label} className={`flex items-center gap-2 text-xs ${req.met ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${req.met ? 'bg-green-100' : 'bg-gray-200'}`}>
                  {req.met ? <CheckCircle className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                </div>
                {req.label}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-bold shadow hover:opacity-90 transition-all flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}
          >
            <Lock className="w-4 h-4" />
            Ubah Password
          </button>
        </form>
      </div>

      {/* Security tips */}
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-blue-900">Tips Keamanan</h3>
        </div>
        <ul className="space-y-2 text-sm text-blue-700">
          {[
            'Gunakan password yang unik dan tidak mudah ditebak',
            'Jangan bagikan password kepada siapapun',
            'Ganti password secara berkala setiap 3 bulan',
            'Gunakan kombinasi huruf, angka, dan simbol',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
