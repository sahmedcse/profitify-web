import { DashboardSidebar } from '@/components/layouts/dashboard-sidebar';
import { DashboardHeader } from '@/components/layouts/dashboard-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
