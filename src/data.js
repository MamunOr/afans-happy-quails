// src/data.js

export const OWNER_EMAIL = "owner@example.com";

export const initialUsers = [
  {
    id: 1,
    name: "Mamun",
    email: "mamun@example.com",
    orders: [
      { id: 101, date: "2025-07-01", total: 59.99, items: ["Eggs", "Feed"] },
    ],
  },
  // more users...
];

export const initialQuailBatches = [
  {
    batchId: "B001",
    breed: "Coturnix",
    quails: [
      {
        tagNumber: "Q001",
        sex: "Male",
        status: "Active",
        weights: {
          1: 50,
          2: 65,
          3: 80,
        },
      },
      // more quails...
    ],
  },
  // more batches...
];

export const initialInventory = {
  quails: 120,
  chicks: 35,
  eggs: 200,
  feedKg: 350,
  grainKg: 120,
};

export const initialFinancials = {
  revenue: 7500,
  expenses: 4200,
};
