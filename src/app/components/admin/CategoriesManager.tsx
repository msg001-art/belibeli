import { useState } from 'react';
import { Plus, Pencil, Trash2, Tag, X } from 'lucide-react';
import { Category, SiteSettings } from '../../store';

interface CategoriesManagerProps {
  categories: Category[];
  settings: SiteSettings;
  onAdd: (cat: Omit<Category, 'id'>) => void;
  onUpdate: (id: string, cat: Partial<Category>) => void;
  onDelete: (id: string) => void;
}

const emojiOptions = ['👗', '📱', '🏠', '💄', '⚽', '🍜', '📚', '🚗', '💻', '🎮', '👟', '🛋️', '🎵', '🌿', '🐾', '🎨'];
const colorOptions = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#82E0AA', '#F1948A', '#AED6F1', '#A9DFBF', '#D7BDE2', '#FAD7A0', '#A3E4D7', '#F9E79F'];

export function CategoriesManager({ categories, settings, onAdd, onUpdate, onDelete }: CategoriesManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [form, setForm] = useState<Omit<Category, 'id'>>({ name: '', icon: '📦', color: '#FF6B6B', productCount: 0, active: true });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => { setForm({ name: '', icon: '📦', color: '#FF6B6B', productCount: 0, active: true }); setEditingCat(null); setShowModal(true); };
  const openEdit = (cat: Category) => { setForm({ ...cat }); setEditingCat(cat); setShowModal(true); };

  const handleSave = () => {
    if (editingCat) onUpdate(editingCat.id, form);
    else onAdd(form);
    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Manajemen Kategori</h2>
          <p className="text-sm text-gray-500">{categories.length} kategori terdaftar</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-bold shadow hover:opacity-90 transition-all text-sm" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
          <Plus className="w-4 h-4" /> Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${cat.color}25` }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-black text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.productCount.toLocaleString('id-ID')} produk</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${cat.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {cat.active ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-4 h-4 rounded-full" style={{ background: cat.color }} />
              <span className="text-xs text-gray-500 font-mono">{cat.color}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(cat)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-orange-200 text-orange-500 hover:bg-orange-50 transition-all text-xs font-bold">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => onUpdate(cat.id, { active: !cat.active })}
                className={`flex-1 py-2 rounded-xl border-2 text-xs font-bold transition-all ${cat.active ? 'border-gray-200 text-gray-500 hover:bg-gray-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
              >
                {cat.active ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
              <button onClick={() => setDeleteConfirm(cat.id)} className="p-2 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-lg font-black text-gray-900 text-center mb-2">Hapus Kategori?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Semua produk di kategori ini tidak akan terpengaruh.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50">Batal</button>
              <button onClick={() => { onDelete(deleteConfirm); setDeleteConfirm(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-black text-gray-900">{editingCat ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Preview */}
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ background: `${form.color}25` }}>
                    {form.icon}
                  </div>
                  <span className="font-bold text-gray-800">{form.name || 'Nama Kategori'}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Kategori</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="Nama kategori..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Ikon</label>
                <div className="grid grid-cols-8 gap-2">
                  {emojiOptions.map(emoji => (
                    <button key={emoji} onClick={() => setForm({...form, icon: emoji})} className={`text-2xl p-2 rounded-xl transition-all hover:scale-110 ${form.icon === emoji ? 'ring-2 ring-orange-400 bg-orange-50' : 'hover:bg-gray-100'}`}>
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Warna Tema</label>
                <div className="grid grid-cols-6 gap-2">
                  {colorOptions.map(color => (
                    <button key={color} onClick={() => setForm({...form, color})} className={`w-10 h-10 rounded-xl transition-all hover:scale-110 ${form.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`} style={{ background: color }} />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Jumlah Produk</label>
                <input type="number" value={form.productCount} onChange={e => setForm({...form, productCount: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl">
                <div className={`w-12 h-6 rounded-full transition-all relative ${form.active ? '' : 'bg-gray-300'}`} style={form.active ? { background: settings.brandColor } : {}} onClick={() => setForm({...form, active: !form.active})}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.active ? 'left-6' : 'left-0.5'}`} />
                </div>
                <span className="text-sm font-semibold text-gray-700">Aktifkan Kategori</span>
              </label>
            </div>
            <div className="flex gap-3 p-5 pt-0">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-white font-bold hover:opacity-90 shadow" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                {editingCat ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
