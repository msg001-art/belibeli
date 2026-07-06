import { useState } from 'react';
import { ShoppingCart, Search, Star, Zap, ChevronRight, Heart, Bell, User, Menu, X, Shield, Truck, HeadphonesIcon, RotateCcw } from 'lucide-react';
import { Product, Category, SiteSettings } from '../store';

interface HomePageProps {
  settings: SiteSettings;
  products: Product[];
  categories: Category[];
  onAdminClick: () => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

function ProductCard({ product, brandColor, secondaryColor }: { product: Product; brandColor: string; secondaryColor: string }) {
  const [wished, setWished] = useState(false);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-orange-200 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {discount > 0 && (
          <span className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-lg" style={{ background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})` }}>
            -{discount}%
          </span>
        )}
        {product.flashSale && (
          <span className="absolute top-2 right-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            <Zap className="w-3 h-3" /> Flash
          </span>
        )}
        <button
          onClick={e => { e.stopPropagation(); setWished(!wished); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all"
        >
          <Heart className={`w-4 h-4 ${wished ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full py-2 rounded-xl text-white text-sm font-bold shadow-lg" style={{ background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})` }}>
            + Keranjang
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="text-gray-700 text-sm font-medium line-clamp-2 leading-snug mb-1">{product.name}</p>
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500">{product.rating} ({product.sold.toLocaleString()})</span>
        </div>
        <div>
          <span className="font-black text-gray-900 text-base">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-xs line-through ml-1">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function HomePage({ settings, products, categories, onAdminClick }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const activeProducts = products.filter(p => p.active);
  const flashSaleProducts = activeProducts.filter(p => p.flashSale);
  const featuredProducts = activeProducts.filter(p => p.featured);
  const activeCategories = categories.filter(c => c.active);

  const navLinks = ['Beranda', 'Promo', 'Flash Sale', 'Toko Resmi', 'Bantuan'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Announcement Bar */}
      {settings.showAnnouncement && (
        <div className="text-white text-center py-2 px-4 text-sm font-medium" style={{ background: `linear-gradient(90deg, ${settings.brandColor}, ${settings.secondaryColor}, #7c3aed)` }}>
          {settings.announcement}
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                {settings.logoEmoji}
              </div>
              <span className="text-xl font-black tracking-tight" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {settings.logoText}
              </span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl relative mx-2">
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Cari produk, brand, atau toko..."
                className="w-full pl-4 pr-12 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 rounded-lg text-white" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links - hidden on mobile */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button key={link} className="text-sm text-gray-600 hover:text-orange-500 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-all font-medium whitespace-nowrap">{link}</button>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2 ml-auto">
              <button className="relative p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: settings.secondaryColor }} />
              </button>
              <button className="relative p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: settings.secondaryColor }}>
                  {cartCount}
                </span>
              </button>
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 text-white text-sm font-bold px-3 py-2 rounded-xl transition-all hover:opacity-90 shadow"
                style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Admin</span>
              </button>
              <button className="lg:hidden p-2 text-gray-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pb-2 border-t border-gray-100 pt-3 flex flex-wrap gap-1">
              {navLinks.map(link => (
                <button key={link} className="text-sm text-gray-600 hover:text-orange-500 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-all font-medium">{link}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${settings.brandColor} 0%, ${settings.secondaryColor} 60%, #7c3aed 100%)` }}>
        <div className="absolute inset-0 opacity-20">
          <img src={settings.heroImage} alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${settings.brandColor}ee 40%, transparent)` }} />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 flex items-center gap-8">
          <div className="flex-1 text-white z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Special Deals Today!</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 drop-shadow-sm">{settings.heroTitle}</h1>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-lg leading-relaxed">{settings.heroSubtitle}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="bg-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base" style={{ color: settings.brandColor }}>
                {settings.heroCta}
              </button>
              <button className="border-2 border-white/50 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all text-base">
                Lihat Promo
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8 flex-wrap">
              {[['10Jt+', 'Produk'], ['2Jt+', 'Penjual'], ['50Jt+', 'Pembeli']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black">{num}</div>
                  <div className="text-white/75 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block flex-1 relative">
            <div className="relative">
              <img src={settings.heroImage} alt="Shopping" className="rounded-3xl shadow-2xl max-h-80 w-full object-cover" />
              {/* floating badge */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-yellow-900 rounded-2xl px-4 py-2 shadow-lg font-black text-sm">
                🔥 Diskon s/d 70%
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-xs text-gray-500">Pengiriman</div>
                <div className="font-bold text-gray-800 text-sm">Express 1 Hari</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Truck className="w-5 h-5" />, title: 'Gratis Ongkir', desc: 'Min. Rp 50.000' },
            { icon: <Shield className="w-5 h-5" />, title: 'Belanja Aman', desc: 'Proteksi BeliBeli' },
            { icon: <RotateCcw className="w-5 h-5" />, title: 'Mudah Return', desc: 'Garansi 7 Hari' },
            { icon: <HeadphonesIcon className="w-5 h-5" />, title: 'CS 24 Jam', desc: 'Siap Membantu' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${settings.brandColor}15`, color: settings.brandColor }}>
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-800">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900">Kategori Populer</h2>
            <button className="flex items-center gap-1 text-sm font-semibold hover:opacity-80" style={{ color: settings.brandColor }}>
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {activeCategories.map(cat => (
              <button key={cat.id} className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl hover:shadow-md transition-all hover:scale-105 border border-gray-100 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110" style={{ background: `${cat.color}25` }}>
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Flash Sale */}
        {flashSaleProducts.length > 0 && (
          <section>
            <div className="rounded-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${settings.brandColor}10, ${settings.secondaryColor}10)` }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-white px-3 py-1.5 rounded-lg text-sm font-black" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                    <Zap className="w-4 h-4 fill-white" />
                    FLASH SALE
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    Berakhir dalam:
                    <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded-md ml-1">02</span>
                    <span className="text-gray-800 font-bold">:</span>
                    <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded-md">34</span>
                    <span className="text-gray-800 font-bold">:</span>
                    <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded-md">15</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold hover:opacity-80" style={{ color: settings.brandColor }}>
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {flashSaleProducts.map(product => (
                  <ProductCard key={product.id} product={product} brandColor={settings.brandColor} secondaryColor={settings.secondaryColor} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-gray-900">Produk Unggulan</h2>
              <p className="text-sm text-gray-500">Pilihan terbaik untuk kamu hari ini</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold hover:opacity-80" style={{ color: settings.brandColor }}>
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} brandColor={settings.brandColor} secondaryColor={settings.secondaryColor} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900">Semua Produk</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {activeProducts.map(product => (
              <ProductCard key={product.id} product={product} brandColor={settings.brandColor} secondaryColor={settings.secondaryColor} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: `linear-gradient(135deg, ${settings.brandColor}, ${settings.secondaryColor})` }}>
                  {settings.logoEmoji}
                </div>
                <span className="text-xl font-black text-white">{settings.logoText}</span>
              </div>
              <p className="text-sm leading-relaxed">{settings.siteDescription}</p>
              <div className="flex gap-2 mt-4">
                {['📸', '🐦', '👍', '🎵'].map((icon, i) => (
                  <button key={i} className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-base transition-colors">{icon}</button>
                ))}
              </div>
            </div>
            {[
              { title: 'Layanan', links: ['Pusat Bantuan', 'Cara Belanja', 'Cara Pembayaran', 'Pengiriman'] },
              { title: 'Tentang', links: ['Tentang Kami', 'Karir', 'Blog', 'Pers'] },
              { title: 'Kontak', links: [settings.contactEmail, settings.contactPhone, settings.address] },
            ].map(section => (
              <div key={section.title}>
                <h4 className="text-white font-bold mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link}><span className="text-sm hover:text-white cursor-pointer transition-colors">{link}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm">{settings.footerText}</p>
            <div className="flex items-center gap-2">
              {['💳', '🏧', '📱', '💰'].map((icon, i) => (
                <div key={i} className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">{icon}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
