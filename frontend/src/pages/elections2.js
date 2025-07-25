import { useState } from "react";
import Link from "next/link";

export default function Elections() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample elections data
  const elections = [
    {
      id: 1,
      title: "Presidential Election 2024",
      description: "Choose the next President of the United States. This historic election will determine the country's direction for the next four years.",
      startDate: "2024-11-05",
      endDate: "2024-11-05",
      status: "upcoming",
      category: "federal",
      candidates: 4,
      registeredVoters: 158432,
      image: "/election-1.jpg"
    },
    {
      id: 2,
      title: "Mayoral Election - Springfield",
      description: "Elect the next Mayor of Springfield. Candidates will address local issues including infrastructure, education, and economic development.",
      startDate: "2024-03-15",
      endDate: "2024-03-15",
      status: "active",
      category: "local",
      candidates: 3,
      registeredVoters: 45623,
      votes: 12847,
      image: "/election-2.jpg"
    },
    {
      id: 3,
      title: "School Board Election",
      description: "Choose representatives for the District Education Board. These members will make important decisions about curriculum and school policies.",
      startDate: "2024-02-20",
      endDate: "2024-02-20",
      status: "completed",
      category: "education",
      candidates: 6,
      registeredVoters: 23154,
      votes: 18923,
      image: "/election-3.jpg"
    },
    {
      id: 4,
      title: "State Governor Election",
      description: "Select the next State Governor. The winner will lead state initiatives in healthcare, education, and economic policy.",
      startDate: "2024-04-10",
      endDate: "2024-04-10",
      status: "upcoming",
      category: "state",
      candidates: 5,
      registeredVoters: 892334,
      image: "/election-4.jpg"
    },
    {
      id: 5,
      title: "City Council District 3",
      description: "Elect your representative for City Council District 3. Focus on local infrastructure, housing, and community development.",
      startDate: "2024-05-18",
      endDate: "2024-05-18",
      status: "upcoming",
      category: "local",
      candidates: 4,
      registeredVoters: 12845,
      image: "/election-5.jpg"
    },
    {
      id: 6,
      title: "Student Government President",
      description: "University student body election for Student Government President. Shape campus policies and student life initiatives.",
      startDate: "2024-02-28",
      endDate: "2024-02-28",
      status: "active",
      category: "student",
      candidates: 3,
      registeredVoters: 8976,
      votes: 3456,
      image: "/election-6.jpg"
    }
  ];

  const filteredElections = elections.filter(election => {
    const matchesFilter = filter === 'all' || election.status === filter;
    const matchesSearch = election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         election.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'federal': return 'bg-purple-100 text-purple-700';
      case 'state': return 'bg-blue-100 text-blue-700';
      case 'local': return 'bg-green-100 text-green-700';
      case 'education': return 'bg-orange-100 text-orange-700';
      case 'student': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="1" />
            </radialGradient>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#60a5fa" fillOpacity="0.18" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-gradient)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-blue-200 shadow-sm">
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 text-blue-700">
            <div className="size-10 text-sky-500">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                </defs>
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="url(#logo-gradient)" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-blue-900 text-2xl font-extrabold leading-tight tracking-[-0.015em]">VoteWise</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-blue-700 hover:text-blue-900 font-medium">Dashboard</Link>
            <Link href="/admin" className="text-blue-700 hover:text-blue-900 font-medium">Admin</Link>
            <Link href="/" className="text-blue-700 hover:text-blue-900 font-medium">Home</Link>
          </div>
        </nav>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Ongoing Elections
          </h1>
          <p className="text-xl text-blue-600 max-w-3xl mx-auto">
            Participate in democracy by casting your vote in ongoing elections. 
            Your voice matters in shaping the future of your community.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search elections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'active', 'upcoming', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                    filter === status
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-blue-200 text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {elections.filter(e => e.status === 'active').length}
            </div>
            <div className="text-blue-600 font-medium">Active Elections</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-blue-200 text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {elections.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-blue-600 font-medium">Upcoming Elections</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-blue-200 text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {elections.reduce((total, e) => total + e.candidates, 0)}
            </div>
            <div className="text-blue-600 font-medium">Total Candidates</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-blue-200 text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {elections.reduce((total, e) => total + e.registeredVoters, 0).toLocaleString()}
            </div>
            <div className="text-blue-600 font-medium">Registered Voters</div>
          </div>
        </div>

        {/* Elections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElections.map((election) => (
            <div key={election.id} className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Election Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>

              <div className="p-6">
                {/* Status and Category */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(election.status)}`}>
                    {election.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryColor(election.category)}`}>
                    {election.category}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {election.title}
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {election.description}
                </p>

                {/* Election Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Candidates:</span>
                    <span className="font-medium text-blue-900">{election.candidates}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Registered Voters:</span>
                    <span className="font-medium text-blue-900">{election.registeredVoters.toLocaleString()}</span>
                  </div>
                  {election.votes && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Votes Cast:</span>
                      <span className="font-medium text-green-700">{election.votes.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Date:</span>
                    <span className="font-medium text-blue-900">
                      {new Date(election.startDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link 
                    href={`/election/${election.id}`}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium text-center hover:shadow-lg transition-all"
                  >
                    {election.status === 'active' ? 'Vote Now' : 'View Details'}
                  </Link>
                  {election.status === 'active' && (
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredElections.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">No Elections Found</h3>
            <p className="text-blue-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Democracy works best when everyone participates. Register to vote and stay informed about upcoming elections in your area.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/voter-auth" className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Login to Vote
            </Link>
            <Link href="/voter-auth" className="px-8 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors">
              Register as Voter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
