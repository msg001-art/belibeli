import { TrendingUp, ShoppingBag, Users, Package, DollarSign, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Product, Order, User, SiteSettings } from '../../store';

interface DashboardProps {
  products: Product[];
  orders: Order[];
  users: User[];
  settings: SiteSettings;
}

const revenueData = [
  { month: 'Jan', revenue: 45000000, orders: 420 },
  { month: 'Feb', revenue: 52000000, orders: 480 },
  { month: 'Mar', revenue: 61000000, orders: 560 },
  { month: 'Apr', revenue: 58000000, orders: 510 },
  { month: 'Mei', revenue: 74000000, orders: 680 },
  { month: 'Jun', revenue: 82000000, orders: 760 },
  { month: 'Jul', revenue: 95000000, orders: 890 },
];

const categoryData = [
  { name: 'Fashion', value: 35, color: '#FF6B6B' },
  { name: 'Elektronik', value: 28, color: '#4ECDC4' },
  { name: 'Rumah Tangga', value: 18, color: '#45B7D1' },
  { name: 'Kecantikan', value: 12, color: '#F7DC6F' },
  { name: 'Lainnya', value: 7, color: '#A9DFBF' },
];

function formatCurrency(n: number) {
  if (n >= 1000000) return `Rp ${(n / 1000000).toFixed(1)}Jt`;
  if (n >= 1000) return `Rp ${(n / 1000).toFixed(0)}K`;
  return `Rp ${n}`;
}

export function Dashboard({ products, orders, users, settings }: DashboardProps) {
  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.filter(p => p.active).length;
  const totalUsers = users.length;

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeUsers = users.filter(u => u.status === 'active').length;

  const statCards = [
    {
      title: 'Total Pendapatan',
      value: formatCurrency(totalRevenue),
      change: '+18.5%',
      up: true,
      icon: <DollarSign className="w-6 h-6" />,
      color: settings.brandColor,
      bg: `${settings.brandColor}15`,
    },
    {
      title: 'Total Pesanan',
      value: totalOrders.toString(),
      change: '+12.3%',
      up: true,
      icon: <ShoppingBag className="w-6 h-6" />,
      color: settings.secondaryColor,
      bg: `${settings.secondaryColor}15`,
    },
    {
      title: 'Produk Aktif',
      value: totalProducts.toString(),
      change: '+5.2%',
      up: true,
      icon: <Package className="w-6 h-6" />,
      color: '#4ECDC4',
      bg: '#4ECDC415',
    },
    {
      title: 'Total Pengguna',
      value: totalUsers.toString(),
      change: '+22.1%',
      up: true,
      icon: <Users className="w-6 h-6" />,
      color: '#7c3aed',
      bg: '#7c3aed15',
    },
  ];

  const recentOrders = [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  const statusLabels: Record<string, string> = {
    pending: 'Menunggu', processing: 'Diproses', shipped: 'Dikirim', delivered: 'Diterima', cancelled: 'Dibatalkan',
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
        <div className="absolute top-0 right-0 text-white/10 text-9xl select-none leading-none">🛍️</div>
        <div className="relative z-10">
          <h2 className="text-xl font-black mb-1">Selamat Datang, Admin! 👋</h2>
          <p className="text-white/80 text-sm">Berikut ringkasan aktivitas {settings.siteName} hari ini.</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-xs text-white/70">Pesanan Menunggu</span>
              <div className="text-xl font-black">{pendingOrders}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-xs text-white/70">Pengguna Aktif</span>
              <div className="text-xl font-black">{activeUsers}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.title} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${card.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{card.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{card.title}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Tren Pendapatan</h3>
              <p className="text-xs text-gray-500">7 bulan terakhir</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" /> +18.5%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={settings.brandColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={settings.brandColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000000}Jt`} />
              <Tooltip formatter={(v: number) => [`Rp ${v.toLocaleString('id-ID')}`, 'Pendapatan']} />
              <Area type="monotone" dataKey="revenue" stroke={settings.brandColor} strokeWidth={2.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-4">Penjualan per Kategori</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, 'Porsi']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Pesanan Terbaru</h3>
          <span className="text-xs text-orange-500 font-semibold cursor-pointer hover:underline">Lihat semua</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                <th className="text-left px-5 py-3">ID Pesanan</th>
                <th className="text-left px-4 py-3">Pelanggan</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Produk</th>
                <th className="text-right px-4 py-3">Total</th>
                <th className="text-center px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={order.id} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-25'}`}>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-800 text-sm">{order.customerName}</div>
                    <div className="text-xs text-gray-400">{order.customerEmail}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-500 max-w-[200px] truncate">{order.products.join(', ')}</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900 text-sm">
                    Rp {order.total.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar chart - orders per month */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-900 mb-4">Jumlah Pesanan per Bulan</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="orders" fill={settings.secondaryColor} radius={[6, 6, 0, 0]} name="Pesanan" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
