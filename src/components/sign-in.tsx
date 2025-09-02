

import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Logo/Icon */}
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Hackmail</h1>
        <p className="text-gray-600 mb-8 text-center">
          Sign in to access your secure email dashboard
        </p>
        
        {/* Security Features */}
        <div className="w-full mb-6 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Secure OAuth 2.0 Authentication
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Protected Routes & Sessions
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Encrypted Data Transfer
          </div>
        </div>
        
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
          className="w-full"
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg shadow-md border border-gray-300 transition-all duration-200 hover:shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <g>
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.9-6.9C36.68 2.13 30.7 0 24 0 14.82 0 6.73 5.08 2.69 12.44l8.06 6.26C12.6 13.13 17.88 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.42c-.54 2.9-2.18 5.36-4.66 7.02l7.2 5.6C43.98 37.13 46.1 31.3 46.1 24.5z"/>
                <path fill="#FBBC05" d="M10.75 28.7c-1.1-3.3-1.1-6.8 0-10.1l-8.06-6.26C.98 16.13 0 20.01 0 24c0 3.99.98 7.87 2.69 11.66l8.06-6.26z"/>
                <path fill="#EA4335" d="M24 48c6.7 0 12.68-2.13 17.14-5.84l-7.2-5.6c-2.01 1.35-4.6 2.14-7.94 2.14-6.12 0-11.4-3.63-13.25-8.7l-8.06 6.26C6.73 42.92 14.82 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </g>
            </svg>
            Continue with Google
          </button>
        </form>
        
        <p className="text-xs text-gray-500 mt-6 text-center">
          By signing in, you agree to our secure authentication practices.
          Your data is protected and never shared without permission.
        </p>
      </div>
    </div>
  );
}