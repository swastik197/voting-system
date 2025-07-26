import { useState } from "react";
import Link from "next/link";
import {election} from "@/config/electionsCollection_Data";
export default function Elections() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const[elections , setelections]= useState(election)
  

  const filteredElections = elections.filter(election => {
    const matchesFilter = filter === 'all' || election.status === filter;
    const matchesSearch = election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         election.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'federal': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'state': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'local': return 'bg-green-100 text-green-700 border-green-200';
      case 'education': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'student': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {/* New VoteWise Logo */}
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3.09 8.26L4 21L12 17L20 21L20.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" fill="white"/>
                    <path d="M8 12L10 14L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-lg sm:rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">VoteWise</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base">Dashboard</Link>
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base">Admin</Link>
              <Link href="/voter-auth" className="px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm lg:text-base font-medium">Login</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-10 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 rounded-full text-blue-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Democratic Participation
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Active Elections
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Your voice shapes the future. Discover ongoing elections and make your vote count in building a better tomorrow.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search elections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur text-gray-900 placeholder-gray-500 shadow-sm text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
              {['all', 'active', 'upcoming', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 capitalize text-sm sm:text-base whitespace-nowrap ${
                    filter === status
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-md'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Elections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-14 lg:mb-16">
          {filteredElections.map((election) => (
            <div key={election.id} className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Election Image */}
                <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden bg-gray-200">
                  <img 
                    src={election.image} 
                    alt={election.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center" 
                    style={{display: 'none'}}
                  >
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  
                  {/* Overlay for better text visibility */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Status and Category Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(election.status)}`}>
                      {election.status}
                    </span>
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(election.category)}`}>
                      {election.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {election.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {election.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-500 flex items-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Candidates
                      </span>
                      <span className="font-semibold text-gray-900">{election.candidates}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-500 flex items-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="hidden sm:inline">Registered Voters</span>
                        <span className="sm:hidden">Voters</span>
                      </span>
                      <span className="font-semibold text-gray-900">{election.registeredVoters.toLocaleString()}</span>
                    </div>
                    {election.votes && (
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-500 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="hidden sm:inline">Votes Cast</span>
                          <span className="sm:hidden">Votes</span>
                        </span>
                        <span className="font-semibold text-emerald-600">{election.votes.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-500 flex items-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date
                      </span>
                      <span className="font-semibold text-gray-900">
                        {new Date(election.startDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <Link 
                      href={`/election/${election.id}`}
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold text-center hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                    >
                      {election.status === 'active' ? 'Vote Now' : 'View Details'}
                    </Link>
                    {election.status === 'active' && (
                      <button className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredElections.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">No Elections Found</h3>
            <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base px-4 sm:px-0">Try adjusting your search criteria or check back later for new elections.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Participate?</h2>
            <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Join millions of citizens making their voices heard. Register to vote and be part of the democratic process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/voter-auth" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm sm:text-base">
                Login to Vote
              </Link>
              <Link href="/voter-auth" className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-700/80 backdrop-blur text-white rounded-lg sm:rounded-xl font-bold border border-white/20 hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base">
                Register as Voter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
