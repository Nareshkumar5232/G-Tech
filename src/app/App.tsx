import { useState } from 'react';
import { Toaster } from '@/app/components/ui/sonner';
import { MessageCircle } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductListPage } from './components/ProductListPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ContactPage } from './components/ContactPage';
import { MyOrdersPage } from './components/MyOrdersPage';
import { OrderDialog } from './components/OrderDialog';
import { getCurrentUser, createOrder } from '@/lib/store';
import type { Product, Address } from '@/types';
import { toast } from 'sonner';

type Page =
  | 'home'
  | 'all-products'
  | 'new-laptops'
  | 'used-laptops'
  | 'accessories'
  | 'networking-cctv'
  | 'contact'
  | 'login'
  | 'register'
  | 'my-orders';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(280);

  // Handle navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle order button click
  const handleOrderClick = (product: Product) => {
    const user = getCurrentUser();
    
    if (!user) {
      toast.error('Please login to place an order');
      setCurrentPage('login');
      return;
    }

    setSelectedProduct(product);
    setOrderDialogOpen(true);
  };

  // Handle order confirmation
  const handleOrderConfirm = (quantity: number, address: Address) => {
    const user = getCurrentUser();
    
    if (!user || !selectedProduct) return;

    createOrder(user, selectedProduct, quantity, address);
    
    toast.success('Order placed successfully! Check "My Orders" for details.');
    setOrderDialogOpen(false);
    setSelectedProduct(null);
    
    // Force re-render to update pending orders count
    setForceUpdate(prev => prev + 1);
  };

  // Handle successful login/register
  const handleAuthSuccess = () => {
    setForceUpdate(prev => prev + 1);
  };

  // Determine if sidebar and footer should be shown
  const showSidebarFooter = !['login', 'register'].includes(currentPage);

  return (
    <div className="min-h-screen m-0 p-0 bg-gray-50">
      {showSidebarFooter && (
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          onWidthChange={setSidebarWidth}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
          key={forceUpdate} 
        />
      )}

      <div 
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{
          marginLeft: showSidebarFooter ? `${sidebarWidth}px` : '0',
        }}
      >
        <style>{`
          @media (max-width: 1023px) {
            .flex.flex-col.min-h-screen {
              margin-left: 0 !important;
            }
          }
        `}</style>
        {showSidebarFooter && <TopBar currentPage={currentPage} onNavigate={handleNavigate} onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} key={forceUpdate} />}
        
        <main className="flex-1">
        {/* Home Page */}
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOrderClick={handleOrderClick} />
        )}

        {/* All Products Page */}
        {currentPage === 'all-products' && (
          <ProductListPage onOrderClick={handleOrderClick} />
        )}

        {/* Product Category Pages */}
        {currentPage === 'new-laptops' && (
          <ProductListPage category="New Laptops" onOrderClick={handleOrderClick} />
        )}
        {currentPage === 'used-laptops' && (
          <ProductListPage category="Used Laptops" onOrderClick={handleOrderClick} />
        )}
        {currentPage === 'accessories' && (
          <ProductListPage category="Accessories" onOrderClick={handleOrderClick} />
        )}
        {currentPage === 'networking-cctv' && (
          <ProductListPage category="Networking & CCTV" onOrderClick={handleOrderClick} />
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && <ContactPage />}

        {/* Auth Pages */}
        {currentPage === 'login' && (
          <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleAuthSuccess} />
        )}
        {currentPage === 'register' && (
          <RegisterPage onNavigate={handleNavigate} onRegisterSuccess={handleAuthSuccess} />
        )}

        {/* User Pages */}
        {currentPage === 'my-orders' && <MyOrdersPage />}
      </main>

      {showSidebarFooter && <Footer />}
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919342798344"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      </a>

      {/* Order Dialog */}
      <OrderDialog
        product={selectedProduct}
        open={orderDialogOpen}
        onClose={() => {
          setOrderDialogOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleOrderConfirm}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
    </div>
  );
}
