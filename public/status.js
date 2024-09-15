import { createRoot } from 'react-dom/client'
import { Search, BarChart2, Users, Database, Settings, LogOut, Menu, X } from 'lucide-react';

const gameData = [
  {
    name: "8 Ball Pool",
    slug: "8-ball-pool",
    query: "?id=xxxx",
    endpoint: "/api/game/8-ball-pool",
    hasZoneId: false,
    listZoneId: null,
    players: 1000000,
    revenue: 500000,
  },
  {
    name: "ASTRA: Knights of Veda",
    slug: "astra-knights-of-veda",
    query: "?id=xxxx&zone=xxx",
    endpoint: "/api/game/astra-knights-of-veda",
    hasZoneId: true,
    listZoneId: "/api/game/get-zone/astra-knights-of-veda",
    players: 500000,
    revenue: 250000,
  },
  // Tambahkan data lainnya sesuai kebutuhan
];

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
      <span className="text-xl font-semibold">Game Dashboard</span>
      <button onClick={toggleSidebar} className="lg:hidden">
        <X size={24} />
      </button>
    </div>
    <nav className="mt-5">
      <a className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white" href="#"><BarChart2 className="mr-3" size={20} />Overview</a>
      <a className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white" href="#"><Users className="mr-3" size={20} />Players</a>
      <a className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white" href="#"><Database className="mr-3" size={20} />Games</a>
      <a className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white" href="#"><Settings className="mr-3" size={20} />Settings</a>
    </nav>
  </div>
);

const Header = ({ toggleSidebar }) => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <button onClick={toggleSidebar} className="lg:hidden">
        <Menu size={24} />
      </button>
      <div className="relative">
        <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <div className="flex items-center">
        <button className="mr-4 text-gray-600 hover:text-gray-800">
          <LogOut size={20} />
        </button>
        <img src="/api/placeholder/40/40" alt="User Avatar" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  </header>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">8,282</h4>
                      <div className="text-gray-500">New Players</div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">200</h4>
                      <div className="text-gray-500">Total Games</div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                      <BarChart2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">215,542</h4>
                      <div className="text-gray-500">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Players</th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {gameData.map((game, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src={`/api/placeholder/40/40?text=${game.name.charAt(0)}`} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm leading-5 font-medium text-gray-900">{game.name}</div>
                                  <div className="text-sm leading-5 text-gray-500">{game.endpoint}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">{game.slug}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">{game.players.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">${game.revenue.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
