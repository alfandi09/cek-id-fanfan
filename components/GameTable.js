import React from 'react';

const GameTable = ({ games, currentPage, entriesPerPage, onPageChange, onEntriesPerPageChange, searchTerm }) => {
  const indexOfLastGame = currentPage * entriesPerPage;
  const indexOfFirstGame = indexOfLastGame - entriesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(games.length / entriesPerPage);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-600">Daftar Game</h2>
        <div className="flex items-center space-x-4">
          <select
            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onEntriesPerPageChange(Number(e.target.value))}
            value={entriesPerPage}
          >
            <option value={10}>10 entri</option>
            <option value={20}>20 entri</option>
            <option value={50}>50 entri</option>
          </select>
          <input
            type="text"
            placeholder="Cari game..."
            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => onEntriesPerPageChange(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Nama Game</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Slug</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Query</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Endpoint</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">hasZoneId</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">listZoneId</th>
            </tr>
          </thead>
          <tbody>
            {currentGames.map((game, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{game.name}</td>
                <td className="px-4 py-2">{game.slug}</td>
                <td className="px-4 py-2">{game.query}</td>
                <td className="px-4 py-2">{game.endpoint}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${game.hasZoneId ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {game.hasZoneId ? 'Ya' : 'Tidak'}
                  </span>
                </td>
                <td className="px-4 py-2">{game.listZoneId || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {renderPagination()}
      </div>
    </div>
  );
};

export default GameTable;
