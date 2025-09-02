import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CertificateBuilder from "@/components/certificate-builder";

export default async function CertificateBuilderPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CertificateBuilder />
    </div>
  );
}
