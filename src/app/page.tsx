import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import SignIn from '@/components/sign-in';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Certificate Builder
          </h1>
          <p className="text-gray-600">
            Create and send personalized certificates with ease
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
