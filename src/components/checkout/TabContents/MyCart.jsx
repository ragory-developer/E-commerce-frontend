const { ShoppingCartIcon, ShoppingCart, X, Plus, Package } = require("lucide-react");

// --- CartItem Component (unchanged) ---
const CartItem = ({ product, updateQuantity, removeProduct }) => {
  const lineTotal = product.unitPrice * product.quantity;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="p-3 sm:p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 sm:w-16 sm:h-16 object-cover border border-gray-200 rounded mx-auto"
        />
      </td>
      <td className="p-3 sm:p-4 text-left min-w-[200px]">
        <div className="font-medium text-gray-900 text-xs sm:text-sm">{product.name}</div>
        {product.variant && <div className="text-xs text-gray-500 mt-1">{product.variant}</div>}
      </td>
      <td className="p-3 sm:p-4 text-gray-900 font-medium whitespace-nowrap">
        ${product.unitPrice.toFixed(2)}
      </td>
      <td className="p-3 sm:p-4">
        <div className="flex items-center justify-center gap-2">
          <button
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 hover:text-gray-900"
            onClick={() => updateQuantity(product.id, product.quantity - 1)}
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-gray-900">{product.quantity}</span>
          <button
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 hover:text-gray-900"
            onClick={() => updateQuantity(product.id, product.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td className="p-3 sm:p-4 font-semibold text-gray-900 whitespace-nowrap">${lineTotal.toFixed(2)}</td>
      <td className="p-3 sm:p-4">
        <button
          className="text-gray-400 hover:text-red-600 transition-colors"
          onClick={() => removeProduct(product.id)}
        >
          <X className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};



// --- MyCart Component (separated) ---
const MyCart = ({ products, updateQuantity, removeProduct, total }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-4 pb-8">
      {/* Table Section */}
      <div className="w-full lg:flex-1 overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse rounded-md border border-gray-200 overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['Image', 'Product Name', 'Unit Price', 'Quantity', 'Line Total', 'Remove'].map((head) => (
                <th key={head} className="p-3 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg">Your cart is empty</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  updateQuantity={updateQuantity}
                  removeProduct={removeProduct}
                />
              ))
            )}
          </tbody>
        </table>

        {/* Centered "Add More Products" button */}
        <div className="flex justify-center mt-4">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition font-medium text-sm"
          >
            <Plus size={18} />
            <span>Add More Products</span>
          </a>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[380px] lg:shrink-0">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border border-gray-200 rounded-lg h-fit sticky top-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
          </div>

          <div className="border-t border-gray-300 mb-6"></div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full rounded-lg flex justify-center items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-4 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            disabled={products.length === 0}
          >
            <ShoppingCartIcon size={24} /> <span>Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};



export default MyCart