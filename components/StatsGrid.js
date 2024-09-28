import React from 'react';

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <h3 className="text-3xl font-semibold text-blue-600 mb-2">{value}</h3>
    <p className="text-gray-600 text-sm font-medium">{title}</p>
  </div>
);

const StatsGrid = ({ totalGames }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard title="Pemain Baru" value="8,282" />
      <StatCard title="Total Game" value={totalGames} />
      <StatCard title="Retensi Pemain" value="65%" />
    </div>
  );
};

export default StatsGrid;
