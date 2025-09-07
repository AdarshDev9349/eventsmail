import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import SignIn from '@/components/sign-in';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0d0630 0%, #18314f 25%, #384e77 100%)' }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6" style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent"></div>
            <svg className="relative w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            MailCraft Pro
          </h1>
          <p className="text-gray-300 text-lg">
            Send event tickets and certificates effortlessly from your Gmail
          </p>
        </div>
        <div className="rounded-3xl backdrop-blur-xl border p-8" style={{ backgroundColor: 'rgba(56, 78, 119, 0.15)', borderColor: 'rgba(179, 152, 220, 0.3)' }}>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
