import { useState } from "react";

export default function ServiceDetails({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    category: "Cleaning",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const stored = localStorage.getItem("extraListings");
    const extra = stored ? JSON.parse(stored) : [];

    extra.push({
      id: Date.now(),
      title: form.name,
      category: form.category,
      description: form.description,
      location: form.location,
      price: `₹${form.price}`,
      image: form.image,
    });

    localStorage.setItem("extraListings", JSON.stringify(extra));
    alert("Service added successfully ✅");
    onClose();
    window.location.reload();
  };

  return (
    <>
      {/* BLUR BACKGROUND */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />

      {/* MODAL CARD */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[480px] rounded-2xl shadow-2xl p-8 animate-scaleUp">

          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Add New Service
          </h2>

          {[
            ["Service Name", "eg. House Cleaning", "name"],
            ["Short Description", "Professional cleaning service", "description"],
            ["Location", "Bengaluru", "location"],
          ].map(([label, placeholder, key]: any) => (
            <div className="mb-4" key={key}>
              <label className="text-sm font-semibold">{label}</label>
              <input
                placeholder={placeholder}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="text-sm font-semibold">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 mt-1"
            >
              <option>Cleaning</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Gardening</option>
              <option>Painting</option>
              <option>Car Service</option>
              <option>Salon</option>
              <option>Legal</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {form.image && (
              <img src={form.image} className="h-32 w-full object-cover rounded-xl mt-2" />
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold">Price</label>
            <input
              placeholder="₹"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 mt-1"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-red-400 text-red-500 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 text-white rounded-xl shadow"
            >
              Save Service
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
