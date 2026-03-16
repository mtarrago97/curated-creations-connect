import React from "react";

export default function CreateAuctionPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8 mt-10">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Start a New Auction</h1>

        {/* Auction Title */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Auction Title</label>
          <input
            type="text"
            placeholder="Enter a catchy title"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            placeholder="Describe your item, its story, condition, or uniqueness..."
            rows={5}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Photo Upload */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full border rounded-xl p-3 bg-white"
          />
        </div>

        {/* Starting Price */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Starting Price (€)</label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Auction Duration */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Auction Duration</label>
          <select className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>24 hours</option>
            <option>3 days</option>
            <option>7 days</option>
            <option>14 days</option>
          </select>
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 rounded-xl transition">
            Publish Auction
          </button>
        </div>
      </div>
    </div>
  );
}
