import React, { useEffect, useState } from "react";
// import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../action/productApi";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  category: string;
  tags: string[];
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // const [selectedCategory, setSelectedCategory] = useState("All");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated beauty products, loved by
            customers worldwide.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
