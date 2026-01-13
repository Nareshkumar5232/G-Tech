import { ArrowRight, Laptop, HardDrive, Headphones, Wifi, Shield, TrendingUp, ShoppingCart, IndianRupee } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { ProductCard } from './ProductCard';
import { getFeaturedProducts, getProducts, getCurrentUser } from '@/lib/store';
import type { Product } from '@/types';
import { toast } from 'sonner';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOrderClick: (product: Product) => void;
}

export function HomePage({ onNavigate, onOrderClick }: HomePageProps) {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getProducts();
  const featuredAccessories = allProducts.filter(p => p.category === 'Accessories' && p.featured);

  const handleAccessoryBuy = (product: Product) => {
    const user = getCurrentUser();
    if (!user) {
      toast.error('Please login to purchase accessories');
      onNavigate('login');
      return;
    }
    onOrderClick(product);
  };

  const categories = [
    {
      icon: Laptop,
      title: 'New Laptops',
      description: 'Latest models with warranty',
      page: 'new-laptops',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: HardDrive,
      title: 'Used Laptops',
      description: 'Quality refurbished devices',
      page: 'used-laptops',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Headphones,
      title: 'Accessories',
      description: 'Keyboards, mice & more',
      page: 'accessories',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Wifi,
      title: 'Networking & CCTV',
      description: 'Security & network solutions',
      page: 'networking-cctv',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Trusted Quality',
      description: 'All products tested and certified'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Competitive pricing guaranteed'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help you'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-red-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-red-600/20 border border-red-600 rounded-full text-sm mb-6">
              ✨ Your Trusted Tech Partner in Chennai
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              New & Used Laptops at
              <span className="text-red-600"> Best Prices</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Quality computers, accessories, networking & CCTV solutions for your home and business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onNavigate('all-products')}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6"
              >
                Browse All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => onNavigate('used-laptops')}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
              >
                View Used Laptops
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessories Hero Section */}
      <section className="py-16 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm mb-4">
              💎 Premium Quality Accessories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Best Laptop Accessories at Affordable Prices
            </h2>
            <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
              Upgrade your laptop experience with our handpicked selection of high-quality accessories
            </p>
          </div>

          {/* Featured Accessories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
            {featuredAccessories.map((accessory) => (
              <Card key={accessory.id} className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-4">
                  {/* Image */}
                  <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={accessory.images[0]}
                      alt={accessory.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Name */}
                  <h4 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                    {accessory.name}
                  </h4>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-3">
                    <IndianRupee className="w-4 h-4 text-red-600 font-bold" />
                    <span className="text-xl font-bold text-red-600">
                      {accessory.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  {/* Buy Button */}
                  <Button
                    onClick={() => handleAccessoryBuy(accessory)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2"
                    size="sm"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Buy / Enquire
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Accessories Button */}
          <div className="text-center">
            <Button
              onClick={() => onNavigate('accessories')}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
            >
              View All Accessories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.page}
                  onClick={() => onNavigate(category.page)}
                  className="group relative overflow-hidden bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 text-left"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.gradient} text-white mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  
                  <div className="flex items-center text-red-600 text-sm font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Handpicked deals just for you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrderClick={onOrderClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose G-TECH?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-red-600 mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Device?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Visit our store or browse online to get started
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-6"
            >
              Contact Us
            </Button>
            <Button
              onClick={() => onNavigate('all-products')}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6"
            >
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
