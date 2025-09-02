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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Certificate Builder Dashboard
                </h1>
                <p className="text-gray-600">{session.user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✓ Authenticated
              </span>
              <SignOut />
            </div>
          </div>
        </div>

        {/* Certificate Builder Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certificate Builder</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Create and send personalized certificates to event participants. Import data from Google Sheets, 
              design custom templates, and automatically send certificates via email.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Import Data</h3>
                <p className="text-sm text-gray-600">Connect your Google Sheets with participant information</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Design Template</h3>
                <p className="text-sm text-gray-600">Upload background and place data fields visually</p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Send Certificates</h3>
                <p className="text-sm text-gray-600">Automatically generate and email personalized certificates</p>
              </div>
            </div>
            
            <Link href="/certificate-builder">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg">
                Start Building Certificates
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
