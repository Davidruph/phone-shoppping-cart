import { Search, X, ShoppingCart, Loader2, Heart, Menu } from "lucide-react";
const Header = ({
  search,
  setSearch,
  isSearching,
  cartItemCount,
  toggleCart,
  onMenuClick,
  wishlistItemCount,
  toggleWishlist
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MobileHub
            </h1>
            <span className="ml-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-2 py-1 rounded-full">
              Premium
            </span>
          </div>

          <div className="relative flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for phones, brands, features..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {isSearching && (
              <div className="absolute right-12 top-2.5">
                <Loader2 className="h-5 w-5 text-purple-500 animate-spin" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Wishlist button - hidden on mobile */}
            <button
              onClick={toggleWishlist}
              className="hidden md:block relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Heart className="h-6 w-6" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistItemCount}
                </span>
              )}
            </button>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
