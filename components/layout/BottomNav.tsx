'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Users, Clock, Menu } from 'lucide-react';

const mobileNavItems = [
  { name: 'Dashboard', href: '/', icon: LayoutGrid },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Expiring', href: '/expiring', icon: Clock },
  { name: 'More', href: '/settings', icon: Menu },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center z-40">
      {mobileNavItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition ${
              isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[11px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}