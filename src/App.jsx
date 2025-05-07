import { useState, useEffect, useMemo, useRef, lazy, Suspense } from "react";
import productsData from "./products";
import {
  Filter,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  Loader2,
  Star,
  StarHalf,
  X
} from "lucide-react";
import { Header, Footer } from "./components";
import { useShop } from "./context/ShopContext";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";

// Lazy-loaded components
const ProductDetail = lazy(() => import("./components/ProductDetail"));

const App = () => {
  // Get cart and wishlist from context
  const {
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
    toggleWishlist,
    removeFromWishlist,
    toggleCart,
    toggleWishlistSidebar,
    setIsCartOpen,
    setIsWishlistOpen
  } = useShop();

  // State management
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pageSize = 9;

  const searchTimeout = useRef(null);
  const allTags = useMemo(
    () => [...new Set(productsData.flatMap((p) => p.tags))],
    []
  );
  const allBrands = useMemo(
    () => [...new Set(productsData.map((p) => p.brand))],
    []
  );

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    setIsSearching(true);
    searchTimeout.current = setTimeout(() => {
      setSearchQuery(search);
      setIsSearching(false);
      setPage(1);
    }, 500);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [search]);

  // Filter products
  const filtered = useMemo(() => {
    let result = [...productsData];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tag filter
    if (selectedTags.length) {
      result = result.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag))
      );
    }

    // Brand filter
    if (selectedBrands.length) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sorting
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc")
      result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "name-desc")
      result.sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [searchQuery, sortBy, selectedTags, selectedBrands, priceRange]);

  // Paginate results
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Reset filters
  const resetFilters = () => {
    setSelectedTags([]);
    setSelectedBrands([]);
    setPriceRange([0, 4000]);
    setSortBy("default");
    setSearch("");
    setSearchQuery("");
    setPage(1);
  };

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setPage(1);
  };

  // Toggle brand selection
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1);
  };

  // Handle price range change
  const handlePriceChange = (e, index) => {
    const value = Number.parseInt(e.target.value);
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setPage(1);
  };

  // Generate random rating for products
  const getRandomRating = (id) => {
    // Use product ID as seed for consistent rating
    const seed = id * 17;
    // return ((seed % 50) + 30) / 10; // Rating between 3.0 and 5.0 this can exceed 5.0
    return Math.min(((seed % 50) + 30) / 10, 5.0);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
        cartItemCount={cartItemCount}
        wishlistItemCount={wishlistItemCount}
        toggleCart={toggleCart}
        toggleWishlist={toggleWishlistSidebar}
        onMenuClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="py-2 px-3 rounded hover:bg-gray-100 text-gray-700"
              >
                Home
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded hover:bg-gray-100 text-gray-700"
              >
                Products
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded hover:bg-gray-100 text-gray-700"
              >
                Categories
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded hover:bg-gray-100 text-gray-700"
              >
                Deals
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded hover:bg-gray-100 text-gray-700"
              >
                My Account
              </a>
              <button
                onClick={toggleWishlistSidebar}
                className="py-2 px-3 rounded hover:bg-gray-100 text-gray-700 text-left flex items-center"
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist ({wishlistItemCount})
              </button>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="hidden md:flex flex-col md:w-1/4 bg-white p-4 rounded-lg shadow-sm h-fit sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Filter className="h-5 w-5 mr-2" /> Filters
              </h2>
              <button
                onClick={resetFilters}
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6 border-b pb-4">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">${priceRange[0]}</span>
                <span className="text-sm text-gray-500">${priceRange[1]}</span>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full accent-purple-600"
                />
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full accent-purple-600"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full p-1 text-sm border rounded"
                />
                <input
                  type="number"
                  min={priceRange[0]}
                  max="4000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full p-1 text-sm border rounded"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6 border-b pb-4">
              <h3 className="font-medium mb-3">Brands</h3>
              <div className="max-h-48 overflow-y-auto pr-2 space-y-1">
                {allBrands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Features/Tags Filter */}
            <div>
              <h3 className="font-medium mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-purple-100 border-purple-300 text-purple-800"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "Product" : "Products"}
                  </h2>
                  {(selectedTags.length > 0 ||
                    selectedBrands.length > 0 ||
                    searchQuery) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {searchQuery && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                          Search: {searchQuery}
                          <button
                            onClick={() => setSearch("")}
                            className="ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {selectedBrands.map((brand) => (
                        <span
                          key={brand}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
                        >
                          {brand}
                          <button
                            onClick={() => toggleBrand(brand)}
                            className="ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                      {selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center"
                        >
                          {tag}
                          <button
                            onClick={() => toggleTag(tag)}
                            className="ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-white text-gray-600"
                      }`}
                    >
                      <BsFillGridFill />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-white text-gray-600"
                      }`}
                    >
                      <FaThList />
                    </button>
                  </div>

                  <select
                    onChange={(e) => setSortBy(e.target.value)}
                    value={sortBy}
                    className="border p-2 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="default">Sort By: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isSearching && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
                <span className="ml-2 text-lg text-gray-600">
                  Searching products...
                </span>
              </div>
            )}

            {/* No Results */}
            {!isSearching && filtered.length === 0 && (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Product Grid */}
            {!isSearching && filtered.length > 0 && (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginated.map((product) => {
                      const rating = getRandomRating(product.id);
                      const fullStars = Math.floor(rating);
                      const hasHalfStar = rating % 1 >= 0.5;

                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                        >
                          <div className="relative">
                            <img
                              src={`https://placehold.co/400x400/3d4b94/ffffff?text=${
                                product.brand
                              }+${product.title.replace(/\s+/g, "+")}`}
                              alt={product.title}
                              className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                              <Heart
                                className={`h-5 w-5 ${
                                  wishlist[product.id]
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          </div>

                          <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="text-sm text-gray-500">
                                {product.brand}
                              </h3>
                              <span className="text-sm font-semibold text-purple-600">
                                ${product.price}
                              </span>
                            </div>
                            <h2
                              className="font-bold text-gray-800 mb-1 cursor-pointer hover:text-purple-700"
                              onClick={() => setSelectedProduct(product)}
                            >
                              {product.title}
                            </h2>

                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => {
                                if (i < fullStars) {
                                  return (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                  );
                                } else if (i === fullStars && hasHalfStar) {
                                  return (
                                    <StarHalf
                                      key={i}
                                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                  );
                                } else {
                                  return (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 text-gray-300"
                                    />
                                  );
                                }
                              })}
                              <span className="text-xs text-gray-500 ml-1">
                                ({((product.id * 7) % 100) + 50})
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {product.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
                                >
                                  {tag}
                                </span>
                              ))}
                              {product.tags.length > 3 && (
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                                  +{product.tags.length - 3}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors flex items-center justify-center"
                              >
                                Add to Cart
                              </button>
                              <button
                                onClick={() => setSelectedProduct(product)}
                                className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition-colors"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginated.map((product) => {
                      const rating = getRandomRating(product.id);
                      const fullStars = Math.floor(rating);
                      const hasHalfStar = rating % 1 >= 0.5;

                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
                        >
                          <div className="md:w-1/4 relative">
                            <img
                              src={`https://placehold.co/400x400/3d4b94/ffffff?text=${
                                product.brand
                              }+${product.title.replace(/\s+/g, "+")}`}
                              alt={product.title}
                              className="w-full h-48 md:h-full object-cover object-center"
                              loading="lazy"
                            />
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                              <Heart
                                className={`h-5 w-5 ${
                                  wishlist[product.id]
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          </div>

                          <div className="p-4 md:w-3/4 flex flex-col">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="text-sm text-gray-500">
                                  {product.brand}
                                </h3>
                                <h2
                                  className="font-bold text-gray-800 mb-1 cursor-pointer hover:text-purple-700"
                                  onClick={() => setSelectedProduct(product)}
                                >
                                  {product.title}
                                </h2>
                              </div>
                              <span className="text-lg font-semibold text-purple-600">
                                ${product.price}
                              </span>
                            </div>

                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => {
                                if (i < fullStars) {
                                  return (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                  );
                                } else if (i === fullStars && hasHalfStar) {
                                  return (
                                    <StarHalf
                                      key={i}
                                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                  );
                                } else {
                                  return (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 text-gray-300"
                                    />
                                  );
                                }
                              })}
                              <span className="text-xs text-gray-500 ml-1">
                                ({((product.id * 7) % 100) + 50})
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                              {product.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-2 mt-auto">
                              <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors flex items-center justify-center"
                              >
                                Add to Cart
                              </button>
                              <button
                                onClick={() => setSelectedProduct(product)}
                                className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition-colors"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {filtered.length > pageSize && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex"
                      >
                        Previous
                      </button>

                      {Array.from(
                        {
                          length: Math.min(
                            5,
                            Math.ceil(filtered.length / pageSize)
                          )
                        },
                        (_, i) => {
                          const pageNum =
                            page > 3 &&
                            Math.ceil(filtered.length / pageSize) > 5
                              ? page - 3 + i
                              : i + 1;

                          if (pageNum > Math.ceil(filtered.length / pageSize))
                            return null;

                          return (
                            <button
                              key={i}
                              onClick={() => setPage(pageNum)}
                              className={`w-8 h-8 rounded-full ${
                                page === pageNum
                                  ? "bg-purple-600 text-white"
                                  : "bg-white text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      {Math.ceil(filtered.length / pageSize) > 5 &&
                        page < Math.ceil(filtered.length / pageSize) - 2 && (
                          <>
                            <span className="text-gray-500">...</span>
                            <button
                              onClick={() =>
                                setPage(Math.ceil(filtered.length / pageSize))
                              }
                              className="w-8 h-8 rounded-full bg-white text-gray-700 hover:bg-gray-50"
                            >
                              {Math.ceil(filtered.length / pageSize)}
                            </button>
                          </>
                        )}

                      <button
                        onClick={() =>
                          setPage(
                            Math.min(
                              Math.ceil(filtered.length / pageSize),
                              page + 1
                            )
                          )
                        }
                        disabled={
                          page === Math.ceil(filtered.length / pageSize)
                        }
                        className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">
              Your Cart ({cartItemCount} items)
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {Object.keys(cart).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.values(cart).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={`https://placehold.co/100x100/3d4b94/ffffff?text=${item.brand}`}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, "subtract")}
                        className="p-1 rounded-full border hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "add")}
                        className="p-1 rounded-full border hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-50 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {Object.keys(cart).length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  ${(cartTotal * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total</span>
                <span>${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Proceed to Checkout
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full mt-2 py-3 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Wishlist Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform ${
          isWishlistOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">
              Your Wishlist ({wishlistItemCount} items)
            </h2>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {wishlistItemCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Heart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Save items you love for later by clicking the heart icon.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.values(wishlist).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={`https://placehold.co/100x100/3d4b94/ffffff?text=${item.brand}`}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 rounded-full border hover:bg-gray-100 text-purple-600"
                        title="Add to cart"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-50"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {wishlistItemCount > 0 && (
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  Object.values(wishlist).forEach((item) => addToCart(item));
                  setIsWishlistOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add All to Cart
              </button>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full mt-2 py-3 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg">
                <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              </div>
            </div>
          }
        >
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            inWishlist={!!wishlist[selectedProduct.id]}
            onToggleWishlist={() => toggleWishlist(selectedProduct)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
