import Link from "next/link";

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-200 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Authentication Error</h1>
        <p className="text-gray-600 mb-6">
          There was a problem signing you in. This could be due to:
        </p>
        
        <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
          <li>• Network connectivity issues</li>
          <li>• Google service temporarily unavailable</li>
          <li>• Configuration problems</li>
          <li>• Cancelled sign-in process</li>
        </ul>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors duration-200"
        >
          Try Again
        </Link>
        
        <p className="text-xs text-gray-500 mt-4">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
