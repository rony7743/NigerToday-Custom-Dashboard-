'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  Clock,
  AlertTriangle,
  Settings,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  {
    name: 'Expiring',
    href: '/dashboard/expiring',
    icon: Clock,
    badge: 4,
    badgeColor: 'bg-[#D97706] text-white',
  },
  {
    name: 'Expired',
    href: '/dashboard/expired',
    icon: AlertTriangle,
    badge: 2,
    badgeColor: 'bg-[#DC2626] text-white',
  },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 bg-[#F4F5FA] border-r border-slate-200/70 min-h-screen px-3.5 py-6 fixed left-0 top-0 bottom-0 z-30">
      {/* Brand Logo */}
      <div className="flex items-center px-2.5 mb-7">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={95}
          height={55}
          className="object-contain"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          // শুধুমাত্র নির্দিষ্ট রাউট বা তার সাব-রাউট সিলেক্ট হবে
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard' || pathname === '/'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#4B44F6] text-white shadow-xs'
                  : 'text-[#64748B] hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-white' : 'text-[#64748B]'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`w-5 h-5 flex items-center justify-center text-[11px] rounded-full font-bold ${
                    isActive
                      ? 'bg-white text-[#4B44F6]'
                      : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Area */}
      <div className="pt-4 mt-auto">
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#4B44F6] flex items-center justify-center text-xs font-bold shrink-0">
              AO
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-slate-900">Alex Owner</p>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Business owner
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="p-1.5 text-[#64748B] hover:text-red-600 rounded-lg hover:bg-red-50 transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}