import { useState } from "react";
import Link from "next/link";

export default function CandidateRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    party: '',
    position: '',
    bio: '',
    experience: '',
    education: '',
    photo: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Registration submitted:', formData);
      // Handle final submission
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        <nav className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 text-blue-700">
            <div className="size-8 sm:size-10 text-sky-500">
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
            <span className="text-blue-900 text-xl sm:text-2xl font-extrabold leading-tight tracking-[-0.015em]">VoteWise</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-blue-700 hover:text-blue-900 font-medium">Dashboard</Link>
            <Link href="/candidate-profile" className="text-blue-700 hover:text-blue-900 font-medium">Profile</Link>
            <Link href="/" className="text-blue-700 hover:text-blue-900 font-medium">Home</Link>
          </div>
        </nav>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-6 py-6 sm:py-8">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">Candidate Registration</h1>
          <p className="text-blue-600 text-base sm:text-lg">Join the democratic process and represent your community</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ml-4 ${
                    step < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-24 mt-2 sm:mt-3">
            <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
              Personal Info
            </span>
            <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
              Background
            </span>
            <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
              Review
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur rounded-xl sm:rounded-2xl shadow-sm border border-blue-200 p-4 sm:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">Personal Information</h2>
                
                {/* Photo Upload */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                      {formData.photo ? (
                        <img 
                          src={URL.createObjectURL(formData.photo)} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-blue-900 font-semibold mb-2">Profile Photo</label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                    <p className="text-sm text-blue-600 mt-1">Upload a professional photo (JPG, PNG)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-blue-900 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-blue-900 font-semibold mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      min="18"
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-blue-900 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-blue-900 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="party" className="block text-blue-900 font-semibold mb-2">
                      Political Party
                    </label>
                    <select
                      id="party"
                      name="party"
                      value={formData.party}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    >
                      <option value="">Select Party</option>
                      <option value="democratic">Democratic Party</option>
                      <option value="republican">Republican Party</option>
                      <option value="independent">Independent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-blue-900 font-semibold mb-2">
                      Running For *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="e.g., Mayor, Council Member"
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Background Information */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">Background Information</h2>
                
                <div>
                  <label htmlFor="bio" className="block text-blue-900 font-semibold mb-2">
                    Biography *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell voters about yourself, your vision, and why you're running..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-blue-900 font-semibold mb-2">
                    Professional Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="List your relevant work experience, positions held, accomplishments..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="education" className="block text-blue-900 font-semibold mb-2">
                    Education
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="List your educational background, degrees, certifications..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="bg-blue-50/50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Candidate Agreement</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 mt-1" />
                      <span className="text-blue-800">I confirm that all information provided is accurate and truthful</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 mt-1" />
                      <span className="text-blue-800">I agree to abide by VoteWise's code of conduct and election guidelines</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 mt-1" />
                      <span className="text-blue-800">I understand that my profile will be publicly visible to voters</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">Review Your Information</h2>
                
                <div className="bg-blue-50/50 rounded-xl p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Personal Information</h3>
                      <div className="space-y-2 text-blue-800">
                        <p><strong>Name:</strong> {formData.fullName}</p>
                        <p><strong>Age:</strong> {formData.age}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Party:</strong> {formData.party || 'Not specified'}</p>
                        <p><strong>Position:</strong> {formData.position}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Background</h3>
                      <div className="space-y-2 text-blue-800">
                        <p><strong>Biography:</strong> {formData.bio ? `${formData.bio.substring(0, 100)}...` : 'Not provided'}</p>
                        <p><strong>Experience:</strong> {formData.experience ? 'Provided' : 'Not provided'}</p>
                        <p><strong>Education:</strong> {formData.education ? 'Provided' : 'Not provided'}</p>
                        <p><strong>Photo:</strong> {formData.photo ? 'Uploaded' : 'Not uploaded'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Ready to Submit</h3>
                      <p className="text-green-800">
                        Your candidate registration will be reviewed by our team. You'll receive a confirmation email once approved.
                        After approval, your profile will be visible to voters and you can participate in elections.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-blue-100 gap-4">
              <button
                type="button"
                onClick={handlePrevious}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              
              <button
                type="submit"
                className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                {currentStep === totalSteps ? 'Submit Registration' : 'Next Step'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
