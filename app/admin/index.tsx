import { Redirect } from "expo-router";

export default function AdminIndexRoute() {
  return <Redirect href={"/admin/strategic-dashboard" as any} />;
}
