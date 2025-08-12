import React from 'react';
import { X } from 'react-feather';

export default function QuailDetailModal({ quail, batch, onClose }) {
  if (!quail || !batch) return null;

  const weightsEntries = Object.entries(quail.weights);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Quail Tag #{quail.tagNumber}
        </h2>

        <p className="text-gray-700 mb-2">
          <strong>Batch:</strong> {batch.batchId} ({batch.breed})
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Sex:</strong> {quail.sex}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Status:</strong>{' '}
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              quail.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {quail.status}
          </span>
        </p>

        <section>
          <h3 className="text-xl font-semibold mb-2">Weight Records</h3>
          {weightsEntries.length === 0 ? (
            <p className="text-gray-500">No weight records available.</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 max-h-48 overflow-y-auto">
              {weightsEntries.map(([week, weight]) => (
                <li key={week}>
                  Week {week}: {weight} g
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
