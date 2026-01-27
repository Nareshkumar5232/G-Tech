import { useState } from 'react';
import { Toaster } from '@/app/components/ui/sonner';
import { Header } from './components/Header';
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

  // Determine if header and footer should be shown
  const showHeaderFooter = !['login', 'register'].includes(currentPage);

  return (
    <div className="flex flex-col min-h-screen m-0 p-0">
      {showHeaderFooter && <Header currentPage={currentPage} onNavigate={handleNavigate} key={forceUpdate} />}

      <main className="flex-1 m-0 p-0">
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

      {showHeaderFooter && <Footer />}

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
