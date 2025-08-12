import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Organic Quail Feed', price: 25.99, image: 'https://placehold.co/200x200/93c5fd/ffffff?text=Feed' },
  { id: 2, name: 'Quail Tag Set', price: 14.99, image: 'https://placehold.co/200x200/facc15/000000?text=Tags' },
  { id: 3, name: 'Incubator Model X', price: 149.99, image: 'https://placehold.co/200x200/22c55e/ffffff?text=Incubator' },
  { id: 4, name: 'Quail Coop', price: 299.99, image: 'https://placehold.co/200x200/64748b/ffffff?text=Coop' },
];

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div className="p-6 sm:p-10 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 flex-grow">{product.name}</h3>
              <p className="text-2xl font-semibold text-green-700 my-3">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto w-full bg-green-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
