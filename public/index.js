import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import GameTable from './components/GameTable';

const Dashboard = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch('https://api.omegatronik.co.id');
      const jsonResponse = await response.json();
      setGames(jsonResponse.data);
      setFilteredGames(jsonResponse.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = games.filter(game => 
      game.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredGames(filtered);
    setCurrentPage(1);
  };

  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        <StatsGrid totalGames={games.length} />
        <GameTable 
          games={filteredGames}
          currentPage={currentPage}
          entriesPerPage={entriesPerPage}
          onPageChange={setCurrentPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
};

export default Dashboard;
