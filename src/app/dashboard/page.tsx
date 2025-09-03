import { auth } from "@/auth";
import SignOut from "@/components/sign-out";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  // If not authenticated, redirect to login
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d0630 0%, #18314f 25%, #384e77 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl mb-8" style={{ backgroundColor: 'rgba(179, 152, 220, 0.1)', border: '1px solid rgba(179, 152, 220, 0.2)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-1"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {session.user.image && (
                  <div className="relative">
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-16 h-16 rounded-2xl border-2"
                      style={{ borderColor: '#b298dc' }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#683abe' }}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Certificate Builder
                  </h1>
                  <p className="text-gray-300 mt-1 text-lg">{session.user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm" style={{ backgroundColor: 'rgba(104, 58, 190, 0.2)', borderColor: '#683abe', color: '#b298dc' }}>
                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#683abe' }}></span>
                  Active Session
                </div>
                <SignOut />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: '#b298dc' }}></div>
          <div className="absolute bottom-0 right-1/3 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: '#683abe' }}></div>
          
          <div className="relative rounded-3xl backdrop-blur-xl border p-10" style={{ backgroundColor: 'rgba(56, 78, 119, 0.15)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
            <div className="text-center">
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-8" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent"></div>
                <svg className="relative w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h2 className="text-4xl font-bold text-white mb-6">
                Digital Certificate
                <span className="block text-2xl font-normal mt-2" style={{ color: '#b298dc' }}>
                  Generation Platform
                </span>
              </h2>
              
              <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform your event management with automated certificate creation. 
                Seamlessly integrate spreadsheet data, craft stunning templates, and deliver 
                personalized certificates at scale.
              </p>
              
              {/* Process Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="group relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 rounded-2xl border" style={{ backgroundColor: 'rgba(24, 49, 79, 0.4)', borderColor: 'rgba(179, 152, 220, 0.2)' }}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 mx-auto" style={{ backgroundColor: '#683abe' }}>
                      <span className="text-white font-bold text-lg">01</span>
                    </div>
                    <h3 className="font-semibold text-white mb-3 text-lg">Data Integration</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Connect and synchronize participant data from Google Sheets with intelligent field mapping</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 rounded-2xl border" style={{ backgroundColor: 'rgba(24, 49, 79, 0.4)', borderColor: 'rgba(179, 152, 220, 0.2)' }}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 mx-auto" style={{ backgroundColor: '#b298dc' }}>
                      <span className="text-white font-bold text-lg">02</span>
                    </div>
                    <h3 className="font-semibold text-white mb-3 text-lg">Visual Design</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Craft beautiful templates with drag-and-drop precision and real-time positioning</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 rounded-2xl border" style={{ backgroundColor: 'rgba(24, 49, 79, 0.4)', borderColor: 'rgba(179, 152, 220, 0.2)' }}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 mx-auto" style={{ background: 'linear-gradient(135deg, #683abe, #384e77)' }}>
                      <span className="text-white font-bold text-lg">03</span>
                    </div>
                    <h3 className="font-semibold text-white mb-3 text-lg">Smart Delivery</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Automatically generate and distribute personalized certificates via email</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Link href="/certificate-builder">
                <button className="group relative px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center space-x-3">
                    <span>Launch Certificate Builder</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
