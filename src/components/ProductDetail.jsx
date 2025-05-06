import { useState } from "react";
import {
  X,
  Heart,
  ShoppingCart,
  Share2,
  Star,
  StarHalf,
  ChevronRight
} from "lucide-react";

const ProductDetail = ({
  product,
  onClose,
  onAddToCart,
  inWishlist,
  onToggleWishlist
}) => {
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);

  // Generate random rating
  const rating = (((product.id * 17) % 50) + 30) / 10; // Rating between 3.0 and 5.0
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Generate multiple images for the product
  const images = [
    `https://placehold.co/600x600/3d4b94/ffffff?text=${
      product.brand
    }+${product.title.replace(/\s+/g, "+")}`,
    `https://placehold.co/600x600/5a67d8/ffffff?text=${product.brand}`,
    `https://placehold.co/600x600/7c3aed/ffffff?text=Features`,
    `https://placehold.co/600x600/9333ea/ffffff?text=Details`
  ];

  // Generate specs based on product data
  const specs = {
    display: `${Math.floor(Math.random() * 2) + 6}.${Math.floor(
      Math.random() * 9
    )}″ ${
      ["AMOLED", "Super AMOLED", "IPS LCD", "OLED"][
        Math.floor(Math.random() * 4)
      ]
    } (${[1080, 1440, 2160, 2400][Math.floor(Math.random() * 4)]} x ${
      [2400, 2340, 3200, 1080][Math.floor(Math.random() * 4)]
    })`,
    processor: `${
      ["Snapdragon", "MediaTek", "Exynos", "A16 Bionic"][
        Math.floor(Math.random() * 4)
      ]
    } ${Math.floor(Math.random() * 10) + 1}${Math.floor(
      Math.random() * 10
    )}${Math.floor(Math.random() * 10)}`,
    ram: `${[4, 6, 8, 12, 16][Math.floor(Math.random() * 5)]} GB`,
    storage: `${[64, 128, 256, 512, 1024][Math.floor(Math.random() * 5)]} GB`,
    camera: `${
      [12, 48, 50, 64, 108, 200][Math.floor(Math.random() * 6)]
    } MP main + ${
      [8, 12, 16, 32][Math.floor(Math.random() * 4)]
    } MP ultra-wide`,
    battery: `${
      [3000, 4000, 4500, 5000, 6000][Math.floor(Math.random() * 5)]
    } mAh`,
    os: product.tags.includes("iOS")
      ? "iOS 16"
      : `Android ${Math.floor(Math.random() * 4) + 10}`
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[activeImage] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={onToggleWishlist}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      activeImage === index
                        ? "border-purple-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{product.brand}</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => {
                  if (i < fullStars) {
                    return (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    );
                  } else if (i === fullStars && hasHalfStar) {
                    return (
                      <StarHalf
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    );
                  } else {
                    return <Star key={i} className="h-5 w-5 text-gray-300" />;
                  }
                })}
                <span className="text-sm text-gray-500 ml-2">
                  ({((product.id * 7) % 100) + 50} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {Math.random() > 0.5 && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${Math.floor(product.price * 1.2)}
                  </span>
                )}
                {Math.random() > 0.7 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Save ${Math.floor(product.price * 0.2)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`py-2 px-4 font-medium ${
                      activeTab === "description"
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-500"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specifications")}
                    className={`py-2 px-4 font-medium ${
                      activeTab === "specifications"
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-500"
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`py-2 px-4 font-medium ${
                      activeTab === "reviews"
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-500"
                    }`}
                  >
                    Reviews
                  </button>
                </div>

                <div className="py-4">
                  {activeTab === "description" && (
                    <div>
                      <p className="text-gray-700 mb-4">
                        {product.description}
                      </p>
                      <p className="text-gray-700">
                        Experience the next level of mobile technology with the{" "}
                        {product.title}. This cutting-edge device combines
                        powerful performance with stunning design, making it
                        perfect for both productivity and entertainment.
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <ChevronRight className="h-4 w-4 text-purple-600 mr-2" />
                          <span>Stunning {specs.display} display</span>
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-4 w-4 text-purple-600 mr-2" />
                          <span>Powerful {specs.processor} processor</span>
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-4 w-4 text-purple-600 mr-2" />
                          <span>
                            Professional-grade {specs.camera} camera system
                          </span>
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="h-4 w-4 text-purple-600 mr-2" />
                          <span>
                            All-day battery with {specs.battery} capacity
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "specifications" && (
                    <div className="space-y-4">
                      {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex border-b pb-2">
                          <span className="w-1/3 font-medium capitalize">
                            {key}
                          </span>
                          <span className="w-2/3 text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <div className="text-3xl font-bold">
                            {rating.toFixed(1)}
                          </div>
                          <div className="flex">
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
                          </div>
                          <div className="text-sm text-gray-500">
                            ({((product.id * 7) % 100) + 50} reviews)
                          </div>
                        </div>

                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((num) => {
                            const percentage =
                              num === 5
                                ? 70
                                : num === 4
                                ? 20
                                : num === 3
                                ? 7
                                : num === 2
                                ? 2
                                : 1;
                            return (
                              <div key={num} className="flex items-center">
                                <span className="text-sm text-gray-500 w-6">
                                  {num}
                                </span>
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-yellow-400 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {percentage}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sample reviews */}
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => {
                          const reviewerNames = [
                            "Alex Johnson",
                            "Sarah Miller",
                            "Michael Chen",
                            "Emma Wilson",
                            "David Garcia"
                          ];
                          const reviewTitles = [
                            "Great phone, highly recommend!",
                            "Excellent value for money",
                            "Impressive camera quality",
                            "Battery life could be better",
                            "Sleek design and fast performance"
                          ];
                          const reviewContents = [
                            "I've been using this phone for a month now and I'm very impressed with its performance. The camera quality is outstanding and battery life is excellent.",
                            "This phone exceeds expectations in almost every way. The display is vibrant, the processor is lightning fast, and the build quality is premium.",
                            "For the price point, you can't beat the features this phone offers. I especially love the camera system which takes amazing photos even in low light."
                          ];

                          return (
                            <div key={i} className="border-b pb-4">
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium">
                                  {
                                    reviewerNames[
                                      (product.id + i) % reviewerNames.length
                                    ]
                                  }
                                </div>
                                <div className="text-sm text-gray-500">
                                  {new Date(
                                    Date.now() -
                                      (i * 7 + 2) * 24 * 60 * 60 * 1000
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="flex mb-2">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-4 w-4 ${
                                      j < 4 + (i % 2)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <h4 className="font-medium mb-1">
                                {
                                  reviewTitles[
                                    (product.id + i) % reviewTitles.length
                                  ]
                                }
                              </h4>
                              <p className="text-gray-700 text-sm">
                                {reviewContents[i % reviewContents.length]}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={onToggleWishlist}
                  className={`px-6 py-3 rounded-lg border transition-colors flex items-center justify-center ${
                    inWishlist
                      ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${inWishlist ? "fill-red-500" : ""}`}
                  />
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Free shipping on orders over $50
                </p>
                <p className="flex items-center mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  30-day money-back guarantee
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  2-year warranty included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
