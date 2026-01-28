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
      'home': 'Dashboard',
      'all-products': 'All Products',
      'new-laptops': 'New Laptops',
      'used-laptops': 'Used Laptops',
      'accessories': 'Accessories',
      'networking-cctv': 'Networking & CCTV',
      'contact': 'Contact Us',
      'my-orders': 'My Orders',
    };
    return titles[currentPage] || 'G-TECH';
  };

  return (
    <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-lg border-b border-gray-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden mr-3 text-white p-2 hover:bg-gray-800 rounded-lg transition-all duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title */}
        <div className="min-w-0 flex-shrink">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-tight truncate">{getPageTitle()}</h1>
          <p className="hidden sm:block text-xs text-gray-400 mt-0.5">Welcome to G-TECH Innovation</p>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-4 lg:mx-12">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2.5 w-full bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 rounded-xl hover:bg-gray-700/50 focus:bg-gray-800 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Notifications */}
          <button className="relative p-2 sm:p-2.5 hover:bg-gray-800 rounded-xl transition-all duration-200 ease-in-out hover:scale-105">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-600 rounded-full shadow-lg shadow-red-600/50"></span>
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('my-orders')}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 hover:bg-gray-800 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-medium text-gray-200">Orders</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-200 ease-in-out">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white leading-tight truncate max-w-[120px]">{user.name}</p>
                  <p className="text-xs text-gray-400 leading-tight truncate max-w-[120px]">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => onNavigate('login')}
                size="sm"
                className="rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-200 ease-in-out"
              >
                Login
              </Button>
              <Button
                onClick={() => onNavigate('register')}
                size="sm"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg hover:shadow-red-600/30 rounded-xl transition-all duration-200 ease-in-out"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-2.5 w-full bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all duration-200 ease-in-out"
          />
        </div>
      </div>
    </header>
  );
}
