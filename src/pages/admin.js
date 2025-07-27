import { useState, useEffect } from "react";
import Link from "next/link";
import {stat, recentElection, candidate, voter } from "@/config/adminPage_Data";
import { apiRequest } from "@/services/api";
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
 const [candidateLoading, setCandidateLoading] = useState({});
 const [candidateError, setCandidateError] = useState({});

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
            <form className="space-y-4 sm:space-y-6 md:space-y-8" onSubmit={handleCreateElection}>
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

  const handleCreateElection = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/api/elections', 'POST', newElection);
      setShowCreateElectionModal(false);
      // Refresh elections list from backend
      const updatedElections = await apiRequest('/api/elections');
      setrecentElections(updatedElections);
      // Optionally show a success message
    } catch (err) {
      alert(err.message);
    }
  };

  // Approve candidate
  const handleApproveCandidate = async (candidateId) => {
    setCandidateLoading((prev) => ({ ...prev, [candidateId]: true }));
    setCandidateError((prev) => ({ ...prev, [candidateId]: null }));
    try {
      await apiRequest(`/api/candidates/${candidateId}/approve`, 'POST', null, adminToken);
      await fetchCandidates();
    } catch (err) {
      setCandidateError((prev) => ({ ...prev, [candidateId]: err.message }));
    } finally {
      setCandidateLoading((prev) => ({ ...prev, [candidateId]: false }));
    }
  };

  // Remove candidate
  const handleRemoveCandidate = async (candidateId) => {
    setCandidateLoading((prev) => ({ ...prev, [candidateId]: true }));
    setCandidateError((prev) => ({ ...prev, [candidateId]: null }));
    try {
      await apiRequest(`/api/candidates/${candidateId}`, 'DELETE', null, adminToken);
      await fetchCandidates();
    } catch (err) {
      setCandidateError((prev) => ({ ...prev, [candidateId]: err.message }));
    } finally {
      setCandidateLoading((prev) => ({ ...prev, [candidateId]: false }));
    }
  };

  // Fetch candidates from backend
  const fetchCandidates = async () => {
    try {
      const data = await apiRequest('/api/candidates');
      setcandidates(data);
    } catch (err) {
      // Optionally handle error
    }
  };

  // User state and effect for admin check
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
    setUser(storedUser);
    // Redirect if not admin
    if (storedUser && storedUser.role !== 'admin') {
      window.location.href = '/admin-login';
    } else if (!storedUser) {
      window.location.href = '/admin-login';
    }
  }, []);

  if (!user || user.role !== 'admin') {
    return null;
  }

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
                <Link href="/change-admin-password" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Change Admin Password</Link>
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

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
                ${activeTab === 'overview' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 12h18M3 21h18" />
                </svg>
                Overview
              </button>
              <button
                onClick={() => setActiveTab('candidates')}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
                ${activeTab === 'candidates' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10m-5 4h5" />
                </svg>
                Candidates
              </button>
              <button
                onClick={() => setActiveTab('voters')}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
                ${activeTab === 'voters' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 16h14M5 8h14" />
                </svg>
                Voters
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Election Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Total Elections</h3>
                    <p className="text-3xl font-bold">{stats.totalElections}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Ongoing Elections</h3>
                    <p className="text-3xl font-bold">{stats.ongoingElections}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Upcoming Elections</h3>
                    <p className="text-3xl font-bold">{stats.upcomingElections}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Ended Elections</h3>
                    <p className="text-3xl font-bold">{stats.endedElections}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">Recent Elections</h3>
                  <div className="space-y-4">
                    {recentElections.map((election) => (
                      <div key={election.id} className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <h4 className="text-md sm:text-lg font-semibold">{election.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-500">{election.date}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <Link href={`/elections/${election.id}`} className="px-3 py-1 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'candidates' && (
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Candidates Management</h2>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="text-md sm:text-lg font-semibold">{candidate.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">{candidate.party}</p>
                      </div>
                      <div className="flex-shrink-0 flex gap-2">
                        <button
                          onClick={() => handleApproveCandidate(candidate.id)}
                          disabled={candidateLoading[candidate.id]}
                          className="px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-lg shadow-md hover:bg-green-200 transition-all duration-200 flex items-center gap-1"
                        >
                          {candidateLoading[candidate.id] ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleRemoveCandidate(candidate.id)}
                          disabled={candidateLoading[candidate.id]}
                          className="px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded-lg shadow-md hover:bg-red-200 transition-all duration-200 flex items-center gap-1"
                        >
                          {candidateLoading[candidate.id] ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'voters' && (
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Voters Management</h2>
                <div className="space-y-4">
                  {voters.map((voter) => (
                    <div key={voter.id} className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="text-md sm:text-lg font-semibold">{voter.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">{voter.email}</p>
                      </div>
                      <div className="flex-shrink-0 flex gap-2">
                        <button
                          onClick={() => handleApproveCandidate(voter.id)}
                          disabled={candidateLoading[voter.id]}
                          className="px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-lg shadow-md hover:bg-green-200 transition-all duration-200 flex items-center gap-1"
                        >
                          {candidateLoading[voter.id] ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleRemoveCandidate(voter.id)}
                          disabled={candidateLoading[voter.id]}
                          className="px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded-lg shadow-md hover:bg-red-200 transition-all duration-200 flex items-center gap-1"
                        >
                          {candidateLoading[voter.id] ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
