import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  productId: string;
  productName?: string;
  productPrice: number;
  productColor: string;
  productQuantity: number;
  productTotalPrice: number;
  productImage: string;
  [key: string]: any; // For any additional dynamic props
};

type CartContextType = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  fetchCartItems: () => void;
  addOrUpdateItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (productId: string, change: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const fetchCartItems = () => {
    const request = window.indexedDB.open("cartDb", 2);

    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("cartItems")) {
        db.createObjectStore("cartItems", { keyPath: "productId" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("cartItems")) {
        console.error("cartItems store not found in cartDb");
        return;
      }

      const transaction = db.transaction("cartItems", "readonly");
      const store = transaction.objectStore("cartItems");
      const getAllItemsRequest = store.getAll();

      getAllItemsRequest.onsuccess = () => {
        const items = getAllItemsRequest.result as CartItem[];
        setCartItems(items);

        const quantity = items.reduce(
          (acc, item) => acc + item.productQuantity,
          0
        );
        const total = items.reduce(
          (acc, item) =>
            acc + parseFloat(item.productTotalPrice?.toString() || "0"),
          0
        );

        setTotalQuantity(quantity);
        setTotalPrice(total);
      };

      getAllItemsRequest.onerror = () => {
        console.error("Error fetching cart items from IndexedDB");
      };
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
    };
  };

  const addOrUpdateItem = (newItem: CartItem) => {
    const request = window.indexedDB.open("cartDb", 2);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("cartItems", "readwrite");
      const store = transaction.objectStore("cartItems");

      const getRequest = store.get(newItem.productId);

      getRequest.onsuccess = () => {
        const existingItem = getRequest.result as CartItem | undefined;

        if (existingItem) {
          existingItem.productQuantity += newItem.productQuantity;
          existingItem.productTotalPrice += newItem.productTotalPrice;

          const updateRequest = store.put(existingItem);
          updateRequest.onsuccess = fetchCartItems;
          updateRequest.onerror = () => console.error("Failed to update item");
        } else {
          const addRequest = store.add(newItem);
          addRequest.onsuccess = fetchCartItems;
          addRequest.onerror = () => console.error("Failed to add new item");
        }
      };

      getRequest.onerror = () =>
        console.error("Error fetching item from IndexedDB");
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
    };
  };

  const removeItem = (id: string) => {
    const request = window.indexedDB.open("cartDb", 2);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("cartItems", "readwrite");
      const store = transaction.objectStore("cartItems");

      const deleteRequest = store.delete(id);
      deleteRequest.onsuccess = fetchCartItems;
      deleteRequest.onerror = () => {
        console.error(`Failed to remove item with id ${id}`);
      };
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
    };
  };

  const updateItemQuantity = (productId: string, change: number) => {
    const request = window.indexedDB.open("cartDb", 2);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("cartItems", "readwrite");
      const store = transaction.objectStore("cartItems");

      const getRequest = store.get(productId);

      getRequest.onsuccess = () => {
        const item = getRequest.result as CartItem | undefined;
        if (item) {
          item.productQuantity += change;

          if (item.productQuantity <= 0) {
            removeItem(productId);
          } else {
            item.productTotalPrice = item.productPrice * item.productQuantity;

            const updateRequest = store.put(item);
            updateRequest.onsuccess = fetchCartItems;
            updateRequest.onerror = () => {
              console.error("Failed to update item quantity");
            };
          }
        }
      };

      getRequest.onerror = () => {
        console.error("Error fetching item from IndexedDB");
      };
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
    };
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantity,
        fetchCartItems,
        addOrUpdateItem,
        removeItem,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
