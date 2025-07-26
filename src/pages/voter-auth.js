import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";


export default function VoterAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: google auth, 2: details (for registration)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    idNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setFormData(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || ''
        }));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google sign-in successful:', user);

      // Check if user is already registered
      const userDocRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userDocRef);

      if (isLogin) {
        // Login mode
        if (!userDoc.exists()) {
          setError('Account not registered. Please register first.');
          setIsLogin(false); // Switch to register mode
          return;
        }
        // User exists, redirect to elections
        router.push('/elections');
      } else {
        // Registration mode
        if (userDoc.exists()) {
          setError('Account already registered. Please login instead.');
          setIsLogin(true); // Switch to login mode
          return;
        }
        // New user, proceed to registration details
        setStep(2);
      }

    } catch (error) {
      console.error('Google sign-in error:', error);
      
      let errorMessage = 'Failed to sign in with Google. Please try again.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups and try again.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async () => {
    try {
      setLoading(true);
      setError('');

      if (!user) {
        setError('Please sign in with Google first.');
        return;
      }

      // Save user data to Firestore
      const userData = {
        name: formData.name || user.displayName,
        email: user.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        address: formData.address,
        idNumber: formData.idNumber,
        registeredAt: new Date().toISOString(),
        verified: true,
        googleId: user.uid
      };

      await setDoc(doc(db, 'users', user.email), userData);

      console.log('Registration completed successfully for:', user.email);

      // Redirect to elections page after successful registration
      router.push('/elections');

    } catch (error) {
      console.error('Error completing registration:', error);
      setError('Failed to complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // For login, use Google Sign-In
      await handleGoogleSignIn();
    } else {
      if (step === 1) {
        // For registration, use Google Sign-In first
        await handleGoogleSignIn();
      } else if (step === 2) {
        // Complete registration with additional details
        await completeRegistration();
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
    setError(''); // Clear any error messages
    setFormData({
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      age: '',
      address: '',
      idNumber: ''
    });
  };

  const resendOTP = async () => {
    // Not needed for Google auth
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

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="bg-white/60 backdrop-blur rounded-2xl p-2 mb-8 shadow-sm border border-blue-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${isLogin
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                  : 'text-blue-700 hover:bg-blue-50'
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${!isLogin
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                  : 'text-blue-700 hover:bg-blue-50'
                  }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-blue-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">
                {isLogin ? 'Voter Login' : 'Voter Registration'}
              </h1>
              <p className="text-blue-600">
                {isLogin
                  ? 'Access your voting dashboard'
                  : 'Join the democratic process'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Progress indicator for registration */}
            {!isLogin && (
              <div className="mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[1, 2].map((stepNum) => (
                    <div key={stepNum} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${stepNum <= step
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                        }`}>
                        {stepNum}
                      </div>
                      {stepNum < 2 && (
                        <div className={`w-8 h-1 ml-2 ${stepNum < step ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-16 text-xs text-blue-600">
                  <span className={step >= 1 ? 'font-medium' : ''}>Google Auth</span>
                  <span className={step >= 2 ? 'font-medium' : ''}>Details</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Google Authentication */}
              {step === 1 && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {isLogin ? 'Sign in with Google' : 'Create account with Google'}
                    </h3>
                    <p className="text-blue-600">
                      {isLogin 
                        ? 'Access your voting dashboard securely'
                        : 'Quick and secure registration process'
                      }
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-xl font-medium hover:border-blue-400 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-gray-700">Signing in...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-gray-700">
                          {isLogin ? 'Continue with Google' : 'Sign up with Google'}
                        </span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    <p>Secure authentication powered by Google</p>
                  </div>
                </>
              )}

              {/* Step 2: Registration Details (only for registration) */}
              {step === 2 && !isLogin && user && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Complete Your Profile</h3>
                    <p className="text-blue-600">Just a few more details to get you registered</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Signed in as: <strong>{user.email}</strong>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-blue-900 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-blue-900 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-blue-600">+91</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full pl-14 pr-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="18"
                        min="18"
                        className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="idNumber" className="block text-blue-900 font-semibold mb-2">
                        ID Number *
                      </label>
                      <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        placeholder="Aadhaar/Voter ID"
                        className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-blue-900 font-semibold mb-2">
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-blue-50/50 rounded-xl p-4">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 mt-1" />
                      <span className="text-blue-800 text-sm">
                        I confirm that I am eligible to vote and all information provided is accurate.
                        I agree to VoteWise's terms of service and privacy policy.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Registering...' : 'Complete Registration'}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <p className="text-blue-600 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={switchMode}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50/50 backdrop-blur rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 text-center">Need Help?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-blue-900 font-medium">Call Support</div>
                <div className="text-blue-700">(555) 123-VOTE</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
