import { useState } from 'react';
import { Save, Eye, Palette, Layout, Megaphone } from 'lucide-react';
import { SiteSettings } from '../../store';

interface HomepageSettingsProps {
  settings: SiteSettings;
  onUpdate: (settings: Partial<SiteSettings>) => void;
}

const gradientPresets = [
  { name: 'BeliBeli Orange', brand: '#FF6B00', secondary: '#FF3366' },
  { name: 'Ocean Blue', brand: '#0EA5E9', secondary: '#6366F1' },
  { name: 'Forest Green', brand: '#10B981', secondary: '#06B6D4' },
  { name: 'Royal Purple', brand: '#7C3AED', secondary: '#EC4899' },
  { name: 'Sunset Gold', brand: '#F59E0B', secondary: '#EF4444' },
  { name: 'Rose Pink', brand: '#F43F5E', secondary: '#A855F7' },
];

const heroImageOptions = [
  { label: 'Belanja Wanita', url: 'https://images.unsplash.com/photo-1758520387687-38a92a7ee42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
  { label: 'Fashion', url: 'https://images.unsplash.com/photo-1541537806773-cd2c2a215cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
  { label: 'Elektronik', url: 'https://images.unsplash.com/photo-1426024084828-5da21e13f5dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
  { label: 'Marketplace', url: 'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
];

export function HomepageSettings({ settings, onUpdate }: HomepageSettingsProps) {
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'branding' | 'hero' | 'announcement'>('branding');

  const handleSave = () => {
    onUpdate(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: 'branding', label: 'Branding & Logo', icon: <Palette className="w-4 h-4" /> },
    { key: 'hero', label: 'Hero Banner', icon: <Layout className="w-4 h-4" /> },
    { key: 'announcement', label: 'Pengumuman', icon: <Megaphone className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Pengaturan Homepage</h2>
          <p className="text-sm text-gray-500">Kustomisasi tampilan halaman utama</p>
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

      {/* Preview mini */}
      <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm">
        <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-2 py-1 text-xs text-gray-400">belibeli.id</div>
          <Eye className="w-4 h-4 text-gray-400" />
        </div>
        <div className="relative h-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${form.brandColor}, ${form.secondaryColor})` }}>
          <div className="p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(255,255,255,0.3)' }}>
                {form.logoEmoji}
              </div>
              <span className="font-black text-base">{form.logoText}</span>
            </div>
            <p className="text-xs text-white/90 font-bold line-clamp-1">{form.heroTitle}</p>
            <p className="text-xs text-white/70 line-clamp-1 mt-0.5">{form.heroSubtitle}</p>
          </div>
        </div>
        {form.showAnnouncement && (
          <div className="text-white text-xs text-center py-1.5 font-medium" style={{ background: `linear-gradient(90deg, ${form.brandColor}, ${form.secondaryColor})` }}>
            {form.announcement}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Branding tab */}
      {activeTab === 'branding' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-black text-gray-900">Logo & Brand</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Brand</label>
                <input value={form.logoText} onChange={e => setForm({...form, logoText: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Logo Emoji / Ikon</label>
                <input value={form.logoEmoji} onChange={e => setForm({...form, logoEmoji: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
                <p className="text-xs text-gray-400 mt-1">Salin emoji dari keyboard atau website emoji</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Preset Tema Warna</label>
              <div className="grid grid-cols-3 gap-2">
                {gradientPresets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => setForm({...form, brandColor: preset.brand, secondaryColor: preset.secondary})}
                    className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${form.brandColor === preset.brand ? 'border-gray-800 shadow-md' : 'border-transparent'}`}
                  >
                    <div className="h-8 rounded-lg mb-2" style={{ background: `linear-gradient(135deg, ${preset.brand}, ${preset.secondary})` }} />
                    <p className="text-xs font-semibold text-gray-700 text-center">{preset.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Warna Primer</label>
                <div className="flex gap-2">
                  <input type="color" value={form.brandColor} onChange={e => setForm({...form, brandColor: e.target.value})} className="h-10 w-16 rounded-xl border-2 border-gray-200 cursor-pointer" />
                  <input value={form.brandColor} onChange={e => setForm({...form, brandColor: e.target.value})} className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Warna Sekunder</label>
                <div className="flex gap-2">
                  <input type="color" value={form.secondaryColor} onChange={e => setForm({...form, secondaryColor: e.target.value})} className="h-10 w-16 rounded-xl border-2 border-gray-200 cursor-pointer" />
                  <input value={form.secondaryColor} onChange={e => setForm({...form, secondaryColor: e.target.value})} className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 font-mono" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero tab */}
      {activeTab === 'hero' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-black text-gray-900">Konten Hero Banner</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Utama</label>
              <input value={form.heroTitle} onChange={e => setForm({...form, heroTitle: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle / Deskripsi</label>
              <textarea value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Teks Tombol CTA</label>
              <input value={form.heroCta} onChange={e => setForm({...form, heroCta: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-black text-gray-900">Gambar Hero</h3>
            <div className="grid grid-cols-2 gap-3">
              {heroImageOptions.map(img => (
                <button
                  key={img.url}
                  onClick={() => setForm({...form, heroImage: img.url})}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${form.heroImage === img.url ? 'border-orange-400 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-24 object-cover" />
                  <div className="py-1.5 text-xs font-semibold text-gray-700 bg-gray-50">{img.label}</div>
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Atau masukkan URL gambar sendiri</label>
              <input value={form.heroImage} onChange={e => setForm({...form, heroImage: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="https://..." />
            </div>
          </div>
        </div>
      )}

      {/* Announcement tab */}
      {activeTab === 'announcement' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-black text-gray-900">Banner Pengumuman</h3>
          <label className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-800">Tampilkan Pengumuman</p>
              <p className="text-xs text-gray-500">Banner di bagian atas halaman</p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-all relative ${form.showAnnouncement ? '' : 'bg-gray-300'}`} style={form.showAnnouncement ? { background: settings.brandColor } : {}} onClick={() => setForm({...form, showAnnouncement: !form.showAnnouncement})}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.showAnnouncement ? 'left-6' : 'left-0.5'}`} />
            </div>
          </label>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Teks Pengumuman</label>
            <textarea value={form.announcement} onChange={e => setForm({...form, announcement: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all resize-none" placeholder="Masukkan teks pengumuman... (Emoji didukung 🎉)" />
          </div>
          <div className="rounded-xl p-3 text-white text-sm text-center font-medium" style={{ background: `linear-gradient(90deg, ${form.brandColor}, ${form.secondaryColor})` }}>
            Preview: {form.announcement || '(Kosong)'}
          </div>
        </div>
      )}
    </div>
  );
}
