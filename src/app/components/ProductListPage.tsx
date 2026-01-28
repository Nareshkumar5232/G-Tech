import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Slider } from '@/app/components/ui/slider';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { getProducts } from '@/lib/store';
import type { Product, ProductCategory, Brand, TamilNaduCity } from '@/types';

interface ProductListPageProps {
  category?: ProductCategory;
  onOrderClick: (product: Product) => void;
}

export function ProductListPage({ category, onOrderClick }: ProductListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'price-low' | 'price-high'>('date');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<('New' | 'Used')[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<TamilNaduCity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(category || 'all');

  const allProducts = getProducts();
  const products = selectedCategory === 'all' ? allProducts : allProducts.filter(p => p.category === selectedCategory);

  const brands: Brand[] = ['Dell', 'HP', 'Lenovo', 'Apple', 'ASUS', 'Acer', 'MSI', 'Samsung', 'Other'];
  const locations: TamilNaduCity[] = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thanjavur', 'Dindigul'];
  const categories: (ProductCategory | 'all')[] = ['all', 'New Laptops', 'Used Laptops', 'Accessories', 'Networking & CCTV'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specs.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply price range filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Apply condition filter
    if (selectedConditions.length > 0) {
      result = result.filter((p) => selectedConditions.includes(p.condition));
    }

    // Apply location filter
    if (selectedLocations.length > 0) {
      result = result.filter((p) => selectedLocations.includes(p.location));
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchQuery, sortBy, priceRange, selectedBrands, selectedConditions, selectedLocations]);

  const toggleBrand = (brand: Brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCondition = (condition: 'New' | 'Used') => {
    setSelectedConditions(prev =>
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const toggleLocation = (location: TamilNaduCity) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 200000]);
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedLocations([]);
  };

  const activeFiltersCount = selectedBrands.length + selectedConditions.length + selectedLocations.length;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-900">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-900">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={200000}
            step={5000}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-900">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-900">Condition</h3>
        <div className="space-y-2">
          {(['New', 'Used'] as const).map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={`condition-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => toggleCondition(condition)}
              />
              <Label htmlFor={`condition-${condition}`} className="text-sm cursor-pointer">
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-900">Location</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              />
              <Label htmlFor={`location-${location}`} className="text-sm cursor-pointer">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </h1>
          <p className="text-gray-100 text-lg">
            Find the best deals on laptops and tech products in Tamil Nadu
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date Published</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-base text-gray-700 font-medium">
                Showing <span className="text-red-600 font-bold">{filteredAndSortedProducts.length}</span> product
                {filteredAndSortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Product Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onOrderClick={onOrderClick} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-base text-gray-500 mb-4">Try adjusting your search or filters</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
