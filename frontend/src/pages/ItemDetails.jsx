import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, MessageSquare, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

// Helper function to fetch updated count from backend
const fetchWishlistCount = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/api/wishlist/count', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error('Error fetching wishlist count:', error);
    return 0;
  }
};

const fetchCollectionCount = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/api/collection/count', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error('Error fetching collection count:', error);
    return 0;
  }
};

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, updateWishlistCount, updateCollectionCount } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const [inCollection, setInCollection] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/${id}`);
        const data = await response.json();
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item:', error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleWishlistToggle = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = inWishlist ? 'remove' : 'add';
      const response = await fetch(`http://localhost:5000/api/wishlist/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ itemId: id })
      });

      if (response.ok) {
        const data = await response.json();
        setInWishlist(!inWishlist);
        // Update the wishlist count in navbar with the count from response
        updateWishlistCount(data.count);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const handleCollectionToggle = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = inCollection ? 'remove' : 'add';
      const response = await fetch(`http://localhost:5000/api/collection/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ itemId: id })
      });

      if (response.ok) {
        const data = await response.json();
        setInCollection(!inCollection);
        // Update the collection count in navbar with the count from response
        updateCollectionCount(data.count);
      }
    } catch (error) {
      console.error('Error toggling collection:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Item not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7A1CA9] to-[#A855B6] text-white p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            {item.images && item.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {item.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-75"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
              <p className="text-gray-500 mt-2">{item.category}</p>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-[#7A1CA9]">
              ₱{item.price?.toLocaleString() || 'N/A'}
              <span className="text-lg text-gray-500 ml-2">per day</span>
            </div>

            {/* Owner Info */}
            {item.owner && (
              <div className="bg-white rounded-xl p-4 border-l-4 border-[#7A1CA9]">
                <p className="text-sm text-gray-500 mb-2">Listed by</p>
                <div className="flex items-center gap-3">
                  {item.owner.avatar ? (
                    <img
                      src={item.owner.avatar}
                      alt={item.owner.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7A1CA9] to-[#A855B6]" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{item.owner.name}</p>
                    <p className="text-sm text-gray-500">{item.owner.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {item.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            )}

            {/* Location */}
            {item.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <span>📍</span>
                <span>{item.location}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    inWishlist
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                  {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                </button>

                <button
                  onClick={handleCollectionToggle}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    inCollection
                      ? 'bg-purple-100 text-[#7A1CA9]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingBag size={20} />
                  {inCollection ? 'In Collection' : 'Add to Collection'}
                </button>
              </div>

              <button className="w-full bg-gradient-to-r from-[#7A1CA9] to-[#A855B6] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <MessageSquare size={20} />
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
