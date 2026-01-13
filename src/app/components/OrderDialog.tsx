import { useState } from 'react';
import { ShoppingCart, IndianRupee, Minus, Plus, MapPin, User, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import type { Product, Address } from '@/types';

interface OrderDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, address: Address) => void;
}

export function OrderDialog({ product, open, onClose, onConfirm }: OrderDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<'product' | 'address' | 'confirmation'>('product');
  const [address, setAddress] = useState<Address>({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  if (!product) return null;

  const handleClose = () => {
    setQuantity(1);
    setStep('product');
    setAddress({
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: ''
    });
    setErrors({});
    onClose();
  };

  const validateAddress = (): boolean => {
    const newErrors: Partial<Record<keyof Address, string>> = {};
    
    if (!address.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!address.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(address.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    }
    
    if (!address.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    
    if (!address.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!address.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!address.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToAddress = () => {
    setStep('address');
  };

  const handleProceedToConfirmation = () => {
    if (validateAddress()) {
      setStep('confirmation');
    }
  };

  const handleConfirm = () => {
    onConfirm(quantity, address);
    handleClose();
  };

  const totalAmount = product.price * quantity;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 'product' && 'Place Order'}
            {step === 'address' && 'Delivery Address'}
            {step === 'confirmation' && 'Order Confirmation'}
          </DialogTitle>
          <DialogDescription>
            {step === 'product' && 'Review your order details'}
            {step === 'address' && 'Enter your delivery address'}
            {step === 'confirmation' && 'Review and confirm your order'}
          </DialogDescription>
        </DialogHeader>

        {/* Product Details Step */}
        {step === 'product' && (
          <div className="space-y-6">
            {/* Product Image */}
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                  <Badge className={product.condition === 'New' ? 'bg-green-600' : 'bg-blue-600'}>
                    {product.condition}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <IndianRupee className="w-5 h-5 text-red-600" />
                    <span className="text-2xl font-bold">{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-sm text-gray-500">per unit</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Specs */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Specifications:</h4>
                <ul className="space-y-1">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 text-center"
                  min="1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Total */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total Amount:</span>
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-6 h-6 text-red-600" />
                  <span className="text-3xl font-bold text-red-600">
                    {totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Address Step */}
        {step === 'address' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="fullName"
                    placeholder=""
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    placeholder=""
                    value={address.phoneNumber}
                    onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                    className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Textarea
                  id="addressLine1"
                  placeholder=""
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                  className={`pl-10 ${errors.addressLine1 ? 'border-red-500' : ''}`}
                  rows={2}
                />
              </div>
              {errors.addressLine1 && (
                <p className="text-sm text-red-600">{errors.addressLine1}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
              <Textarea
                id="addressLine2"
                placeholder=""
                value={address.addressLine2}
                onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder=""
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder=""
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className={errors.state ? 'border-red-500' : ''}
                />
                {errors.state && (
                  <p className="text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  placeholder=""
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className={errors.pincode ? 'border-red-500' : ''}
                  maxLength={6}
                />
                {errors.pincode && (
                  <p className="text-sm text-red-600">{errors.pincode}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {step === 'confirmation' && (
          <div className="space-y-6">
            {/* Product Summary */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Product Details</h4>
              <div className="flex gap-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h5 className="font-semibold">{product.name}</h5>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{product.price.toLocaleString('en-IN')} × {quantity}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Delivery Address</h4>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{address.fullName}</p>
                <p className="text-gray-600">{address.phoneNumber}</p>
                <p className="text-gray-600">{address.addressLine1}</p>
                {address.addressLine2 && <p className="text-gray-600">{address.addressLine2}</p>}
                <p className="text-gray-600">
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total Amount:</span>
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-6 h-6 text-red-600" />
                  <span className="text-3xl font-bold text-red-600">
                    {totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step === 'product' && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleProceedToAddress} className="bg-red-600 hover:bg-red-700">
                Proceed to Address
              </Button>
            </>
          )}
          {step === 'address' && (
            <>
              <Button variant="outline" onClick={() => setStep('product')}>
                Back
              </Button>
              <Button onClick={handleProceedToConfirmation} className="bg-red-600 hover:bg-red-700">
                Continue
              </Button>
            </>
          )}
          {step === 'confirmation' && (
            <>
              <Button variant="outline" onClick={() => setStep('address')}>
                Edit Address
              </Button>
              <Button onClick={handleConfirm} className="bg-red-600 hover:bg-red-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Confirm Order
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
