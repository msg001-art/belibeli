import { useState } from 'react';
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Users, Layout, Settings, Shield, LogOut, Menu, X, ChevronRight, Bell
} from 'lucide-react';
import { AdminSection, Product, Category, Order, User, SiteSettings } from '../../store';
import { Dashboard } from './Dashboard';
import { ProductsManager } from './ProductsManager';
import { CategoriesManager } from './CategoriesManager';
import { OrdersManager } from './OrdersManager';
import { UsersManager } from './UsersManager';
import { HomepageSettings } from './HomepageSettings';
import { GeneralSettings } from './GeneralSettings';
import { SecuritySettings } from './SecuritySettings';

interface AdminPanelProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  users: User[];
  settings: SiteSettings;
  password: string;
  onUpdateSettings: (s: Partial<SiteSettings>) => void;
  onChangePassword: (p: string) => void;
  onAddProduct: (p: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, p: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onAddCategory: (c: Omit<Category, 'id'>) => void;
  onUpdateCategory: (id: string, c: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateOrder: (id: string, status: Order['status']) => void;
  onAddUser: (u: Omit<User, 'id'>) => void;
  onUpdateUser: (id: string, u: Partial<User>) => void;
  onLogout: () => void;
  onViewSite: () => void;
}

const navItems: { key: AdminSection; label: string; icon: JSX.Element; group: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, group: 'main' },
  { key: 'products', label: 'Produk', icon: <Package className="w-5 h-5" />, group: 'katalog' },
  { key: 'categories', label: 'Kategori', icon: <Tag className="w-5 h-5" />, group: 'katalog' },
  { key: 'orders', label: 'Pesanan', icon: <ShoppingCart className="w-5 h-5" />, group: 'transaksi' },
  { key: 'users', label: 'Pengguna', icon: <Users className="w-5 h-5" />, group: 'transaksi' },
  { key: 'homepage-settings', label: 'Homepage', icon: <Layout className="w-5 h-5" />, group: 'setting' },
  { key: 'general-settings', label: 'Pengaturan', icon: <Settings className="w-5 h-5" />, group: 'setting' },
  { key: 'security', label: 'Keamanan', icon: <Shield className="w-5 h-5" />, group: 'setting' },
];

const groupLabels: Record<string, string> = { main: 'Utama', katalog: 'Katalog', transaksi: 'Transaksi', setting: 'Pengaturan' };

export function AdminPanel(props: AdminPanelProps) {
  const { settings, onLogout, onViewSite } = props;
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingOrders = props.orders.filter(o => o.status === 'pending').length;

  const groups = ['main', 'katalog', 'transaksi', 'setting'];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : ''}`}>
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white/20 backdrop-blur-sm">
            {settings.logoEmoji}
          </div>
          <div>
            <div className="text-white font-black text-lg leading-none">{settings.logoText}</div>
            <div className="text-white/60 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {groups.map(group => {
          const items = navItems.filter(n => n.group === group);
          return (
            <div key={group} className="mb-3">
              <p className="text-white/40 text-xs font-bold uppercase tracking-wider px-3 py-2">{groupLabels[group]}</p>
              {items.map(item => {
                const isActive = section === item.key;
                const hasBadge = item.key === 'orders' && pendingOrders > 0;
                return (
                  <button
                    key={item.key}
                    onClick={() => { setSection(item.key); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-0.5 ${isActive ? 'bg-white text-gray-900 shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span className={isActive ? '' : 'opacity-70'}>{item.icon}</span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {hasBadge && (
                      <span className="w-5 h-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center font-black">{pendingOrders}</span>
                    )}
                    {isActive && <ChevronRight className="w-4 h-4 opacity-40" />}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button onClick={onViewSite} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm font-semibold">
          <Layout className="w-5 h-5 opacity-70" />
          Lihat Website
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all text-sm font-semibold">
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );

  const sectionTitle: Record<AdminSection, string> = {
    dashboard: 'Dashboard',
    products: 'Manajemen Produk',
    categories: 'Manajemen Kategori',
    orders: 'Manajemen Pesanan',
    users: 'Manajemen Pengguna',
    'homepage-settings': 'Pengaturan Homepage',
    'general-settings': 'Pengaturan Umum',
    security: 'Keamanan',
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0 text-white" style={{ background: `linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)` }}>
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 flex flex-col text-white shadow-2xl" style={{ background: `linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)` }}>
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-500">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-black text-gray-900 text-lg leading-none">{sectionTitle[section]}</h1>
            <p className="text-xs text-gray-500">{settings.siteName} • Admin Panel</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              {pendingOrders > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />}
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900">Admin</div>
                <div className="text-xs text-gray-400">admin@beli.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {section === 'dashboard' && (
            <Dashboard products={props.products} orders={props.orders} users={props.users} settings={settings} />
          )}
          {section === 'products' && (
            <ProductsManager products={props.products} categories={props.categories} settings={settings} onAdd={props.onAddProduct} onUpdate={props.onUpdateProduct} onDelete={props.onDeleteProduct} />
          )}
          {section === 'categories' && (
            <CategoriesManager categories={props.categories} settings={settings} onAdd={props.onAddCategory} onUpdate={props.onUpdateCategory} onDelete={props.onDeleteCategory} />
          )}
          {section === 'orders' && (
            <OrdersManager orders={props.orders} settings={settings} onUpdateStatus={props.onUpdateOrder} />
          )}
          {section === 'users' && (
            <UsersManager users={props.users} settings={settings} onUpdate={props.onUpdateUser} onAdd={props.onAddUser} />
          )}
          {section === 'homepage-settings' && (
            <HomepageSettings settings={settings} onUpdate={props.onUpdateSettings} />
          )}
          {section === 'general-settings' && (
            <GeneralSettings settings={settings} onUpdate={props.onUpdateSettings} />
          )}
          {section === 'security' && (
            <SecuritySettings currentPassword={props.password} settings={settings} onChangePassword={props.onChangePassword} />
          )}
        </div>
      </div>
    </div>
  );
}
