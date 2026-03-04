import { AdminShell } from "@/components/layout/admin-workspace/AdminShell";
import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <AdminShell>
      <Stack screenOptions={{ headerShown: false }} />
    </AdminShell>
  );
}
