import { useState, useEffect } from 'react';
import {
  Home,
  Package,
  Laptop,
  HardDrive,
  Headphones,
  Wifi,
  Mail,
  ShoppingBag,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
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

export function Sidebar({ currentPage, onNavigate, onWidthChange, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [currentPage]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && isExpanded) {
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 400) {
          setSidebarWidth(newWidth);
          onWidthChange?.(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isExpanded, onWidthChange]);

  useEffect(() => {
    // Notify parent when sidebar expand/collapse state changes
    const currentWidth = isExpanded ? sidebarWidth : 80;
    onWidthChange?.(currentWidth);
  }, [isExpanded, sidebarWidth, onWidthChange]);

  const handleLogout = () => {
    logout();
    setUser(null);
    onNavigate('home');
  };

  const navItems = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'All Products', page: 'all-products', icon: Package },
    { label: 'New Laptops', page: 'new-laptops', icon: Laptop },
    { label: 'Used Laptops', page: 'used-laptops', icon: HardDrive },
    { label: 'Accessories', page: 'accessories', icon: Headphones },
    { label: 'Networking & CCTV', page: 'networking-cctv', icon: Wifi },
    { label: 'My Cart', page: 'cart', icon: ShoppingBag },
    { label: 'Contact', page: 'contact', icon: Mail },
  ];

  const collapsedWidth = 80;
  const currentWidth = isExpanded ? sidebarWidth : collapsedWidth;

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
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-black text-white shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out z-40 overflow-visible ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        style={{ width: `${currentWidth}px` }}
      >
        <div className="h-full flex flex-col relative backdrop-blur-sm overflow-visible">
          {/* Logo */}
          <div className="px-4 py-6 border-b border-gray-800/50">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group w-full transition-transform duration-200 ease-in-out hover:scale-[1.02]"
            >
              {isExpanded && (
                <div className="bg-white p-2.5 rounded-xl group-hover:shadow-lg transition-all duration-200 ease-in-out flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Saturn Systems" 
                    className="w-16 h-16"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-16 h-16 flex items-center justify-center text-blue-600 font-bold text-4xl">S</div>';
                      }
                    }}
                  />
                </div>
              )}
              {isExpanded && (
                <div className="text-left overflow-hidden">
                  <div className="text-base font-semibold tracking-tight whitespace-nowrap">
                    SATURN SYSTEMS
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Laptops Sales & Services</div>
                </div>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
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
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ease-in-out group relative ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white hover:scale-[1.01]'
                      }`}
                    title={!isExpanded ? item.label : ''}
                  >
                    <div className={`flex items-center justify-center flex-shrink-0 transition-transform duration-200 ease-in-out ${isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isExpanded && (
                      <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.label}
                      </span>
                    )}
                    {isActive && !isExpanded && (
                      <div className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r shadow-lg shadow-blue-600/50" />
                    )}
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
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white hover:scale-[1.01]'
                    }`}
                  title={!isExpanded ? 'My Orders' : ''}
                >
                  <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && <span className="font-medium text-sm">My Orders</span>}
                </button>

                {isExpanded && (
                  <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-800/50 rounded-xl mb-2 backdrop-blur-sm">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">{user.name}</span>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all duration-200 ease-in-out hover:scale-[1.01]"
                  title={!isExpanded ? 'Logout' : ''}
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && <span className="font-medium text-sm">Logout</span>}
                </button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    onNavigate('login');
                    onMobileClose?.();
                  }}
                  className={`w-full bg-blue-600 text-white hover:bg-blue-700 mb-2 transition-all duration-200 ease-in-out text-sm ${!isExpanded ? 'px-0' : ''
                    }`}
                >
                  {isExpanded ? 'Login' : <User className="w-5 h-5" />}
                </Button>
                {isExpanded && (
                  <Button
                    onClick={() => {
                      onNavigate('register');
                      onMobileClose?.();
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 ease-in-out text-sm"
                  >
                    Register
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Collapse Toggle (Desktop) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-full shadow-xl hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-200 ease-in-out hover:scale-110 z-50"
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* Resize Handle (Desktop, when expanded) */}
          {isExpanded && (
            <div
              className="hidden lg:block absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-600/50 transition-all duration-200 ease-in-out group"
              onMouseDown={() => setIsResizing(true)}
            >
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-20 bg-gray-700/50 group-hover:bg-blue-600 group-hover:h-24 rounded-l transition-all duration-200 ease-in-out" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
