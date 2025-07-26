import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {electionDetail, candidate} from "@/config/electionDetails_Data";
export default function ElectionDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showCandidateProfile, setShowCandidateProfile] = useState(false);
  const [selectedCandidateProfile, setSelectedCandidateProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRemaining, setTimeRemaining] = useState("Calculating...");
  const [isClient, setIsClient] = useState(false);

  const handleViewProfile = (candidate) => {
    setSelectedCandidateProfile(candidate);
    setShowCandidateProfile(true);
  };
const [ election, setelection]= useState(electionDetail)
const [candidates, setcandidates]= useState(candidate)
  

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
    if (!isClient) return "Calculating...";
    
    const now = new Date();
    const endTime = new Date(election.endDate);
    const timeDiff = endTime - now;
    
    if (timeDiff <= 0) return "Election ended";
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  useEffect(() => {
    setIsClient(true);
    
    const updateTimeRemaining = () => {
      const now = new Date();
      const endTime = new Date(election.endDate);
      const timeDiff = endTime - now;
      
      if (timeDiff <= 0) {
        setTimeRemaining("Election ended");
        return;
      }
      
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining(`${hours}h ${minutes}m remaining`);
    };

    // Update immediately
    updateTimeRemaining();
    
    // Update every minute
    const interval = setInterval(updateTimeRemaining, 60000);
    
    return () => clearInterval(interval);
  }, [election.endDate]);

  return (
    <>
      <Head>
        <title>{`${election.title} - VoteWise`}</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div
        className="relative flex min-h-screen flex-col group/design-root overflow-x-hidden"
        style={{ fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif" }}
      >
        {/* Enhanced Background with Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-purple-50/30"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
              <defs>
                <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              <circle cx="500" cy="500" r="500" fill="url(#centerGrad)" />
            </svg>
        </div>
        <div className="absolute top-20 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        <div className="absolute top-32 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-88 h-88 bg-gradient-to-r from-indigo-200/40 to-blue-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-gradient-to-r from-cyan-200/40 to-teal-200/40 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/[0.03]">
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 sm:gap-3 text-slate-800">
            <div className="size-8 sm:size-10">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                </defs>
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="url(#logo-gradient)" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-slate-900 text-xl sm:text-2xl font-black leading-tight tracking-[-0.02em]" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>VoteWise</span>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/elections" className="text-slate-700 hover:text-slate-900 font-semibold text-sm sm:text-base transition-colors duration-200">← Back</Link>
            <Link href="/dashboard" className="hidden sm:inline text-slate-700 hover:text-slate-900 font-semibold transition-colors duration-200">Dashboard</Link>
          </div>
        </nav>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Election Header */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-900/[0.1] border border-slate-200/60 p-4 sm:p-6 lg:p-8 xl:p-10 mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 sm:gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                <span className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base font-bold shadow-lg shadow-emerald-500/25">
                  ● ACTIVE
                </span>
                <span className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base font-bold capitalize shadow-lg shadow-blue-500/25">
                  {election.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-3 sm:mb-4 lg:mb-6 leading-tight" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>{election.title}</h1>
              <p className="text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 font-medium">{election.description}</p>
              <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm lg:text-base text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold">{election.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-semibold">{new Date(election.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold">{timeRemaining}</span>
                </div>
              </div>
            </div>
            
            {/* Voting Stats */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 w-full xl:min-w-80 xl:max-w-sm shadow-2xl shadow-slate-900/[0.08] border border-slate-200/60">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-4 sm:mb-6" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>Voting Statistics</h3>
              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                <div className="flex justify-between items-center text-sm sm:text-base lg:text-lg">
                  <span className="text-slate-700 font-medium">Registered Voters:</span>
                  <span className="font-bold text-slate-900 text-base sm:text-lg lg:text-xl">{election.registeredVoters.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base lg:text-lg">
                  <span className="text-slate-700 font-medium">Votes Cast:</span>
                  <span className="font-bold text-emerald-700 text-base sm:text-lg lg:text-xl">{election.votescast.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base lg:text-lg">
                  <span className="text-slate-700 font-medium">Turnout Rate:</span>
                  <span className="font-bold text-indigo-700 text-base sm:text-lg lg:text-xl">{election.turnoutRate}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 mt-4">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 h-3 rounded-full transition-all duration-700 shadow-lg shadow-emerald-500/30" 
                    style={{ width: `${election.turnoutRate}%` }}
                  ></div>
                </div>
                <div className="text-center pt-2">
                  <span className="text-xs text-slate-600 font-medium">Real-time voter turnout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2 mb-6 sm:mb-8 lg:mb-10 bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl shadow-slate-900/[0.05] border border-slate-200/60">
          {['overview', 'candidates', 'results', 'info'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold transition-all capitalize text-sm sm:text-base lg:text-lg whitespace-nowrap min-w-0 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-blue-600/30 transform scale-105'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
              style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/[0.1] border border-slate-200/60 p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-8" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>Election Overview</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-800 leading-relaxed text-lg sm:text-xl font-medium mb-8">{election.fullDescription}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mt-8 sm:mt-10">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>Key Information</h3>
                  <ul className="space-y-3 sm:space-y-4 text-slate-800 text-base sm:text-lg">
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-600 rounded-full"></span><strong>Election Date:</strong> {new Date(election.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-indigo-600 rounded-full"></span><strong>Voting Hours:</strong> 8:00 AM - 8:00 PM</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-purple-600 rounded-full"></span><strong>Organized by:</strong> {election.organizer}</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-pink-600 rounded-full"></span><strong>Type:</strong> {election.category} Election</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>Voting Guidelines</h3>
                  <ul className="space-y-3 sm:space-y-4 text-slate-800 text-base sm:text-lg">
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-600 rounded-full"></span>Valid ID required for voting</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-green-600 rounded-full"></span>One vote per registered voter</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-teal-600 rounded-full"></span>Voting is confidential and secure</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 bg-cyan-600 rounded-full"></span>Results announced after polls close</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-900/[0.1] border border-slate-200/60 p-4 sm:p-6 lg:p-8 xl:p-10 hover:shadow-3xl hover:shadow-slate-900/[0.15] transition-all duration-300">
                <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                  {/* Candidate Photo */}
                  <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/[0.2] ring-2 sm:ring-4 ring-white">
                      <img 
                        src={candidate.photo} 
                        alt={candidate.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 rounded-2xl sm:rounded-3xl flex items-center justify-center" style={{display: 'none'}}>
                        <svg className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      {/* Candidate rank overlay */}
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-xs sm:text-sm">#{candidates.findIndex(c => c.id === candidate.id) + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mb-2 sm:mb-3" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>{candidate.name}</h3>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base font-bold shadow-lg shadow-blue-500/25">
                            {candidate.party}
                          </span>
                          <span className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base font-bold shadow-lg shadow-purple-500/25">
                            Age {candidate.age}
                          </span>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-700">{candidate.votes.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm lg:text-base text-slate-600 font-semibold">votes ({candidate.percentage}%)</div>
                        <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-slate-200 rounded-full mt-2 mx-auto sm:mx-0">
                          <div 
                            className="h-1.5 sm:h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500"
                            style={{ width: `${candidate.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">{candidate.bio}</p>

                    {/* Platform */}
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                      <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>Key Platform Points:</h4>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 lg:gap-3">
                        {candidate.platform.map((point, index) => (
                          <span key={index} className="px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base font-semibold shadow-lg shadow-green-500/25">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center sm:justify-start">
                      <button 
                        onClick={() => handleVote(candidate.id)}
                        className="flex-1 xs:flex-none px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-200 text-sm sm:text-base lg:text-lg transform hover:scale-105"
                        style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                      >
                        Vote for {candidate.name.split(' ')[0]}
                      </button>
                      <button 
                        onClick={() => handleViewProfile(candidate)}
                        className="flex-1 xs:flex-none px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-slate-100 text-slate-800 rounded-xl sm:rounded-2xl font-bold hover:bg-slate-200 hover:shadow-xl transition-all duration-200 text-sm sm:text-base lg:text-lg"
                        style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                      >
                        View Profile
                      </button>
                      {candidate.website && (
                        <a 
                          href={candidate.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-200 text-base sm:text-lg text-center transform hover:scale-105"
                          style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
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
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">Live Results</h2>
            
            {/* Results Chart */}
            <div className="space-y-4 sm:space-y-6">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="font-semibold text-blue-900 text-sm sm:text-base">{candidate.name}</span>
                      <span className="text-xs sm:text-sm text-blue-600">({candidate.party})</span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="font-bold text-blue-900 text-sm sm:text-base">{candidate.votes.toLocaleString()}</span>
                      <span className="text-blue-600 ml-2 text-xs sm:text-sm">({candidate.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div 
                      className="h-2 sm:h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500" 
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-800 text-center text-xs sm:text-sm">
                <strong>Note:</strong> Results are updated in real-time as votes are counted. 
                Final results will be certified after polls close.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">Election Details</h3>
              <div className="space-y-2 sm:space-y-3 text-blue-800 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong>Full Title:</strong> 
                  <span className="sm:text-right">{election.title}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong>Category:</strong> 
                  <span className="sm:text-right">{election.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong>Location:</strong> 
                  <span className="sm:text-right">{election.location}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong>Start Date:</strong> 
                  <span className="sm:text-right">{new Date(election.startDate).toLocaleString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong>End Date:</strong> 
                  <span className="sm:text-right">{new Date(election.endDate).toLocaleString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong>Organizer:</strong> 
                  <span className="sm:text-right">{election.organizer}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong>Status:</strong> 
                  <span className="sm:text-right capitalize">{election.status}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">Contact & Support</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-medium text-blue-900 text-sm sm:text-base">Email Support</div>
                    <div className="text-blue-700 text-xs sm:text-sm">elections@springfield.gov</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-medium text-blue-900 text-sm sm:text-base">Phone Support</div>
                    <div className="text-blue-700 text-xs sm:text-sm">(555) 123-VOTE</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-blue-900 text-sm sm:text-base">Help Center</div>
                    <div className="text-blue-700 text-xs sm:text-sm">Available 24/7 during election period</div>
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
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">Confirm Your Vote</h3>
            <p className="text-blue-700 mb-6 text-sm sm:text-base">
              You are about to cast your vote for{' '}
              <strong>{candidates.find(c => c.id === selectedCandidate)?.name}</strong>.
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setShowVoteModal(false)}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={confirmVote}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Profile Modal */}
      {showCandidateProfile && selectedCandidateProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-4">
            <div className="h-full overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white z-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 sm:border-4 border-white/30">
                      <img 
                        src={selectedCandidateProfile.photo} 
                        alt={selectedCandidateProfile.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-white/20 flex items-center justify-center" style={{display: 'none'}}>
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold">{selectedCandidateProfile.name}</h2>
                      <p className="text-blue-100 text-sm sm:text-base">{selectedCandidateProfile.party}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowCandidateProfile(false)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Personal Information</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{selectedCandidateProfile.age} years</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-600">Party:</span>
                        <span className="font-medium">{selectedCandidateProfile.party}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-600">Current Votes:</span>
                        <span className="font-medium text-green-600">{selectedCandidateProfile.votes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Education</h3>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedCandidateProfile.education}</p>
                  </div>
                </div>

                {/* Biography */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Biography</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedCandidateProfile.bio}</p>
                </div>

                {/* Manifesto */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Manifesto</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedCandidateProfile.manifesto}</p>
                </div>

                {/* Work History */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Work History</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {selectedCandidateProfile.workHistory.map((job, index) => (
                      <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{job.title}</h4>
                          <span className="text-xs sm:text-sm text-gray-600">{job.period}</span>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base">{job.company}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Key Platform Points</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                    {selectedCandidateProfile.platform.map((point, index) => (
                      <div key={index} className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-blue-800 font-medium text-xs sm:text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media & Website */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Connect</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {selectedCandidateProfile.website && (
                      <a 
                        href={selectedCandidateProfile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                      >
                        Visit Website
                      </a>
                    )}
                    {selectedCandidateProfile.social?.twitter && (
                      <a 
                        href={`https://twitter.com/${selectedCandidateProfile.social.twitter.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 sm:px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-xs sm:text-sm"
                      >
                        Twitter
                      </a>
                    )}
                    {selectedCandidateProfile.social?.facebook && (
                      <a 
                        href={`https://facebook.com/${selectedCandidateProfile.social.facebook}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 sm:px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors text-xs sm:text-sm"
                      >
                        Facebook
                      </a>
                    )}
                  </div>
                </div>

                {/* Vote Button */}
                <div className="pt-4 sm:pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      setShowCandidateProfile(false);
                      handleVote(selectedCandidateProfile.id);
                    }}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold text-sm sm:text-lg hover:shadow-lg transition-all"
                  >
                    Vote for {selectedCandidateProfile.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
