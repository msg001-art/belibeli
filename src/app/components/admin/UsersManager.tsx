import { useState } from 'react';
import { Search, UserPlus, Pencil, Shield, UserX, UserCheck, X } from 'lucide-react';
import { User, SiteSettings } from '../../store';

interface UsersManagerProps {
  users: User[];
  settings: SiteSettings;
  onUpdate: (id: string, data: Partial<User>) => void;
  onAdd: (user: Omit<User, 'id'>) => void;
}

const roleColors: Record<User['role'], { bg: string; color: string; label: string }> = {
  admin: { bg: '#FEE2E2', color: '#DC2626', label: 'Admin' },
  seller: { bg: '#EFF6FF', color: '#2563EB', label: 'Penjual' },
  buyer: { bg: '#F0FDF4', color: '#16A34A', label: 'Pembeli' },
};

export function UsersManager({ users, settings, onUpdate, onAdd }: UsersManagerProps) {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<User['role'] | ''>('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<User, 'id'>>({ name: '', email: '', role: 'buyer', joinDate: new Date().toISOString().split('T')[0], totalOrders: 0, status: 'active', avatar: '' });

  const filtered = users.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (filterRole === '' || u.role === filterRole)
  );

  const handleAdd = () => {
    onAdd({ ...form, avatar: form.name.charAt(0).toUpperCase() });
    setShowModal(false);
    setForm({ name: '', email: '', role: 'buyer', joinDate: new Date().toISOString().split('T')[0], totalOrders: 0, status: 'active', avatar: '' });
  };

  const avatarColors = ['#FF6B00', '#FF3366', '#7c3aed', '#059669', '#2563EB', '#D97706'];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Manajemen Pengguna</h2>
          <p className="text-sm text-gray-500">{users.length} pengguna terdaftar</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-bold shadow hover:opacity-90 transition-all text-sm" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
          <UserPlus className="w-4 h-4" /> Tambah Pengguna
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(roleColors).map(([role, conf]) => (
          <div key={role} className="p-4 rounded-2xl" style={{ background: conf.bg }}>
            <div className="text-2xl font-black" style={{ color: conf.color }}>{users.filter(u => u.role === role as User['role']).length}</div>
            <div className="text-xs font-semibold" style={{ color: conf.color }}>{conf.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau email..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white transition-all" />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value as User['role'] | '')} className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400">
          <option value="">Semua Role</option>
          <option value="admin">Admin</option>
          <option value="seller">Penjual</option>
          <option value="buyer">Pembeli</option>
        </select>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                <th className="text-left px-5 py-3">Pengguna</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Bergabung</th>
                <th className="text-center px-4 py-3 hidden sm:table-cell">Pesanan</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const rConf = roleColors[user.role];
                const avatarBg = avatarColors[i % avatarColors.length];
                return (
                  <tr key={user.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: avatarBg }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: rConf.bg, color: rConf.color }}>{rConf.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{user.joinDate}</td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-gray-700 hidden sm:table-cell">{user.totalOrders}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.status === 'active' ? 'Aktif' : 'Suspend'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => onUpdate(user.id, { role: user.role === 'buyer' ? 'seller' : 'buyer' })}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all"
                            title="Ganti role"
                          >
                            <Shield className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => onUpdate(user.id, { status: user.status === 'active' ? 'suspended' : 'active' })}
                          className={`p-1.5 rounded-lg transition-all ${user.status === 'active' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-green-500 hover:bg-green-100'}`}
                          title={user.status === 'active' ? 'Suspend' : 'Aktifkan'}
                        >
                          {user.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="font-semibold">Tidak ada pengguna ditemukan</p>
          </div>
        )}
      </div>

      {/* Add modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Tambah Pengguna</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="Nama lengkap..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400 transition-all" placeholder="email@domain.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value as User['role']})} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-orange-400">
                  <option value="buyer">Pembeli</option>
                  <option value="seller">Penjual</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 p-5 pt-0">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50">Batal</button>
              <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl text-white font-bold hover:opacity-90 shadow" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
