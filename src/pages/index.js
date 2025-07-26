
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Height of the sticky nav (approx 64px on md+)
  const navHeight = 64;

  return (
    <div
      className="relative flex min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}
    >
      {/* Decorative SVG background pattern for extra depth */}
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
      {/* Sticky, improved top navigation */}
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-blue-200 shadow-sm">
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-2 xs:px-3 sm:px-6 md:px-10 py-3 md:py-4">
          {/* Logo and brand */}
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
            <span className="text-blue-900 text-xl sm:text-2xl font-extrabold leading-tight tracking-[-0.015em] font-sans">VoteWise</span>
          </div>
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4 md:gap-8">
            <a className="text-blue-700 text-base font-medium px-2 py-1 rounded transition-colors hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" href="#">How it works</a>
            <a className="text-blue-700 text-base font-medium px-2 py-1 rounded transition-colors hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" href="#">Security</a>
            <a className="text-blue-700 text-base font-medium px-2 py-1 rounded transition-colors hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" href="#">Help</a>
          </div>
          {/* Desktop actions */}
          <div className="hidden md:flex gap-1 sm:gap-2 md:gap-3">
            <Link href="/elections" className="flex min-w-[90px] sm:min-w-[100px] md:min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-5 bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white text-sm sm:text-base font-semibold leading-normal tracking-wide shadow-lg hover:from-sky-500 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all duration-200">
              <span className="truncate">Elections</span>
            </Link>
            <Link href="/voter-auth" className="flex min-w-[60px] sm:min-w-[70px] md:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-blue-800 text-sm sm:text-base font-semibold leading-normal tracking-wide hover:bg-gradient-to-br hover:from-blue-200 hover:to-blue-400 shadow-md hover:scale-105 active:scale-95 transition-all duration-200">
              <span className="truncate">Vote</span>
            </Link>
          </div>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        {/* Mobile menu popover */}
        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white/95 shadow-lg border-b border-blue-200 animate-fade-in-down">
            <div className="flex flex-col gap-1 py-3 px-4">
              <a className="text-blue-700 text-base font-medium px-2 py-2 rounded transition-colors hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" href="#" onClick={() => setMenuOpen(false)}>How it works</a>
              <a className="text-blue-700 text-base font-medium px-2 py-2 rounded transition-colors hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" href="#" onClick={() => setMenuOpen(false)}>Security</a>
              <a className="text-blue-700 text-base font-medium px-2 py-2 rounded transition-colors hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" href="#" onClick={() => setMenuOpen(false)}>Help</a>
              <Link href="/elections" className="mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white text-base font-semibold leading-normal tracking-wide shadow-lg hover:from-sky-500 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all duration-200" onClick={() => setMenuOpen(false)}>
                Elections
              </Link>
              <Link href="/voter-auth" className="mt-1 flex w-full items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-blue-800 text-base font-semibold leading-normal tracking-wide hover:bg-gradient-to-br hover:from-blue-200 hover:to-blue-400 shadow-md hover:scale-105 active:scale-95 transition-all duration-200" onClick={() => setMenuOpen(false)}>
                Vote
              </Link>
            </div>
          </div>
        )}
      </header>
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 w-full">
          {/* HERO FULL IMAGE SECTION - responsive */}
          <section className="px-0 py-0">
            <div className="layout-content-container flex flex-col max-w-full mx-auto w-full">
              <div className="relative w-full">
                <div
                  className="relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-0 text-center shadow-xl w-full min-h-[260px] xs:min-h-[320px] sm:min-h-[400px] md:min-h-[520px] lg:h-[calc(100vh-64px)] lg:aspect-[16/9] lg:min-h-[600px] xl:min-h-[700px]"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9KkgOEX9q_QJNN5y2AIrcteCxNPP77GvHEdcCvCYHDodnHkZ_P5DopkfNIS2MlnIWI4eI0sUWsWYmFLFtFcS7OSbu1eUaUOR18m-sUt6nvsbpQ3L-czxGBiSDhmV_pekclerPZVeIdHd7EceL_Urp1R0nUaPerjcy3n7_jFJN4APZiFjk12ku-AvEOYDp99XgMx7Ghgdf3b8pE2A7u1pqQOFNdGLLEwuhbZB8yUW1bfteHx1h50gM0Zv0201jPWSYI9-Xot3RFxrE')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-black/50 z-0" />
                  <div className="relative z-10 flex flex-col gap-1 xs:gap-2 sm:gap-4 max-w-4xl items-center justify-center w-full px-2 sm:px-8 py-12 sm:py-20">
                    <h1 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight font-sans drop-shadow-lg">Your Voice, Your Vote, Your Future</h1>
                    <p className="text-blue-100 text-sm xs:text-base sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
                      Participate in shaping the future by casting your vote in upcoming elections. Our platform ensures a secure and transparent voting process, making your voice heard.
                    </p>
                    <Link href="/elections" className="mt-4 flex min-w-[100px] xs:min-w-[120px] sm:min-w-[150px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 xs:h-11 sm:h-12 px-3 xs:px-4 sm:px-6 md:h-14 md:px-8 bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white text-sm xs:text-base sm:text-lg font-bold leading-normal tracking-wide shadow-xl hover:from-sky-500 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all duration-200">
                      <span className="truncate">Elections Now</span>
                    </Link> 
                  </div>
                </div>
              </div>
              <section className="text-center py-6 xs:py-8 sm:py-10 md:py-16">
                <h2 className="text-blue-900 text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-[-0.015em] mb-3 xs:mb-4 font-sans">Login to Your Portal</h2>
                <p className="text-blue-700 max-w-2xl mx-auto mb-6 xs:mb-8 text-sm xs:text-base sm:text-lg font-medium">Access your dedicated portal to manage elections or your candidacy.</p>
                <div className="flex justify-center">
                  <div className="flex flex-1 gap-2 xs:gap-3 sm:gap-4 flex-wrap px-1 xs:px-2 sm:px-4 py-1 xs:py-2 sm:py-3 max-w-lg justify-center">
                    <Link href="/admin" className="flex min-w-[100px] xs:min-w-[140px] sm:min-w-[200px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 xs:h-11 sm:h-12 px-3 xs:px-4 sm:px-6 bg-gradient-to-r from-sky-500 to-blue-700 text-white text-sm xs:text-base font-semibold leading-normal tracking-wide grow shadow-lg hover:from-sky-600 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all">
                      <span className="truncate">Login as Admin</span>
                    </Link>
                    <Link href="/candidate-profile" className="flex min-w-[100px] xs:min-w-[140px] sm:min-w-[200px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 xs:h-11 sm:h-12 px-3 xs:px-4 sm:px-6 bg-gradient-to-r from-blue-400 to-blue-700 text-white text-sm xs:text-base font-semibold leading-normal tracking-wide grow shadow-lg hover:from-blue-500 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all">
                      <span className="truncate">Login as Candidate</span>
                    </Link>
                  </div>
                </div>
              </section>
              
              {/* Quick Access Navigation */}
              <section className="py-6 xs:py-8 sm:py-10 md:py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-blue-200 mx-4 mb-8">
                <div className="text-center mb-6 xs:mb-8 md:mb-12">
                  <h2 className="text-blue-900 text-lg xs:text-2xl sm:text-3xl font-extrabold leading-tight tracking-[-0.015em] mb-3 xs:mb-4 font-sans">Explore VoteWise</h2>
                  <p className="text-blue-700 max-w-2xl mx-auto text-sm xs:text-base sm:text-lg font-medium">Discover all the features and pages available on our platform</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 px-4 xs:px-6 sm:px-8">
                  <Link href="/elections" className="group bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="text-blue-600 mb-4 group-hover:text-blue-700 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-blue-900 font-bold mb-2 group-hover:text-blue-700 transition-colors">View Elections</h3>
                    <p className="text-blue-600 text-sm">Browse ongoing and upcoming elections</p>
                  </Link>

                  <Link href="/voter-auth" className="group bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="text-green-600 mb-4 group-hover:text-green-700 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-blue-900 font-bold mb-2 group-hover:text-blue-700 transition-colors">Voter Login</h3>
                    <p className="text-blue-600 text-sm">Register or login to cast your vote</p>
                  </Link>

                  <Link href="/candidate-register" className="group bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="text-purple-600 mb-4 group-hover:text-purple-700 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-blue-900 font-bold mb-2 group-hover:text-blue-700 transition-colors">Run for Office</h3>
                    <p className="text-blue-600 text-sm">Register as a candidate</p>
                  </Link>

                  <Link href="/admin" className="group bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="text-orange-600 mb-4 group-hover:text-orange-700 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-blue-900 font-bold mb-2 group-hover:text-blue-700 transition-colors">Admin Panel</h3>
                    <p className="text-blue-600 text-sm">Manage elections and users</p>
                  </Link>
                </div>

                {/* Additional Quick Links */}
                <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
                  <Link href="/create-election" className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    Create Election
                  </Link>
                  <Link href="/candidate-profile" className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors">
                    Candidate Profile
                  </Link>
                  <Link href="/election/1" className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors">
                    Sample Election
                  </Link>
                </div>
              </section>
              
              <section className="py-6 xs:py-8 sm:py-10 md:py-16">
                <div className="text-center mb-6 xs:mb-8 md:mb-12">
                  <h1 className="text-blue-900 tracking-tight text-lg xs:text-2xl sm:text-4xl font-extrabold leading-tight sm:leading-tight md:text-5xl md:font-black max-w-3xl mx-auto font-sans">Why Choose VoteWise?</h1>
                  <p className="text-blue-700 text-sm xs:text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto mt-1 xs:mt-2 sm:mt-4">
                    Our platform is designed with your security and convenience in mind, ensuring a seamless and trustworthy voting experience.
                  </p>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
                  <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4 rounded-xl border border-blue-200 bg-blue-50 p-3 xs:p-4 sm:p-6 text-center items-center shadow-md hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-sky-600 p-2 xs:p-2.5 sm:p-3 bg-sky-100 rounded-full shadow">
                      {/* Secure Voting SVG */}
                      <svg fill="currentColor" height="24px" width="24px" className="xs:h-7 xs:w-7 sm:h-9 sm:w-9" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40ZM128,224.22c-13.53-4.51-80-30.69-80-109.43V56h160v109.21C208,193.53,141.53,219.71,128,224.22Zm-14.34-71.22a8,8,0,0,1,0-11.32L128,127.32l22.34-22.34a8,8,0,0,1,11.32,11.32l-28,28a8,8,0,0,1-11.32,0Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-0.5 xs:gap-1 sm:gap-2">
                      <h2 className="text-blue-900 text-base xs:text-lg sm:text-xl font-bold leading-tight font-sans">Secure Voting</h2>
                      <p className="text-blue-700 text-xs xs:text-sm sm:text-base font-medium leading-relaxed">Our platform employs advanced security measures to protect your vote and personal information.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4 rounded-xl border border-blue-200 bg-blue-50 p-3 xs:p-4 sm:p-6 text-center items-center shadow-md hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-blue-500 p-2 xs:p-2.5 sm:p-3 bg-blue-100 rounded-full shadow">
                      {/* Easy Participation SVG */}
                      <svg fill="currentColor" height="24px" width="24px" className="xs:h-7 xs:w-7 sm:h-9 sm:w-9" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <path d="M240,104H224V48a16,16,0,0,0-16-16H48A16,16,0,0,0,32,48v56H16a8,8,0,0,0-8,8v96a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V112A8,8,0,0,0,240,104ZM48,48H208v56H48ZM224,208H32V120H224v88Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-0.5 xs:gap-1 sm:gap-2">
                      <h2 className="text-blue-900 text-base xs:text-lg sm:text-xl font-bold leading-tight font-sans">Easy Participation</h2>
                      <p className="text-blue-700 text-xs xs:text-sm sm:text-base font-medium leading-relaxed">Participate in elections from anywhere, at any time, with our user-friendly interface.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4 rounded-xl border border-blue-200 bg-blue-50 p-3 xs:p-4 sm:p-6 text-center items-center shadow-md hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-blue-700 p-2 xs:p-2.5 sm:p-3 bg-blue-100 rounded-full shadow">
                      {/* Privacy Protection SVG */}
                      <svg fill="currentColor" height="24px" width="24px" className="xs:h-7 xs:w-7 sm:h-9 sm:w-9" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-0.5 xs:gap-1 sm:gap-2">
                      <h2 className="text-blue-900 text-base xs:text-lg sm:text-xl font-bold leading-tight font-sans">Privacy Protection</h2>
                      <p className="text-blue-700 text-xs xs:text-sm sm:text-base font-medium leading-relaxed">We are committed to protecting your privacy and ensuring the confidentiality of your vote.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
        <footer className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border-t border-blue-200 mt-8">
          <div className="max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-5 py-6 xs:py-8 sm:py-12">
            <div className="flex flex-col items-center gap-4 xs:gap-6 sm:gap-8">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 xs:gap-x-6 xs:gap-y-3 sm:gap-x-8 sm:gap-y-4">
                <a className="text-blue-700 text-sm xs:text-base font-medium leading-normal hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
                <a className="text-blue-700 text-sm xs:text-base font-medium leading-normal hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
                <a className="text-blue-700 text-sm xs:text-base font-medium leading-normal hover:text-blue-900 transition-colors" href="#">Contact Us</a>
              </div>
              <p className="text-blue-700 text-xs xs:text-base font-medium leading-normal">© 2024 VoteWise. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
