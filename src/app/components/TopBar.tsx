import { useState, useEffect } from 'react';
import { Search, Bell, User, ShoppingBag, Menu } from 'lucide-react';
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
    };
    return titles[currentPage] || 'Saturn Systems';
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
      <div className="flex items-center justify-between px-6 lg:px-10 py-4 lg:py-5">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden mr-4 text-white p-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title */}
        <div className="min-w-0 flex-shrink">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight truncate bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Notifications */}
          <button className="relative p-3 hover:bg-white/10 rounded-xl transition-all duration-200 ease-in-out hover:scale-105 group">
            <Bell className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></span>
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onNavigate('login')}
                size="sm"
                className="rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 ease-in-out px-6 py-2.5 font-semibold"
              >
                Login
              </Button>
              <Button
                onClick={() => onNavigate('register')}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-600/40 rounded-xl transition-all duration-200 ease-in-out px-6 py-2.5 font-semibold"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-5">
        <div className="relative w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 pr-6 py-3.5 w-full bg-white/5 border border-gray-600/50 text-white placeholder:text-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 ease-in-out shadow-inner"
          />
        </div>
      </div>
    </header>
  );
}
