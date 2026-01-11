"use client";
import { useState } from "react";

export default function CollectionPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const items = [
    { id: 1, title: "Gold Bracelet", img: "/images/Gbr1.jpg", weight: "22g", size: "Free Size", rate: "₹1,45,000" },
    { id: 2, title: "Diamond Ring", img: "/images/Dring.png", weight: "5g", size: "US 7", rate: "₹85,000" },
    { id: 3, title: "Earrings", img: "/images/Erings.png", weight: "8g", size: "Standard", rate: "₹45,000" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 pt-32">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="flex items-center justify-center cursor-pointer bg-gray-50 aspect-square p-2" onClick={() => setSelectedImage(item)}>
              <img
                src={item.img}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 mix-blend-multiply"
                alt={item.title}
              />
            </div>

            <div className="p-4 relative z-10 bg-white">
              <h3 className="text-lg md:text-xl font-bold mb-3 text-center text-gray-900 w-full block">{item.title}</h3>

              <button
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 w-full transition-colors"
                onClick={() => setSelectedImage(item)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {/* Product Details Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button - Fixed relative to screen */}
          <button
            className="fixed top-4 right-4 z-[10000] bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div
            className="flex flex-col md:flex-row bg-white rounded-xl w-full max-w-4xl md:max-h-[90vh] md:overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-gray-50 p-4 md:p-6 flex items-center justify-center min-h-[250px] md:min-h-full">
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className="w-full h-full max-h-[35vh] md:max-h-[70vh] object-contain mix-blend-multiply"
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white border-l border-gray-100 md:overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
              <div className="w-16 h-1 bg-amber-500 rounded mb-4 md:mb-6"></div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 font-medium">Weight</span>
                  <span className="text-gray-900 font-bold text-lg">{selectedImage.weight}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 font-medium">Size</span>
                  <span className="text-gray-900 font-bold text-lg">{selectedImage.size}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <span className="text-amber-800 font-bold">Rate</span>
                  <span className="text-amber-700 font-bold text-2xl">{selectedImage.rate}</span>
                </div>
              </div>

              <button className="mt-6 md:mt-8 w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-600/30 active:scale-95">
                Contact for Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
