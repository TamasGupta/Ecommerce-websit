// src/pages/admin/ProductManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiImage,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  uploadProductImage,
  addProduct,
  getAllProducts,
  getAllTags,
  deleteProduct,
  updateProduct,
} from "../../action/productApi";
import TagSelector from "../../components/multiSelector";

// Zod schema for form validation
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(), // ✅ make it optional
  stock: z.string().min(1, "Stock is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
});

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  images: string[];
  tags?: string[];
};

type ProductFormData = z.infer<typeof productSchema>;
type Option = { label: string; value: string };

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [tagOptions, setTagOptions] = useState<Option[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const productsPerPage = 8;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "0",
      stock: "0",
      category: "",
      description: "",
      image: "",
      tags: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, tagsData] = await Promise.all([
          getAllProducts(),
          getAllTags(),
        ]);
        setProducts(productsData);
        setTagOptions(
          tagsData.map((tag: any) => ({
            label: tag.name,
            value: tag.name,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const token = localStorage.getItem("token") || "";
      const imageUrl = await uploadProductImage(file, token);
      setValue("image", imageUrl);
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token") || "";
      await deleteProduct(id, token);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditMode(true);
    setValue("tags", product.tags || []);
    setCurrentProductId(product._id);
    setValue("name", product.name);
    setValue("price", product.price.toString());
    setValue("stock", product.stock.toString());
    setValue("category", product.category);
    setValue("description", product.description);
    setValue("image", product.images[0]);
    setValue("tags", product.tags || []); // ✅ Sync tags with form state
    setSelectedTags(
      product.tags?.map((tag) => ({ label: tag, value: tag })) || []
    );
    setPreviewImage(product.images[0]);
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      if (!data.image && !previewImage) {
        toast.error("Please provide an image.");
        return;
      }
      const token = localStorage.getItem("token") || "";

      const productData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        tags: data.tags ?? [],

        images: [data.image], // ✅ Ensure this matches backend expectation
      };

      if (isEditMode && currentProductId) {
        const updatedProduct = await updateProduct(
          currentProductId,
          productData,
          token
        );
        setProducts((prev) =>
          prev.map((product) =>
            product._id === currentProductId ? updatedProduct : product
          )
        );
        toast.success("Product updated successfully!");
      } else {
        const addedProduct = await addProduct(productData, token);
        setProducts([...products, addedProduct]);
        toast.success("Product added successfully!");
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "add"} product`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setPreviewImage("");
    setSelectedTags([]);
    setIsEditMode(false);
    setCurrentProductId(null);
  };
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* Products Table */}
      {isLoading && products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.images?.[0] && (
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded object-cover"
                                src={`http://localhost:5000${product.images[0]}`}
                                alt={product.name}
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                <FiChevronLeft /> Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Product Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {isEditMode ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Form fields (same as before) */}
                {/* Image Upload */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  {previewImage && (
                    <img
                      src={`http://localhost:5000${previewImage}`}
                      alt="Preview"
                      className="h-20 mt-2 object-cover rounded"
                    />
                  )}
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.image.message}
                    </p>
                  )}
                </div>

                {/* Product Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Product Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Price and Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      {...register("price")}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Price"
                      min="0"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      {...register("stock")}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Stock"
                      min="0"
                    />
                    {errors.stock && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    {...register("category")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Category"
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description"
                    rows={3}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <TagSelector
                    name="tags"
                    control={control}
                    defaultOptions={tagOptions}
                    selectedOptions={selectedTags as any}
                    onChange={(newValue: any) => setSelectedTags(newValue)}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Product"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
