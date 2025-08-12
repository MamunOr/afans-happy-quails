import { useState } from 'react';
import Section from '../components/Section';
import StatCard from '../components/StatCard';
import { calculateAgeInWeeks } from '../utils/calcAge';
import { Plus } from 'lucide-react';

export default function BatchDetailPage({ batch, onBack, onSelectQuail }) {
  const hatchPercentage = batch.eggsInIncubator === 0 ? 0 : Math.round((batch.eggsHatched / batch.eggsInIncubator) * 100);

  return (
    <div className="p-6 sm:p-10 bg-green-50/50 min-h-screen">
      <button
        onClick={onBack}
        className="text-green-700 hover:underline mb-6"
      >
        &larr; Back to All Batches
      </button>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-900">Batch {batch.batchId}</h1>
          <p className="text-lg text-gray-600">
            {batch.breed} - Hatched on {batch.hatchDate}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors">
          <Plus size={18} /> Add Tagged Quail
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <StatCard
          icon={<div className="text-white">🥚</div>}
          title="Eggs in Incubator"
          value={batch.eggsInIncubator}
          color="bg-blue-500"
        />
        <StatCard
          icon={<div className="text-white">🐣</div>}
          title="Chicks Hatched"
          value={batch.eggsHatched}
          color="bg-yellow-500"
        />
        <StatCard
          icon={<div className="text-white">📈</div>}
          title="Hatch Rate"
          value={`${hatchPercentage}%`}
          color="bg-teal-500"
        />
      </div>

      <Section title="Pre-Tagging Average Weights (Weeks 1-3)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {Object.entries(batch.averageWeights).map(([week, weight]) => (
            <div
              key={week}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center"
            >
              <p className="font-semibold text-gray-700">Week {week}</p>
              <p className="text-2xl font-bold mt-2">{weight}g</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tagged Quails (3+ Weeks Old)">
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold border-b">Tag ID</th>
                <th className="p-4 font-semibold border-b">Sex</th>
                <th className="p-4 font-semibold border-b">Age (wks)</th>
                <th className="p-4 font-semibold border-b">Latest Weight (g)</th>
                <th className="p-4 font-semibold border-b">Status</th>
                <th className="p-4 font-semibold border-b"></th>
              </tr>
            </thead>
            <tbody>
              {batch.quails.map((quail) => {
                const weights = Object.values(quail.weights);
                const latestWeight =
                  weights.length > 0 ? weights[weights.length - 1] : 'N/A';
                const age = calculateAgeInWeeks(batch.hatchDate);
                return (
                  <tr
                    key={quail.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSelectQuail(quail)}
                  >
                    <td className="p-4 border-b">
                      <span
                        className="font-mono px-2 py-1 rounded"
                        style={{
                          backgroundColor: quail.tagColor.toLowerCase(),
                          color: 'white',
                        }}
                      >
                        {quail.tagNumber}
                      </span>
                    </td>
                    <td className="p-4 border-b">{quail.sex}</td>
                    <td className="p-4 border-b">{age}</td>
                    <td className="p-4 border-b">{latestWeight}</td>
                    <td className="p-4 border-b">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          quail.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {quail.status}
                      </span>
                    </td>
                    <td className="p-4 border-b text-right">
                      <button className="text-green-600 hover:underline font-semibold">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
