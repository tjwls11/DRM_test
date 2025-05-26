
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopNav } from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'super_admin' | 'dept_admin';
  userName?: string;
}

export const Layout = ({ children, userRole = 'super_admin', userName = 'Admin' }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar userRole={userRole} />
        <main className="flex-1 flex flex-col bg-white">
          <TopNav userName={userName} userRole={userRole} />
          <div className="flex-1 p-6 overflow-auto bg-gray-50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
