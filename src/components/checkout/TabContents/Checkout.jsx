import React, { useState } from 'react';
import { Package, X, Tag, ShoppingCartIcon } from 'lucide-react';

// --- Dummy product data (for demonstration) ---
const dummyProducts = [
  {
    id: 1,
    image: 'https://asia.fleetcart.envaysoft.com/storage/media/0NyoRNyW1I5EqQXqbYAVCqsEyyTVKzkVTC4koInF.jpg',
    name: 'Samsung Galaxy S24 Ultra 5G AI Smartphone',
    variant: 'Color: Titanium Yellow, Size: 128GB',
    unitPrice: 799.0,
    quantity: 1,
  },
  {
    id: 2,
    image: 'https://asia.fleetcart.envaysoft.com/storage/media/0NyoRNyW1I5EqQXqbYAVCqsEyyTVKzkVTC4koInF.jpg',
    name: 'Apple 2023 MacBook Pro (14-inch)',
    variant: 'Color: Space Black, Storage: 512GB',
    unitPrice: 1999.0,
    quantity: 1,
  },
  {
    id: 3,
    image: 'https://asia.fleetcart.envaysoft.com/storage/media/0NyoRNyW1I5EqQXqbYAVCqsEyyTVKzkVTC4koInF.jpg',
    name: 'Apple AirPods Pro',
    variant: '',
    unitPrice: 299.0,
    quantity: 1,
  },
];

// --- Horizontal Product Card (used inside OrderSummary) ---
const OrderProductCard = ({ product, updateQuantity, removeProduct }) => {
  const lineTotal = product.unitPrice * product.quantity;

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-cover border border-gray-200 rounded"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 text-sm">{product.name}</div>
        {product.variant && (
          <div className="text-xs text-gray-500 mt-1">{product.variant}</div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <button
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
            onClick={() => updateQuantity(product.id, product.quantity - 1)}
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-gray-900">{product.quantity}</span>
          <button
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
            onClick={() => updateQuantity(product.id, product.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-gray-900">${lineTotal.toFixed(2)}</div>
        <button
          className="text-gray-400 hover:text-red-600 transition-colors mt-2"
          onClick={() => removeProduct(product.id)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- Coupon Section (used inside OrderSummary) ---
const CouponSection = ({ onApplyCoupon }) => {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (code.trim()) {
      onApplyCoupon(code);
      setCode('');
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">Have a coupon?</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md transition flex items-center gap-2"
        >
          <Tag size={16} />
          Apply
        </button>
      </div>
    </div>
  );
};

// --- Left Side: CheckoutForm Component ---
export const CheckoutForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Postal code"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Country</option>
            <option>United States</option>
            <option>Canada</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
            <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Credit Card</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
            <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">PayPal</span>
          </label>
        </div>
      </div>
    </form>
  );
};

// --- Right Side: OrderSummary Component ---
export const OrderSummary = ({ products, updateQuantity, removeProduct }) => {
  // Placeholder coupon handler
  const handleApplyCoupon = (code) => {
    alert(`Coupon "${code}" applied (demo)`);
  };

  const subtotal = products.reduce((acc, p) => acc + p.unitPrice * p.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg sticky top-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Package className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
      </div>

      {/* Product Cards */}
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2 -mr-2">
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCartIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          products.map((product) => (
            <OrderProductCard
              key={product.id}
              product={product}
              updateQuantity={updateQuantity}
              removeProduct={removeProduct}
            />
          ))
        )}
      </div>

      <CouponSection onApplyCoupon={handleApplyCoupon} />

      {/* Totals */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-200">
          <span className="text-gray-900">Total</span>
          <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// --- Parent Component that uses both and includes dummy products ---
const Checkout = () => {
  const [products, setProducts] = useState(dummyProducts);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/5">
            <CheckoutForm />
          </div>
          <div className="w-full lg:w-2/5">
            <OrderSummary
              products={products}
              updateQuantity={updateQuantity}
              removeProduct={removeProduct}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;