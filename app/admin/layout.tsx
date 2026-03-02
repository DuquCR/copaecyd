import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const role = (session.user as Record<string, unknown>)?.role;
  if (role !== "admin") {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="min-h-[80vh] bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <h1 className="text-lg font-bold text-primary-500">Panel de Administración</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{session.user?.email}</span>
            <a
              href="/api/auth/signout"
              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
