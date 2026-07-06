import { useState, useCallback } from 'react';
import {
  Page, Product, Category, Order, User, SiteSettings,
  defaultSiteSettings, initialProducts, initialCategories, initialOrders, initialUsers
} from './store';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { AdminPanel } from './components/admin/AdminPanel';

const ADMIN_EMAIL = 'admin@beli.com';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [password, setPassword] = useState('beli123');
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleLogin = useCallback((email: string, pass: string): boolean => {
    if (email === ADMIN_EMAIL && pass === password) {
      setPage('admin');
      return true;
    }
    return false;
  }, [password]);

  const handleLogout = () => setPage('login');

  const updateSettings = useCallback((s: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...s }));
  }, []);

  const changePassword = useCallback((newPass: string) => {
    setPassword(newPass);
  }, []);

  // Product CRUD
  const addProduct = useCallback((p: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...p, id: `p${Date.now()}` }]);
  }, []);
  const updateProduct = useCallback((id: string, p: Partial<Product>) => {
    setProducts(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
  }, []);
  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(x => x.id !== id));
  }, []);

  // Category CRUD
  const addCategory = useCallback((c: Omit<Category, 'id'>) => {
    setCategories(prev => [...prev, { ...c, id: `c${Date.now()}` }]);
  }, []);
  const updateCategory = useCallback((id: string, c: Partial<Category>) => {
    setCategories(prev => prev.map(x => x.id === id ? { ...x, ...c } : x));
  }, []);
  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(x => x.id !== id));
  }, []);

  // Order management
  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(x => x.id === id ? { ...x, status } : x));
  }, []);

  // User management
  const addUser = useCallback((u: Omit<User, 'id'>) => {
    setUsers(prev => [...prev, { ...u, id: `u${Date.now()}` }]);
  }, []);
  const updateUser = useCallback((id: string, u: Partial<User>) => {
    setUsers(prev => prev.map(x => x.id === id ? { ...x, ...u } : x));
  }, []);

  if (page === 'login') {
    return <LoginPage onLogin={handleLogin} settings={settings} />;
  }

  if (page === 'admin') {
    return (
      <AdminPanel
        products={products}
        categories={categories}
        orders={orders}
        users={users}
        settings={settings}
        password={password}
        onUpdateSettings={updateSettings}
        onChangePassword={changePassword}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
        onUpdateOrder={updateOrderStatus}
        onAddUser={addUser}
        onUpdateUser={updateUser}
        onLogout={handleLogout}
        onViewSite={() => setPage('home')}
      />
    );
  }

  return (
    <HomePage
      settings={settings}
      products={products}
      categories={categories}
      onAdminClick={() => setPage('admin')}
    />
  );
}
