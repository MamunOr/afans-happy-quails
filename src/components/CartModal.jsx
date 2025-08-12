import { useCart } from '../context/CartContext';

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 max-h-[80vh] overflow-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold"
          aria-label="Close cart"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-green-900 mb-4">Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-green-700">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={clearCart}
              className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
