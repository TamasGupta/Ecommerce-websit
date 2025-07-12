import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
}
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link to={`/product/${product?._id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
          <img
            src={`${BASE_URL}${product?.images[0]}`}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        {product.featured && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            {product.reviewCount}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              Rs.{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                Rs.{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {product?.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
