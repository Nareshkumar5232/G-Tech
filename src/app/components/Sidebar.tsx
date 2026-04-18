import { useState, useEffect } from 'react';
import {
  Home,
  Package,
  Laptop,
  HardDrive,
  Headphones,
  Wifi,
  Monitor,
  Mail,
  ShoppingBag,
  User,
  LogOut,
  X
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { getCurrentUser, logout } from '@/lib/store';
import type { User as UserType } from '@/types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onWidthChange?: (width: number) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const SIDEBAR_WIDTH = 280;

export function Sidebar({ currentPage, onNavigate, onWidthChange, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [currentPage]);

  useEffect(() => {
    onWidthChange?.(SIDEBAR_WIDTH);
  }, [onWidthChange]);

  const handleLogout = () => {
    logout();
    setUser(null);
    onNavigate('home');
  };

  const navItems = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'All Products', page: 'all-products', icon: Package },
    { label: 'New Laptops', page: 'new-laptops', icon: Laptop },
    { label: 'Refurbished Laptops', page: 'refurbished-laptops', icon: HardDrive },
    { label: 'Accessories', page: 'accessories', icon: Headphones },
    { label: 'Networking & CCTV', page: 'networking-cctv', icon: Wifi },
    { label: 'TV & Monitors', page: 'tv-monitors', icon: Monitor },
    { label: 'My Cart', page: 'cart', icon: ShoppingBag },
    { label: 'Contact', page: 'contact', icon: Mail },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-black text-white shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out z-40 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ width: `${SIDEBAR_WIDTH}px` }}
      >
        <div className="h-full flex flex-col backdrop-blur-sm">
          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="px-4 py-6 border-b border-gray-800/50">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group w-full transition-transform duration-200 ease-in-out hover:scale-[1.02]"
            >
              <div className="bg-white p-2.5 rounded-xl group-hover:shadow-lg transition-all duration-200 ease-in-out flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Saturn Systems" 
                  className="w-12 h-12"
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-3xl">S</div>';
                    }
                  }}
                />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold tracking-tight">
                  SATURN SYSTEMS
                </div>
                <div className="text-xs text-gray-400">Laptops Sales & Services</div>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      onMobileClose?.();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ease-in-out group ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                      }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform`} />
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>
                  </button>
                ); 
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-800/50 p-3">
            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('my-orders');
                    onMobileClose?.();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 transition-all duration-200 ease-in-out ${currentPage === 'my-orders'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`}
                >
                  <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">My Orders</span>
                </button>

                <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-800/50 rounded-xl mb-2 backdrop-blur-sm">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{user.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all duration-200 ease-in-out"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    onNavigate('login');
                    onMobileClose?.();
                  }}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 mb-2 transition-all duration-200 ease-in-out text-sm"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    onNavigate('register');
                    onMobileClose?.();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 ease-in-out text-sm"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
