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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* About Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            About EventsMail
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A straightforward tool for event organizers who need to send certificates and tickets via email.
          </p>
        </div>

        {/* What It Does */}
        <div className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-3xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">What It Does</h2>
          <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>
              EventsMail helps you send event tickets and certificates to attendees. Upload your certificate template, 
              import recipient details from Google Sheets, and send personalized emails from your Gmail account.
            </p>
            <p>
              That's it. No complex features, no unnecessary steps. Just the basics you need to get certificates 
              and tickets delivered to your event participants.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-3xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">How It Works</h2>
          <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">1. Upload Your Certificate</h3>
              <p>Upload your certificate or ticket template image. Add placeholders for names and other details.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">2. Import from Google Sheets</h3>
              <p>Connect your Google Sheet with attendee names, emails, and any custom information you want to include.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">3. Preview and Send</h3>
              <p>Check how each certificate looks, then send emails directly from your Gmail account.</p>
            </div>
          </div>
        </div>

        {/* Why We Built This */}
        <div className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-3xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Why We Built This</h2>
          <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>
              After organizing hackathons and workshops, we kept running into the same problem: sending certificates 
              to hundreds of participants was time-consuming and error-prone.
            </p>
            <p>
              Existing tools were either too expensive, too complicated, or didn't work with Gmail. So we built 
              EventsMail to solve this specific problem for event organizers like us.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="p-6 sm:p-8 rounded-3xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 49, 79, 0.6)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">What You Need</h2>
          <div className="space-y-3 text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>• A Google account (for Gmail and Google Sheets access)</p>
            <p>• Your certificate or ticket template as an image</p>
            <p>• Attendee information in a Google Sheet</p>
            <p>• That's all</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link href={session?.user ? "/certificate-builder" : "/"}>
            <button className="px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
              {session?.user ? "Start Sending Emails" : "Get Started"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
