import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Star, Zap, X, Check, Package } from 'lucide-react';
import { Product, SiteSettings } from '../../store';

interface ProductsManagerProps {
  products: Product[];
  categories: { id: string; name: string }[];
  settings: SiteSettings;
  onAdd: (product: Omit<Product, 'id'>) => void;
  onUpdate: (id: string, product: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const emptyProduct: Omit<Product, 'id'> = {
  name: '', price: 0, originalPrice: 0, category: 'Fashion', stock: 0, sold: 0,
  rating: 4.5, image: '', description: '', featured: false, flashSale: false, active: true,
};

export function ProductsManager({ products, categories, settings, onAdd, onUpdate, onDelete }: ProductsManagerProps) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())) &&
    (filterCat === '' || p.category === filterCat)
  );

  const openAdd = () => { setForm(emptyProduct); setEditingProduct(null); setShowModal(true); };
  const openEdit = (p: Product) => { setForm({ ...p }); setEditingProduct(p); setShowModal(true); };

  const handleSave = () => {
    if (editingProduct) onUpdate(editingProduct.id, form);
    else onAdd(form);
    setShowModal(false);
  };

  const statusColors: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-700', processing: 'bg-blue-100 text-blue-700', active: 'bg-green-100 text-green-700', inactive: 'bg-red-100 text-red-700' };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Manajemen Produk</h2>
          <p className="text-sm text-gray-500">{products.length} total produk</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-bold shadow hover:opacity-90 transition-all text-sm"
          style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}
        >
          <Plus className="w-4 h-4" /> Tambah Produk
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white transition-all" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 transition-all">
          <option value="">Semua Kategori</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {/* Product grid cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
            <div className="relative aspect-video bg-gray-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex gap-1">
                {product.flashSale && <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><Zap className="w-3 h-3" />Flash</span>}
                {product.featured && <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-md">⭐ Unggulan</span>}
              </div>
              <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-md ${product.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.active ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <div className="p-4">
              <p className="font-bold text-gray-900 text-sm line-clamp-1">{product.name}</p>
              <p className="text-xs text-gray-500 mb-2">{product.category}</p>
              <div className="flex items-center gap-3 mb-3">
                <div>
                  <span className="font-black text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-gray-400 text-xs line-through ml-1">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{product.rating}</span>
                <span>Stok: {product.stock}</span>
                <span>Terjual: {product.sold}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(product)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-orange-200 text-orange-500 hover:bg-orange-50 transition-all text-xs font-bold">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => onUpdate(product.id, { active: !product.active })}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 transition-all text-xs font-bold ${product.active ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-green-200 text-green-500 hover:bg-green-50'}`}
                >
                  {product.active ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <button onClick={() => setDeleteConfirm(product.id)} className="p-2 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Tidak ada produk ditemukan</p>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-lg font-black text-gray-900 text-center mb-2">Hapus Produk?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all">Batal</button>
              <button onClick={() => { onDelete(deleteConfirm); setDeleteConfirm(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-black text-gray-900">{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Produk</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="Masukkan nama produk" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Harga (Rp)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Harga Asli (Rp)</label>
                  <input type="number" value={form.originalPrice || ''} onChange={e => setForm({...form, originalPrice: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Stok</label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: +e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL Gambar</label>
                <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all resize-none" />
              </div>
              <div className="flex gap-4">
                {[
                  { key: 'featured', label: 'Produk Unggulan' },
                  { key: 'flashSale', label: 'Flash Sale' },
                  { key: 'active', label: 'Aktif' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form[key as keyof typeof form] ? 'border-orange-500' : 'border-gray-300'}`}
                      style={form[key as keyof typeof form] ? { background: settings.brandColor, borderColor: settings.brandColor } : {}}
                      onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
                    >
                      {form[key as keyof typeof form] && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 p-5 pt-0">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all">Batal</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-white font-bold hover:opacity-90 transition-all shadow" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
