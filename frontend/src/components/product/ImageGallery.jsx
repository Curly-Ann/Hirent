import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex gap-4">

      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`w-16 h-16 p-1.5 rounded-xl border flex items-center justify-center cursor-pointer transition
              ${
                selectedImage === i
                  ? "border-purple-600 shadow-md"
                  : "border-gray-300 hover:border-purple-400"
              }`}
          >
            <img
              src={img}
              alt=""
              className="object-contain w-full h-full rounded-md"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 bg-gray-100 border rounded-xl shadow-sm flex items-center justify-center p-3">

        {/* Prev Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white  text-purple-900   border shadow-md rounded-full p-1.5 hover:bg-purple-600 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <img
          src={images[selectedImage]}
          className="w-full max-h-[280px] object-contain"
          alt="product"
        />

        {/* Next Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white  text-purple-900   border shadow-md rounded-full p-1.5 hover:bg-purple-600 hover:text-white transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`h-2 rounded-full transition-all
                ${
                  selectedImage === i
                    ? "bg-gray-900 w-5"
                    : "bg-gray-400 w-2 hover:bg-gray-600"
                }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
