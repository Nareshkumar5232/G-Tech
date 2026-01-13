import { useState, useEffect } from 'react';
import { Menu, X, User, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { getCurrentUser, logout } from '@/lib/store';
import type { User as UserType } from '@/types';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [currentPage]);

  const handleLogout = () => {
    logout();
    setUser(null);
    onNavigate('home');
  };

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'All Products', page: 'all-products' },
    { label: 'New Laptops', page: 'new-laptops' },
    { label: 'Used Laptops', page: 'used-laptops' },
    { label: 'Accessories', page: 'accessories' },
    { label: 'Networking & CCTV', page: 'networking-cctv' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-2xl font-bold">G</span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-xl font-bold tracking-tight">G-TECH INNOVATION</div>
              <div className="text-xs text-gray-400">Your Tech Partner</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.page
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button
                  onClick={() => onNavigate('my-orders')}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  My Orders
                </Button>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-800"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => onNavigate('login')}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate('register')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left transition-all ${
                    currentPage === item.page
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button
                    onClick={() => {
                      onNavigate('my-orders');
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-gray-600"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    My Orders
                  </Button>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-gray-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-gray-600"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate('register');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
