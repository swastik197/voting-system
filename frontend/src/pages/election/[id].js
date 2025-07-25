import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ElectionDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample election data
  const election = {
    id: 1,
    title: "Mayoral Election - Springfield",
    description: "Elect the next Mayor of Springfield. This election will determine the city's leadership for the next four years, focusing on key issues including infrastructure development, education funding, economic growth, and environmental sustainability.",
    fullDescription: "The Springfield Mayoral Election is a critical democratic process that will shape our city's future. The elected mayor will oversee a budget of $2.3 billion, manage 15,000 city employees, and lead initiatives that directly impact the lives of our 180,000 residents. Key campaign issues include affordable housing, public transportation, climate action, and economic recovery post-pandemic.",
    startDate: "2024-03-15T08:00:00Z",
    endDate: "2024-03-15T20:00:00Z",
    status: "active",
    category: "local",
    registeredVoters: 45623,
    votescast: 12847,
    turnoutRate: 28.2,
    location: "Springfield, State",
    organizer: "Springfield Election Commission"
  };

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      party: "Democratic Party",
      age: 45,
      photo: "/candidate-1.jpg",
      votes: 5234,
      percentage: 40.7,
      bio: "Former City Council member with 15 years of public service experience. Advocate for sustainable development and social equity.",
      platform: ["Affordable Housing Initiative", "Green Transportation", "Education Funding", "Small Business Support"],
      experience: "City Council (2010-2023), Community Development Director (2005-2010)",
      education: "Master of Public Administration - State University",
      website: "https://sarahjohnson2024.com",
      social: {
        twitter: "@SarahJ2024",
        facebook: "SarahJohnsonMayor"
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      party: "Republican Party",
      age: 52,
      photo: "/candidate-2.jpg",
      votes: 4156,
      percentage: 32.3,
      bio: "Successful businessman and former chamber of commerce president. Focus on economic development and fiscal responsibility.",
      platform: ["Economic Growth", "Tax Reform", "Infrastructure Investment", "Public Safety"],
      experience: "Chamber President (2018-2023), Business Owner (2000-present)",
      education: "MBA - Business University, BS Economics - Tech College",
      website: "https://michaelchen2024.com",
      social: {
        twitter: "@MChenMayor",
        facebook: "MichaelChenSpringfield"
      }
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      party: "Independent",
      age: 38,
      photo: "/candidate-3.jpg",
      votes: 3457,
      percentage: 26.9,
      bio: "Environmental scientist and community organizer. Championing climate action and grassroots democracy.",
      platform: ["Climate Action", "Community Engagement", "Environmental Justice", "Renewable Energy"],
      experience: "Environmental Consultant (2010-present), Non-profit Director (2015-2020)",
      education: "PhD Environmental Science - Green University",
      website: "https://mariarodriguez2024.com",
      social: {
        twitter: "@MariaR2024",
        facebook: "MariaRodriguezMayor"
      }
    }
  ];

  const handleVote = (candidateId) => {
    setSelectedCandidate(candidateId);
    setShowVoteModal(true);
  };

  const confirmVote = () => {
    console.log('Vote cast for candidate:', selectedCandidate);
    setShowVoteModal(false);
    // Handle vote submission
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(election.endDate);
    const timeDiff = endTime - now;
    
    if (timeDiff <= 0) return "Election ended";
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
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
            <Link href="/elections" className="text-blue-700 hover:text-blue-900 font-medium">← Back to Elections</Link>
            <Link href="/dashboard" className="text-blue-700 hover:text-blue-900 font-medium">Dashboard</Link>
          </div>
        </nav>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Election Header */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  ACTIVE
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                  {election.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-blue-900 mb-4">{election.title}</h1>
              <p className="text-blue-700 text-lg leading-relaxed mb-4">{election.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {election.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(election.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {getTimeRemaining()}
                </div>
              </div>
            </div>
            
            {/* Voting Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 min-w-80">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Voting Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Registered Voters:</span>
                  <span className="font-bold text-blue-900">{election.registeredVoters.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Votes Cast:</span>
                  <span className="font-bold text-green-700">{election.votescast.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Turnout Rate:</span>
                  <span className="font-bold text-blue-900">{election.turnoutRate}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${election.turnoutRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-white/60 backdrop-blur rounded-xl p-1 shadow-sm border border-blue-200">
          {['overview', 'candidates', 'results', 'info'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Election Overview</h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-blue-800 leading-relaxed text-lg">{election.fullDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Key Information</h3>
                  <ul className="space-y-3 text-blue-800">
                    <li><strong>Election Date:</strong> {new Date(election.startDate).toLocaleDateString()}</li>
                    <li><strong>Voting Hours:</strong> 8:00 AM - 8:00 PM</li>
                    <li><strong>Organized by:</strong> {election.organizer}</li>
                    <li><strong>Type:</strong> {election.category} Election</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Voting Guidelines</h3>
                  <ul className="space-y-3 text-blue-800">
                    <li>• Valid ID required for voting</li>
                    <li>• One vote per registered voter</li>
                    <li>• Voting is confidential and secure</li>
                    <li>• Results announced after polls close</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Candidate Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                      <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">{candidate.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {candidate.party}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            Age {candidate.age}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-700">{candidate.votes.toLocaleString()}</div>
                        <div className="text-sm text-blue-600">votes ({candidate.percentage}%)</div>
                      </div>
                    </div>

                    <p className="text-blue-700 mb-4">{candidate.bio}</p>

                    {/* Platform */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Key Platform Points:</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.platform.map((point, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => handleVote(candidate.id)}
                        className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                      >
                        Vote for {candidate.name.split(' ')[0]}
                      </button>
                      <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors">
                        View Full Profile
                      </button>
                      {candidate.website && (
                        <a 
                          href={candidate.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Live Results</h2>
            
            {/* Results Chart */}
            <div className="space-y-6">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-blue-900">{candidate.name}</span>
                      <span className="text-sm text-blue-600">({candidate.party})</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-blue-900">{candidate.votes.toLocaleString()}</span>
                      <span className="text-blue-600 ml-2">({candidate.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500" 
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-800 text-center">
                <strong>Note:</strong> Results are updated in real-time as votes are counted. 
                Final results will be certified after polls close.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Election Details</h3>
              <div className="space-y-3 text-blue-800">
                <div><strong>Full Title:</strong> {election.title}</div>
                <div><strong>Category:</strong> {election.category}</div>
                <div><strong>Location:</strong> {election.location}</div>
                <div><strong>Start Date:</strong> {new Date(election.startDate).toLocaleString()}</div>
                <div><strong>End Date:</strong> {new Date(election.endDate).toLocaleString()}</div>
                <div><strong>Organizer:</strong> {election.organizer}</div>
                <div><strong>Status:</strong> <span className="capitalize">{election.status}</span></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Contact & Support</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-medium text-blue-900">Email Support</div>
                    <div className="text-blue-700">elections@springfield.gov</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-medium text-blue-900">Phone Support</div>
                    <div className="text-blue-700">(555) 123-VOTE</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-blue-900">Help Center</div>
                    <div className="text-blue-700">Available 24/7 during election period</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vote Confirmation Modal */}
      {showVoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Confirm Your Vote</h3>
            <p className="text-blue-700 mb-6">
              You are about to cast your vote for{' '}
              <strong>{candidates.find(c => c.id === selectedCandidate)?.name}</strong>.
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowVoteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmVote}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
