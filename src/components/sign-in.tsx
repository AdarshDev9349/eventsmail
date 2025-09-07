

import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center">
      {/* Logo/Icon */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold mb-2 text-center text-white">Welcome to MailCraft Pro</h1>
      <p className="text-gray-300 mb-8 text-center">
        Sign in to start sending event tickets and certificates from your Gmail
      </p>
      
      {/* Security Features */}
      <div className="w-full mb-6 space-y-3">
        <div className="flex items-center text-sm" style={{ color: '#b298dc' }}>
          <svg className="w-4 h-4 mr-3" style={{ color: '#683abe' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Send emails from your Gmail account
        </div>
        <div className="flex items-center text-sm" style={{ color: '#b298dc' }}>
          <svg className="w-4 h-4 mr-3" style={{ color: '#683abe' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Import data from Google Sheets
        </div>
        <div className="flex items-center text-sm" style={{ color: '#b298dc' }}>
          <svg className="w-4 h-4 mr-3" style={{ color: '#683abe' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Preview before sending tickets & certificates
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
          className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="relative w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path fill="#FFFFFF" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.9-6.9C36.68 2.13 30.7 0 24 0 14.82 0 6.73 5.08 2.69 12.44l8.06 6.26C12.6 13.13 17.88 9.5 24 9.5z"/>
              <path fill="#FFFFFF" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.42c-.54 2.9-2.18 5.36-4.66 7.02l7.2 5.6C43.98 37.13 46.1 31.3 46.1 24.5z"/>
              <path fill="#FFFFFF" d="M10.75 28.7c-1.1-3.3-1.1-6.8 0-10.1l-8.06-6.26C.98 16.13 0 20.01 0 24c0 3.99.98 7.87 2.69 11.66l8.06-6.26z"/>
              <path fill="#FFFFFF" d="M24 48c6.7 0 12.68-2.13 17.14-5.84l-7.2-5.6c-2.01 1.35-4.6 2.14-7.94 2.14-6.12 0-11.4-3.63-13.25-8.7l-8.06 6.26C6.73 42.92 14.82 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </g>
          </svg>
          <span className="relative">Continue with Google</span>
        </button>
      </form>
      
      <p className="text-xs text-gray-400 mt-6 text-center">
        By signing in, you allow MailCraft Pro to access your Gmail and Google Sheets
        to help you send event tickets and certificates efficiently.
      </p>
    </div>
  );
}