import { auth } from "@/auth";
import SignOut from "@/components/sign-out";
import Link from "next/link";

export default async function About() {
  const session = await auth();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d0630 0%, #18314f 25%, #384e77 100%)' }}>
      {/* Navigation Header */}
      <nav className="relative border-b backdrop-blur-md" style={{ backgroundColor: 'rgba(13, 6, 48, 0.9)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 sm:space-x-12">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                  <span className="text-white font-bold text-sm sm:text-base">E</span>
                </div>
                <span className="text-white font-semibold text-lg sm:text-xl">EventsMail</span>
              </div>
              
              <div className="hidden lg:flex items-center space-x-8">
                <Link href={session?.user ? "/dashboard" : "/"} className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Home</Link>
                <a href="/about" className="text-white hover:text-purple-300 transition-colors duration-300 font-medium">About</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {session?.user ? (
                <>
                  <Link href="/certificate-builder">
                    <button className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
                      <span className="hidden sm:inline">Send Emails</span>
                      <span className="sm:hidden">Send</span>
                    </button>
                  </Link>
                  <SignOut />
                </>
              ) : (
                <Link href="/">
                  <button className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Split Layout */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
                <span className="text-purple-300 text-sm font-medium">About EventsMail</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Send Event Certificates Without the Headache
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed">
                Built by event organizers who got tired of manually sending hundreds of certificates. 
                No marketing fluff—just a tool that works.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={session?.user ? "/certificate-builder" : "/"}>
                  <button className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
                    {session?.user ? "Start Sending" : "Try It Now"}
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#b298dc' }}>3</div>
                <div className="text-gray-300 text-sm">Simple Steps</div>
              </div>
              <div className="p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#b298dc' }}>0</div>
                <div className="text-gray-300 text-sm">Setup Hassle</div>
              </div>
              <div className="p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#b298dc' }}>100%</div>
                <div className="text-gray-300 text-sm">Your Gmail</div>
              </div>
              <div className="p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#b298dc' }}>∞</div>
                <div className="text-gray-300 text-sm">Attendees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">How It Actually Works</h2>
        
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                1
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl font-bold text-white mb-3">Upload Your Certificate</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Got a certificate design? Upload it. Add fields where you want names, event titles, 
                or any other personalized info to appear.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', color: '#b298dc' }}>PNG/JPG</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', color: '#b298dc' }}>Drag & Drop</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                2
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl font-bold text-white mb-3">Connect Google Sheets</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Point to your Google Sheet with attendee info. Email addresses, names, custom fields—
                whatever you need. We'll read it and match it to your certificate.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', color: '#b298dc' }}>Auto-Import</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', color: '#b298dc' }}>Live Sync</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                3
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl font-bold text-white mb-3">Preview & Send</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Check how everything looks. When you're happy, hit send. Emails go out from your 
                Gmail account—no third-party sender addresses.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', color: '#b298dc' }}>Bulk Send</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', color: '#b298dc' }}>From Your Gmail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Section - Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Why EventsMail Exists</h2>
        <p className="text-gray-300 text-lg text-center mb-16 max-w-2xl mx-auto">
          We organized events. Sending certificates sucked. So we fixed it.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#683abe' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">We Needed It</h3>
            <p className="text-gray-300 leading-relaxed">
              After running hackathons with 200+ participants, manually personalizing and sending certificates 
              took hours. Existing tools were overkill or didn't integrate with Gmail.
            </p>
          </div>

          <div className="p-8 rounded-3xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#b298dc' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Keep It Simple</h3>
            <p className="text-gray-300 leading-relaxed">
              No fancy CRM. No email marketing automation. No analytics dashboard. Just upload, 
              connect, send. That's it.
            </p>
          </div>

          <div className="p-8 rounded-3xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#00bcd4' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Your Email = Trust</h3>
            <p className="text-gray-300 leading-relaxed">
              When attendees get certificates from "noreply@someservice.com", it feels impersonal. 
              EventsMail sends from your actual Gmail, so they know it's you.
            </p>
          </div>

          <div className="p-8 rounded-3xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#4285f4' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Google Sheets Works</h3>
            <p className="text-gray-300 leading-relaxed">
              You're probably already using Google Sheets for registration. Why learn another system? 
              Just point EventsMail to your existing sheet.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="rounded-3xl p-12 text-center backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(104, 58, 190, 0.3), rgba(178, 152, 220, 0.2))', border: '1px solid rgba(178, 152, 220, 0.3)' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Stop Manually Sending Certificates?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Sign in with Google and send your first batch in under 5 minutes.
          </p>
          <Link href={session?.user ? "/certificate-builder" : "/"}>
            <button className="px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
              {session?.user ? "Go to Certificate Builder" : "Get Started Free"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
