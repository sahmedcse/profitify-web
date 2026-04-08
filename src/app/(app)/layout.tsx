import { DashboardNav } from '@/components/dashboard/dashboard-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <DashboardNav />
      {children}
    </div>
  );
}
