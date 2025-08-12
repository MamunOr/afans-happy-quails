import { useEffect, useState } from 'react';
import Section from '../components/Section';

export default function QuailBatchesPage({ setActivePage, setActiveBatchId }) {
  // Mock data for demo — replace with API or context data
  const [batches, setBatches] = useState([
    {
      batchId: 1,
      breed: 'Coturnix',
      hatchDate: '2024-07-01',
      eggsInIncubator: 20,
      eggsHatched: 18,
      averageWeights: { 1: 50, 2: 75, 3: 85 },
      quails: [],
    },
    {
      batchId: 2,
      breed: 'Bobwhite',
      hatchDate: '2024-06-15',
      eggsInIncubator: 15,
      eggsHatched: 14,
      averageWeights: { 1: 45, 2: 70, 3: 80 },
      quails: [],
    },
  ]);

  return (
    <div className="p-6 sm:p-10 bg-green-50 min-h-screen">
      <Section title="Your Quail Batches">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batches.map((batch) => (
            <div
              key={batch.batchId}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => {
                setActiveBatchId(batch.batchId);
                setActivePage('batchDetail');
              }}
            >
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Batch {batch.batchId} — {batch.breed}
              </h3>
              <p className="text-gray-600 mb-3">
                Hatch Date: {batch.hatchDate}
              </p>
              <p className="text-gray-700 font-medium">
                Eggs in Incubator: {batch.eggsInIncubator}
              </p>
              <p className="text-gray-700 font-medium">
                Eggs Hatched: {batch.eggsHatched}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
