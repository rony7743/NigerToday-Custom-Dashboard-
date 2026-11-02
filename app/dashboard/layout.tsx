import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-10 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}

