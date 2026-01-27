import { useState } from 'react';
import { ShoppingCart, IndianRupee, Minus, Plus, MapPin, User, Phone, CreditCard, Wallet } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
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
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeVerified, setPincodeVerified] = useState(false);

  if (!product) return null;

  const handleClose = () => {
    setQuantity(1);
    setStep('product');
    setPaymentMethod('cod');
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
    setPincodeVerified(false);
    onClose();
  };

  const validatePincode = async (pincode: string) => {
    if (!/^\d{6}$/.test(pincode)) {
      return;
    }

    setPincodeLoading(true);
    setPincodeVerified(false);
    
    try {
      // Using India Post API for pincode validation
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const location = data[0].PostOffice[0];
        setAddress(prev => ({
          ...prev,
          city: location.District,
          state: location.State,
          pincode: pincode
        }));
        setPincodeVerified(true);
        setErrors(prev => ({ ...prev, pincode: undefined, city: undefined, state: undefined }));
      } else {
        setErrors(prev => ({ ...prev, pincode: 'Invalid pincode. Please enter a valid 6-digit pincode.' }));
        setPincodeVerified(false);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, pincode: 'Unable to verify pincode. Please check and try again.' }));
      setPincodeVerified(false);
    } finally {
      setPincodeLoading(false);
    }
  };

  const handlePincodeChange = (pincode: string) => {
    setAddress({ ...address, pincode });
    setPincodeVerified(false);
    
    // Auto-validate when 6 digits are entered
    if (pincode.length === 6) {
      validatePincode(pincode);
    }
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
    } else if (!pincodeVerified) {
      newErrors.pincode = 'Please enter a valid pincode to auto-fill city and state';
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
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="pincode">Pincode</Label>
                <div className="relative">
                  <Input
                    id="pincode"
                    placeholder="Enter 6-digit pincode"
                    value={address.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className={errors.pincode ? 'border-red-500' : pincodeVerified ? 'border-green-500' : ''}
                    maxLength={6}
                  />
                  {pincodeLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  {pincodeVerified && !pincodeLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                {errors.pincode && (
                  <p className="text-sm text-red-600">{errors.pincode}</p>
                )}
                {pincodeVerified && (
                  <p className="text-sm text-green-600">✓ Pincode verified - City and State auto-filled</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City / District</Label>
                <Input
                  id="city"
                  placeholder="Auto-filled from pincode"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className={errors.city ? 'border-red-500' : pincodeVerified ? 'bg-gray-50' : ''}
                  readOnly={pincodeVerified}
                />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Auto-filled from pincode"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className={errors.state ? 'border-red-500' : pincodeVerified ? 'bg-gray-50' : ''}
                  readOnly={pincodeVerified}
                />
                {errors.state && (
                  <p className="text-sm text-red-600">{errors.state}</p>
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

            {/* Payment Method Selection */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Payment Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'border-red-600' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'cod' && (
                      <div className="w-3 h-3 rounded-full bg-red-600" />
                    )}
                  </div>
                  <Wallet className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when you receive</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('online')}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'online'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'online' ? 'border-red-600' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'online' && (
                      <div className="w-3 h-3 rounded-full bg-red-600" />
                    )}
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium">Pay Online</p>
                    <p className="text-xs text-gray-500">UPI, Card, Net Banking</p>
                  </div>
                </button>
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
                {paymentMethod === 'online' ? (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Confirm Order
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
