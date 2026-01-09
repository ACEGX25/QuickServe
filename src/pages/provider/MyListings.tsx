import { useEffect, useState } from "react";
import EditListing from "./EditListing";
import ServiceDetails from "./ServiceDetails";

const defaultListings = [
  {
    id: 1,
    title: "Home Cleaning",
    price: "₹1200",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    id: 2,
    title: "Electrical Work",
    price: "₹1200",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
  },
  {
    id: 3,
    title: "Plumbing",
    price: "₹1200",
    category: "Plumbing",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4p-UKxdcA_5DOb2sZN_AL2GnK4Q7pjoPhQ&s",
  },
];

export default function MyListings() {
  const [listings, setListings] = useState<any[]>([]);
  const [editItem, setEditItem] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("extraListings");
    const extra = stored ? JSON.parse(stored) : [];
    setListings([...defaultListings, ...extra]);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8f6] px-10 pt-8 relative">

      <h1 className="text-2xl font-semibold">Your Listings</h1>
      <p className="text-gray-500">Manage the services you offer to customers.</p>

      <div className="mt-6 flex gap-6 flex-wrap">

        {listings.map((item) => (
          <div key={item.id} className="bg-white rounded-xl w-72 shadow">
            <img src={item.image} className="h-36 w-full object-cover rounded-t-xl" />

            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">🏠 {item.category}</p>
              <p className="mt-2 font-medium">Price – {item.price}</p>

              <button
                onClick={() => setEditItem(item)}
                className="mt-3 w-full bg-green-500 text-white px-3 py-1.5 rounded-full"
              >
                Edit Listing
              </button>
            </div>
          </div>
        ))}

        {/* Create New Listing Card */}
        <div
          onClick={() => setShowAdd(true)}
          className="w-72 h-[220px] border-2 border-dashed border-green-400 rounded-xl flex flex-col items-center justify-center text-green-700 hover:bg-green-50 transition cursor-pointer"
        >
          <div className="text-3xl font-bold">+</div>
          <p className="mt-2 text-sm font-medium">Create New Listings</p>
        </div>
      </div>

      {/* ADD SERVICE MODAL */}
      {showAdd && <ServiceDetails onClose={() => setShowAdd(false)} />}

      {/* EDIT MODAL */}
      {editItem && (
        <EditListing
          listing={editItem}
          onClose={() => setEditItem(null)}
          onSave={(updated) => {
            setListings((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
            setEditItem(null);
          }}
          onRemove={(id) => {
            setListings((prev) => prev.filter((l) => l.id !== id));
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
}
