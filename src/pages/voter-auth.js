import { useState } from "react";
import Link from "next/link";

export default function VoterAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: phone, 2: otp, 3: details (for registration)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
    age: '',
    address: '',
    idNumber: ''
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (step === 1) {
        // Send OTP for login
        console.log('Sending OTP to:', formData.phone);
        setOtpSent(true);
        setStep(2);
      } else if (step === 2) {
        // Verify OTP and login
        console.log('Verifying OTP:', formData.otp);
        // Handle login success
      }
    } else {
      if (step === 1) {
        // Send OTP for registration
        console.log('Sending OTP to:', formData.phone);
        setOtpSent(true);
        setStep(2);
      } else if (step === 2) {
        // Verify OTP and go to details
        console.log('OTP verified, proceeding to details');
        setStep(3);
      } else if (step === 3) {
        // Complete registration
        console.log('Registration completed:', formData);
        // Handle registration success
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStep(1);
    setOtpSent(false);
    setFormData({
      name: '',
      phone: '',
      otp: '',
      age: '',
      address: '',
      idNumber: ''
    });
  };

  const resendOTP = () => {
    console.log('Resending OTP to:', formData.phone);
    setOtpSent(true);
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
            <Link href="/elections" className="text-blue-700 hover:text-blue-900 font-medium">Elections</Link>
            <Link href="/" className="text-blue-700 hover:text-blue-900 font-medium">Home</Link>
          </div>
        </nav>
      </header>

      <div className="flex-1 flex items-center justify-center px-2 sm:px-6 py-6 sm:py-12">
        <div className="w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="bg-white/60 backdrop-blur rounded-2xl p-2 mb-8 shadow-sm border border-blue-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-full px-2 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  isLogin
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-full px-2 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  !isLogin
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                {isLogin ? 'Voter Login' : 'Voter Registration'}
              </h1>
              <p className="text-blue-600 text-sm sm:text-base">
                {isLogin 
                  ? 'Access your voting dashboard' 
                  : 'Join the democratic process'}
              </p>
            </div>

            {/* Progress indicator for registration */}
            {!isLogin && (
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                  {[1, 2, 3].map((stepNum) => (
                    <div key={stepNum} className="flex items-center">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                        stepNum <= step 
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {stepNum}
                      </div>
                      {stepNum < 3 && (
                        <div className={`w-6 h-1 sm:w-8 ml-1 sm:ml-2 ${stepNum < step ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 sm:gap-16 text-xs text-blue-600">
                  <span className={step >= 1 ? 'font-medium' : ''}>Phone</span>
                  <span className={step >= 2 ? 'font-medium' : ''}>Verify</span>
                  <span className={step >= 3 ? 'font-medium' : ''}>Details</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Step 1: Phone Number */}
              {step === 1 && (
                <>
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-blue-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="phone" className="block text-blue-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <span className="text-blue-600 text-sm sm:text-base">+1</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
                        required
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-blue-600 mt-1">
                      We'll send you a verification code
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                  >
                    Send Verification Code
                  </button>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <>
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-1 sm:mb-2">Verify Your Phone</h3>
                    <p className="text-blue-600 text-xs sm:text-base">
                      Enter the 6-digit code sent to<br />
                      <strong>+1 {formData.phone}</strong>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="otp" className="block text-blue-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      Verification Code *
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="000000"
                      maxLength="6"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-center text-lg sm:text-2xl tracking-widest"
                      required
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">Didn't receive the code?</p>
                    <button
                      type="button"
                      onClick={resendOTP}
                      className="text-blue-600 hover:text-blue-800 font-medium underline text-xs sm:text-base"
                    >
                      Resend Code
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-3 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      {isLogin ? 'Login' : 'Verify Code'}
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Registration Details (only for registration) */}
              {step === 3 && !isLogin && (
                <>
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-1 sm:mb-2">Complete Your Profile</h3>
                    <p className="text-blue-600 text-xs sm:text-base">Just a few more details to get you registered</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div>
                      <label htmlFor="age" className="block text-blue-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Age *
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="18"
                        min="18"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="idNumber" className="block text-blue-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        ID Number *
                      </label>
                      <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        placeholder="Driver's License/SSN"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-blue-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      rows="3"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-sm sm:text-base"
                      required
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-blue-50/50 rounded-xl p-2 sm:p-4">
                    <label className="flex items-start gap-2 sm:gap-3">
                      <input type="checkbox" required className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 mt-1" />
                      <span className="text-blue-800 text-xs sm:text-sm">
                        I confirm that I am eligible to vote and all information provided is accurate. 
                        I agree to VoteWise's terms of service and privacy policy.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 px-3 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      Complete Registration
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Footer Links */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-blue-600 text-xs sm:text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={switchMode}
                  className="text-blue-600 hover:text-blue-800 font-medium underline text-xs sm:text-sm"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 sm:mt-8 bg-blue-50/50 backdrop-blur rounded-2xl p-4 sm:p-6 border border-blue-200">
            <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3 text-center">Need Help?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-blue-900 font-medium">Call Support</div>
                <div className="text-blue-700">(555) 123-VOTE</div>
              </div>
              <div className="text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-blue-900 font-medium">Email Support</div>
                <div className="text-blue-700">help@votewise.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
