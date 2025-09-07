import { auth } from "@/auth";
import SignOut from "@/components/sign-out";
import { redirect } from "next/navigation";
import Link from "next/link";
import CertificateDemo from "@/components/certificate-demo";

export default async function Dashboard() {
  const session = await auth();

  // If not authenticated, redirect to login
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d0630 0%, #18314f 25%, #384e77 100%)' }}>
      {/* Navigation Header */}
      <nav className="relative border-b backdrop-blur-md" style={{ backgroundColor: 'rgba(13, 6, 48, 0.9)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 sm:space-x-12">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                  <span className="text-white font-bold text-sm sm:text-base">C</span>
                </div>
                <span className="text-white font-semibold text-lg sm:text-xl">MailCraft Pro</span>
              </div>
              
              <div className="hidden lg:flex items-center space-x-8">
                <a href="#home" className="text-white hover:text-purple-300 transition-colors duration-300 font-medium">Home</a>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">About</a>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Features</a>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Pricing</a>
                <a href="#blog" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Blog</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/certificate-builder">
                <button className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
                  <span className="hidden sm:inline">Send Emails</span>
                  <span className="sm:hidden">Send</span>
                </button>
              </Link>
              <SignOut />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="pt-12 sm:pt-20 md:pt-30 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
            Event Helper for Tickets & Certificates
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl" style={{ color: '#b298dc' }}>Send from Your Gmail with Google Sheets</span>
          </h1>
          
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Simplify your event management by sending personalized tickets and certificates directly from your Gmail account. 
            Import recipient data from Google Sheets, preview before sending, and reach attendees with professional emails 
            that maintain your brand identity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-20 px-4">
            <Link href="/certificate-builder">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
                Start Sending Emails
              </button>
            </Link>
           
          </div>
          
          <div className="px-2 sm:px-4">
            <CertificateDemo/>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 sm:py-20 md:py-24">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Everything you need for event communication
              <span className="block mt-2" style={{ color: '#b298dc' }}>from Google Sheets to Gmail delivery</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Import attendee data from Google Sheets, create personalized tickets and certificates, 
              preview before sending, and deliver professional emails directly from your Gmail account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            <div className="p-6 sm:p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: '#683abe' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Event Tickets & Certificates</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Create professional event tickets and achievement certificates. Multiple templates ready for workshops, conferences, webinars, and training programs.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: '#b298dc' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Google Sheets Integration</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Import attendee data directly from your Google Sheets. Automatically generate personalized emails with names, event details, and custom information for each recipient.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: '#00bcd4' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Send from Your Gmail</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">All emails are sent directly from your Gmail account on your behalf. Recipients see your email address, maintaining authenticity and trust for your events.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: '#4285f4' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Preview Before Sending</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Review all tickets and certificates before sending emails. See exactly how each personalized email will look to ensure perfect delivery for your event attendees.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: '#e91e63' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Simple Event Helper</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Designed specifically for event organizers who need to send tickets and certificates efficiently. No complex features - just what you need for successful events.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: '#683abe' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Google Workspace Ready</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Seamlessly integrates with Google Sheets for data import and Gmail for email delivery. Use your existing Google account - no additional setup required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
