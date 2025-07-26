import { useState } from "react";
import Link from "next/link";

export default function CreateElection() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: '',
    visibility: 'public'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Election created:', formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <Link href="/admin" className="text-blue-700 hover:text-blue-900 font-medium">← Back to Admin</Link>
            <Link href="/dashboard" className="text-blue-700 hover:text-blue-900 font-medium">Dashboard</Link>
          </div>
        </nav>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Create New Election</h1>
          <p className="text-blue-600">Set up a new election with candidates and voting parameters</p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Election Title */}
            <div>
              <label htmlFor="title" className="block text-blue-900 font-semibold mb-2">
                Election Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Presidential Election 2024"
                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-blue-900 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about this election..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-blue-900 font-semibold mb-2">
                  Start Date *
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-blue-900 font-semibold mb-2">
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Category and Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-blue-900 font-semibold mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="presidential">Presidential</option>
                  <option value="congressional">Congressional</option>
                  <option value="local">Local Government</option>
                  <option value="student">Student Council</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="visibility" className="block text-blue-900 font-semibold mb-2">
                  Visibility
                </label>
                <select
                  id="visibility"
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
            </div>

            {/* Election Rules */}
            <div className="bg-blue-50/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Election Rules & Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500" />
                  <span className="text-blue-800">Allow vote changes</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500" />
                  <span className="text-blue-800">Show real-time results</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500" />
                  <span className="text-blue-800">Require ID verification</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500" />
                  <span className="text-blue-800">Send notifications</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="flex-1 px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Create Election
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50/50 backdrop-blur rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Election Guidelines</h4>
                <p className="text-sm text-blue-700">Best practices for fair elections</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Documentation</h4>
                <p className="text-sm text-blue-700">Step-by-step setup guide</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Support</h4>
                <p className="text-sm text-blue-700">Get help from our team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
