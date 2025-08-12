import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { Feather, Coffee, Star } from 'react-feather';
import Section from '../components/Section'; // Your Section wrapper component
import StatCard from '../components/StatCard';

export default function Dashboard({ setActivePage }) {
  // Replace these with props or context or fetch in a real app
  const initialInventory = {
    quails: 120,
    chicks: 35,
    eggs: 200,
    feedKg: 350,
    grainKg: 120,
  };

  const initialFinancials = {
    revenue: 7500,
    expenses: 4200,
  };

  const [inventory] = useState(initialInventory);
  const [financials] = useState(initialFinancials);

  const profit = financials.revenue - financials.expenses;

  const financialData = [
    { name: 'Revenue', value: financials.revenue },
    { name: 'Expenses', value: financials.expenses },
    { name: 'Profit', value: profit },
  ];

  const inventoryPieData = [
    { name: 'Quails', value: inventory.quails },
    { name: 'Chicks', value: inventory.chicks },
    { name: 'Eggs', value: inventory.eggs },
  ];

  const COLORS = ['#3a5a40', '#588157', '#a3b18a'];

  return (
    <div className="p-4 sm:p-8 bg-green-50/50 min-h-screen max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-green-900 mb-8">My Quail Dashboard</h2>

      <div className="bg-green-800 text-white p-6 rounded-2xl shadow-lg mb-8 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Flock Management</h3>
          <p>Go to the detailed view of all your quail batches and individual birds.</p>
        </div>
        <button
          onClick={() => setActivePage('batches')}
          className="bg-white text-green-800 py-2 px-4 rounded-lg font-semibold hover:bg-green-100 transition-colors flex items-center gap-2"
        >
          Manage My Flock <Feather size={18} />
        </button>
      </div>

      <Section title="Live Inventory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard
            icon={<Feather className="w-6 h-6 text-white" />}
            title="Adult Quails"
            value={inventory.quails}
            color="bg-green-700"
          />
          <StatCard
            icon={<Feather className="w-6 h-6 text-white" style={{ width: '20px', height: '20px' }} />}
            title="Chicks"
            value={inventory.chicks}
            color="bg-green-600"
          />
          <StatCard
            icon={<Egg className="w-6 h-6 text-white" />}
            title="Eggs"
            value={inventory.eggs}
            unit="dozen"
            color="bg-yellow-500"
          />
        </div>
      </Section>

      <Section title="Feed & Supplies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={<Wheat className="w-6 h-6 text-white" />}
            title="Feed Stock"
            value={inventory.feedKg}
            unit="kg"
            color="bg-orange-500"
          />
          <StatCard
            icon={<Wheat className="w-6 h-6 text-white" />}
            title="Grain Stock"
            value={inventory.grainKg}
            unit="kg"
            color="bg-yellow-600"
          />
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Financial Overview">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financialData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#588157" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Inventory Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </div>
  );
}
