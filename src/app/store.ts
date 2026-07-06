export type Page = 'login' | 'home' | 'admin';
export type AdminSection = 'dashboard' | 'products' | 'categories' | 'orders' | 'users' | 'homepage-settings' | 'general-settings' | 'security';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  sold: number;
  rating: number;
  image: string;
  description: string;
  featured: boolean;
  flashSale: boolean;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  productCount: number;
  active: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'buyer';
  joinDate: string;
  totalOrders: number;
  status: 'active' | 'suspended';
  avatar: string;
}

export interface SiteSettings {
  logoText: string;
  logoEmoji: string;
  brandColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCta: string;
  announcement: string;
  showAnnouncement: boolean;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagram: string;
  twitter: string;
  facebook: string;
  tiktok: string;
  freeShippingMin: number;
  currency: string;
  footerText: string;
}

export const defaultSiteSettings: SiteSettings = {
  logoText: 'BeliBeli',
  logoEmoji: '🛍️',
  brandColor: '#FF6B00',
  secondaryColor: '#FF3366',
  heroTitle: 'Belanja Apa Aja, Ada di BeliBeli!',
  heroSubtitle: 'Jutaan produk pilihan, pengiriman cepat, harga terbaik. Temukan semua yang kamu butuhkan di satu tempat.',
  heroImage: 'https://images.unsplash.com/photo-1758520387687-38a92a7ee42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  heroCta: 'Mulai Belanja',
  announcement: '🎉 Gratis Ongkir min. pembelian Rp 50.000 + Cashback 15% untuk pengguna baru!',
  showAnnouncement: true,
  siteName: 'BeliBeli',
  siteDescription: 'Marketplace terpercaya dengan jutaan produk pilihan',
  contactEmail: 'hello@belibeli.id',
  contactPhone: '+62 21 1234 5678',
  address: 'Jl. Sudirman No. 123, Jakarta Selatan',
  instagram: '@belibeliid',
  twitter: '@belibeliid',
  facebook: 'BeliBeli Indonesia',
  tiktok: '@belibeliid',
  freeShippingMin: 50000,
  currency: 'IDR',
  footerText: '© 2026 BeliBeli. Semua hak dilindungi.',
};

