import { toast } from "sonner"; // or your preferred toast lib

// Define the shape of the product
interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[];
}

// Define the cart item structure in IndexedDB
interface CartItem {
  id: string; // Use product._id as the primary key
  productId: string;
  productPrice: number;
  productName: string;
  productColor: string;
  productQuantity: number;
  productTotalPrice: number;
  productImage: string;
}

const DB_NAME = "cartDb";
const DB_VERSION = 2;
const STORE_NAME = "cartItems";

// Open DB connection
const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id", // product._id will be the unique key
        });
        console.log(`Object store '${STORE_NAME}' created.`);
      } else {
        console.log(`Object store '${STORE_NAME}' already exists.`);
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log("IndexedDB opened successfully");
      resolve(db);
    };

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", request.error);
      reject(request.error);
    };
  });
};

export default async function addToCartDb(
  product: Product,
  color: string,
  quantity: number,
  totalPrice: number
): Promise<void> {
  try {
    const db = await openDb();

    if (!db.objectStoreNames.contains(STORE_NAME)) {
      console.error(`Object store '${STORE_NAME}' not found.`);
      return;
    }

    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const getRequest = store.get(product._id);

    getRequest.onsuccess = () => {
      const existingItem = getRequest.result as CartItem | undefined;

      if (existingItem) {
        // Update existing item
        existingItem.productQuantity += quantity;
        existingItem.productTotalPrice += totalPrice;

        const updateRequest = store.put(existingItem);

        updateRequest.onsuccess = () => {
          toast.success("Cart updated successfully!", {
            duration: 1000,
            onAutoClose: () => window.location.reload(),
          });
        };

        updateRequest.onerror = (event) => {
          console.error(
            "Error updating item:",
            (event.target as IDBRequest).error
          );
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product._id,
          productId: product._id,
          productPrice: product.price,
          productName: product.name,
          productColor: color,
          productQuantity: quantity,
          productTotalPrice: totalPrice,
          productImage: product.images?.[0] || "",
        };

        const addRequest = store.add(newItem);

        addRequest.onsuccess = () => {
          toast.success("Item added to cart!", {
            duration: 1000,
            onAutoClose: () => window.location.reload(),
          });
        };

        addRequest.onerror = (event) => {
          console.error(
            "Error adding item:",
            (event.target as IDBRequest).error
          );
        };
      }
    };

    getRequest.onerror = (event) => {
      console.error(
        "Error checking existing item:",
        (event.target as IDBRequest).error
      );
    };

    transaction.oncomplete = () => {
      console.log("Transaction completed");
    };

    transaction.onerror = (event) => {
      console.error(
        "Transaction error:",
        (event.target as IDBTransaction).error
      );
    };
  } catch (error) {
    console.error("Error interacting with IndexedDB:", error);
  }
}
