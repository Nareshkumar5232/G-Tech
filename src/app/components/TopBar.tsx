import { useState, useEffect } from 'react';
import { Search, Bell, User, ShoppingBag, Menu, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { getCurrentUser } from '@/lib/store';
import type { User as UserType } from '@/types';

interface TopBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onMobileMenuToggle?: () => void;
}

export function TopBar({ currentPage, onNavigate, onMobileMenuToggle }: TopBarProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [currentPage]);

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'home': 'Our Services',
      'all-products': 'All Products',
      'new-laptops': 'New Laptops',
      'used-laptops': 'Used Laptops',
      'accessories': 'Accessories',
      'networking-cctv': 'Networking & CCTV',
      'contact': 'Contact Us',
      'my-orders': 'My Orders',
      'cart': 'My Cart',
      'login': 'Login',
      'register': 'Register',
    };
    return titles[currentPage] || 'Saturn Systems';
  };

  const handleBackClick = () => {
    // Navigate to home page or use browser back
    if (currentPage === 'login' || currentPage === 'register') {
      onNavigate('home');
    } else if (currentPage === 'my-orders' || currentPage === 'cart') {
      onNavigate('home');
    } else if (currentPage === 'contact') {
      onNavigate('home');
    } else if (currentPage !== 'home') {
      onNavigate('home');
    }
  };

  const showBackButton = currentPage !== 'home';

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
      <div className="flex items-center justify-between px-4 lg:px-6 py-2 lg:py-3">
        {/* Left Section - Back Button or Mobile Menu */}
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="lg:hidden text-white p-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Back</span>
            </button>
          )}
          {!showBackButton && (
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden text-white p-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Page Title */}
        <div className="min-w-0 flex-1 lg:flex-shrink">
          <h1 className="text-base sm:text-xl lg:text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
            {getPageTitle()}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-3xl mx-8 lg:mx-16">
          <div className="relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-6 py-3.5 w-full bg-white/5 border border-gray-600/50 text-white placeholder:text-gray-400 rounded-2xl hover:bg-white/10 focus:bg-white/10 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 shadow-inner"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
          {/* Notifications */}
          <button className="relative p-2 lg:p-3 hover:bg-white/10 rounded-xl transition-all duration-200 ease-in-out hover:scale-105 group">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300 group-hover:text-white transition-colors" />
            <span className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 w-2 h-2 lg:w-2.5 lg:h-2.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></span>
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <button
                onClick={() => onNavigate('my-orders')}
                className="hidden sm:flex items-center gap-2.5 px-5 py-3 hover:bg-white/10 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] group"
              >
                <ShoppingBag className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">Orders</span>
              </button>

              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-200 ease-in-out shadow-lg hover:shadow-blue-500/20">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-white leading-tight truncate max-w-[140px]">{user.name}</p>
                  <p className="text-xs text-gray-300 leading-tight truncate max-w-[140px]">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-3">
              <Button
                onClick={() => onNavigate('login')}
                size="sm"
                className="rounded-lg sm:rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 ease-in-out px-3 sm:px-6 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm"
              >
                Login
              </Button>
              <Button
                onClick={() => onNavigate('register')}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-600/40 rounded-lg sm:rounded-xl transition-all duration-200 ease-in-out px-3 sm:px-6 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 pr-6 py-2.5 w-full bg-white/5 border border-gray-600/50 text-white placeholder:text-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 ease-in-out shadow-inner"
          />
        </div>
      </div>
    </header>
  );
}