export const initialProducts: Product[] = [
  { id: 'p1', name: 'Kemeja Batik Premium', price: 189000, originalPrice: 250000, category: 'Fashion', stock: 120, sold: 1842, rating: 4.8, image: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'Kemeja batik premium dengan motif eksklusif, cocok untuk acara formal maupun kasual.', featured: true, flashSale: true, active: true },
  { id: 'p2', name: 'Sneakers Sport Edition', price: 459000, originalPrice: 650000, category: 'Fashion', stock: 85, sold: 923, rating: 4.7, image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'Sneakers sport dengan teknologi comfort sole, cocok untuk aktivitas sehari-hari.', featured: true, flashSale: false, active: true },
  { id: 'p3', name: 'MacBook Pro M3', price: 22999000, originalPrice: 25000000, category: 'Elektronik', stock: 15, sold: 234, rating: 4.9, image: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'MacBook Pro terbaru dengan chip M3, performa luar biasa untuk kreator profesional.', featured: true, flashSale: false, active: true },
  { id: 'p4', name: 'Headphone Wireless Pro', price: 899000, originalPrice: 1200000, category: 'Elektronik', stock: 48, sold: 567, rating: 4.6, image: 'https://images.unsplash.com/photo-1515940175183-6798529cb860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'Headphone wireless dengan noise cancelling aktif, kualitas suara premium.', featured: false, flashSale: true, active: true },
  { id: 'p5', name: 'Set Peralatan Masak Premium', price: 350000, originalPrice: 450000, category: 'Rumah Tangga', stock: 60, sold: 412, rating: 4.5, image: 'https://images.unsplash.com/photo-1674027392851-7b34f21b07ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'Set peralatan masak anti lengket dengan material food grade, aman untuk keluarga.', featured: false, flashSale: false, active: true },
  { id: 'p6', name: 'Tas Kulit Wanita Elegan', price: 525000, originalPrice: 750000, category: 'Fashion', stock: 33, sold: 678, rating: 4.7, image: 'https://images.unsplash.com/photo-1680345575812-2f6878d7d775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'Tas kulit sintetik berkualitas tinggi dengan desain elegan dan tahan lama.', featured: true, flashSale: true, active: true },
  { id: 'p7', name: 'Smartphone 5G Ultra', price: 8999000, originalPrice: 10500000, category: 'Elektronik', stock: 25, sold: 189, rating: 4.8, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'Smartphone flagship dengan kamera 200MP dan baterai 6000mAh.', featured: false, flashSale: true, active: true },
  { id: 'p8', name: 'Koleksi Baju Couple', price: 299000, originalPrice: 380000, category: 'Fashion', stock: 95, sold: 1203, rating: 4.6, image: 'https://images.unsplash.com/photo-1593519544785-fd359b7068f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', description: 'Koleksi baju couple modern dengan bahan premium, tersedia berbagai warna.', featured: false, flashSale: false, active: true },
];

export const initialCategories: Category[] = [
  { id: 'c1', name: 'Fashion', icon: '👗', color: '#FF6B6B', productCount: 45230, active: true },
  { id: 'c2', name: 'Elektronik', icon: '📱', color: '#4ECDC4', productCount: 23180, active: true },
  { id: 'c3', name: 'Rumah Tangga', icon: '🏠', color: '#45B7D1', productCount: 18920, active: true },
  { id: 'c4', name: 'Kecantikan', icon: '💄', color: '#F7DC6F', productCount: 31450, active: true },
  { id: 'c5', name: 'Olahraga', icon: '⚽', color: '#82E0AA', productCount: 12780, active: true },
  { id: 'c6', name: 'Makanan', icon: '🍜', color: '#F1948A', productCount: 28900, active: true },
  { id: 'c7', name: 'Buku', icon: '📚', color: '#AED6F1', productCount: 9340, active: true },
  { id: 'c8', name: 'Otomotif', icon: '🚗', color: '#A9DFBF', productCount: 7650, active: true },
];

export const initialOrders: Order[] = [
  { id: 'ORD-001', customerName: 'Budi Santoso', customerEmail: 'budi@email.com', products: ['Kemeja Batik Premium', 'Tas Kulit Wanita Elegan'], total: 714000, status: 'delivered', date: '2026-07-01', address: 'Jl. Melati No. 12, Jakarta' },
  { id: 'ORD-002', customerName: 'Siti Rahayu', customerEmail: 'siti@email.com', products: ['Smartphone 5G Ultra'], total: 8999000, status: 'shipped', date: '2026-07-02', address: 'Jl. Mawar No. 5, Bandung' },
  { id: 'ORD-003', customerName: 'Ahmad Fauzi', customerEmail: 'ahmad@email.com', products: ['Headphone Wireless Pro'], total: 899000, status: 'processing', date: '2026-07-03', address: 'Jl. Kenanga No. 88, Surabaya' },
  { id: 'ORD-004', customerName: 'Dewi Lestari', customerEmail: 'dewi@email.com', products: ['Sneakers Sport Edition', 'Koleksi Baju Couple'], total: 758000, status: 'pending', date: '2026-07-04', address: 'Jl. Anggrek No. 21, Medan' },
  { id: 'ORD-005', customerName: 'Rini Wulandari', customerEmail: 'rini@email.com', products: ['MacBook Pro M3'], total: 22999000, status: 'processing', date: '2026-07-03', address: 'Jl. Dahlia No. 7, Yogyakarta' },
  { id: 'ORD-006', customerName: 'Eko Prasetyo', customerEmail: 'eko@email.com', products: ['Set Peralatan Masak Premium'], total: 350000, status: 'cancelled', date: '2026-07-01', address: 'Jl. Tulip No. 33, Semarang' },
];

export const initialUsers: User[] = [
  { id: 'u1', name: 'Admin BeliBeli', email: 'admin@beli.com', role: 'admin', joinDate: '2024-01-01', totalOrders: 0, status: 'active', avatar: 'A' },
  { id: 'u2', name: 'Budi Santoso', email: 'budi@email.com', role: 'buyer', joinDate: '2025-03-15', totalOrders: 12, status: 'active', avatar: 'B' },
  { id: 'u3', name: 'Siti Rahayu', email: 'siti@email.com', role: 'seller', joinDate: '2025-05-20', totalOrders: 8, status: 'active', avatar: 'S' },
  { id: 'u4', name: 'Ahmad Fauzi', email: 'ahmad@email.com', role: 'buyer', joinDate: '2025-08-10', totalOrders: 3, status: 'active', avatar: 'A' },
  { id: 'u5', name: 'Dewi Lestari', email: 'dewi@email.com', role: 'seller', joinDate: '2025-11-05', totalOrders: 25, status: 'active', avatar: 'D' },
  { id: 'u6', name: 'Rini Wulandari', email: 'rini@email.com', role: 'buyer', joinDate: '2026-01-22', totalOrders: 1, status: 'suspended', avatar: 'R' },
];
