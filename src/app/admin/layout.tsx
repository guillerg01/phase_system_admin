import Sidebar from "@/components/admin/sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full p-4">{children}</div>
    </div>
  );
}
