import { useState, useEffect } from 'react';
import { Trash2, ShoppingBag, IndianRupee, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { getCartProducts, removeFromCart, clearCart } from '@/lib/store';
import type { Product } from '@/types';

interface CartPageProps {
  onOrderClick: (product: Product) => void;
}

export function CartPage({ onOrderClick }: CartPageProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const products = await getCartProducts();
    setCartProducts(products);
  };

  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
    loadCart();
  };

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      // Note: clearCart is currently local-only in store.ts, so this might strictly rely on local state
      // preventing server sync in getCartProducts might be needed or we need a server clear endpoint.
      // For now, re-loading might bring items back if server has them. 
      // We will perform a manual "refresh" but be aware of this limitation.
      loadCart();
    }
  };

  const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding products to your cart to see them here!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{product.condition}</span>
                      </div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <IndianRupee className="w-5 h-5 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">
                          {product.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => onOrderClick(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          Order Now
                        </Button>
                        <Button
                          onClick={() => handleRemoveFromCart(product.id)}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Cart Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({cartProducts.length})</span>
                    <span className="text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="w-5 h-5" />
                        <span>{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    * Final price will be confirmed after product inspection
                  </p>
                  <Button
                    onClick={handleClearCart}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
