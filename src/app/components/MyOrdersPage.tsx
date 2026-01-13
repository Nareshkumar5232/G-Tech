import { useEffect, useState } from 'react';
import { Package, Calendar, IndianRupee, XCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { getCurrentUser, getOrdersByUserId, cancelOrder } from '@/lib/store';
import { toast } from 'sonner';
import type { Order } from '@/types';

export function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [error, setError] = useState('');
  const user = getCurrentUser();

  const loadOrders = () => {
    if (user) {
      const userOrders = getOrdersByUserId(user.id);
      // Sort by newest first
      userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(userOrders);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancelClick = (order: Order) => {
    setSelectedOrder(order);
    setCancelDialogOpen(true);
    setCancellationReason('');
    setError('');
  };

  const handleCancelConfirm = () => {
    if (!cancellationReason.trim()) {
      setError('Please provide a reason for cancellation');
      return;
    }

    if (selectedOrder) {
      const result = cancelOrder(selectedOrder.id, cancellationReason);
      if (result) {
        toast.success('Order cancelled successfully');
        setCancelDialogOpen(false);
        setSelectedOrder(null);
        setCancellationReason('');
        setError('');
        loadOrders(); // Reload orders to reflect the cancellation
      } else {
        setError('Unable to cancel order. Order may already be processed.');
      }
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-600';
      case 'Confirmed':
        return 'bg-blue-600';
      case 'Approved':
        return 'bg-blue-600';
      case 'Delivered':
        return 'bg-green-600';
      case 'Cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const canCancelOrder = (order: Order) => {
    return order.status === 'Pending' || order.status === 'Confirmed';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-300 text-lg">Track and manage your orders</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
              <p className="text-gray-500 text-center">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{orders.length}</span> order{orders.length !== 1 ? 's' : ''}
              </p>
            </div>

            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg mb-1">Order #{order.id}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Product Info */}
                    <div className="md:col-span-2">
                      <h4 className="font-semibold mb-1">{order.productName}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Quantity: {order.quantity}</p>
                        <p>Price per unit: ₹{order.productPrice.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="flex flex-col md:items-end justify-center">
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="w-5 h-5 text-red-600" />
                        <span className="text-2xl font-bold text-gray-900">
                          {order.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.address && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-blue-900 mb-1">Delivery Address</p>
                          <div className="text-sm text-blue-800 space-y-0.5">
                            <p>{order.address.fullName}</p>
                            <p>{order.address.phoneNumber}</p>
                            <p>{order.address.addressLine1}</p>
                            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                            <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Message */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    {order.status === 'Pending' && (
                      <p className="text-sm text-gray-700">
                        <strong>Status:</strong> Your order is being reviewed. We'll contact you shortly.
                      </p>
                    )}
                    {order.status === 'Confirmed' && (
                      <p className="text-sm text-gray-700">
                        <strong>Status:</strong> Your order has been confirmed and is being prepared for delivery.
                      </p>
                    )}
                    {order.status === 'Approved' && (
                      <p className="text-sm text-gray-700">
                        <strong>Status:</strong> Your order has been approved and is being prepared for delivery.
                      </p>
                    )}
                    {order.status === 'Delivered' && (
                      <p className="text-sm text-green-700">
                        <strong>Status:</strong> Your order has been delivered. Thank you for shopping with us!
                      </p>
                    )}
                    {order.status === 'Cancelled' && order.cancellationReason && (
                      <div className="text-sm text-red-700">
                        <p><strong>Status:</strong> Order cancelled</p>
                        <p className="mt-1"><strong>Reason:</strong> {order.cancellationReason}</p>
                      </div>
                    )}
                  </div>

                  {/* Cancel Order Button */}
                  {canCancelOrder(order) && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelClick(order)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Order
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Order Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for cancelling this order. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-2">
            <Label htmlFor="cancellation-reason">Cancellation Reason *</Label>
            <Textarea
              id="cancellation-reason"
              placeholder=""
              value={cancellationReason}
              onChange={(e) => {
                setCancellationReason(e.target.value);
                setError('');
              }}
              rows={4}
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setCancellationReason('');
              setError('');
            }}>
              Keep Order
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirm Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
