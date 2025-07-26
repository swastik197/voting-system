import { useState } from "react";
import Link from "next/link";
import {stat, recentElection, candidate, voter } from "@/config/adminPage_Data";
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateElectionModal, setShowCreateElectionModal] = useState(false);
  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: '',
    positions: [{ title: '', description: '' }]
  });
 const [stats, setstats]= useState(stat)
 const [recentElections, setrecentElections]= useState(recentElection)
 const[candidates, setcandidates]= useState(candidate)
 const[voters, setvoters]=useState(voter)
 

  // Create Election Modal Component
  const CreateElectionModal = () => (
    <div className={`fixed inset-0 z-50 ${showCreateElectionModal ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateElectionModal(false)}></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 md:p-6 text-white z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Create New Election</h2>
                <p className="text-blue-100 text-xs sm:text-sm md:text-base">Set up a new democratic election</p>
              </div>
              <button 
                onClick={() => setShowCreateElectionModal(false)}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-2 sm:p-4 md:p-8">
            <form className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">Election Title</label>
                  <input
                    type="text"
                    value={newElection.title}
                    onChange={(e) => setNewElection({...newElection, title: e.target.value})}
                    className="w-full px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    placeholder="e.g., Presidential Election 2024"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">Category</label>
                  <select
                    value={newElection.category}
                    onChange={(e) => setNewElection({...newElection, category: e.target.value})}
                    className="w-full px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                  >
                    <option value="">Select Category</option>
                    <option value="federal">Federal</option>
                    <option value="state">State</option>
                    <option value="local">Local</option>
                    <option value="education">Education</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">Description</label>
                <textarea
                  value={newElection.description}
                  onChange={(e) => setNewElection({...newElection, description: e.target.value})}
                  rows="4"
                  className="w-full px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                  placeholder="Describe the purpose and importance of this election..."
                />
              </div>

              {/* Date Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">Start Date</label>
                  <input
                    type="datetime-local"
                    value={newElection.startDate}
                    onChange={(e) => setNewElection({...newElection, startDate: e.target.value})}
                    className="w-full px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">End Date</label>
                  <input
                    type="datetime-local"
                    value={newElection.endDate}
                    onChange={(e) => setNewElection({...newElection, endDate: e.target.value})}
                    className="w-full px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Positions */}
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1 sm:mb-2 md:mb-4 gap-1 sm:gap-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900">Election Positions</label>
                  <button
                    type="button"
                    onClick={() => setNewElection({
                      ...newElection,
                      positions: [...newElection.positions, { title: '', description: '' }]
                    })}
                    className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs sm:text-sm font-medium"
                  >
                    + Add Position
                  </button>
                </div>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {newElection.positions.map((position, index) => (
                    <div key={index} className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 md:gap-4">
                        <input
                          type="text"
                          value={position.title}
                          onChange={(e) => {
                            const updatedPositions = [...newElection.positions];
                            updatedPositions[index].title = e.target.value;
                            setNewElection({...newElection, positions: updatedPositions});
                          }}
                          className="px-1 py-2 sm:px-2 sm:py-2 md:px-3 md:py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                          placeholder="Position title (e.g., President, Mayor)"
                        />
                        <input
                          type="text"
                          value={position.description}
                          onChange={(e) => {
                            const updatedPositions = [...newElection.positions];
                            updatedPositions[index].description = e.target.value;
                            setNewElection({...newElection, positions: updatedPositions});
                          }}
                          className="px-1 py-2 sm:px-2 sm:py-2 md:px-3 md:py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                          placeholder="Position description"
                        />
                      </div>
                      {newElection.positions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedPositions = newElection.positions.filter((_, i) => i !== index);
                            setNewElection({...newElection, positions: updatedPositions});
                          }}
                          className="mt-1 sm:mt-2 text-red-600 hover:text-red-800 text-xs sm:text-sm"
                        >
                          Remove Position
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 md:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateElectionModal(false)}
                  className="w-full md:flex-1 px-2 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-xs sm:text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {/* handle submit */}}
                  className="w-full md:flex-1 px-2 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-xs sm:text-sm md:text-base"
                >
                  Create Election
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VoteWise</span>
              </Link>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Dashboard</Link>
                <Link href="/elections" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Elections</Link>
                <button 
                  onClick={() => setShowCreateElectionModal(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  + Create Election
                </button>
              </div>
            </div>
          </nav>
        </header>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Administrative Control
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Manage elections, oversee democratic processes, and ensure fair voting across all platforms.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalElections}</div>
              <div className="text-gray-600 font-medium">Total Elections</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.activeElections}</div>
              <div className="text-gray-600 font-medium">Active Elections</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalVoters?.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">Registered Voters</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalCandidates}</div>
              <div className="text-gray-600 font-medium">Total Candidates</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-2 mb-8 bg-white/60 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20">
            {[
              { key: 'overview', label: 'Overview', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0' },
              { key: 'elections', label: 'Manage Elections', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { key: 'candidates', label: 'Candidates', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { key: 'voters', label: 'Voters', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center w-full sm:w-auto px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Recent Elections */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Elections</h2>
                  <p className="text-gray-600">Latest election activity and status</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentElections.map((election) => (
                      <div key={election.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{election.title}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                election.status === 'active' ? 'bg-green-100 text-green-700' :
                                election.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {election.status}
                              </span>
                              <span className="text-gray-600 text-sm">{election.voters.toLocaleString()} voters</span>
                              <span className="text-gray-600 text-sm">{election.candidates} candidates</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Manage
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'elections' && (
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Election Management</h2>
                    <p className="text-gray-600">Create, modify, and oversee elections</p>
                  </div>
                  <button 
                    onClick={() => setShowCreateElectionModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    + New Election
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentElections.map((election) => (
                      <div key={election.id} className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-200">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{election.title}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              election.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' :
                              election.status === 'upcoming' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                              'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}>
                              {election.status}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Voters:</span>
                              <span className="font-medium">{election.voters.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Candidates:</span>
                              <span className="font-medium">{election.candidates}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Start Date:</span>
                              <span className="font-medium">{new Date(election.startDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Manage
                          </button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'candidates' && (
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Candidate Management</h2>
                  <p className="text-gray-600">Review and approve candidate registrations</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {candidates.map((candidate) => (
                      <div key={candidate.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span>{candidate.party}</span>
                                <span>•</span>
                                <span>Age {candidate.age}</span>
                                <span>•</span>
                                <span>{candidate.votes.toLocaleString()} votes</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              candidate.status === 'approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                              'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              {candidate.status}
                            </span>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              View Profile
                            </button>
                            {candidate.status === 'pending' && (
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Approve
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'voters' && (
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Voter Management</h2>
                  <p className="text-gray-600">Verify voter registrations and manage voter database</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {voters.map((voter) => (
                      <div key={voter.id} className="p-6 bg-gradient-to-r from-white to-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{voter.name}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span>Age {voter.age}</span>
                                <span>•</span>
                                <span>Registered: {new Date(voter.registrationDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              voter.status === 'Verified' ? 'bg-green-100 text-green-700 border border-green-200' :
                              'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              {voter.status}
                            </span>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              View Details
                            </button>
                            {voter.status === 'Pending' && (
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Verify
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Election Modal */}
      <CreateElectionModal />
    </>
  );
}
