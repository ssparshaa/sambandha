"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import api from "@/../config/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TextEditor from "@/components/TextEditor";

interface Props {
  slug: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  colors: string[];
}

interface Category {
  id: string;
  name: string;
}

interface ImageItem {
  url: string;
  isExisting: boolean;
  originalPath?: string; // Store the original path from server
}

const fetchProductDetails = async (slug: string): Promise<Product> => {
  const token = Cookies.get("token");
  const { data } = await api.get(`/product/single/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

const Edit: NextPage<Props> = ({ slug }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const token = Cookies.get("token");
  const router = useRouter();

  const [colors, setColors] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState("#000000");

  const addColor = () => {
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const removeColor = (index: number) => {
    const updated = [...colors];
    updated.splice(index, 1);
    setColors(updated);
  };

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductDetails(slug),
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : "");
      setCategory(product.category);
      setColors(product.colors || []);

      // Initialize existing images
      if (product.images && product.images.length > 0) {
        const existingImages: ImageItem[] = product.images.map(
          (imgPath: string) => ({
            url: imgPath.startsWith("http")
              ? imgPath
              : `${api.defaults.baseURL}/${imgPath}`,
            isExisting: true,
            originalPath: imgPath,
          }),
        );
        setImageItems(existingImages);
      }
    }
  }, [product]);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    // Create preview URLs and add to imageItems
    const newImageItems: ImageItem[] = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      isExisting: false,
    }));

    setNewImages((prev) => [...prev, ...selectedFiles]);
    setImageItems((prev) => [...prev, ...newImageItems]);
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = imageItems[index];

    if (imageToRemove.isExisting && imageToRemove.originalPath) {
      // Track removed existing images
      setRemovedImages((prev) => [...prev, imageToRemove.originalPath!]);
    } else {
      // Remove from newImages array
      const newImageIndex = imageItems
        .slice(0, index)
        .filter((img) => !img.isExisting).length;

      setNewImages((prev) => prev.filter((_, i) => i !== newImageIndex));

      // Revoke object URL to free memory
      URL.revokeObjectURL(imageToRemove.url);
    }

    // Remove from imageItems
    setImageItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !price ||
      !category ||
      imageItems.length === 0 ||
      colors.length === 0
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (originalPrice) formData.append("originalPrice", originalPrice);
    formData.append("category", category);
    formData.append("colors", JSON.stringify(colors));

    // Add remaining existing images (images that weren't removed)
    const remainingExistingImages = imageItems
      .filter((img) => img.isExisting)
      .map((img) => img.originalPath);
    formData.append("existingImages", JSON.stringify(remainingExistingImages));

    // Add removed images
    formData.append("removedImages", JSON.stringify(removedImages));

    // Add new images
    newImages.forEach((img) => formData.append("images", img));

    try {
      await api.put(`/product/${product._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully!", {
        duration: 1000,
        onAutoClose: () => {
          router.push("/admin/products");
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit product.");
    }
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imageItems
        .filter((img) => !img.isExisting)
        .forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  if (productLoading) {
    return (
      <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2 flex items-center justify-center">
        <p className="text-white">Loading product...</p>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2 flex items-center justify-center">
        <p className="text-red-500">Error loading product</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
      <div className="flex flex-col items-center mt-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Product Name"
                />
              </div>

              <div>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Product Price"
                />
              </div>

              <div>
                <Label>Original Price (before discount, optional)</Label>
                <Input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Enter Original Price"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(val) => setCategory(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {isLoading ? (
                        <p className="px-2 text-muted-foreground text-sm">
                          Loading...
                        </p>
                      ) : categories?.length > 0 ? (
                        categories.map((cat: any) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="px-2 text-sm text-destructive">
                          No categories found
                        </p>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Colors</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="w-12 h-10 p-0 border-none"
                  />
                  <Button type="button" onClick={addColor}>
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full relative border-2 border-black"
                      style={{ backgroundColor: color }}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute -top-2 -right-2 w-4 h-4 p-0"
                        onClick={() => removeColor(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <div className="my-2">
                  <TextEditor
                    message={description}
                    setMessage={setDescription}
                  />
                </div>
              </div>

              <div>
                <Label>Images</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="flex flex-wrap gap-3 mt-3">
                  {imageItems.map((item, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <Image
                        src={item.url}
                        alt={`Preview ${index}`}
                        fill
                        className="object-cover rounded-md"
                      />
                      {item.isExisting && (
                        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-tl-md rounded-br-md">
                          Old
                        </div>
                      )}
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                {removedImages.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {removedImages.length} image(s) will be removed
                  </p>
                )}
              </div>

              <div className="pt-4">
                <Button onClick={handleSubmit} className="w-full">
                  Update Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Edit;
