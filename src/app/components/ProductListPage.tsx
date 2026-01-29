import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  
  // Collapsible sections state
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isProcessorOpen, setIsProcessorOpen] = useState(false);

  const allProducts = getProducts();
  const products = selectedCategory === 'all' ? allProducts : allProducts.filter(p => p.category === selectedCategory);

  const brands: Brand[] = ['Dell', 'HP', 'Lenovo', 'Apple', 'ASUS', 'Acer', 'MSI', 'Samsung', 'Other'];
  const locations: TamilNaduCity[] = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thanjavur', 'Dindigul'];
  const categories: (ProductCategory | 'all')[] = ['all', 'New Laptops', 'Used Laptops', 'Accessories', 'Networking & CCTV'];
  const processors: string[] = ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'Dual Core', 'Quad Core'];

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

  const toggleProcessor = (processor: string) => {
    setSelectedProcessors(prev =>
      prev.includes(processor) ? prev.filter(p => p !== processor) : [...prev, processor]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 200000]);
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedLocations([]);
    setSelectedProcessors([]);
  };

  const activeFiltersCount = selectedBrands.length + selectedConditions.length + selectedLocations.length + selectedProcessors.length;

  const FilterSidebar = () => (
    <div className="space-y-4">
      {/* Categories */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-900">CATEGORIES</h3>
          {isCategoryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isCategoryOpen && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center w-full text-left text-sm py-1 transition-colors ${
                  selectedCategory === cat
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">›</span>
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-900">PRICE</h3>
          {isPriceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isPriceOpen && (
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              min={0}
              max={200000}
              step={5000}
              className="mb-2"
            />
            <div className="flex items-center gap-2">
              <Select 
                value={priceRange[0].toString()} 
                onValueChange={(value) => setPriceRange([parseInt(value), priceRange[1]])}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">₹0</SelectItem>
                  <SelectItem value="10000">₹10,000</SelectItem>
                  <SelectItem value="25000">₹25,000</SelectItem>
                  <SelectItem value="50000">₹50,000</SelectItem>
                  <SelectItem value="75000">₹75,000</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-gray-500">to</span>
              <Select 
                value={priceRange[1].toString()} 
                onValueChange={(value) => setPriceRange([priceRange[0], parseInt(value)])}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Max" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25000">₹25,000</SelectItem>
                  <SelectItem value="50000">₹50,000</SelectItem>
                  <SelectItem value="75000">₹75,000</SelectItem>
                  <SelectItem value="100000">₹1,00,000</SelectItem>
                  <SelectItem value="200000">₹2,00,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-900">BRAND</h3>
          {isBrandOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isBrandOpen && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer text-gray-700">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Type (Condition) Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => setIsTypeOpen(!isTypeOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-900">TYPE</h3>
          {isTypeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isTypeOpen && (
          <div className="space-y-2">
            {(['New', 'Used'] as const).map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => toggleCondition(condition)}
                />
                <Label htmlFor={`condition-${condition}`} className="text-sm cursor-pointer text-gray-700">
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Processor Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => setIsProcessorOpen(!isProcessorOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-900">PROCESSOR</h3>
          {isProcessorOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isProcessorOpen && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {processors.map((processor) => (
              <div key={processor} className="flex items-center space-x-2">
                <Checkbox
                  id={`processor-${processor}`}
                  checked={selectedProcessors.includes(processor)}
                  onCheckedChange={() => toggleProcessor(processor)}
                />
                <Label htmlFor={`processor-${processor}`} className="text-sm cursor-pointer text-gray-700">
                  {processor}
                </Label>
              </div>
            ))}
          </div>
        )}
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
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </h1>
          <p className="text-gray-100 text-lg">
            Find the best deals on laptops and tech products in Tamil Nadu
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Top Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col gap-4">
                {/* Search and Sort Row */}
                <div className="flex flex-col md:flex-row gap-4">
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
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date Published</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Quick Filters Row */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                {/* Condition Filters */}
                <button
                  onClick={() => toggleCondition('New')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedConditions.includes('New')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => toggleCondition('Used')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedConditions.includes('Used')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Used
                </button>

                {/* Popular Brand Filters */}
                {['Dell', 'HP', 'Lenovo', 'Apple'].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand as Brand)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedBrands.includes(brand as Brand)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}

                {/* Price Range Display */}
                {(priceRange[0] > 0 || priceRange[1] < 200000) && (
                  <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2">
                    ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    <button
                      onClick={() => setPriceRange([0, 200000])}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Clear All Filters */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-full text-sm font-medium flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear All
                  </button>
                )}
              </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">
                Showing <span className="text-blue-600 font-bold">{filteredAndSortedProducts.length}</span> product
                {filteredAndSortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Product Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onOrderClick={onOrderClick} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
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
