import { useState } from 'react';
import { Save, Globe, Phone, MapPin, Share2, DollarSign } from 'lucide-react';
import { SiteSettings } from '../../store';

interface GeneralSettingsProps {
  settings: SiteSettings;
  onUpdate: (s: Partial<SiteSettings>) => void;
}

export function GeneralSettings({ settings, onUpdate }: GeneralSettingsProps) {
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (label: string, key: keyof SiteSettings, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={e => setForm({ ...form, [key]: type === 'number' ? +e.target.value : e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all"
      />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Pengaturan Umum</h2>
          <p className="text-sm text-gray-500">Informasi dasar website marketplace</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold shadow hover:opacity-90 transition-all text-sm"
          style={{ background: saved ? '#10B981' : `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Tersimpan!' : 'Simpan'}
        </button>
      </div>

      {/* Site info */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center"><Globe className="w-4 h-4 text-blue-500" /></div>
          <h3 className="font-black text-gray-900">Informasi Website</h3>
        </div>
        {field('Nama Website', 'siteName')}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Website</label>
          <textarea value={form.siteDescription} onChange={e => setForm({...form, siteDescription: e.target.value})} rows={2} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all resize-none" />
        </div>
        {field('Teks Footer', 'footerText', 'text', '© 2026 BeliBeli...')}
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center"><Phone className="w-4 h-4 text-green-500" /></div>
          <h3 className="font-black text-gray-900">Informasi Kontak</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Email Kontak', 'contactEmail', 'email')}
          {field('Nomor Telepon', 'contactPhone', 'tel')}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat</label>
          <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} rows={2} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all resize-none" />
        </div>
      </div>

      {/* Social media */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center"><Share2 className="w-4 h-4 text-pink-500" /></div>
          <h3 className="font-black text-gray-900">Media Sosial</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">📸 Instagram</label>
            <input value={form.instagram} onChange={e => setForm({...form, instagram: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="@username" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">🐦 Twitter/X</label>
            <input value={form.twitter} onChange={e => setForm({...form, twitter: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="@username" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">👍 Facebook</label>
            <input value={form.facebook} onChange={e => setForm({...form, facebook: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="Nama halaman" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">🎵 TikTok</label>
            <input value={form.tiktok} onChange={e => setForm({...form, tiktok: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="@username" />
          </div>
        </div>
      </div>

      {/* Commerce settings */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center"><DollarSign className="w-4 h-4 text-orange-500" /></div>
          <h3 className="font-black text-gray-900">Pengaturan Belanja</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Minimum Gratis Ongkir (Rp)</label>
            <input type="number" value={form.freeShippingMin} onChange={e => setForm({...form, freeShippingMin: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mata Uang</label>
            <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400">
              <option value="IDR">IDR - Rupiah Indonesia</option>
              <option value="USD">USD - US Dollar</option>
              <option value="MYR">MYR - Ringgit Malaysia</option>
              <option value="SGD">SGD - Singapore Dollar</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
