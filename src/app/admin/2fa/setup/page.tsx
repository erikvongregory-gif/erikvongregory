import { requireAdminPageAccess } from "@/lib/admin/auth";
import { AdminTwoFactorSetup } from "@/components/admin/AdminTwoFactorSetup";

export const dynamic = "force-dynamic";

export default async function AdminTwoFactorSetupPage() {
  await requireAdminPageAccess({ allowWithout2FA: true });
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:px-6">
      <AdminTwoFactorSetup />
    </main>
  );
}
