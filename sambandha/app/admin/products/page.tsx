"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/../config/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, PlusCircle, Trash2, Pencil, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import Loading from "@/loading";

interface Product {
  _id: string; // Changed from id to _id to match usage
  name: string;
  price: number;
  images: string[]; // Changed from imageUrl to images array
  category: string; // Added category field
  slug: string;
}

interface Category {
  _id: string; // Changed from id to _id to match usage
  name: string;
}

// Error response interface
interface ErrorResponse {
  message: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/product");
  return data;
};

const fetchCategories = async (): Promise<Category[]> => {
  const token = Cookies.get("token");

  const { data } = await api.get("/product/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const ProductsPage = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const token = Cookies.get("token");
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [productId, setProductId] = useState<string | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Properly typed
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleAddCategory = async (): Promise<void> => {
    if (!categoryName.trim()) return;

    try {
      await api.post(
        "/product/addCategory",
        {
          name: categoryName.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Category added successfully!");
      setCategoryName("");
      await queryClient.invalidateQueries({ queryKey: ["categories"] }); // Updated syntax
    } catch (error) {
      toast.error("Failed to add category. Please try again.");
      console.error("Error creating category:", error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    setLoading(true);
    try {
      await api.delete(`/product/deleteCategory/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted successfully");
      setIsDeleteModalOpen(false);
      setCategoryId(undefined);
      await queryClient.invalidateQueries({ queryKey: ["categories"] }); // Updated syntax
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError.message ||
        "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (): Promise<void> => {
    setLoading(true);
    try {
      await api.delete(`/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully");
      setIsDeleteProductModalOpen(false);
      setProductId(undefined);
      await queryClient.invalidateQueries({ queryKey: ["products"] }); // Updated syntax
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError.message ||
        "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (!products) return;

    if (!selectedCategory || selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product?.category === selectedCategory,
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
      {loading && <Loading />}
      {/* Show errors inside JSX instead of early return */}
      {error && (
        <p className="text-red-500 text-center mb-4">Error loading products.</p>
      )}
      {categoryError && (
        <p className="text-red-500 text-center mb-4">
          Error loading categories.
        </p>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Product Gallery</h2>
        <div className="space-x-2">
          <Button asChild variant="default">
            <Link href="/admin/products/add">
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Product
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Enter the name for your new product category.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Electronics"
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddCategory}
                  disabled={!categoryName.trim()}
                >
                  Save Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mb-4">
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
          }}
        >
          <SelectTrigger className="w-[280px] bg-black text-white">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories && categories.length > 0 ? (
              <SelectGroup>
                <SelectLabel>Product Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center">
                    <SelectItem value={category._id}>
                      {category.name}
                    </SelectItem>
                    <Trash2
                      className="text-red-500 cursor-pointer ml-2" // Added margin for better spacing
                      onClick={(e) => {
                        // Added event parameter and preventDefault
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDeleteModalOpen(true);
                        setCategoryId(category._id);
                      }}
                    />
                  </div>
                ))}
              </SelectGroup>
            ) : (
              <SelectGroup>
                <SelectLabel>No Product Categories</SelectLabel>
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
      </div>

      {isLoading || categoryLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product._id || index}
                  className="hover:shadow-xl transition-shadow bg-white"
                >
                  <CardHeader className="p-0">
                    <img
                      src={product.images?.[0] || "/placeholder-image.jpg"} // Added fallback
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-md"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg text-gray-800 font-semibold truncate">
                      {product.name}
                    </CardTitle>
                    <div className="flex text-gray-800 items-center justify-between mt-2">
                      <Badge variant="outline" className="text-gray-800">
                        ${product.price}
                      </Badge>
                      <div className="flex gap-4">
                        {/* edit */}
                        <Link href={`/admin/products/edit/${product.slug}`}>
                          <Edit className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-800" />
                        </Link>
                        {/* delete */}
                        <Trash2
                          onClick={() => {
                            setIsDeleteProductModalOpen(true);
                            setProductId(product._id);
                          }}
                          className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-white mt-10 p-6 border rounded-md border-dashed border-gray-400">
              <p className="text-xl font-semibold">No Products Found</p>
              <p className="text-sm text-gray-300 mt-2">
                Try adding a new product using the "Add Product" button above.
              </p>
            </div>
          )}
        </>
      )}

      {/* Confirm Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[100]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Confirm Delete</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Are you sure you want to delete this category?</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Confirm Delete Product Modal */}
      {isDeleteProductModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[100]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Confirm Delete</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Are you sure you want to delete this product?</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => {
                  setIsDeleteProductModalOpen(false);
                  setProductId(undefined);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteProduct}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
