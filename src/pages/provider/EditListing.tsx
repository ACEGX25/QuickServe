import { useState } from "react";

export default function EditListing({
  listing,
  onSave,
  onRemove,
  onClose,
}: any) {
  const [data, setData] = useState(listing);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          Service Details
        </h2>

        <input
          value={data.title}
          onChange={(e) =>
            setData({ ...data, title: e.target.value })
          }
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <input
          value={data.price.replace("₹", "")}
          onChange={(e) =>
            setData({ ...data, price: `₹${e.target.value}` })
          }
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={() => onRemove(data.id)}
            className="border border-red-500 text-red-500 px-3 py-2 rounded"
          >
            Remove Listing
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="border px-3 py-2 rounded"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                alert("Changes saved successfully ✅");
                onSave(data);
              }}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
