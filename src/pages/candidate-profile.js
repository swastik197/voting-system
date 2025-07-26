import { useState } from "react";
import Link from "next/link";
import {candidateInfo, currentElection, suggestedElection} from "@/config/candidateData";
export default function CandidateProfile() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [showPublicProfile, setShowPublicProfile] = useState(false);

  const [candidate, setCandidate] = useState(candidateInfo);
  const [currentElections, setcurrentElections] = useState(currentElection);
  const [suggestedElections, setsuggestedElections] = useState(suggestedElection);

  // Public Profile Modal Component
  const PublicProfileModal = () => (
    <div className={`fixed inset-0 z-50 ${showPublicProfile ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPublicProfile(false)}></div>
      <div className="absolute inset-2 sm:inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-full">
        <div className="h-full overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 md:px-6 md:py-6 text-white z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{candidate.name}</h2>
                  <p className="text-blue-100">Public Profile</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPublicProfile(false)}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors mt-4 sm:mt-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="px-4 py-6 md:px-8 md:py-8 space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{candidate.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{candidate.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Party:</span>
                      <span className="font-medium">{candidate.party}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Running for:</span>
                      <span className="font-medium">{candidate.position}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                <p className="text-gray-600 leading-relaxed">{candidate.bio}</p>
              </div>
            </div>

            {/* Manifesto */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Political Manifesto</h3>
              <div className="bg-blue-50 rounded-2xl p-4 md:p-6">
                <p className="text-gray-700 leading-relaxed">{candidate.manifesto}</p>
              </div>
            </div>

            {/* Experience & Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Experience</h3>
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-blue-600 text-sm">{exp.organization}</p>
                      <p className="text-gray-500 text-sm">{exp.period}</p>
                      <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                <div className="space-y-4">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-green-600 text-sm">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.year} • GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {candidate.achievements.map((achievement, index) => (
                  <div key={index} className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Twitter: {candidate.socialMedia.twitter}
                </button>
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  Facebook: {candidate.socialMedia.facebook}
                </button>
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors">
                  LinkedIn: {candidate.socialMedia.linkedin}
                </button>
              </div>
            </div>
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
          <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4">
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
                <Link href="/candidate-register" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Register</Link>
                <button 
                  onClick={() => setShowPublicProfile(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  View Public Profile
                </button>
              </div>
            </div>
          </nav>
        </header>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Profile Header */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 px-4 py-6 md:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0 mx-auto lg:mx-0 mb-6 lg:mb-0">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <svg className="w-16 h-16 md:w-20 md:h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      {candidate.name}
                    </h1>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold border border-blue-200">
                        {candidate.party}
                      </span>
                      <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold border border-emerald-200">
                        Running for {candidate.position}
                      </span>
                      <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold border border-purple-200">
                        Age {candidate.age}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                    <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                      Settings
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">{candidate.bio}</p>
                
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{candidate.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{candidate.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-2 mb-8 bg-white/60 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0' },
              { key: 'profile', label: 'Profile Details', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { key: 'elections', label: 'My Elections', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { key: 'opportunities', label: 'Opportunities', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
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
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{currentElections.length}</div>
                    <div className="text-gray-600 text-sm">Active Elections</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {currentElections.reduce((total, election) => total + election.votes, 0).toLocaleString()}
                    </div>
                    <div className="text-gray-600 text-sm">Total Votes</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{suggestedElections.length}</div>
                    <div className="text-gray-600 text-sm">Opportunities</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Received 47 new votes in Mayoral Election 2024</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Profile viewed 123 times today</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">New election opportunity: State Governor Election</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Update Profile
                    </button>
                    <button 
                      onClick={() => setActiveTab('elections')}
                      className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      View Elections
                    </button>
                    <button 
                      onClick={() => setShowPublicProfile(true)}
                      className="w-full px-4 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors"
                    >
                      Public Profile
                    </button>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Profile Completion</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Campaign Goals</span>
                        <span className="font-medium">60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Experience */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  Professional Experience
                </h3>
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-blue-600 text-sm font-medium">{exp.organization}</p>
                      <p className="text-gray-500 text-sm">{exp.period}</p>
                      <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  Education Background
                </h3>
                <div className="space-y-4">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-green-600 text-sm font-medium">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.year} • GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manifesto */}
              <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Political Manifesto
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <p className="text-gray-700 leading-relaxed">{candidate.manifesto}</p>
                </div>
              </div>

              {/* Achievements */}
              <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  Key Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.achievements.map((achievement, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm leading-relaxed">{achievement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'elections' && (
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Current Elections</h2>
                  <p className="text-gray-600">Elections you are actively participating in</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {currentElections.map((election) => (
                      <div key={election.id} className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{election.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                                {election.status}
                              </span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                                {election.position}
                              </span>
                              <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0" />
                                </svg>
                                <span className="text-sm font-medium">{election.votes.toLocaleString()} votes</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-4 sm:mt-0">
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                              View Details
                            </button>
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                              Campaign
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

          {activeTab === 'opportunities' && (
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Election Opportunities</h2>
                  <p className="text-gray-600">Upcoming elections you might be interested in</p>
                </div>
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {suggestedElections.map((election) => (
                      <div key={election.id} className="p-4 md:p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-200">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{election.title}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                              {election.category}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Deadline: {election.deadline}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0" />
                              </svg>
                              <span>{election.requirements}</span>
                            </div>
                          </div>
                        </div>
                        <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                          Apply to Participate
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Public Profile Modal */}
      <PublicProfileModal />
    </>
  );
}
