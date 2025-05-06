import { createContext, useContext, useEffect, useState } from "react";

// Create context
const ShopContext = createContext(null);

// Custom hook to use the shop context
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      const storedWishlist = localStorage.getItem("wishlist");

      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlist]);

  // Cart functions
  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: (prev[product.id]?.quantity || 0) + 1
      }
    }));

    // Show cart briefly
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const updateQuantity = (id, action) => {
    setCart((prev) => {
      const updated = { ...prev };
      console.log(updated[id]);
      if (updated[id]) {
        if (action === "add") {
          updated[id].quantity = Math.max(1, updated[id].quantity + 1);
        } else if (action === "subtract") {
          updated[id].quantity = Math.max(1, updated[id].quantity - 1);
        }
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      if (prev[product.id]) {
        const newWishlist = { ...prev };
        delete newWishlist[product.id];
        return newWishlist;
      } else {
        return { ...prev, [product.id]: product };
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const newWishlist = { ...prev };
      delete newWishlist[id];
      return newWishlist;
    });
  };

  const clearWishlist = () => {
    setWishlist({});
  };

  // Calculate cart total
  const cartTotal = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartItemCount = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const wishlistItemCount = Object.keys(wishlist).length;

  // Toggle cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isWishlistOpen) setIsWishlistOpen(false);
  };

  // Toggle wishlist sidebar
  const toggleWishlistSidebar = () => {
    setIsWishlistOpen(!isWishlistOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  // Context value
  const value = {
    cart,
    wishlist,
    isCartOpen,
    isWishlistOpen,
    cartTotal,
    cartItemCount,
    wishlistItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    toggleCart,
    toggleWishlistSidebar,
    setIsCartOpen,
    setIsWishlistOpen
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
