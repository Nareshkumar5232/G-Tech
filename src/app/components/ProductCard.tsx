import { useState } from 'react';
import { ShoppingCart, IndianRupee, Heart, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { toggleWishlist, isInWishlist } from '@/lib/store';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onOrderClick: (product: Product) => void;
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export function ProductCard({ product, onOrderClick }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [wishlistActive, setWishlistActive] = useState(isInWishlist(product.id));

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    setWishlistActive(isInWishlist(product.id));
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Condition Badge */}
        <Badge
          className={`absolute top-3 left-3 ${
            product.condition === 'New'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {product.condition}
        </Badge>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            wishlistActive
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-white/90 text-gray-700 hover:bg-red-600 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${wishlistActive ? 'fill-current' : ''}`} />
        </button>

        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-red-600 w-6'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <IndianRupee className="w-6 h-6 text-red-600 font-bold" />
          <span className="text-3xl font-bold text-gray-900">
            {product.price.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Location and Date */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3 pb-3 border-b">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{getTimeAgo(product.createdAt)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Specs */}
        <div className="space-y-1">
          {product.specs.slice(0, 3).map((spec, index) => (
            <div
              key={index}
              className="text-xs text-gray-500 flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-red-600 rounded-full" />
              {spec}
            </div>
          ))}
          {product.specs.length > 3 && (
            <div className="text-xs text-gray-400 italic">
              +{product.specs.length - 3} more features
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onOrderClick(product)}
          className="w-full bg-red-600 hover:bg-red-700 text-white group/btn"
        >
          <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
          Order / Enquire Now
        </Button>
      </CardFooter>
    </Card>
  );
}
