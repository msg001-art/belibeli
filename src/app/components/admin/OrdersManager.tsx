import { useState } from 'react';
import { Search, ChevronDown, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Order, SiteSettings } from '../../store';

interface OrdersManagerProps {
  orders: Order[];
  settings: SiteSettings;
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const statusConfig: Record<Order['status'], { label: string; color: string; bg: string; icon: JSX.Element }> = {
  pending: { label: 'Menunggu', color: '#D97706', bg: '#FEF3C7', icon: <Clock className="w-4 h-4" /> },
  processing: { label: 'Diproses', color: '#2563EB', bg: '#EFF6FF', icon: <Package className="w-4 h-4" /> },
  shipped: { label: 'Dikirim', color: '#7C3AED', bg: '#F5F3FF', icon: <Truck className="w-4 h-4" /> },
  delivered: { label: 'Diterima', color: '#059669', bg: '#ECFDF5', icon: <CheckCircle className="w-4 h-4" /> },
  cancelled: { label: 'Dibatalkan', color: '#DC2626', bg: '#FEF2F2', icon: <XCircle className="w-4 h-4" /> },
};

const statusFlow: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];

export function OrdersManager({ orders, settings, onUpdateStatus }: OrdersManagerProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Order['status'] | ''>('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filtered = orders.filter(o =>
    (o.customerName.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus === '' || o.status === filterStatus)
  );

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-gray-900">Manajemen Pesanan</h2>
        <p className="text-sm text-gray-500">{orders.length} total pesanan</p>
      </div>

      {/* Status stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(Object.entries(statusConfig) as [Order['status'], typeof statusConfig[Order['status']]][]).map(([status, conf]) => (
          <button
            key={status}
            onClick={() => setFilterStatus(filterStatus === status ? '' : status)}
            className={`p-3 rounded-2xl text-left transition-all border-2 ${filterStatus === status ? 'border-orange-400 shadow-md' : 'border-transparent'}`}
            style={{ background: conf.bg }}
          >
            <div className="flex items-center gap-2 mb-1" style={{ color: conf.color }}>
              {conf.icon}
              <span className="text-xs font-bold">{conf.label}</span>
            </div>
            <div className="text-2xl font-black" style={{ color: conf.color }}>{stats[status]}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari pesanan atau nama pelanggan..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white transition-all" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as Order['status'] | '')} className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400">
          <option value="">Semua Status</option>
          {Object.entries(statusConfig).map(([s, c]) => <option key={s} value={s}>{c.label}</option>)}
        </select>
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map(order => {
          const conf = statusConfig[order.status];
          const isExpanded = expandedOrder === order.id;
          const currentIdx = statusFlow.indexOf(order.status);

          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: conf.bg, color: conf.color }}>
                    {conf.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-gray-900 text-sm">{order.customerName}</span>
                      <span className="text-xs text-gray-400 font-mono">{order.id}</span>
                    </div>
                    <div className="text-xs text-gray-500">{order.date} • {order.products.length} produk</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-black text-gray-900">Rp {order.total.toLocaleString('id-ID')}</div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ color: conf.color, background: conf.bg }}>{conf.label}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Pelanggan</p>
                      <p className="font-bold text-gray-800">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Alamat Pengiriman</p>
                      <p className="text-sm text-gray-700">{order.address}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Produk</p>
                    <div className="space-y-1">
                      {order.products.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-xl">
                          <Package className="w-3.5 h-3.5 text-gray-400" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress tracker */}
                  {order.status !== 'cancelled' && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-3">Progress Pesanan</p>
                      <div className="flex items-center gap-0">
                        {statusFlow.map((s, idx) => {
                          const isDone = idx <= currentIdx;
                          const sConf = statusConfig[s];
                          return (
                            <div key={s} className="flex items-center flex-1">
                              <div className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all ${isDone ? '' : 'bg-gray-200'}`} style={isDone ? { background: settings.brandColor } : {}}>
                                  {isDone ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{sConf.label}</span>
                              </div>
                              {idx < statusFlow.length - 1 && (
                                <div className={`flex-1 h-0.5 mb-4 transition-all ${idx < currentIdx ? '' : 'bg-gray-200'}`} style={idx < currentIdx ? { background: settings.brandColor } : {}} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Status actions */}
                  <div className="flex flex-wrap gap-2">
                    <p className="text-xs font-semibold text-gray-500 w-full">Ubah Status:</p>
                    {(Object.entries(statusConfig) as [Order['status'], typeof statusConfig[Order['status']]][]).map(([s, c]) => (
                      <button
                        key={s}
                        onClick={() => onUpdateStatus(order.id, s)}
                        disabled={s === order.status}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${s === order.status ? 'border-transparent cursor-default' : 'border-transparent hover:scale-105'}`}
                        style={s === order.status ? { background: c.bg, color: c.color, borderColor: c.color } : { background: c.bg, color: c.color }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">Tidak ada pesanan ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
